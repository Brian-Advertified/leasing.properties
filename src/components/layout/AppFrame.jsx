import React from "react";
import { Building2, Home, ShieldCheck, Sparkles } from "lucide-react";
import { SCREEN_ADMIN, SCREEN_DASHBOARD, SCREEN_DISCOVER, SCREEN_LANDLORD, SCREEN_NEW_PROPERTY } from "../../app/constants/screens";
import { brand } from "../ui/DesignSystem";

const copyByScreen = {
  [SCREEN_DASHBOARD]: {
    eyebrow: "Your rental journey",
    title: "Let’s help you secure your verified place.",
    text: "The same promise from the landing page continues here: clear costs, trusted people and one simple next step.",
    icon: Home
  },
  [SCREEN_DISCOVER]: {
    eyebrow: "Verified rentals",
    title: "Browse homes and spaces with the important checks upfront.",
    text: "See rent, move-in cost, lease type and trust signals before you open a rental.",
    icon: Sparkles
  },
  [SCREEN_LANDLORD]: {
    eyebrow: "Property workspace",
    title: "Manage listings, contacts and applications in one guided place.",
    text: "Landlords, agents and property managers use the same trusted leasing.properties flow, with tenant messages routed to the right contact.",
    icon: Building2
  },
  [SCREEN_NEW_PROPERTY]: {
    eyebrow: "Add property",
    title: "List a rental without breaking the customer journey.",
    text: "Add the property, choose who manages tenants, and keep every viewing, message and application routed correctly.",
    icon: Building2
  },
  [SCREEN_ADMIN]: {
    eyebrow: "Support workspace",
    title: "Keep rentals safe, clear and moving.",
    text: "Handle checks, payment questions and customer support without cluttering tenant or landlord screens.",
    icon: ShieldCheck
  }
};

export function AppFrame({ screen, role = "tenant", children }) {
  const content = copyByScreen[screen] || {
    eyebrow: role === "landlord" ? "Landlord workspace" : role === "admin" ? "Support workspace" : "leasing.properties",
    title: role === "landlord" ? "Manage your verified rental pipeline." : role === "admin" ? "Help every rental move forward safely." : "Continue your verified rental journey.",
    text: "Everything here follows the same guided rental flow: clear information, trusted actions and no unnecessary noise.",
    icon: Sparkles
  };
  const Icon = content.icon;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f5f0e8] text-[#181818]">
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-[-12rem] top-[-10rem] h-[30rem] w-[30rem] rounded-full bg-[#ed1c24]/10 blur-3xl" />
        <div className="absolute right-[-12rem] top-[8rem] h-[34rem] w-[34rem] rounded-full bg-[#c9a84c]/18 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(19,35,28,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(19,35,28,0.045)_1px,transparent_1px)] bg-[size:72px_72px] opacity-70" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-20 pt-6 md:px-8">
        <section className="rounded-[1.6rem] border border-white/10 bg-black p-5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.32)] md:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#ed1c24] text-white shadow-[0_18px_44px_rgba(237,28,36,0.28)]">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className={brand.goldEyebrow}>{content.eyebrow}</p>
                <h1 className="mt-1 max-w-3xl text-2xl font-black leading-tight tracking-[-0.05em] text-white force-white md:text-4xl">{content.title}</h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">{content.text}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-black text-white/80">
              Verified · Guided · Protected
            </div>
          </div>
        </section>

        <div className="app-content-shell">
          {children}
        </div>
      </div>
    </div>
  );
}
