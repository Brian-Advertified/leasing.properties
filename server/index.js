import cors from "cors";
import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import PDFDocument from "pdfkit";
import { createNotification, getEmailLog, getNotificationsForUser, markAllNotificationsRead, markNotificationRead, notificationEvents, notifyMany, sendNotificationEmail } from "./notificationService.js";
import {
  africanLocations,
  agencies,
  bookings,
  listings,
  propertyAssignments,
  ratings,
  rewardEvents,
  users,
  vouchers
} from "./data.js";

const app = express();
const port = process.env.PORT || 4000;
const jwtSecret = process.env.JWT_SECRET || "demo-secret-change-me";
const galleryCache = new Map();
const vodapayConfig = {
  baseUrl: process.env.VODAPAY_BASE_URL || "https://api.vodapaygatewayuat.vodacom.co.za/v2",
  apiKey: process.env.VODAPAY_API_KEY || "",
  apiPassword: process.env.VODAPAY_API_PASSWORD || "",
  apiKeyHeader: process.env.VODAPAY_API_KEY_HEADER || "api-key",
  authScheme: process.env.VODAPAY_AUTH_SCHEME || "apikey",
  isTest: process.env.VODAPAY_IS_TEST ? process.env.VODAPAY_IS_TEST.toLowerCase() === "true" : true,
  initiatePath: "/Pay/OnceOff",
  vatRatePercent: 15,
  digitalWalletId: process.env.VODAPAY_DIGITAL_WALLET_ID || "00000000-0000-0000-0000-000000000000",
  additionalDataPrefix: "OPCD",
  notificationUrl: process.env.VODAPAY_NOTIFICATION_URL || "http://localhost:5050/payments/webhook/vodapay",
  styling: {
    logoUrl: "https://listing.properties/icon.png",
    bannerUrl: "https://listing.properties/icon.png",
    theme: 0
  },
  electronicReceipt: { method: 0 },
  communication: {
    message: "To make your payment please go to the following URL: *{PaymentUrl}*"
  }
};

const buildVodaPayHeaders = () => {
  const headers = { "Content-Type": "application/json" };
  const scheme = vodapayConfig.authScheme.toLowerCase();

  if (scheme === "bearer") {
    headers.Authorization = vodapayConfig.apiKey.startsWith("Bearer ") ? vodapayConfig.apiKey : `Bearer ${vodapayConfig.apiKey}`;
    return headers;
  }

  if (scheme === "basic") {
    const token = Buffer.from(`${vodapayConfig.apiKey}:${vodapayConfig.apiPassword}`).toString("base64");
    headers.Authorization = `Basic ${token}`;
    return headers;
  }

  if (scheme === "authorization") {
    headers.Authorization = vodapayConfig.apiKey;
    return headers;
  }

  headers[vodapayConfig.apiKeyHeader] = vodapayConfig.apiKey;
  headers.test = vodapayConfig.isTest ? "true" : "false";
  return headers;
};

const getVodaPayPaymentUrl = (response) =>
  response?.data?.paymentUrl ||
  response?.data?.PaymentUrl ||
  response?.data?.initiationUrl ||
  response?.data?.InitiationUrl ||
  response?.data?.checkoutUrl ||
  response?.data?.CheckoutUrl ||
  response?.paymentUrl ||
  response?.PaymentUrl ||
  response?.url ||
  response?.redirectUrl;

const getVodaPayProviderReference = (response) =>
  response?.data?.paymentReference ||
  response?.data?.PaymentReference ||
  response?.data?.transactionId ||
  response?.data?.TransactionId ||
  response?.paymentReference ||
  response?.transactionId;

const callVodaPayInitiate = async (payload) => {
  if (!vodapayConfig.apiKey) {
    const error = new Error("VODAPAY_API_KEY is not configured. Add it to the local .env file and restart the API.");
    error.status = 500;
    throw error;
  }
  if (vodapayConfig.authScheme.toLowerCase() === "basic" && !vodapayConfig.apiPassword) {
    const error = new Error("VODAPAY_API_PASSWORD is required when VODAPAY_AUTH_SCHEME=basic.");
    error.status = 500;
    throw error;
  }

  const response = await fetch(`${vodapayConfig.baseUrl}${vodapayConfig.initiatePath}`, {
    method: "POST",
    headers: buildVodaPayHeaders(),
    body: JSON.stringify(payload)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error("VodaPay initiate request failed");
    error.status = response.status;
    error.details = data;
    throw error;
  }
  return data;
};

const vodapayErrorResponse = (error) => ({
  error: error.status === 401
    ? "VodaPay rejected the gateway credentials. Check VODAPAY_API_KEY, VODAPAY_AUTH_SCHEME, and the issued UAT merchant access in .env."
    : error.message,
  gatewayStatus: error.status,
  details: error.details
});

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const normaliseMonthly = (listing) => {
  const multipliers = { hour: 8 * 22, night: 22, day: 22, week: 4, month: 1 };
  return Math.round(listing.priceAmount * (multipliers[listing.priceUnit] || 1));
};

const publicUser = (user) => user?.id ? ({
  id: user.id,
  displayName: user.displayName,
  emailAddress: user.emailAddress,
  role: user.role,
  city: user.city,
  verificationStatus: user.verificationStatus,
  ratingAverage: user.ratingAverage,
  ratingCount: user.ratingCount,
  rewardPoints: user.rewardPoints,
  phoneNumber: user.phoneNumber,
  responseTime: user.responseTime
}) : null;


const appBaseUrl = process.env.APP_BASE_URL || "http://localhost:5174";

const notificationUrl = (route = "/dashboard") => `${appBaseUrl}${route}`;

const sendUserUpdate = async ({ user, role, type, title, message, booking, listing, actionLabel, actionRoute, priority = "normal" }) => {
  if (!user) return null;
  const notification = createNotification({
    userId: user.id,
    role,
    type,
    title,
    message,
    bookingId: booking?.id,
    listingId: listing?.id || booking?.listingId,
    actionLabel,
    actionRoute,
    priority,
    metadata: { propertyTitle: listing?.title }
  });
  await sendNotificationEmail({
    to: user.emailAddress,
    subject: title,
    title,
    message,
    actionText: actionLabel,
    actionUrl: notificationUrl(actionRoute),
    propertyTitle: listing?.title,
    tags: [
      { name: "event", value: type || "rental_update" },
      { name: "role", value: role || user.role || "user" }
    ]
  });
  return notification;
};

const sendBookingUpdate = async ({ booking, tenantTitle, tenantMessage, landlordTitle, landlordMessage, type, actionLabel = "Open dashboard", tenantRoute = "/dashboard", landlordRoute = "/landlords", priority = "normal" }) => {
  if (!booking) return [];
  const listing = listings.find((item) => item.id === booking.listingId);
  const tenant = users.find((item) => item.id === booking.tenantId);
  const landlord = users.find((item) => item.id === (primaryAssignmentForListing(listing?.id)?.assignedUserId || listing?.ownerId));
  const sent = [];
  if (tenantTitle && tenantMessage) {
    sent.push(await sendUserUpdate({ user: tenant, role: "tenant", type, title: tenantTitle, message: tenantMessage, booking, listing, actionLabel, actionRoute: tenantRoute, priority }));
  }
  if (landlordTitle && landlordMessage) {
    sent.push(await sendUserUpdate({ user: landlord, role: landlord?.role || "landlord", type, title: landlordTitle, message: landlordMessage, booking, listing, actionLabel: "Review application", actionRoute: landlord?.role === "agent" ? "/property-workspace" : landlordRoute, priority }));
  }
  return sent.filter(Boolean);
};

const reservingBookingStatuses = new Set(["reserved", "approved", "awaiting_payment", "confirmed", "deposit_received", "deposit_secured", "active"]);

const requiredApplicationPackFields = ["applicantProfile", "affordability", "viewing"];

const missingApplicationPackFields = (applicationPack = {}) =>
  requiredApplicationPackFields.filter((field) => !applicationPack[field]);

const getListingReservation = (listingId) => bookings.find((booking) =>
  booking.listingId === listingId &&
  reservingBookingStatuses.has(booking.status) &&
  !["failed", "refunded"].includes(booking.paymentStatus)
);


const assignmentPriority = ["listing_agent", "viewing_agent", "lease_manager", "maintenance_manager"];

const assignmentsForListing = (listingId) => propertyAssignments
  .filter((assignment) => assignment.propertyId === listingId)
  .map((assignment) => ({ ...assignment, user: publicUser(users.find((user) => user.id === assignment.assignedUserId) || {}) }));

const primaryAssignmentForListing = (listingId) => assignmentsForListing(listingId)
  .sort((a, b) => assignmentPriority.indexOf(a.role) - assignmentPriority.indexOf(b.role))[0];

const assignedContactForListing = (listing) => {
  const assignment = primaryAssignmentForListing(listing?.id);
  if (!assignment?.user?.id) return publicUser(users.find((user) => user.id === listing?.ownerId));
  return { ...assignment.user, assignmentRole: assignment.role };
};

const managerCanAccessListing = (user, listing) => {
  if (!user || !listing) return false;
  if (user.role === "admin") return true;
  if (listing.ownerId === user.id) return true;
  return propertyAssignments.some((assignment) => assignment.propertyId === listing.id && assignment.assignedUserId === user.id);
};

const listingWithOwner = (listing) => ({
  ...listing,
  managedByType: listing.managedByType || "landlord",
  availabilityStatus: getListingReservation(listing.id) ? "reserved" : "available",
  reservedByBookingId: getListingReservation(listing.id)?.id || null,
  owner: publicUser(users.find((user) => user.id === listing.ownerId)),
  agency: agencies.find((agency) => agency.id === listing.agencyId) || null,
  assignments: assignmentsForListing(listing.id),
  assignedContact: assignedContactForListing(listing)
});

const fetchListingGallery = async (listing) => {
  // Keep demo images stable and avoid third-party thumbnail endpoints that often expire or return 404.
  // Production should replace this with stored, validated listing images from S3/Cloudinary.
  if (Array.isArray(listing?.imageGallery) && listing.imageGallery.length) {
    return listing.imageGallery;
  }
  const primary = listing?.imageUrl || listing?.lowDataImageUrl;
  const lowData = listing?.lowDataImageUrl || listing?.imageUrl;
  return [{ medium: lowData, large: primary }].filter((item) => item.medium || item.large);
};

const buildViewingAvailability = (listing) => {
  const toDateValue = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const availableFrom = new Date(`${listing.availableFrom || today.toISOString().slice(0, 10)}T00:00:00`);
  const start = availableFrom > today ? availableFrom : today;
  const days = [];

  for (let offset = 0; days.length < 14 && offset < 28; offset += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + offset);
    const day = date.getDay();
    if (day === 0) continue;

    const dateValue = toDateValue(date);
    const slots = day === 6 ? ["09:00", "11:00"] : ["10:00", "14:00", "16:00"];
    days.push({
      date: dateValue,
      weekday: date.toLocaleDateString("en-ZA", { weekday: "short" }),
      day: date.toLocaleDateString("en-ZA", { day: "2-digit" }),
      month: date.toLocaleDateString("en-ZA", { month: "short" }),
      slots: slots.map((time) => ({
        time,
        startsAt: `${dateValue}T${time}:00+02:00`
      }))
    });
  }

  return days;
};

const calculateBookingTotal = (listing, quantity = 1, depositMonths = 0) => {
  const months = Math.max(Number(quantity) || 1, 1);
  const totalAmount = listing.priceAmount * months;
  const depositAmount = listing.priceAmount * Math.max(Number(depositMonths) || 0, 0);
  const processingFee = Math.round(depositAmount * 0.03);
  const amountDue = depositAmount > 0 ? depositAmount + processingFee : totalAmount;
  return {
    totalAmount,
    depositAmount,
    serviceFee: processingFee,
    processingFee,
    amountDue,
    grandTotal: amountDue
  };
};

const successfulPaymentStatuses = new Set(["paid", "authorised", "authorized", "success", "successful", "00"]);

const findBookingFromPaymentPayload = (payload) => {
  const additionalData = String(payload.additionalData || "");
  const compactAdditionalId = additionalData.startsWith(vodapayConfig.additionalDataPrefix)
    ? additionalData.slice(vodapayConfig.additionalDataPrefix.length)
    : "";
  const candidate =
    payload.bookingId ||
    payload.echoData ||
    payload.MerchantReference ||
    payload.merchantReference ||
    additionalData.split(";")[1] ||
    compactAdditionalId;
  return bookings.find((booking) => {
    const compactBookingId = booking.id.replaceAll("-", "");
    return booking.id === candidate ||
      booking.id.startsWith(candidate || "no-match") ||
      compactBookingId === candidate ||
      compactBookingId.startsWith(candidate || "no-match");
  });
};

const confirmDepositPayment = (booking, payload = {}) => {
  booking.paymentStatus = "paid";
  booking.depositStatus = "received_pending_custody";
  booking.custodyStatus = "pending_reconciliation";
  booking.status = "deposit_received";
  booking.releaseStatus = "not_ready";
  booking.providerReference = payload.providerReference || payload.TransactionReference || payload.traceId || nanoid();
  booking.depositReceivedAt = new Date().toISOString();
  booking.leaseContractStatus = "generated";
  booking.leaseContractGeneratedAt = new Date().toISOString();
  booking.leasePdfUrl = `/api/bookings/${booking.id}/lease.pdf`;
  return booking;
};

const releaseBookingReservation = (booking, payload = {}) => {
  booking.paymentStatus = "failed";
  booking.status = "cancelled";
  booking.depositStatus = "payment_failed";
  booking.custodyStatus = "not_received";
  booking.releaseStatus = "not_applicable";
  booking.providerReference = payload.providerReference || payload.TransactionReference || payload.traceId || booking.providerReference || nanoid();
  booking.cancelledAt = new Date().toISOString();
  return booking;
};

const estimateInterest = (booking) => {
  const received = new Date(booking.custodyReceivedAt || booking.depositReceivedAt || new Date());
  const now = new Date();
  const daysHeld = Math.max(Math.ceil((now - received) / 86400000), 0);
  return Math.round(((booking.depositAmount || 0) * 0.055 * daysHeld) / 365);
};

const buildVodaPayPayload = ({ booking, listing, tenant, callbackUrl }) => {
  const traceId = booking.id.replace(/[^a-zA-Z0-9]/g, "").slice(0, 18);
  const amountInCents = Math.round((booking.amountDue || (booking.depositAmount || 0) + booking.serviceFee) * 100);
  const amountExVAT = Math.round(amountInCents / (1 + vodapayConfig.vatRatePercent / 100));
  const amountVAT = amountInCents - amountExVAT;

  return {
    echoData: booking.id,
    traceId,
    amount: amountInCents,
    currency: "710",
    customerId: tenant.id.replaceAll("-", ""),
    delaySettlement: false,
    basket: [
      {
        lineNumber: "1",
        Id: `lease-${booking.id.slice(0, 8)}`,
        barcode: traceId.slice(0, 8),
        quantity: 1,
        description: `${listing.title} - booking confirmation`,
        amountExVAT,
        amountVAT
      }
    ],
    notifications: {
      callbackUrl: callbackUrl || "http://localhost:5174/dashboard",
      notificationUrl: vodapayConfig.notificationUrl
    },
    additionalData: `${vodapayConfig.additionalDataPrefix}${booking.id.replaceAll("-", "")}`,
    styling: vodapayConfig.styling,
    electronicReceipt: {
      method: vodapayConfig.electronicReceipt.method,
      address: "tenant@example.com"
    },
    communication: {
      msisdn: tenant.phoneNumber.replace("+27", "0"),
      emailAddress: "tenant@example.com",
      message: vodapayConfig.communication.message
    }
  };
};

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Listing.properties API" });
});

app.get("/api/payments/vodapay/config", (_req, res) => {
  res.json({
    baseUrl: vodapayConfig.baseUrl,
    initiatePath: vodapayConfig.initiatePath,
    authScheme: vodapayConfig.authScheme,
    apiKeyHeader: vodapayConfig.authScheme.toLowerCase() === "apikey" ? vodapayConfig.apiKeyHeader : null,
    isTest: vodapayConfig.isTest,
    apiKeyConfigured: Boolean(vodapayConfig.apiKey),
    apiKeyLength: vodapayConfig.apiKey.length,
    apiPasswordConfigured: Boolean(vodapayConfig.apiPassword),
    digitalWalletConfigured: Boolean(vodapayConfig.digitalWalletId && !vodapayConfig.digitalWalletId.startsWith("00000000")),
    notificationUrl: vodapayConfig.notificationUrl
  });
});

app.post("/api/auth/otp/request", (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber) return res.status(400).json({ error: "phoneNumber is required" });
  res.json({
    requestId: nanoid(),
    delivery: "sms_stub",
    message: "Demo OTP is 123456. Production should use a local SMS aggregator per market."
  });
});

app.post("/api/auth/otp/verify", (req, res) => {
  const { phoneNumber, otp, displayName, city, role = "tenant" } = req.body;
  if (otp !== "123456") return res.status(401).json({ error: "Invalid demo OTP" });
  let user = users.find((item) => item.phoneNumber === phoneNumber);
  if (!user) {
    user = {
      id: nanoid(),
      phoneNumber,
      displayName: `Member ${phoneNumber.slice(-4)}`,
      role: ["tenant", "landlord", "agent", "agency", "property_manager", "admin"].includes(role) ? role : "tenant",
      city: "",
      verificationStatus: "pending",
      ratingAverage: 0,
      ratingCount: 0,
      rewardPoints: 0
    };
    users.push(user);
  }
  if (displayName) user.displayName = displayName;
  if (city) user.city = city;
  const token = jwt.sign({ sub: user.id, msisdn: user.phoneNumber }, jwtSecret, { expiresIn: "7d" });
  res.json({ token, user: publicUser(user) });
});

app.post("/api/telco/sso", (req, res) => {
  const { msisdn, telco = "unknown", externalSessionId } = req.body;
  if (!msisdn) return res.status(400).json({ error: "msisdn is required" });
  let user = users.find((item) => item.phoneNumber === msisdn);
  if (!user) {
    user = {
      id: nanoid(),
      phoneNumber: msisdn,
      displayName: `Member ${String(msisdn).slice(-4)}`,
      role: "tenant",
      city: "",
      verificationStatus: "pending",
      ratingAverage: 0,
      ratingCount: 0,
      rewardPoints: 0,
      responseTime: "New user"
    };
    users.push(user);
  }
  const token = jwt.sign({ sub: user.id, msisdn, telco }, jwtSecret, { expiresIn: "2h" });
  res.json({
    token,
    user: publicUser(user),
    telcoSession: { id: nanoid(), telco, externalSessionId, msisdn },
    note: "Stub for VodaPay, MTN MoMo, and Telkom mini-app SSO handoff."
  });
});

app.get("/api/locations", (req, res) => {
  const query = String(req.query.q || "").toLowerCase();
  res.json(africanLocations.filter((location) => location.toLowerCase().includes(query)).slice(0, 8));
});


const estimateQualification = ({ listing, monthlyIncome = 0, uploadedDocuments = 0 }) => {
  const requiredIncome = listing.priceAmount * 3;
  const incomeScore = monthlyIncome ? Math.min(Math.round((monthlyIncome / Math.max(requiredIncome, 1)) * 45), 45) : 25;
  const documentScore = Math.round((Math.min(uploadedDocuments, 4) / 4) * 35);
  const trustScore = listing.verified ? 10 : 0;
  const stockScore = listing.neatStock ? 10 : 0;
  const score = Math.min(100, incomeScore + documentScore + trustScore + stockScore);
  return {
    score,
    requiredIncome,
    label: score >= 80 ? "Strong application" : score >= 60 ? "Good start" : "More information needed",
    guidance: score >= 80
      ? "The tenant looks ready to apply, subject to landlord approval."
      : "Ask the tenant to complete income and document checks before final approval."
  };
};

app.get("/api/listings", (req, res) => {
  const { category, duration, city, verified, minPrice, maxPrice, q } = req.query;
  const filtered = listings.filter((listing) => {
    if (getListingReservation(listing.id)) return false;
    if (category && listing.category !== category) return false;
    if (duration && listing.duration !== duration) return false;
    if (city && listing.city.toLowerCase() !== String(city).toLowerCase()) return false;
    if (verified === "true" && !listing.verified) return false;
    if (minPrice && listing.priceAmount < Number(minPrice)) return false;
    if (maxPrice && listing.priceAmount > Number(maxPrice)) return false;
    if (q) {
      const haystack = `${listing.title} ${listing.city} ${listing.suburb}`.toLowerCase();
      if (!haystack.includes(String(q).toLowerCase())) return false;
    }
    return true;
  });
  res.json(filtered.map(listingWithOwner));
});

app.get("/api/listings/:id/qualification-estimate", (req, res) => {
  const listing = listings.find((item) => item.id === req.params.id);
  if (!listing) return res.status(404).json({ error: "Listing not found" });
  res.json(estimateQualification({
    listing,
    monthlyIncome: Number(req.query.monthlyIncome) || 0,
    uploadedDocuments: Number(req.query.uploadedDocuments) || 0
  }));
});

app.post("/api/reservations", (req, res) => {
  const { listingId, tenantId, holdHours = 48 } = req.body;
  const listing = listings.find((item) => item.id === listingId);
  if (!listing) return res.status(404).json({ error: "Listing not found" });
  const existingReservation = getListingReservation(listing.id);
  if (existingReservation) return res.status(409).json({ error: "This property already has an active reservation." });
  const now = new Date();
  const expiresAt = new Date(now.getTime() + Number(holdHours) * 60 * 60 * 1000).toISOString();
  const pricing = calculateBookingTotal(listing, 1, 1);
  const reservation = {
    id: nanoid(),
    listingId,
    tenantId,
    startsAt: listing.availableFrom ? `${listing.availableFrom}T10:00:00Z` : now.toISOString(),
    endsAt: expiresAt,
    status: "reserved",
    reservationStatus: "48_hour_hold",
    reservedAt: now.toISOString(),
    reservationExpiresAt: expiresAt,
    totalAmount: 0,
    depositAmount: pricing.depositAmount,
    amountDue: 0,
    leaseTermMonths: 0,
    serviceFee: 0,
    paymentStatus: "not_required_yet",
    paymentMethod: "vodapay",
    telcoChannel: "VodaPay",
    depositStatus: "not_required_yet",
    custodyStatus: "not_received",
    releaseStatus: "not_ready",
    inspectionStatus: "pending",
    leaseContractStatus: "not_generated",
    applicationPack: null,
    approvalStatus: "documents_pending"
  };
  bookings.unshift(reservation);
  res.status(201).json({ reservation, message: `This property is reserved for you until ${new Date(expiresAt).toLocaleString("en-ZA")}.` });
});

app.get("/api/listings/:id", async (req, res) => {
  const listing = listings.find((item) => item.id === req.params.id);
  if (!listing) return res.status(404).json({ error: "Listing not found" });
  const listingRatings = ratings.filter((rating) => rating.listingId === listing.id);
  const imageGallery = await fetchListingGallery(listing).catch(() => [{ medium: listing.imageUrl, large: listing.imageUrl }]);
  res.json({ ...listingWithOwner(listing), ratings: listingRatings, imageGallery, viewingAvailability: buildViewingAvailability(listing) });
});

app.get("/api/listings/:id/gallery", async (req, res) => {
  const listing = listings.find((item) => item.id === req.params.id);
  if (!listing) return res.status(404).json({ error: "Listing not found" });
  const imageGallery = await fetchListingGallery(listing).catch(() => [{ medium: listing.imageUrl, large: listing.imageUrl }]);
  res.json({ listingId: listing.id, count: imageGallery.length, imageGallery });
});

app.get("/api/listings/:id/viewing-availability", (req, res) => {
  const listing = listings.find((item) => item.id === req.params.id);
  if (!listing) return res.status(404).json({ error: "Listing not found" });
  res.json({ listingId: listing.id, days: buildViewingAvailability(listing) });
});

app.post("/api/bookings", async (req, res) => {
  const { listingId, tenantId, startsAt, endsAt, quantity = 1, depositMonths = 0, applicationPack } = req.body;
  const listing = listings.find((item) => item.id === listingId);
  if (!listing) return res.status(404).json({ error: "Listing not found" });
  if (!startsAt || !endsAt) return res.status(400).json({ error: "startsAt and endsAt are required" });
  const existingReservation = getListingReservation(listing.id);
  if (existingReservation) {
    if (existingReservation.tenantId !== tenantId) {
      return res.status(409).json({
        error: "This listing is already reserved.",
        reservation: {
          bookingId: existingReservation.id,
          status: existingReservation.status,
          paymentStatus: existingReservation.paymentStatus
        }
      });
    }
    const reservationIndex = bookings.findIndex((item) => item.id === existingReservation.id);
    if (reservationIndex !== -1) bookings.splice(reservationIndex, 1);
  }
  const isLongTermLease = ["mid", "long", "monthly"].includes(listing.duration);
  if (isLongTermLease) {
    const missingFields = missingApplicationPackFields(applicationPack);
    if (missingFields.length) {
      return res.status(400).json({
        error: "Applicant profile, affordability and viewing status are required before submitting a rental application.",
        missingFields
      });
    }
  }
  const pricing = calculateBookingTotal(listing, quantity, isLongTermLease ? depositMonths || 1 : 0);
  const isInstant = ["short", "hourly", "daily"].includes(listing.duration);
  const bookingId = nanoid();
  const booking = {
    id: bookingId,
    listingId,
    tenantId,
    startsAt,
    endsAt,
    status: isInstant ? "confirmed" : "awaiting_landlord_review",
    reservationStatus: isInstant ? "held_pending_payment" : "application_under_review",
    reservedAt: new Date().toISOString(),
    totalAmount: pricing.totalAmount,
    depositAmount: pricing.depositAmount,
    amountDue: pricing.amountDue,
    leaseTermMonths: Number(quantity),
    serviceFee: pricing.serviceFee,
    paymentStatus: "pending",
    paymentMethod: "vodapay",
    telcoChannel: "VodaPay",
    depositStatus: "pending_payment",
    custodyStatus: "not_received",
    custodyProvider: null,
    custodyReference: null,
    interestAccrued: 0,
    releaseStatus: "not_ready",
    inspectionStatus: "pending",
    leaseContractStatus: "not_generated",
    leaseContractGeneratedAt: null,
    leasePdfUrl: null,
    applicationPack: isLongTermLease ? applicationPack : null,
    approvalStatus: isLongTermLease ? "landlord_review_pending" : "not_required"
  };
  bookings.unshift(booking);
  const user = users.find((item) => item.id === tenantId);
  if (user) user.rewardPoints += Math.round(pricing.grandTotal / 100);
  if (!isInstant) {
    await sendBookingUpdate({
      booking,
      type: notificationEvents.APPLICATION_SUBMITTED,
      tenantTitle: "Your rental application was sent",
      tenantMessage: "We received your profile and affordability details, then sent the application to the landlord. We will let you know when the landlord replies.",
      landlordTitle: "New rental application to review",
      landlordMessage: `${user?.displayName || "A tenant"} applied for ${listing.title}. Please review the profile, affordability checks and next action.`,
      actionLabel: "View application",
      priority: "high"
    });
    return res.status(201).json({
      booking,
      pricing,
      next: "awaiting_landlord_review",
      message: "Application submitted. Your profile and affordability details were received and the landlord can now review your application."
    });
  }
  const payload = buildVodaPayPayload({ booking, listing, tenant: user || { id: booking.tenantId || "local-guest-tenant", displayName: "Tenant", phoneNumber: "" } });
  let gatewayResponse;
  try {
    gatewayResponse = await callVodaPayInitiate(payload);
  } catch (error) {
    const bookingIndex = bookings.findIndex((item) => item.id === booking.id);
    if (bookingIndex !== -1) bookings.splice(bookingIndex, 1);
    return res.status(error.status === 500 ? 500 : 502).json({
      ...vodapayErrorResponse(error),
      payload
    });
  }
  const vodapay = {
    mode: "uat",
    paymentUrl: getVodaPayPaymentUrl(gatewayResponse),
    providerReference: getVodaPayProviderReference(gatewayResponse),
    payload,
    gatewayResponse
  };
  res.status(201).json({ booking, pricing, vodapay, next: "reserved_pending_vodapay_payment" });
});

app.post("/api/viewings", async (req, res) => {
  const { listingId, tenantId, requestedAt, note = "" } = req.body;
  const listing = listings.find((item) => item.id === listingId);
  if (!listing) return res.status(404).json({ error: "Listing not found" });
  if (!requestedAt) return res.status(400).json({ error: "requestedAt is required" });

  const viewing = {
    id: nanoid(),
    listingId,
    tenantId,
    requestedAt,
    status: "requested",
    note
  };
  const tenant = users.find((item) => item.id === tenantId);
  const landlord = users.find((item) => item.id === (primaryAssignmentForListing(listing.id)?.assignedUserId || listing.ownerId));
  await sendUserUpdate({
    user: tenant,
    role: "tenant",
    type: notificationEvents.VIEWING_REQUESTED,
    title: "Viewing request sent",
    message: `Your viewing request for ${listing.title} was sent. We will notify you when the landlord confirms the time.`,
    listing,
    actionLabel: "Open dashboard",
    actionRoute: "/dashboard"
  });
  await sendUserUpdate({
    user: landlord,
    role: landlord?.role || "landlord",
    type: notificationEvents.VIEWING_REQUESTED,
    title: "A tenant requested a viewing",
    message: `${tenant?.displayName || "A tenant"} requested a viewing for ${listing.title}. Confirm the time or suggest another slot.`,
    listing,
    actionLabel: "Open landlord workspace",
    actionRoute: landlord?.role === "agent" ? "/property-workspace" : "/landlords"
  });
  res.status(201).json({
    viewing,
    message: `Viewing requested for ${listing.title}. The landlord confirmation is pending.`
  });
});

app.post("/api/payments/vodapay/initiate", async (req, res) => {
  const { bookingId, callbackUrl } = req.body;
  const booking = bookings.find((item) => item.id === bookingId);
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  const listing = listings.find((item) => item.id === booking.listingId);
  const tenant = users.find((item) => item.id === booking.tenantId);
  const payload = buildVodaPayPayload({ booking, listing, tenant, callbackUrl });

  try {
    const data = await callVodaPayInitiate(payload);
    res.json({
      mode: "uat",
      paymentUrl: getVodaPayPaymentUrl(data),
      providerReference: getVodaPayProviderReference(data),
      payload,
      gatewayResponse: data
    });
  } catch (error) {
    res.status(error.status === 500 ? 500 : 502).json({ ...vodapayErrorResponse(error), payload });
  }
});

app.post("/api/bookings/:id/vodapay-wallet/mock-fund", async (req, res) => {
  const booking = bookings.find((item) => item.id === req.params.id);
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  if (!["approved", "awaiting_payment", "deposit_received"].includes(booking.status)) {
    return res.status(409).json({ error: "VodaPay wallet funding is available after landlord approval." });
  }
  const listing = listings.find((item) => item.id === booking.listingId);
  const tenant = users.find((item) => item.id === booking.tenantId);
  const walletAmount = booking.amountDue || (booking.depositAmount || 0) + (booking.serviceFee || 0);
  const now = new Date().toISOString();
  booking.status = "deposit_secured";
  booking.paymentStatus = "paid";
  booking.paymentMethod = "vodapay_wallet_mock";
  booking.telcoChannel = "VodaPay Wallet";
  booking.paymentConfirmedAt = now;
  booking.depositStatus = "in_custody";
  booking.custodyStatus = "reconciled";
  booking.custodyProvider = "mock_vodapay_wallet";
  booking.custodyReference = booking.custodyReference || `VPW-${booking.id.slice(0, 8).toUpperCase()}`;
  booking.custodyReceivedAt = now;
  booking.leaseContractStatus = "generated";
  booking.leaseContractGeneratedAt = now;
  booking.leasePdfUrl = booking.leasePdfUrl || `/api/bookings/${booking.id}/lease.pdf`;
  booking.wallet = {
    provider: "VodaPay",
    mode: "mock",
    status: "funded_and_paid",
    fundedAmount: walletAmount,
    availableBalance: 0,
    reference: booking.custodyReference,
    fundedAt: now
  };

  await sendBookingUpdate({
    booking,
    type: notificationEvents.PAYMENT_CONFIRMED,
    tenantTitle: "VodaPay wallet funded",
    tenantMessage: `Mock VodaPay wallet funding of R${walletAmount.toLocaleString("en-ZA")} was completed for ${listing?.title || "your rental"}.`,
    landlordTitle: "VodaPay wallet payment received",
    landlordMessage: `${tenant?.displayName || "The tenant"} completed the mock VodaPay wallet payment for ${listing?.title || "this rental"}.`,
    actionLabel: "Open lease pack",
    tenantRoute: "/lease-documents",
    priority: "high"
  });

  res.json({
    booking,
    wallet: booking.wallet,
    message: `Mock VodaPay wallet funded with R${walletAmount.toLocaleString("en-ZA")} and paid into deposit custody.`
  });
});

app.post("/api/bookings/:id/custody/reconcile", (req, res) => {
  const booking = bookings.find((item) => item.id === req.params.id);
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  if (!["received_pending_custody", "in_custody"].includes(booking.depositStatus)) {
    return res.status(409).json({ error: "Deposit must be paid before custody reconciliation" });
  }

  booking.depositStatus = "in_custody";
  booking.custodyStatus = "reconciled";
  booking.custodyProvider = req.body.custodyProvider || "interest_bearing_trust_account";
  booking.custodyReference = req.body.custodyReference || `CUST-${booking.id.slice(0, 8).toUpperCase()}`;
  booking.custodyReceivedAt = new Date().toISOString();
  booking.status = "deposit_secured";
  booking.releaseStatus = "held_in_custody";

  res.json({
    booking,
    message: "Deposit reconciled into compliant custody. Lease is now deposit_secured."
  });
});

app.post("/api/bookings/:id/custody/release", (req, res) => {
  const booking = bookings.find((item) => item.id === req.params.id);
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  if (booking.depositStatus !== "in_custody") {
    return res.status(409).json({ error: "Deposit must be in custody before release, refund, or hold" });
  }

  const action = req.body.action || "refund_to_tenant";
  const damageDeductions = Math.max(Number(req.body.damageDeductions) || 0, 0);
  const interestAccrued = Math.max(Number(req.body.interestAccrued ?? estimateInterest(booking)) || 0, 0);
  const refundableAmount = Math.max((booking.depositAmount || 0) + interestAccrued - damageDeductions, 0);

  booking.interestAccrued = interestAccrued;
  booking.damageDeductions = damageDeductions;
  booking.releaseAuthorisedBy = req.body.releaseAuthorisedBy || "platform_ops";
  booking.releaseRequestedAt = new Date().toISOString();
  booking.inspectionStatus = req.body.inspectionStatus || "completed";

  if (action === "dispute_hold") {
    booking.depositStatus = "disputed";
    booking.custodyStatus = "held_for_dispute";
    booking.releaseStatus = "dispute_hold";
    booking.status = "disputed";
  } else if (action === "release_to_landlord") {
    booking.depositStatus = "released_to_landlord";
    booking.custodyStatus = "released";
    booking.releaseStatus = "released_to_landlord";
    booking.releasedToLandlordAmount = Math.min((booking.depositAmount || 0) + interestAccrued, damageDeductions || booking.depositAmount || 0);
    booking.refundableAmount = Math.max(refundableAmount, 0);
    booking.status = "completed";
  } else {
    booking.depositStatus = "refunded_to_tenant";
    booking.custodyStatus = "released";
    booking.releaseStatus = "refunded_to_tenant";
    booking.refundableAmount = refundableAmount;
    booking.status = "completed";
  }

  res.json({
    booking,
    message: `Custody action completed: ${booking.releaseStatus}.`
  });
});

app.get("/api/users/:id/dashboard", (req, res) => {
  const user = users.find((item) => item.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  const userBookings = bookings
    .filter((booking) => booking.tenantId === user.id)
    .map((booking) => ({ ...booking, listing: listingWithOwner(listings.find((item) => item.id === booking.listingId)) }));
  res.json({
    user: publicUser(user),
    bookings: userBookings,
    rewards: {
      points: user.rewardPoints,
      history: rewardEvents.filter((event) => event.userId === user.id),
      vouchers
    }
  });
});


const buildPropertyWorkspaceDashboard = (manager) => {
  const managedListings = listings.filter((listing) => managerCanAccessListing(manager, listing)).map(listingWithOwner);
  const listingIds = new Set(managedListings.map((listing) => listing.id));
  const applications = bookings
    .filter((booking) => listingIds.has(booking.listingId))
    .map((booking) => {
      const tenant = users.find((user) => user.id === booking.tenantId) || null;
      const listing = listingWithOwner(listings.find((item) => item.id === booking.listingId));
      const applicationComplete = !missingApplicationPackFields(booking.applicationPack || {}).length;
      return {
        ...booking,
        tenant: publicUser(tenant),
        listing,
        contact: listing.assignedContact,
        documentsComplete: applicationComplete,
        affordabilityScore: listing.priceAmount <= 9000 ? 92 : 68,
        riskLevel: applicationComplete && tenant.verificationStatus === "verified" ? "low" : "medium",
        nextAction: applicationComplete ? "Review and approve, request info, or decline" : "Request applicant affordability details"
      };
    });
  const activeAssignments = managedListings.flatMap((listing) => (listing.assignments || []).map((assignment) => ({ ...assignment, listingTitle: listing.title })));
  return {
    manager: publicUser(manager),
    landlord: publicUser(manager),
    listings: managedListings,
    assignments: activeAssignments,
    applications,
    metrics: {
      totalListings: managedListings.length,
      totalApplications: applications.length,
      assignedContacts: new Set(activeAssignments.map((assignment) => assignment.assignedUserId)).size,
      documentCompleteRate: applications.length ? Math.round((applications.filter((app) => app.documentsComplete).length / applications.length) * 100) : 0,
      averageResponseTime: manager.responseTime || "4h"
    }
  };
};

app.get("/api/property-workspace/:id/dashboard", (req, res) => {
  const manager = users.find((user) => user.id === req.params.id);
  if (!manager) return res.status(404).json({ error: "Property manager not found" });
  res.json(buildPropertyWorkspaceDashboard(manager));
});

app.get("/api/landlords/:id/dashboard", (req, res) => {
  const manager = users.find((user) => user.id === req.params.id);
  if (!manager) return res.status(404).json({ error: "Landlord not found" });
  res.json(buildPropertyWorkspaceDashboard(manager));
});

app.post("/api/properties", (req, res) => {
  const owner = users.find((user) => user.id === req.body.ownerId) || users.find((user) => user.role === "landlord") || {
    id: req.body.ownerId || nanoid(),
    phoneNumber: req.body.ownerPhone || "",
    displayName: req.body.ownerName || "Registered landlord",
    emailAddress: req.body.ownerEmail || "",
    role: "landlord",
    city: req.body.city || "Johannesburg",
    verificationStatus: "pending",
    ratingAverage: 0,
    ratingCount: 0,
    rewardPoints: 0,
    responseTime: "New user"
  };
  if (!users.find((user) => user.id === owner.id)) users.push(owner);
  if (!owner) return res.status(400).json({ error: "A registered landlord, agent or property manager is required." });
  const assignedName = String(req.body.assignedAgentName || "").trim();
  const assignedPhone = String(req.body.assignedAgentPhone || "").trim();
  let assignedUser = owner;
  if (req.body.managedByType && req.body.managedByType !== "landlord") {
    assignedUser = users.find((user) => assignedPhone && user.phoneNumber === assignedPhone) || {
      id: nanoid(),
      phoneNumber: assignedPhone || `+2700${Date.now().toString().slice(-7)}`,
      displayName: assignedName || "Assigned property contact",
      emailAddress: "",
      role: req.body.managedByType === "property_manager" ? "property_manager" : "agent",
      city: req.body.city || owner.city,
      verificationStatus: "pending",
      ratingAverage: 0,
      ratingCount: 0,
      rewardPoints: 0,
      responseTime: "pending"
    };
    if (!users.find((user) => user.id === assignedUser.id)) users.push(assignedUser);
  }
  const listing = {
    id: `property-${nanoid(8)}`,
    ownerId: owner.id,
    managedByType: req.body.managedByType || "landlord",
    title: req.body.title,
    description: req.body.description || "New verified rental listing awaiting checks before publication.",
    category: req.body.category || "residential",
    duration: req.body.duration || "monthly",
    city: req.body.city || owner.city || "Johannesburg",
    suburb: req.body.suburb || "",
    address: req.body.address || "",
    priceAmount: Number(req.body.priceAmount || 0),
    priceUnit: "month",
    bedrooms: Number(req.body.bedrooms || 0),
    capacity: Number(req.body.bedrooms || 1) * 2,
    verified: false,
    neatStock: false,
    ratingAverage: 0,
    reviewCount: 0,
    imageUrl: "",
    amenities: ["new listing", "awaiting verification"],
    availableFrom: new Date().toISOString().slice(0, 10),
    availableTo: "2027-12-31"
  };
  listings.unshift(listing);
  if (assignedUser.id !== owner.id) {
    ["listing_agent", "viewing_agent", "lease_manager"].forEach((role) => propertyAssignments.push({ propertyId: listing.id, assignedUserId: assignedUser.id, role, note: "Assigned during property registration." }));
  }
  res.status(201).json({ listing: listingWithOwner(listing), workspace: buildPropertyWorkspaceDashboard(owner) });
});

app.post("/api/landlord/applications/:id/:action", async (req, res) => {
  const booking = bookings.find((item) => item.id === req.params.id);
  if (!booking) return res.status(404).json({ error: "Application not found" });
  const action = req.params.action;
  if (!["approve", "request-info", "decline"].includes(action)) return res.status(400).json({ error: "Unsupported landlord action" });
  let tenantTitle = "Your application was updated";
  let tenantMessage = "There is an update on your rental application.";
  let eventType = notificationEvents.APPLICATION_INFO_REQUESTED;
  let tenantRoute = "/dashboard";
  if (action === "approve") {
    booking.status = "approved";
    booking.approvalStatus = "approved";
    booking.landlordActionNote = "Approved. Tenant can now complete lease/payment steps.";
    tenantTitle = "Your rental application was approved";
    tenantMessage = "Good news — the landlord approved your application. You can now review the lease documents and continue with payment when ready.";
    eventType = notificationEvents.APPLICATION_APPROVED;
    tenantRoute = "/lease-documents";
  } else if (action === "request-info") {
    booking.status = "landlord_requested_info";
    booking.approvalStatus = "more_info_requested";
    booking.landlordActionNote = "More information requested from tenant.";
    tenantTitle = "The landlord needs more information";
    tenantMessage = "The landlord asked for more information before making a decision. Open your dashboard to see what is needed next.";
    eventType = notificationEvents.APPLICATION_INFO_REQUESTED;
  } else {
    booking.status = "declined";
    booking.approvalStatus = "declined";
    booking.landlordActionNote = "Application declined by landlord.";
    tenantTitle = "This rental was not approved";
    tenantMessage = "The landlord did not approve this application. You can keep searching and apply for another verified rental from your dashboard.";
    eventType = notificationEvents.APPLICATION_DECLINED;
    tenantRoute = "/discover";
  }
  await sendBookingUpdate({
    booking,
    type: eventType,
    tenantTitle,
    tenantMessage,
    actionLabel: action === "decline" ? "Find another rental" : "Open update",
    tenantRoute,
    priority: action === "approve" ? "high" : "normal"
  });
  res.json({
    application: {
      id: booking.id,
      status: booking.status,
      approvalStatus: booking.approvalStatus,
      landlordActionNote: booking.landlordActionNote
    }
  });
});

app.get("/api/admin/dashboard", (_req, res) => {
  const neatStockCount = listings.filter((listing) => listing.neatStock).length;
  const paymentExceptions = bookings.filter((booking) => ["failed", "pending"].includes(booking.paymentStatus)).length;
  res.json({
    metrics: {
      verificationQueue: listings.filter((listing) => !listing.verified).length + bookings.filter((booking) => booking.approvalStatus === "documents_received").length,
      paymentExceptions,
      openDisputes: 0,
      neatStockCount
    },
    queues: [
      {
        title: "Listing verification",
        count: listings.filter((listing) => !listing.verified).length,
        description: "Confirm landlord mandate, property documents, photos and Neat Stock quality checks before publishing."
      },
      {
        title: "Tenant approval packs",
        count: bookings.filter((booking) => booking.approvalStatus === "documents_received").length,
        description: "Review uploaded identity, proof of residence, bank statement and references before landlord approval."
      },
      {
        title: "Payment and custody",
        count: paymentExceptions,
        description: "Monitor VodaPay wallet callbacks, failed deposits, reconciliation and deposit custody state."
      }
    ]
  });
});


const moveInChecklistDefaults = (booking) => [
  {
    id: "keys",
    completed: Boolean(booking.keysReleasedAt),
    completedAt: booking.keysReleasedAt || null
  },
  {
    id: "inspection",
    completed: booking.inspectionStatus === "completed",
    completedAt: booking.inspectionCompletedAt || null
  },
  {
    id: "custody",
    completed: ["reconciled", "held", "released"].includes(booking.custodyStatus),
    completedAt: booking.custodyReceivedAt || null
  },
  {
    id: "firstPayment",
    completed: booking.paymentStatus === "paid",
    completedAt: booking.paymentConfirmedAt || booking.custodyReceivedAt || null
  }
];

app.get("/api/bookings/:id/move-in-checklist", (req, res) => {
  const booking = bookings.find((item) => item.id === req.params.id);
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  const items = booking.moveInChecklist || moveInChecklistDefaults(booking);
  booking.moveInChecklist = items;
  res.json({ bookingId: booking.id, items });
});

app.post("/api/bookings/:id/move-in-checklist/:itemId", async (req, res) => {
  const booking = bookings.find((item) => item.id === req.params.id);
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  const validIds = new Set(["keys", "inspection", "custody", "firstPayment"]);
  if (!validIds.has(req.params.itemId)) return res.status(400).json({ error: "Unknown checklist item" });
  const items = booking.moveInChecklist || moveInChecklistDefaults(booking);
  const item = items.find((entry) => entry.id === req.params.itemId);
  item.completed = Boolean(req.body.completed);
  item.completedAt = item.completed ? new Date().toISOString() : null;
  booking.moveInChecklist = items;
  if (req.params.itemId === "keys") booking.keysReleasedAt = item.completedAt;
  if (req.params.itemId === "inspection") {
    booking.inspectionStatus = item.completed ? "completed" : "pending";
    booking.inspectionCompletedAt = item.completedAt;
  }
  await sendBookingUpdate({
    booking,
    type: notificationEvents.MOVE_IN_UPDATED,
    tenantTitle: "Your move-in checklist was updated",
    tenantMessage: `Your ${req.params.itemId.replaceAll("_", " ")} step was marked ${item.completed ? "complete" : "not complete"}.`,
    actionLabel: "View checklist",
    tenantRoute: "/move-in-checklist"
  });
  res.json({
    bookingId: booking.id,
    items,
    message: `${req.params.itemId} marked ${item.completed ? "complete" : "incomplete"}.`
  });
});

app.post("/api/bookings/:id/messages", async (req, res) => {
  const booking = bookings.find((item) => item.id === req.params.id);
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  const allowedActions = new Set(["request_info", "ask_for_change", "confirm_viewing", "send_document"]);
  const action = req.body.action;
  if (!allowedActions.has(action)) return res.status(400).json({ error: "Unsupported structured message action" });
  if (!req.body.message || !String(req.body.message).trim()) return res.status(400).json({ error: "Message body is required" });
  const message = {
    id: nanoid(),
    bookingId: booking.id,
    listingId: booking.listingId,
    fromUserId: req.body.tenantId || booking.tenantId,
    toUserId: listings.find((item) => item.id === booking.listingId)?.ownerId,
    action,
    body: String(req.body.message).trim(),
    status: "sent",
    createdAt: new Date().toISOString()
  };
  booking.messages = [message, ...(booking.messages || [])];
  const listing = listings.find((item) => item.id === booking.listingId);
  const tenant = users.find((item) => item.id === booking.tenantId);
  const landlord = users.find((item) => item.id === (primaryAssignmentForListing(listing?.id)?.assignedUserId || listing?.ownerId));
  await sendUserUpdate({
    user: landlord,
    role: landlord?.role || "landlord",
    type: notificationEvents.MESSAGE_SENT,
    title: "Tenant sent you a message",
    message: `${tenant?.displayName || "A tenant"} sent a ${action.replaceAll("_", " ")} message for ${listing?.title || "a rental"}.`,
    booking,
    listing,
    actionLabel: "Open landlord workspace",
    actionRoute: landlord?.role === "agent" ? "/property-workspace" : "/landlords",
    priority: "normal"
  });
  await sendUserUpdate({
    user: tenant,
    role: "tenant",
    type: notificationEvents.MESSAGE_SENT,
    title: "Message sent to landlord",
    message: "Your message was sent. We will show you the landlord's response when it arrives.",
    booking,
    listing,
    actionLabel: "Open dashboard",
    actionRoute: "/dashboard"
  });
  res.status(201).json({
    message,
    nextAction: action === "confirm_viewing" ? "Landlord should confirm access instructions." : "Landlord response is now pending."
  });
});

app.post("/api/ratings", (req, res) => {
  const { listingId, score, comment, relationship = "lessee_rates_lessor" } = req.body;
  if (!listingId || !score) return res.status(400).json({ error: "listingId and score are required" });
  const rating = { id: nanoid(), listingId, score: Number(score), comment, relationship, createdAt: new Date().toISOString() };
  ratings.unshift(rating);
  res.status(201).json(rating);
});

app.post("/api/disputes", (req, res) => {
  const dispute = { id: nanoid(), status: "open", createdAt: new Date().toISOString(), ...req.body };
  res.status(201).json({
    dispute,
    note: "Dispute intake stub. Production should route to platform ops and telco support where wallet payments are involved."
  });
});

app.get("/api/bookings/:id/audit", (req, res) => {
  const booking = bookings.find((item) => item.id === req.params.id);
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  const listing = listings.find((item) => item.id === booking.listingId);
  const currentMonthlyRate = normaliseMonthly(listing);
  const comparables = listings.filter((item) => {
    return !getListingReservation(item.id) && item.id !== listing.id && item.category === listing.category && item.city === listing.city && item.verified;
  });
  const comparableAverageRate = Math.round(
    comparables.reduce((sum, item) => sum + normaliseMonthly(item), 0) / Math.max(comparables.length, 1)
  );
  const estimatedSavings = Math.max(currentMonthlyRate - comparableAverageRate, 0);
  res.json({
    bookingId: booking.id,
    listing: listingWithOwner(listing),
    currentMonthlyRate,
    comparableAverageRate,
    estimatedSavings,
    recommendation:
      estimatedSavings > 0
        ? `Similar verified units in ${listing.suburb} and ${listing.city} average R${estimatedSavings.toLocaleString("en-ZA")} less per month.`
        : "Your lease is priced in line with comparable verified stock.",
    upgrades: comparables.slice(0, 2).map(listingWithOwner)
  });
});

app.post("/api/bookings/:id/renegotiation", async (req, res) => {
  const booking = bookings.find((item) => item.id === req.params.id);
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  await sendBookingUpdate({
    booking,
    type: notificationEvents.RENT_REVIEW_REQUESTED,
    tenantTitle: "Rent review request sent",
    tenantMessage: "Your rent review request was sent to the landlord. We will notify you when there is a response.",
    landlordTitle: "Tenant requested a rent review",
    landlordMessage: "A tenant requested a rent review based on platform comparables. Please review the request and respond.",
    actionLabel: "Open rent review",
    tenantRoute: "/lease-audit",
    landlordRoute: "/landlords"
  });
  res.status(201).json({
    messageId: nanoid(),
    bookingId: booking.id,
    status: "sent",
    body: req.body.message || "Tenant requested a rent review based on platform comparables."
  });
});

app.post("/api/telco/payment-webhook", (req, res) => {
  res.json({
    received: true,
    providerReference: req.body.providerReference || nanoid(),
    status: req.body.status || "authorised",
    note: "Stub endpoint for wallet debit/credit callbacks from VodaPay, MTN MoMo, and Telkom."
  });
});

const vodapayWebhookHandler = async (req, res) => {
  const booking = findBookingFromPaymentPayload(req.body);
  const rawStatus = String(
    req.body.status ||
    req.body.Status ||
    req.body.responseCode ||
    req.body.ResponseCode ||
    req.body.ErrorCode ||
    ""
  ).toLowerCase();
  const paymentConfirmed = successfulPaymentStatuses.has(rawStatus) || req.body.paid === true || req.body.WasSuccessful === true;
  const paymentFailed = booking && !paymentConfirmed && ["failed", "cancelled", "canceled", "declined", "error", "01", "05"].includes(rawStatus);
  const updatedBooking = booking && paymentConfirmed
    ? confirmDepositPayment(booking, req.body)
    : paymentFailed
      ? releaseBookingReservation(booking, req.body)
      : booking;

  if (updatedBooking && paymentConfirmed) {
    await sendBookingUpdate({
      booking: updatedBooking,
      type: notificationEvents.PAYMENT_CONFIRMED,
      tenantTitle: "Payment received",
      tenantMessage: "Your VodaPay payment was received. Your lease documents are now being prepared.",
      landlordTitle: "Tenant payment received",
      landlordMessage: "VodaPay confirmed payment for this rental. The lease documents can now be completed.",
      actionLabel: "View lease documents",
      tenantRoute: "/lease-documents",
      landlordRoute: "/landlords",
      priority: "high"
    });
    await sendBookingUpdate({
      booking: updatedBooking,
      type: notificationEvents.LEASE_READY,
      tenantTitle: "Your lease documents are ready",
      tenantMessage: "Your lease documents are ready to review inside Listing.properties.",
      actionLabel: "View lease documents",
      tenantRoute: "/lease-documents",
      priority: "high"
    });
  }

  res.json({
    received: true,
    provider: "VodaPay",
    providerReference: req.body.providerReference || req.body.traceId || nanoid(),
    status: req.body.status || req.body.ErrorCode || "received",
    echoData: req.body.echoData,
    booking: updatedBooking,
    contract: updatedBooking?.leaseContractStatus === "generated"
      ? { status: "generated", leasePdfUrl: updatedBooking.leasePdfUrl }
      : null,
    note: paymentConfirmed
      ? "VodaPay payment confirmed. Listing remains reserved and the leasing contract has been generated."
      : paymentFailed
        ? "VodaPay payment failed. Listing reservation has been released."
        : "VodaPay notification received. Payment status is not final yet."
  });
};

app.post("/api/payments/webhook/vodapay", vodapayWebhookHandler);
app.post("/payments/webhook/vodapay", vodapayWebhookHandler);

app.get("/api/bookings/:id/lease.pdf", (req, res) => {
  const booking = bookings.find((item) => item.id === req.params.id);
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  if (booking.leaseContractStatus !== "generated" || !booking.leasePdfUrl) {
    return res.status(409).json({ error: "Lease contract is created only after VodaPay confirms payment." });
  }
  const listing = listings.find((item) => item.id === booking.listingId);
  const tenant = users.find((item) => item.id === booking.tenantId);
  const landlord = users.find((item) => item.id === (primaryAssignmentForListing(listing.id)?.assignedUserId || listing.ownerId));

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename="lease-${booking.id}.pdf"`);

  const doc = new PDFDocument({ margin: 48 });
  doc.pipe(res);
  doc.fontSize(22).fillColor("#123d2f").text("Listing.properties Digital Lease");
  doc.moveDown();
  doc.fontSize(11).fillColor("#15231d").text("Africa's property marketplace. Verified. Instant. Yours.");
  doc.moveDown();
  doc.fontSize(13).text(`Booking ID: ${booking.id}`);
  doc.text(`Property: ${listing.title}`);
  doc.text(`Address: ${listing.address}, ${listing.suburb}, ${listing.city}`);
  doc.text(`Tenant: ${tenant.displayName} (${tenant.phoneNumber})`);
  doc.text(`Landlord / host: ${landlord.displayName}`);
  doc.text(`Term: ${new Date(booking.startsAt).toLocaleDateString("en-ZA")} to ${new Date(booking.endsAt).toLocaleDateString("en-ZA")}`);
  doc.text(`Lease term: ${booking.leaseTermMonths || "N/A"} months`);
  doc.text(`Monthly rent: R${listing.priceAmount.toLocaleString("en-ZA")}`);
  doc.text(`Deposit: R${(booking.depositAmount || 0).toLocaleString("en-ZA")}`);
  doc.text(`Processing fee: R${booking.serviceFee.toLocaleString("en-ZA")}`);
  doc.text(`Paid now by client: R${(booking.amountDue || (booking.depositAmount || 0) + booking.serviceFee).toLocaleString("en-ZA")}`);
  doc.text(`Payment method: VodaPay`);
  doc.text(`Deposit status: ${booking.depositStatus || "pending_payment"}`);
  doc.text(`Custody provider: ${booking.custodyProvider || "pending reconciliation"}`);
  doc.text(`Custody reference: ${booking.custodyReference || "pending"}`);
  doc.text(`Interest accrued: R${(booking.interestAccrued || 0).toLocaleString("en-ZA")}`);
  doc.moveDown();
  doc.text("Trust terms", { underline: true });
  doc.text("1. The listing, owner, and tenant verification records are captured by Listing.properties.");
  doc.text("2. Pricing is transparent before confirmation and wallet payment callbacks are reconciled by provider reference.");
  doc.text("3. Disputes may be flagged in-app and attached to the booking record.");
  doc.text("4. This prototype document is generated server-side and should be replaced with jurisdiction-specific templates before production use.");
  doc.end();
});

app.listen(port, () => {
  console.log(`Listing.properties API listening on http://localhost:${port}`);
});
