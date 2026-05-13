import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Header, Footer } from "./components/layout/Header";
import { AuthModal } from "./components/layout/AuthModal";
import { LandingPage } from "./components/layout/LandingPage";
import { AppFrame } from "./components/layout/AppFrame";
import { Discovery } from "./components/listings/Discovery";
import { ListingDetail } from "./components/listings/ListingDetail";
import { TenantDashboard } from "./components/tenant/TenantDashboard";
import { LeasePackPage } from "./components/tenant/LeasePackPage";
import { MessageLandlordPage } from "./components/tenant/MessageLandlordPage";
import { MoveInChecklistPage } from "./components/tenant/MoveInChecklistPage";
import { LandlordDashboard } from "./components/landlord/LandlordDashboard";
import { AdminOpsDashboard } from "./components/admin/AdminOpsDashboard";
import { NewPropertyPage } from "./components/property/NewPropertyPage";
import { LeaseAudit } from "./components/lease/LeaseAudit";
import { defaultUserId } from "./app/config/env";
import { SCREEN_ADMIN, SCREEN_AUDIT, SCREEN_DASHBOARD, SCREEN_DETAIL, SCREEN_DISCOVER, SCREEN_LANDING, SCREEN_LANDLORD, SCREEN_LEASE_PACK, SCREEN_MESSAGE_LANDLORD, SCREEN_MOVE_IN, SCREEN_NEW_PROPERTY } from "./app/constants/screens";
import { getFiltersForIntent } from "./features/discovery/rentalIntents";
import { clearStoredAuth, getStoredAuth, storeAuth } from "./features/auth/authSession";
import { availableInventoryOnly, isReservedListing } from "./features/listings/inventoryPolicy";
import { api } from "./lib/api/client";
import { fallbackAdminDashboard, fallbackLandlordDashboard } from "./data/fallbackDashboards";
import "./styles.css";

const routeToScreen = (pathname) => {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path === "/dashboard") return SCREEN_DASHBOARD;
  if (path === "/discover") return SCREEN_DISCOVER;
  if (path === "/landlords" || path === "/agent" || path === "/property-workspace") return SCREEN_LANDLORD;
  if (path === "/properties/new") return SCREEN_NEW_PROPERTY;
  if (path === "/ops") return SCREEN_ADMIN;
  if (path === "/lease-audit") return SCREEN_AUDIT;
  if (path === "/lease-documents") return SCREEN_LEASE_PACK;
  if (path === "/message-landlord") return SCREEN_MESSAGE_LANDLORD;
  if (path === "/move-in-checklist") return SCREEN_MOVE_IN;
  return SCREEN_LANDING;
};

const screenToRoute = {
  [SCREEN_LANDING]: "/",
  [SCREEN_DISCOVER]: "/discover",
  [SCREEN_DASHBOARD]: "/dashboard",
  [SCREEN_LANDLORD]: "/property-workspace",
  [SCREEN_NEW_PROPERTY]: "/properties/new",
  [SCREEN_ADMIN]: "/ops",
  [SCREEN_AUDIT]: "/lease-audit",
  [SCREEN_LEASE_PACK]: "/lease-documents",
  [SCREEN_MESSAGE_LANDLORD]: "/message-landlord",
  [SCREEN_MOVE_IN]: "/move-in-checklist"
};

const normalizeRole = (role) => {
  if (["landlord", "host", "agent", "agency", "property_manager"].includes(role)) return "landlord";
  if (["admin", "ops", "operator"].includes(role)) return "admin";
  return "tenant";
};

const homeScreenForRole = (role) => {
  const normalized = normalizeRole(role);
  if (normalized === "landlord") return SCREEN_LANDLORD;
  if (normalized === "admin") return SCREEN_ADMIN;
  return SCREEN_DASHBOARD;
};

const allowedScreensByRole = {
  tenant: new Set([SCREEN_LANDING, SCREEN_DISCOVER, SCREEN_DETAIL, SCREEN_DASHBOARD, SCREEN_AUDIT, SCREEN_LEASE_PACK, SCREEN_MESSAGE_LANDLORD, SCREEN_MOVE_IN]),
  landlord: new Set([SCREEN_LANDING, SCREEN_LANDLORD, SCREEN_NEW_PROPERTY]),
  admin: new Set([SCREEN_LANDING, SCREEN_ADMIN])
};

const isScreenAllowedForRole = (nextScreen, role, hasUser) => {
  if (!hasUser) return [SCREEN_LANDING, SCREEN_DISCOVER, SCREEN_DETAIL].includes(nextScreen);
  return allowedScreensByRole[normalizeRole(role)]?.has(nextScreen) ?? false;
};

const safeBookingForStorage = (booking) => {
  if (!booking) return null;
  try {
    return JSON.parse(JSON.stringify(booking));
  } catch {
    return null;
  }
};

const storeActiveBooking = (booking) => {
  const safeBooking = safeBookingForStorage(booking);
  if (safeBooking) window.sessionStorage.setItem("listing.properties:activeBooking", JSON.stringify(safeBooking));
};

const getStoredActiveBooking = () => {
  try {
    return JSON.parse(window.sessionStorage.getItem("listing.properties:activeBooking") || "null");
  } catch {
    return null;
  }
};

const captureGatewayCallback = () => {
  const url = new URL(window.location.href);
  const encodedData = url.searchParams.get("data");
  if (!encodedData) return null;

  let callback = { raw: encodedData, receivedAt: new Date().toISOString() };
  try {
    callback = { ...callback, ...JSON.parse(atob(encodedData)) };
  } catch {
    // Keep the raw callback so support can still inspect it if decoding fails.
  }

  window.sessionStorage.setItem("listing.properties:lastGatewayCallback", JSON.stringify(callback));
  const cleanPath = url.pathname === "/" ? "/dashboard" : url.pathname;
  window.history.replaceState({}, "", cleanPath);
  return callback;
};

function App() {
  const initialAuth = getStoredAuth();
  const initialCallback = captureGatewayCallback();
  const initialScreen = routeToScreen(window.location.pathname);
  const initialRole = normalizeRole(initialAuth?.user?.role);
  const initialHomeScreen = homeScreenForRole(initialRole);
  const safeInitialScreen = initialAuth?.user
    ? (isScreenAllowedForRole(initialScreen, initialRole, true) && initialScreen !== SCREEN_LANDING ? initialScreen : initialHomeScreen)
    : initialScreen;
  const [screen, setScreenState] = useState(safeInitialScreen);
  const [listings, setListings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ intent: "rent_home", q: "", category: "", duration: "", city: "", verified: true, maxPrice: "" });
  const [dashboard, setDashboard] = useState(null);
  const [landlord, setLandlord] = useState(fallbackLandlordDashboard);
  const [admin, setAdmin] = useState(fallbackAdminDashboard);
  const [audit, setAudit] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(getStoredActiveBooking);
  const [bookingResult, setBookingResult] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [viewingResult, setViewingResult] = useState(null);
  const [auth, setAuth] = useState(initialAuth);
  const [authMode, setAuthMode] = useState(null);
  const [gatewayCallback] = useState(initialCallback);
  const [notifications, setNotifications] = useState({ items: [], unreadCount: 0 });
  const currentUserId = auth?.user?.id || defaultUserId;
  const currentRole = normalizeRole(auth?.user?.role);
  const activeBooking = useMemo(() => {
    return selectedBooking || dashboard?.bookings?.[0] || null;
  }, [selectedBooking, dashboard]);

  const setScreen = (nextScreen) => {
    const safeScreen = isScreenAllowedForRole(nextScreen, currentRole, Boolean(auth?.user)) ? nextScreen : (auth?.user ? homeScreenForRole(currentRole) : SCREEN_LANDING);
    setScreenState(safeScreen);
    const nextRoute = screenToRoute[safeScreen] || screenToRoute[homeScreenForRole(currentRole)] || "/dashboard";
    if (window.location.pathname !== nextRoute) window.history.pushState({}, "", nextRoute);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };

  useEffect(() => {
    const onPopState = () => {
      const requestedScreen = routeToScreen(window.location.pathname);
      const safeScreen = isScreenAllowedForRole(requestedScreen, currentRole, Boolean(auth?.user)) ? requestedScreen : homeScreenForRole(currentRole);
      setScreenState(safeScreen);
      if (safeScreen !== requestedScreen) window.history.replaceState({}, "", screenToRoute[safeScreen] || "/dashboard");
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [auth?.user, currentRole]);

  useEffect(() => {
    if (!isScreenAllowedForRole(screen, currentRole, Boolean(auth?.user))) {
      const safeScreen = auth?.user ? homeScreenForRole(currentRole) : SCREEN_LANDING;
      setScreenState(safeScreen);
      window.history.replaceState({}, "", screenToRoute[safeScreen] || "/");
    }
  }, [auth?.user, currentRole, screen]);

  useEffect(() => {
    const cleanRoute = screenToRoute[screen] || screenToRoute[homeScreenForRole(currentRole)] || "/dashboard";
    if (window.location.search.includes("data=")) window.history.replaceState({}, "", cleanRoute);
  }, [screen]);

  useEffect(() => { loadListings(); loadLandlord(); loadAdmin(); }, []);
  useEffect(() => { loadDashboard(); loadNotifications(); }, [currentUserId]);

  const loadListings = async (nextFilters = filters) => {
    setLoading(true);
    const params = new URLSearchParams();
    Object.entries(nextFilters).forEach(([key, value]) => { if (key !== "intent" && (value || value === true)) params.set(key, value); });
    const data = await api(`/listings?${params}`);
    setListings(availableInventoryOnly(data));
    setLoading(false);
  };
  const loadDashboard = async () => {
    try {
      const data = await api(`/users/${currentUserId}/dashboard`);
      setDashboard(data);
      if (data?.bookings?.[0]) storeActiveBooking(data.bookings[0]);
      return data;
    } catch (error) {
      console.warn("Tenant dashboard API did not respond.", error);
      return null;
    }
  };
  const loadLandlord = async () => {
    try {
      setLandlord(await api(`/property-workspace/${currentUserId}/dashboard`));
    } catch (error) {
      console.warn("Using built-in landlord dashboard data because the API did not respond.", error);
      setLandlord(fallbackLandlordDashboard);
    }
  };
  const loadAdmin = async () => {
    try {
      setAdmin(await api("/admin/dashboard"));
    } catch (error) {
      console.warn("Using built-in ops dashboard data because the API did not respond.", error);
      setAdmin(fallbackAdminDashboard);
    }
  };
  const loadNotifications = async () => {
    if (!currentUserId) return;
    try {
      setNotifications(await api(`/users/${currentUserId}/notifications`));
    } catch (error) {
      console.warn("Notifications are using the local empty state because the API did not respond.", error);
      setNotifications({ items: [], unreadCount: 0 });
    }
  };
  const openNotification = async (notification) => {
    if (!notification) return;
    try { await api(`/notifications/${notification.id}/read`, { method: "POST", body: JSON.stringify({ userId: currentUserId }) }); } catch {}
    await loadNotifications();
    const routeMap = {
      "/dashboard": SCREEN_DASHBOARD,
      "/discover": SCREEN_DISCOVER,
      "/landlords": SCREEN_LANDLORD,
      "/property-workspace": SCREEN_LANDLORD,
      "/agent": SCREEN_LANDLORD,
      "/properties/new": SCREEN_NEW_PROPERTY,
      "/ops": SCREEN_ADMIN,
      "/lease-documents": SCREEN_LEASE_PACK,
      "/message-landlord": SCREEN_MESSAGE_LANDLORD,
      "/move-in-checklist": SCREEN_MOVE_IN,
      "/lease-audit": SCREEN_AUDIT
    };
    setScreen(routeMap[notification.actionRoute] || SCREEN_DASHBOARD);
  };
  const markAllNotificationsRead = async () => {
    try { await api(`/users/${currentUserId}/notifications/read-all`, { method: "POST" }); } catch {}
    await loadNotifications();
  };
  const applyFilters = (patch) => { const intentPatch = patch.intent ? getFiltersForIntent(patch.intent) : {}; const next = { ...filters, ...intentPatch, ...patch }; setFilters(next); loadListings(next); };
  const openListing = async (listing) => { if (isReservedListing(listing)) return; setSelected(await api(`/listings/${listing.id}`)); setBookingResult(null); setBookingError(null); setViewingResult(null); setScreen(SCREEN_DETAIL); };
  const submitBooking = async (payload) => {
    setBookingSubmitting(true);
    setBookingError(null);
    setBookingResult(null);
    try {
      const result = await api("/bookings", { method: "POST", body: JSON.stringify(payload) });
      setBookingResult(result);
      if (result?.booking) {
        setSelectedBooking(result.booking);
        storeActiveBooking(result.booking);
      }
      await loadDashboard();
      await loadLandlord();
      await loadNotifications();
    } catch (error) {
      setBookingError({ message: error.message, details: error.body?.details });
    } finally {
      setBookingSubmitting(false);
    }
  };
  const requestViewing = async (payload) => {
    const result = await api("/viewings", { method: "POST", body: JSON.stringify(payload) });
    setViewingResult(result);
    await loadNotifications();
    return result;
  };
  const openTenantProcess = (targetScreen, booking) => {
    const nextBooking = booking || activeBooking || getStoredActiveBooking();
    if (nextBooking) {
      setSelectedBooking(nextBooking);
      storeActiveBooking(nextBooking);
    }
    setScreen(targetScreen);
  };
  const runAudit = async (bookingId) => {
    const booking = activeBooking || getStoredActiveBooking();
    const targetBookingId = bookingId || booking?.id;
    if (!targetBookingId) { setAudit(null); setScreen(SCREEN_AUDIT); return; }
    try {
      setAudit(await api(`/bookings/${targetBookingId}/audit`));
    } catch (error) {
      console.warn("Using local lease audit fallback because the API did not respond.", error);
      const rent = booking?.listing?.priceAmount || 0;
      setAudit({
        bookingId: targetBookingId,
        estimatedSavings: Math.round(rent * 0.08),
        recommendation: "We could not reach the live audit service, so this is a local estimate. Comparable verified rentals should be checked again before sending a formal renegotiation request.",
        marketAverage: Math.round(rent * 0.92),
        upgrades: []
      });
    }
    setScreen(SCREEN_AUDIT);
  };
  const completeAuth = (result) => {
    storeAuth(result);
    setAuth(result);
    setAuthMode(null);
    const homeScreen = homeScreenForRole(result?.user?.role);
    setScreenState(homeScreen);
    window.history.replaceState({}, "", screenToRoute[homeScreen] || "/dashboard");
    window.setTimeout(() => loadNotifications(), 0);
  };
  const signOut = () => {
    clearStoredAuth();
    setAuth(null);
    setScreenState(SCREEN_LANDING);
    window.history.replaceState({}, "", "/");
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#181818]">
      <Header screen={screen} setScreen={setScreen} auth={auth} role={currentRole} setAuthMode={setAuthMode} signOut={signOut} notifications={notifications.items} unreadCount={notifications.unreadCount} onOpenNotification={openNotification} onMarkAllRead={markAllNotificationsRead} />
      <main className={screen === SCREEN_LANDING ? "" : ""}>
        {screen === SCREEN_LANDING && <LandingPage listings={listings} setScreen={setScreen} setAuthMode={setAuthMode} applyFilters={applyFilters} openListing={openListing} />}
        {screen !== SCREEN_LANDING && (
          <AppFrame screen={screen} role={currentRole}>
            {screen === SCREEN_DISCOVER && <Discovery filters={filters} applyFilters={applyFilters} listings={listings} openListing={openListing} loading={loading} viewMode={viewMode} setViewMode={setViewMode} />}
            {screen === SCREEN_DETAIL && selected && <ListingDetail listing={selected} setScreen={setScreen} submitBooking={submitBooking} requestViewing={requestViewing} bookingResult={bookingResult} bookingError={bookingError} bookingSubmitting={bookingSubmitting} viewingResult={viewingResult} currentUserId={currentUserId} />}
            {screen === SCREEN_DETAIL && !selected && <Discovery filters={filters} applyFilters={applyFilters} listings={listings} openListing={openListing} loading={loading} viewMode={viewMode} setViewMode={setViewMode} />}
            {screen === SCREEN_DASHBOARD && <TenantDashboard dashboard={dashboard} runAudit={runAudit} setScreen={setScreen} openTenantProcess={openTenantProcess} gatewayCallback={gatewayCallback} />}
            {screen === SCREEN_LANDLORD && <LandlordDashboard data={landlord} setScreen={setScreen} />}
            {screen === SCREEN_NEW_PROPERTY && <NewPropertyPage currentUserId={currentUserId} onCreated={loadLandlord} setScreen={setScreen} />}
            {screen === SCREEN_ADMIN && <AdminOpsDashboard data={admin} />}
            {screen === SCREEN_AUDIT && <LeaseAudit audit={audit} setScreen={setScreen} openListing={openListing} />}
            {screen === SCREEN_LEASE_PACK && <LeasePackPage booking={activeBooking} setScreen={setScreen} />}
            {screen === SCREEN_MESSAGE_LANDLORD && <MessageLandlordPage booking={activeBooking} currentUserId={currentUserId} setScreen={setScreen} />}
            {screen === SCREEN_MOVE_IN && <MoveInChecklistPage booking={activeBooking} setScreen={setScreen} refreshDashboard={loadDashboard} />}
          </AppFrame>
        )}
      </main>
      {screen !== SCREEN_LANDING && <Footer />}
      <AuthModal mode={authMode} setMode={setAuthMode} completeAuth={completeAuth} />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
