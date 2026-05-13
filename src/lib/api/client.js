import { fallbackAdminDashboard, fallbackLandlordDashboard } from "../../data/fallbackDashboards";
import { agencies, bookings, listings, propertyAssignments, ratings, rewardEvents, users, vouchers } from "../../../server/data";


const publicUser = (user) => user ? {
  id: user.id,
  displayName: user.displayName,
  role: user.role,
  city: user.city,
  verificationStatus: user.verificationStatus,
  ratingAverage: user.ratingAverage,
  ratingCount: user.ratingCount,
  responseTime: user.responseTime
} : null;

const assignmentsForListing = (listingId) => propertyAssignments
  .filter((assignment) => assignment.propertyId === listingId)
  .map((assignment) => ({ ...assignment, user: publicUser(users.find((user) => user.id === assignment.assignedUserId)) }));

const assignedContactForListing = (listing) => {
  const assignment = assignmentsForListing(listing?.id)[0];
  if (assignment?.user?.id) return { ...assignment.user, assignmentRole: assignment.role };
  return publicUser(users.find((user) => user.id === listing?.ownerId));
};

const listingWithOwner = (listing) => listing ? ({
  ...listing,
  managedByType: listing.managedByType || "landlord",
  availabilityStatus: "available",
  reservedByBookingId: null,
  owner: publicUser(users.find((user) => user.id === listing.ownerId)),
  agency: agencies.find((agency) => agency.id === listing.agencyId) || null,
  assignments: assignmentsForListing(listing.id),
  assignedContact: assignedContactForListing(listing),
  imageGallery: Array.isArray(listing.imageGallery) && listing.imageGallery.length ? listing.imageGallery : [{ medium: listing.lowDataImageUrl || listing.imageUrl, large: listing.imageUrl || listing.lowDataImageUrl }]
}) : null;

const buildViewingAvailability = (listing) => {
  const start = listing?.availableFrom ? new Date(`${listing.availableFrom}T10:00:00`) : new Date();
  return Array.from({ length: 5 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index + 1);
    return {
      date: date.toISOString().slice(0, 10),
      slots: ["09:00", "12:00", "15:00"].map((time) => ({ time, available: true }))
    };
  });
};

const filterListings = (path) => {
  const queryString = path.includes("?") ? path.slice(path.indexOf("?") + 1) : "";
  const query = new URLSearchParams(queryString);
  return listings.filter((listing) => {
    const category = query.get("category");
    const duration = query.get("duration");
    const city = query.get("city");
    const verified = query.get("verified");
    const minPrice = query.get("minPrice");
    const maxPrice = query.get("maxPrice");
    const q = query.get("q");
    if (category && listing.category !== category) return false;
    if (duration && listing.duration !== duration) return false;
    if (city && listing.city.toLowerCase() !== String(city).toLowerCase()) return false;
    if (verified === "true" && !listing.verified) return false;
    if (minPrice && listing.priceAmount < Number(minPrice)) return false;
    if (maxPrice && listing.priceAmount > Number(maxPrice)) return false;
    if (q) {
      const haystack = `${listing.title} ${listing.city} ${listing.suburb} ${listing.address || ""}`.toLowerCase();
      if (!haystack.includes(String(q).toLowerCase())) return false;
    }
    return true;
  }).map(listingWithOwner);
};

const tenantDashboardFor = (userId) => {
  const user = users.find((item) => item.id === userId) || { id: userId, role: "tenant", displayName: "New tenant", city: "", verificationStatus: "pending", ratingAverage: 0, ratingCount: 0, rewardPoints: 0 };
  const userBookings = bookings
    .filter((booking) => booking.tenantId === user.id)
    .map((booking) => ({ ...booking, listing: listingWithOwner(listings.find((item) => item.id === booking.listingId)) }));
  return {
    user: publicUser(user),
    bookings: userBookings,
    rewards: {
      points: user.rewardPoints || 0,
      history: rewardEvents.filter((event) => event.userId === user.id),
      vouchers
    }
  };
};

const localAuthResponse = (form = {}) => {
  const role = form.role || "tenant";
  const phoneNumber = String(form.phoneNumber || "").trim();
  const existing = users.find((item) => item.phoneNumber === phoneNumber);

  if (existing) {
    if (form.displayName) existing.displayName = form.displayName;
    if (form.city) existing.city = form.city;
    return { token: `local-token-${existing.id}`, user: publicUser(existing) };
  }

  const user = {
    id: `local-user-${Date.now()}`,
    phoneNumber,
    displayName: form.displayName || "New user",
    role,
    city: form.city || "",
    verificationStatus: "pending",
    ratingAverage: 0,
    ratingCount: 0,
    rewardPoints: 0
  };
  users.push(user);
  return { token: `local-token-${user.id}`, user: publicUser(user) };
};

const createLocalBooking = (payload = {}) => {
  const listing = listingWithOwner(listings.find((item) => item.id === payload.listingId) || listings[0]);
  const quantity = Number(payload.quantity || payload.leaseTermMonths || 1);
  const depositMonths = Number(payload.depositMonths || 1);
  const rent = listing?.priceAmount || 0;
  const isLongTerm = ["mid", "long", "monthly"].includes(listing?.duration);
  const booking = {
    id: `local-booking-${Date.now()}`,
    listingId: listing.id,
    tenantId: payload.tenantId || payload.userId || "local-tenant",
    startsAt: payload.startsAt || new Date().toISOString(),
    endsAt: payload.endsAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: isLongTerm ? "awaiting_landlord_review" : "confirmed",
    reservationStatus: isLongTerm ? "application_under_review" : "held_pending_payment",
    totalAmount: rent * Math.max(quantity, 1),
    depositAmount: rent * depositMonths,
    amountDue: isLongTerm ? rent * depositMonths : rent,
    leaseTermMonths: quantity,
    serviceFee: Math.round(rent * 0.03),
    paymentStatus: "pending",
    paymentMethod: "vodapay",
    telcoChannel: "VodaPay",
    depositStatus: "pending_payment",
    custodyStatus: "not_received",
    releaseStatus: "not_ready",
    inspectionStatus: "pending",
    leaseContractStatus: "not_generated",
    approvalStatus: isLongTerm ? "landlord_review_pending" : "not_required",
    applicationPack: payload.applicationPack || null,
    listing
  };
  addLocalNotification({
    userId: booking.tenantId,
    role: "tenant",
    type: "application_submitted",
    title: isLongTerm ? "Application sent" : "Booking started",
    message: isLongTerm ? "Your rental application has been saved and sent for review." : "Your booking has been started. Complete payment to confirm it.",
    actionLabel: "Open dashboard",
    actionRoute: "/dashboard"
  });
  return { booking, pricing: { totalAmount: booking.totalAmount, depositAmount: booking.depositAmount, amountDue: booking.amountDue, serviceFee: booking.serviceFee }, next: booking.status, message: isLongTerm ? "Application submitted. We will let you know when the landlord replies." : "Booking created. Continue to payment to confirm." };
};

const localApplicationActions = new Map();
const localNotifications = [];

const addLocalNotification = ({ userId = "local-user", role = "tenant", type = "local_update", title, message, actionLabel = "Open update", actionRoute = "/dashboard" }) => {
  const item = {
    id: `local-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    userId,
    role,
    type,
    title,
    message,
    actionLabel,
    actionRoute,
    read: false,
    createdAt: new Date().toISOString()
  };
  localNotifications.unshift(item);
  return item;
};

const notificationsFor = (userId) => {
  const items = localNotifications.filter((item) => item.userId === userId).slice(0, 30);
  return { items, unreadCount: items.filter((item) => !item.read).length };
};

const withActionState = (dashboard) => ({
  ...dashboard,
  applications: dashboard.applications.map((application) => ({
    ...application,
    ...(localApplicationActions.get(application.id) || {})
  }))
});

const localResponseFor = (path, options = {}) => {
  if (path.startsWith("/listings?")) {
    return filterListings(path);
  }

  if (path === "/listings" || path === "/listings?") {
    return filterListings(path);
  }

  const listingDetailMatch = path.match(/^\/listings\/([^/?]+)$/);
  if (listingDetailMatch) {
    const listing = listingWithOwner(listings.find((item) => item.id === listingDetailMatch[1]));
    if (listing) return { ...listing, ratings: ratings.filter((rating) => rating.listingId === listing.id), viewingAvailability: buildViewingAvailability(listing) };
  }

  const galleryMatch = path.match(/^\/listings\/([^/]+)\/gallery$/);
  if (galleryMatch) {
    const listing = listingWithOwner(listings.find((item) => item.id === galleryMatch[1]));
    if (listing) return { listingId: listing.id, count: listing.imageGallery?.length || 0, imageGallery: listing.imageGallery || [] };
  }

  const viewingSlotsMatch = path.match(/^\/listings\/([^/]+)\/viewing-availability$/);
  if (viewingSlotsMatch) {
    const listing = listingWithOwner(listings.find((item) => item.id === viewingSlotsMatch[1]));
    if (listing) return { listingId: listing.id, days: buildViewingAvailability(listing) };
  }

  const tenantDashboardMatch = path.match(/^\/users\/([^/]+)\/dashboard$/);
  if (tenantDashboardMatch) {
    return tenantDashboardFor(tenantDashboardMatch[1]);
  }

  if (path === "/auth/otp/request") {
    return { message: "OTP sent. Use the configured development OTP while SMS delivery is not connected." };
  }

  if (path === "/auth/otp/verify") {
    return localAuthResponse(JSON.parse(options.body || "{}"));
  }

  if (path === "/bookings" && options?.method === "POST") {
    return createLocalBooking(JSON.parse(options.body || "{}"));
  }

  if (path === "/viewings" && options?.method === "POST") {
    const body = JSON.parse(options.body || "{}");
    const listing = listingWithOwner(listings.find((item) => item.id === body.listingId) || listings[0]);
    addLocalNotification({ userId: body.tenantId || body.userId || "local-tenant", role: "tenant", type: "viewing_requested", title: "Viewing request sent", message: `Your viewing request for ${listing.title} was sent.`, actionLabel: "Open dashboard", actionRoute: "/dashboard" });
    return { viewing: { id: `local-viewing-${Date.now()}`, ...body, status: "requested" }, message: `Viewing requested for ${listing.title}.` };
  }

  const mockFundMatch = path.match(/^\/bookings\/([^/]+)\/vodapay-wallet\/mock-fund$/);
  if (mockFundMatch && options?.method === "POST") {
    return { booking: { id: mockFundMatch[1], paymentStatus: "paid", depositStatus: "received", status: "deposit_secured" }, message: "Payment recorded for this booking." };
  }

  const moveInMatch = path.match(/^\/bookings\/([^/]+)\/move-in-checklist$/);
  if (moveInMatch) {
    return { bookingId: moveInMatch[1], items: [
      { id: "lease", label: "Lease documents signed", completed: true },
      { id: "payment", label: "Deposit payment confirmed", completed: true },
      { id: "keys", label: "Collect keys or access details", completed: false }
    ] };
  }

  const checklistItemMatch = path.match(/^\/bookings\/([^/]+)\/move-in-checklist\/([^/]+)$/);
  if (checklistItemMatch && options?.method === "POST") {
    return { item: { id: checklistItemMatch[2], completed: JSON.parse(options.body || "{}").completed } };
  }

  const messageMatch = path.match(/^\/bookings\/([^/]+)\/messages$/);
  if (messageMatch && options?.method === "POST") {
    return { message: "Message sent to the property contact.", thread: [{ id: `local-message-${Date.now()}`, ...JSON.parse(options.body || "{}") }] };
  }

  const auditMatch = path.match(/^\/bookings\/([^/]+)\/audit$/);
  if (auditMatch) {
    return { bookingId: auditMatch[1], estimatedSavings: 0, recommendation: "This rental looks aligned to the selected property details. Review comparable rentals before requesting changes.", marketAverage: 0, upgrades: [] };
  }

  const renegotiateMatch = path.match(/^\/bookings\/([^/]+)\/renegotiation$/);
  if (renegotiateMatch && options?.method === "POST") {
    return { message: "Your request was sent to the property contact." };
  }

  const notificationsMatch = path.match(/^\/users\/([^/]+)\/notifications$/);
  if (notificationsMatch) {
    return notificationsFor(notificationsMatch[1]);
  }

  const readAllMatch = path.match(/^\/users\/([^/]+)\/notifications\/read-all$/);
  if (readAllMatch) {
    localNotifications.forEach((item) => { if (item.userId === readAllMatch[1]) item.read = true; });
    return notificationsFor(readAllMatch[1]);
  }

  const readMatch = path.match(/^\/notifications\/([^/]+)\/read$/);
  if (readMatch) {
    const item = localNotifications.find((entry) => entry.id === readMatch[1]);
    if (item) item.read = true;
    return { notification: item };
  }

  if (/^\/property-workspace\/[^/]+\/dashboard$/.test(path) || /^\/landlords\/[^/]+\/dashboard$/.test(path)) {
    return withActionState(fallbackLandlordDashboard);
  }

  if (path === "/admin/dashboard") {
    return fallbackAdminDashboard;
  }


  if (path === "/properties" && options?.method === "POST") {
    const body = JSON.parse(options.body || "{}");
    const listing = {
      id: `local-property-${Date.now()}`,
      title: body.title || "New property",
      suburb: body.suburb || "",
      city: body.city || "Johannesburg",
      priceAmount: Number(body.priceAmount || 0),
      priceUnit: "month",
      managedByType: body.managedByType || "landlord",
      verified: false,
      neatStock: false,
      ratingAverage: 0,
      reviewCount: 0,
      imageUrl: "",
      assignedContact: body.managedByType === "landlord" ? fallbackLandlordDashboard.landlord : { displayName: body.assignedAgentName || "Assigned contact", role: body.managedByType || "agent", verificationStatus: "pending", assignmentRole: "listing_agent" }
    };
    fallbackLandlordDashboard.listings = [listing, ...fallbackLandlordDashboard.listings];
    return { listing, workspace: fallbackLandlordDashboard };
  }

  const actionMatch = path.match(/^\/landlord\/applications\/([^/]+)\/(approve|request-info|decline)$/);
  if (actionMatch) {
    const [, id, action] = actionMatch;
    const statusByAction = {
      approve: { status: "approved", approvalStatus: "approved", landlordActionNote: "Approved. The tenant can now review the lease documents and complete payment." },
      "request-info": { status: "landlord_requested_info", approvalStatus: "more_info_requested", landlordActionNote: "More information has been requested from the tenant." },
      decline: { status: "declined", approvalStatus: "declined", landlordActionNote: "Application declined politely. The tenant can continue searching for other options." }
    };
    const application = { id, ...statusByAction[action] };
    localApplicationActions.set(id, application);
    const copy = {
      approve: ["Application approved", "The tenant has been notified and can continue with lease documents."],
      "request-info": ["More information requested", "The tenant has been notified that more information is needed."],
      decline: ["Application declined", "The tenant has been notified and can continue searching."]
    }[action];
    addLocalNotification({ userId: application.tenantId || "local-tenant", role: "tenant", type: `application_${action}`, title: copy[0], message: copy[1], actionLabel: action === "decline" ? "Find another rental" : "Open update", actionRoute: action === "decline" ? "/discover" : "/dashboard" });
    addLocalNotification({ userId: application.ownerId || "local-landlord", role: "landlord", type: `application_${action}`, title: copy[0], message: copy[1], actionLabel: "Open landlord workspace", actionRoute: "/landlords" });
    return { application };
  }

  return null;
};

export const api = async (path, options) => {
  const localFirst = localResponseFor(path, options);

  // Amplify is currently hosting the React app as a static frontend, so there is no
  // Express /api server behind the domain. Local fallbacks keep the static build usable
  // when the API is unavailable; they no longer pre-fill or reuse seed users.
  if (localFirst) {
    return Promise.resolve(localFirst);
  }

  try {
    const response = await fetch(`/api${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      const error = new Error(body.error || "Request failed");
      error.status = response.status;
      error.body = body;
      throw error;
    }

    return response.json();
  } catch (error) {
    const localFallback = localResponseFor(path, options);
    if (localFallback) return localFallback;
    throw error;
  }
};
