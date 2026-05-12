import React from "react";
import { Building2, LayoutDashboard, LogIn, PlusCircle, Search, ShieldCheck, UserPlus } from "lucide-react";
import { NotificationCenter } from "../notifications/NotificationCenter";
import { BrandLogo } from "../ui/DesignSystem";
import { SCREEN_ADMIN, SCREEN_DASHBOARD, SCREEN_DISCOVER, SCREEN_LANDING, SCREEN_LANDLORD, SCREEN_NEW_PROPERTY } from "../../app/constants/screens";

const navByRole = {
  tenant: [
    [SCREEN_DISCOVER, "Search", Search],
    [SCREEN_DASHBOARD, "Applications", LayoutDashboard]
  ],
  landlord: [
    [SCREEN_LANDLORD, "Properties", Building2],
    [SCREEN_NEW_PROPERTY, "List", PlusCircle]
  ],
  admin: [[SCREEN_ADMIN, "Support", ShieldCheck]]
};

const homeScreenByRole = {
  tenant: SCREEN_DASHBOARD,
  landlord: SCREEN_LANDLORD,
  admin: SCREEN_ADMIN
};

export function Header({ screen, setScreen, auth, role = "tenant", setAuthMode, signOut, notifications = [], unreadCount = 0, onOpenNotification, onMarkAllRead }) {
  const isLanding = screen === SCREEN_LANDING;
  const normalizedRole = ["landlord", "admin"].includes(role) ? role : "tenant";
  const nav = auth?.user ? navByRole[normalizedRole] : [];
  const homeScreen = auth?.user ? homeScreenByRole[normalizedRole] : SCREEN_LANDING;

  const showSection = (sectionId) => {
    setScreen(SCREEN_LANDING);
    window.setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  return (
    <header className={`${isLanding ? "fixed inset-x-0 top-0 border-white/10 bg-black/70 text-white" : "sticky top-0 border-white/10 bg-black text-white shadow-sm"} z-40 border-b backdrop-blur-md`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-8">
        <button className="flex min-w-0 items-center gap-3 text-left" onClick={() => setScreen(homeScreen)}>
          <BrandLogo />
        </button>

        {auth?.user ? (
          <nav className="hidden items-center gap-1 rounded-full bg-white/8 p-1 shadow-sm md:flex">
            {nav.map(([id, label, Icon]) => {
              const active = screen === id;
              return (
                <button key={id} type="button" onClick={() => setScreen(id)} className={`${active ? "bg-[#ed1c24] text-white" : "text-white/70 hover:bg-[#ed1c24]/5 hover:text-white"} inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black transition`}>
                  <Icon className="h-4 w-4" /> {label}
                </button>
              );
            })}
          </nav>
        ) : (
          <nav className="hidden items-center gap-6 text-sm font-black lg:flex">
            <button className={`${isLanding ? "text-white/78 hover:text-white" : "text-white/70 hover:text-white"}`} onClick={() => setScreen(SCREEN_DISCOVER)}>Rent</button>
            <button className={`${isLanding ? "text-white/78 hover:text-white" : "text-white/70 hover:text-white"}`} onClick={() => showSection("landlords")}>List property</button>
            <button className={`${isLanding ? "text-white/78 hover:text-white" : "text-white/70 hover:text-white"}`} onClick={() => showSection("how-it-works")}>How it works</button>
          </nav>
        )}

        <div className="flex items-center gap-2">
          {auth?.user ? <NotificationCenter notifications={notifications} unreadCount={unreadCount} onOpenNotification={onOpenNotification} onMarkAllRead={onMarkAllRead} isLanding={isLanding} /> : null}
          {auth?.user ? (
            <button className="rounded-2xl border border-white/15 bg-white/8 px-4 py-2 text-sm font-black text-white shadow-sm hover:bg-[#ed1c24]/5" onClick={signOut}>Log out</button>
          ) : (
            <>
              <button className={`${isLanding ? "border-white/10 bg-white/10 text-white hover:bg-white/20" : "text-white hover:bg-[#ed1c24]/5"} hidden rounded-2xl border px-4 py-2 text-sm font-black transition sm:inline-flex`} onClick={() => setAuthMode("login")}><LogIn className="mr-2 h-4 w-4" /> Sign in</button>
              <button className={`${isLanding ? "bg-[#ed1c24] text-white hover:bg-[#ef4224]" : "bg-[#ed1c24] text-white hover:bg-[#1f5f4a]"} inline-flex items-center rounded-2xl px-4 py-2 text-sm font-black transition`} onClick={() => setAuthMode("register")}><UserPlus className="mr-2 h-4 w-4" /> Join</button>
            </>
          )}
        </div>
      </div>

      {auth?.user ? (
        <nav className={`grid border-t border-white/10 bg-black md:hidden ${nav.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
          {nav.map(([id, label, Icon]) => (
            <button key={id} onClick={() => setScreen(id)} className={`flex flex-col items-center gap-1 py-2 text-[11px] font-black ${screen === id ? "text-white" : "text-white/45"}`}>
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] px-4 py-10 text-white md:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <BrandLogo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/50">A curated property marketplace for verified rentals, digital applications and smarter leasing journeys.</p>
        </div>
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#c9a84c]">Platform</p>
          <div className="mt-3 grid gap-2 text-sm text-white/52">
            <span>Browse marketplace</span>
            <span>List a property</span>
            <span>How it works</span>
          </div>
        </div>
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#c9a84c]">Company</p>
          <div className="mt-3 grid gap-2 text-sm text-white/52">
            <span>Contact</span>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-2 border-t border-white/10 pt-5 text-xs text-white/35 md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} leasing.properties. All rights reserved.</span>
        <span>Verified leasing journeys for growing African property markets.</span>
      </div>
    </footer>
  );
}
