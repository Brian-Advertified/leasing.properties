import { fallbackAdminDashboard, fallbackLandlordDashboard } from "../../data/fallbackDashboards";

const localApplicationActions = new Map();
const localNotifications = [];

const demoUserId = "11111111-1111-1111-1111-111111111111";
const demoLandlordId = "44444444-4444-4444-4444-444444444444";

const addLocalNotification = ({ userId = demoUserId, role = "tenant", type = "local_update", title, message, actionLabel = "Open update", actionRoute = "/dashboard" }) => {
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
    addLocalNotification({ userId: demoUserId, role: "tenant", type: `application_${action}`, title: copy[0], message: copy[1], actionLabel: action === "decline" ? "Find another rental" : "Open update", actionRoute: action === "decline" ? "/discover" : "/dashboard" });
    addLocalNotification({ userId: demoLandlordId, role: "landlord", type: `application_${action}`, title: copy[0], message: copy[1], actionLabel: "Open landlord workspace", actionRoute: "/landlords" });
    return { application };
  }

  return null;
};

export const api = async (path, options) => {
  const localFirst = localResponseFor(path, options);
  if (localFirst && (path.includes("/notifications") || path.includes("fallback") || path.includes("/admin/dashboard") || path.includes("/landlords/") || path.includes("/property-workspace/"))) {
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
