import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  FileText,
  Home,
  KeyRound,
  MapPin,
  Search,
  ShieldCheck,
  UserRoundCheck
} from "lucide-react";
import { SCREEN_DISCOVER } from "../../app/constants/screens";
import { availableInventoryOnly } from "../../features/listings/inventoryPolicy";
import { money } from "../../lib/formatters";

const rentalTabs = [
  { id: "long", label: "Long lease", patch: { duration: "monthly", category: "residential", verified: true } },
  { id: "short", label: "Short stay", patch: { duration: "daily", category: "residential", verified: true } },
  { id: "workspace", label: "Workspace", patch: { duration: "hourly", category: "commercial", verified: true } }
];

const fallbackProperties = [
  {
    id: "fallback-1",
    title: "Verified 2 Bedroom Apartment",
    suburb: "Sandton",
    city: "Johannesburg",
    priceAmount: 12500,
    duration: "monthly",
    neatStock: true,
    ratingAverage: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "fallback-2",
    title: "Modern Family Home",
    suburb: "Midrand",
    city: "Gauteng",
    priceAmount: 16800,
    duration: "monthly",
    neatStock: true,
    ratingAverage: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "fallback-3",
    title: "Flexible Workspace Suite",
    suburb: "Rosebank",
    city: "Johannesburg",
    priceAmount: 9200,
    duration: "commercial",
    neatStock: true,
    ratingAverage: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop"
  }
];

export function LandingPage({ listings, setScreen, setAuthMode, applyFilters, openListing }) {
  const featuredListings = useMemo(() => {
    const live = availableInventoryOnly(listings || []).slice(0, 3);
    return live.length ? live : fallbackProperties;
  }, [listings]);
  const heroImage = featuredListings?.[0]?.imageUrl || fallbackProperties[0].imageUrl;
  const [tab, setTab] = useState("long");
  const [quickSearch, setQuickSearch] = useState({ location: "", maxPrice: "" });

  const updateQuickSearch = (key, value) => setQuickSearch((current) => ({ ...current, [key]: value }));

  const runSearch = (event) => {
    event?.preventDefault?.();
    const selectedTab = rentalTabs.find((item) => item.id === tab) || rentalTabs[0];
    applyFilters({ ...selectedTab.patch, q: quickSearch.location, maxPrice: quickSearch.maxPrice });
    setScreen(SCREEN_DISCOVER);
  };

  const openFeaturedListing = (listing) => {
    if (listing?.id?.toString().startsWith("fallback")) return setScreen(SCREEN_DISCOVER);
    if (openListing) return openListing(listing);
    setScreen(SCREEN_DISCOVER);
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#181818]">
      <section className="relative overflow-hidden bg-[#111111] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(201,168,76,0.22),transparent_24rem),radial-gradient(circle_at_82%_12%,rgba(237,28,36,0.16),transparent_24rem)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#f5f0e8]" />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-8 px-4 pb-16 pt-28 md:grid-cols-[0.92fr_1.08fr] md:items-center md:px-8 md:pb-24 md:pt-32">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#c9a84c]/45 bg-[#c9a84c]/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#f0cf72]">
              <ShieldCheck className="h-3.5 w-3.5" /> Institutional access and rent-ready spaces
            </div>
            <h1 className="max-w-2xl text-[3rem] font-black leading-[0.9] tracking-[-0.075em] text-white md:text-[5.4rem]">
              Transforming Africa’s <span className="text-[#c9a84c]">Property Market.</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/68 md:text-base">
              Bringing property access and finance through leasing.properties. Residential, commercial and flexible spaces in one clean marketplace.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button onClick={runSearch} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#ed1c24] px-6 py-3 text-sm font-black text-white shadow-[0_18px_44px_rgba(237,28,36,0.28)] hover:bg-[#ff343d]">
                Browse marketplace <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => setAuthMode?.("register")} className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/18 bg-white/8 px-6 py-3 text-sm font-black text-white hover:bg-white/14">
                Get Rental Deposit Finance
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-white/14 bg-white/8 p-2 shadow-[0_35px_95px_rgba(0,0,0,0.52)] backdrop-blur">
              <div className="relative h-[23rem] overflow-hidden rounded-[1.45rem] bg-[#191919] md:h-[30rem]">
                <img src={heroImage} alt="Verified rental property" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/5 to-black/55" />
                <div className="absolute left-5 top-5 rounded-2xl bg-black/64 px-4 py-3 backdrop-blur">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#c9a84c]">leasing.properties</p>
                  <p className="mt-1 text-sm font-black text-white">Verified listings · digital applications</p>
                </div>
              </div>
            </div>

            <form onSubmit={runSearch} className="relative -mt-12 mx-3 rounded-[1.65rem] border border-black/10 bg-white p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)] md:absolute md:-bottom-8 md:left-[-1.5rem] md:mx-0 md:mt-0 md:w-[30rem]">
              <p className="text-[0.82rem] font-black uppercase tracking-[0.22em] text-[#ed1c24]">Start your search</p>
              <div className="mt-4 grid grid-cols-3 gap-2 rounded-[1.1rem] bg-[#f4efe6] p-2 text-xs font-black">
                {rentalTabs.map((item) => (
                  <button type="button" key={item.id} onClick={() => setTab(item.id)} className={`rounded-[0.9rem] px-3 py-3 transition ${tab === item.id ? "bg-[#111] text-white shadow-[0_10px_22px_rgba(0,0,0,0.18)]" : "bg-white/70 text-[#181818]/70 hover:bg-white hover:text-[#181818]"}`}>
                    {item.label}
                  </button>
                ))}
              </div>
              <label className="mt-4 block text-[11px] font-black uppercase tracking-wide text-[#181818]/55">
                Area
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-4 h-4 w-4 text-[#181818]/35" />
                  <input className="h-13 min-h-[52px] w-full rounded-2xl border border-black/10 bg-[#fbfaf7] pl-10 pr-3 text-sm font-semibold text-[#181818] outline-none placeholder:text-[#181818]/38 focus:border-[#ed1c24]" placeholder="Suburb, city or building" value={quickSearch.location} onChange={(event) => updateQuickSearch("location", event.target.value)} />
                </div>
              </label>
              <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
                <input className="h-13 min-h-[52px] rounded-2xl border border-black/10 bg-[#fbfaf7] px-4 text-sm font-semibold text-[#181818] outline-none placeholder:text-[#181818]/38 focus:border-[#ed1c24]" placeholder="Max rent" inputMode="numeric" value={quickSearch.maxPrice} onChange={(event) => updateQuickSearch("maxPrice", event.target.value)} />
                <button type="submit" className="rounded-2xl bg-[#ed1c24] px-7 text-sm font-black text-white shadow-[0_14px_30px_rgba(237,28,36,0.24)] hover:bg-[#111]">Search</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <main>
        <section className="bg-[#f5f0e8] px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow="Curated inventory" title="A cleaner distribution layer for quality residential, commercial and flexible spaces."/>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {featuredListings.map((listing) => <LandingRentalCard key={listing.id} listing={listing} onClick={() => openFeaturedListing(listing)} />)}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-white px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow="How it works" title="The five-step journey from discovery to approval." text="leasing.properties keeps the tenant journey simple while giving landlords and agents the tools to manage applications behind the scenes." />
            <div className="mt-9 grid gap-4 md:grid-cols-5">
              <JourneyStep icon={Search} number="01" title="Search" text="Browse verified property inventory." />
              <JourneyStep icon={BadgeCheck} number="02" title="Shortlist" text="Select the space that fits your budget and needs." />
              <JourneyStep icon={FileText} number="03" title="Apply" text="Complete your digital application journey." />
              <JourneyStep icon={CreditCard} number="04" title="Pay" text="Access structured payment and deposit support where available." />
              <JourneyStep icon={KeyRound} number="05" title="Move in" text="Receive approval updates and move-in guidance." />
            </div>
          </div>
        </section>

        <section id="landlords" className="bg-[#181818] px-4 py-14 text-white md:px-8 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#c9a84c]">Finance engine</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.055em] md:text-5xl">leasing.properties Transforming inventory into revenue.</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">leasing.properties turns verified rental inventory into active demand by combining discovery, applications, payment readiness and structured marketplace oversight.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button className="rounded-full bg-[#ed1c24] px-5 py-3 text-sm font-black text-white hover:bg-[#ff343d]" onClick={() => setAuthMode?.("register")}>Explore marketplace</button>
                <button className="rounded-full border border-white/16 px-5 py-3 text-sm font-black text-white hover:bg-white/10" onClick={() => setAuthMode?.("login")}>Sign in</button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <PartnerPoint icon={Building2} title="100% Deposit Finance" text="Converts qualified demand into accessible leasing opportunities without slowing down the application journey." />
              <PartnerPoint icon={UserRoundCheck} title="95% Risk Accuracy" text="Supports stronger applicant visibility and structured verification before approvals move forward." />
              <PartnerPoint icon={ClipboardCheck} title="Finance Calculator" text="Helps users understand monthly affordability, deposits and move-in readiness." />
              <PartnerPoint icon={MapPin} title="Revenue Readiness" text="Keeps each property connected to the right landlord or agent from enquiry to approval." />
            </div>
          </div>
        </section>

        <section className="bg-[#f5f0e8] px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <SectionHeading eyebrow="Platform controls" title="A marketplace built around verified access and managed leasing journeys." text="The public journey stays simple, while listing owners and operators manage applications, documents and communication in the correct workspace." />
            <div className="grid gap-4 md:grid-cols-2">
              <TrustCard title="Verified marketplace" text="Tenants browse and apply for verified properties and services." />
              <TrustCard title="Structured applications" text="Application, document and approval steps stay visible to the correct user." />
              <TrustCard title="Curated onboarding" text="Landlords, Agents and Properties are vetted before listings go live." />
              <TrustCard title="Rent-ready conversion" text="The platform supports deposit, approval and move-in steps without cluttering the rental journey." />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#111] px-4 py-10 text-white md:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <LogoLockup />
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/50">A curated property marketplace for verified rentals, digital applications and smarter leasing journeys.</p>
          </div>
          <FooterColumn title="Platform" links={["Browse marketplace", "List a property", "How it works", "Finance Calculator"]} />
          <FooterColumn title="Company" links={["Contact", "Privacy", "Terms", "Support"]} />
        </div>
        <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-2 border-t border-white/10 pt-5 text-xs text-white/35 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} leasing.properties. All rights reserved.</span>
          <span>Verified leasing journeys for growing African property markets.</span>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#ed1c24]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.055em] text-[#181818] md:text-5xl">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-[#181818]/58">{text}</p>
    </div>
  );
}

function LandingRentalCard({ listing, onClick }) {
  const leaseLabel = listing.duration === "monthly" ? "Long lease" : listing.duration || "Rental";
  return (
    <article className="overflow-hidden rounded-[1.45rem] border border-black/8 bg-white shadow-[0_18px_55px_rgba(24,24,24,0.09)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(24,24,24,0.14)]">
      <button type="button" onClick={onClick} className="block w-full text-left">
        <div className="relative h-48 overflow-hidden bg-[#191919]">
          <img className="h-full w-full object-cover transition duration-500 hover:scale-105" src={listing.lowDataImageUrl || listing.imageUrl} alt={listing.title} loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {listing.neatStock ? <ImageBadge>Verified</ImageBadge> : null}
            <ImageBadge tone="gold">{leaseLabel}</ImageBadge>
          </div>
        </div>
        <div className="p-5">
          <p className="text-xs font-black uppercase tracking-wide text-[#ed1c24]">{listing.suburb}, {listing.city}</p>
          <h3 className="mt-1 line-clamp-2 min-h-10 font-black leading-tight text-[#181818]">{listing.title}</h3>
          <div className="mt-3 flex items-end justify-between gap-3 text-sm">
            <span className="text-[#181818]/45">from <b className="text-[#181818]">{money(listing.priceAmount)}</b></span>
            <span className="rounded-full bg-[#f5f0e8] px-2.5 py-1 text-xs font-black text-[#181818]">★ {Number(listing.ratingAverage || 0).toFixed(1)}</span>
          </div>
          <span className="force-white mt-4 inline-flex w-full items-center justify-center rounded-xl border border-black/8 bg-[#ed1c24] px-4 py-3 text-xs font-black uppercase tracking-wide hover:bg-[#181818]">
            View property
          </span>
        </div>
      </button>
    </article>
  );
}

function ImageBadge({ children, tone = "dark" }) {
  const style = tone === "gold" ? "bg-[#c9a84c] text-[#181818] border-[#c9a84c]" : "bg-black/72 force-white border-white/20";
  return <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wide shadow-lg backdrop-blur ${style}`}>{children}</span>;
}

function JourneyStep({ icon: Icon, number, title, text }) {
  return (
    <div className="rounded-[1.35rem] border border-black/8 bg-[#fbfaf7] p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#181818] text-white"><Icon className="h-5 w-5" /></span>
        <span className="text-2xl font-black tracking-[-0.08em] text-[#c9a84c]">{number}</span>
      </div>
      <h3 className="mt-5 font-black text-[#181818]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#181818]/56">{text}</p>
    </div>
  );
}

function PartnerPoint({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-5">
      <Icon className="h-5 w-5 text-[#c9a84c]" />
      <p className="mt-3 font-black text-white">{title}</p>
      <p className="mt-1 text-sm leading-6 text-white/55">{text}</p>
    </div>
  );
}

function TrustCard({ title, text }) {
  return (
    <div className="rounded-[1.25rem] border border-black/8 bg-white p-5 shadow-[0_14px_45px_rgba(24,24,24,0.06)]">
      <CheckCircle2 className="h-5 w-5 text-[#ed1c24]" />
      <h3 className="mt-3 font-black text-[#181818]">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-[#181818]/56">{text}</p>
    </div>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#c9a84c]">{title}</p>
      <div className="mt-4 grid gap-2">
        {links.map((link) => <span key={link} className="text-sm text-white/50">{link}</span>)}
      </div>
    </div>
  );
}

function LogoLockup() {
  return (
    <div className="flex items-center gap-3">
      <svg width="42" height="40" viewBox="0 0 52 50" aria-hidden="true">
        <path d="M2 34 L26 6 L50 34" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="13" y="37" width="11" height="11" rx="2" fill="#C9A84C" />
        <rect x="28" y="37" width="11" height="11" rx="2" fill="#C9A84C" />
      </svg>
      <span className="text-xl font-normal tracking-[-0.04em] text-white">leasing<span className="font-black text-[#c9a84c]">.</span>properties</span>
    </div>
  );
}
