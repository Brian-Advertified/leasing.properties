import React, { useEffect, useMemo, useState } from "react";
import { Building2, CalendarDays, CheckCircle2, Clock, FileCheck2, MessageCircle, PlusCircle, TrendingUp, Users, WalletCards } from "lucide-react";
import { api } from "../../lib/api/client";
import { money } from "../../lib/formatters";
import { Button, Card, EmptyState, Pill, Rating, StatCard } from "../common/Primitives";
import { ApplicantRankingCard } from "./ApplicantRankingCard";
import { PropertyAssignmentPanel } from "../property/PropertyAssignmentPanel";
import { PropertyContactCard } from "../property/PropertyContactCard";
import { fallbackLandlordDashboard } from "../../data/fallbackDashboards";
import { SCREEN_NEW_PROPERTY } from "../../app/constants/screens";

export function LandlordDashboard({ data, setScreen }) {
  const dashboardData = data || fallbackLandlordDashboard;
  const manager = dashboardData.manager || dashboardData.landlord || { displayName: "Property manager", role: "landlord" };
  const [applications, setApplications] = useState(dashboardData?.applications || []);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    setApplications(dashboardData?.applications || []);
  }, [dashboardData]);

  const listings = dashboardData.listings || [];
  const assignments = dashboardData.assignments || [];
  const metrics = dashboardData.metrics || {};
  const primaryListing = listings[0];

  const managerLabel = useMemo(() => {
    if (manager.role === "agent") return "Leasing agent workspace";
    if (manager.role === "agency") return "Agency workspace";
    if (manager.role === "property_manager") return "Property manager workspace";
    return "Landlord workspace";
  }, [manager.role]);

  const updateApplication = async (bookingId, action) => {
    const workingMessage = action === "approve" ? "Approving this applicant..." : action === "request-info" ? "Asking the tenant for more information..." : "Declining this application...";
    setFeedback(workingMessage);
    try {
      const response = await api(`/landlord/applications/${bookingId}/${action}`, {
        method: "POST",
        body: JSON.stringify({ note: `${manager.displayName} selected ${action}.` })
      });
      setApplications((current) => current.map((item) => item.id === bookingId ? { ...item, ...response.application } : item));
      setFeedback(response.message || "Application updated.");
    } catch {
      setApplications((current) => current.map((item) => item.id === bookingId ? {
        ...item,
        status: action === "approve" ? "approved" : action === "request-info" ? "more_info_requested" : "declined"
      } : item));
      setFeedback(action === "approve" ? "Applicant approved. The tenant can now move to lease documents." : action === "request-info" ? "More information has been requested from the tenant." : "Application declined politely. The tenant can continue searching for other options.");
    }
  };

  return (
    <div className="grid gap-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-forest/10 bg-white shadow-premium">
        {primaryListing ? (
          <img src={primaryListing.lowDataImageUrl || primaryListing.imageUrl} alt="" className="absolute inset-y-0 right-0 hidden h-full w-1/2 object-cover opacity-20 lg:block" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-linen/50" />
        <div className="relative grid gap-6 p-6 md:grid-cols-[1fr_auto] md:p-8">
          <div>
            <div className="flex flex-wrap gap-2">
              <Pill tone="gold">{managerLabel}</Pill>
              <Pill tone="green">Tenant messages route to the assigned contact</Pill>
            </div>
            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-forest md:text-6xl">
              Manage properties, applicants and viewings without losing the human touch.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink/65">
              Landlords, agents and property managers can list rentals, assign the right contact and keep tenants updated from one calm workspace.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button onClick={() => setScreen?.(SCREEN_NEW_PROPERTY)}><PlusCircle className="mr-2 h-4 w-4" /> Add property</Button>
              <Button variant="secondary" onClick={() => document.getElementById("applications")?.scrollIntoView({ behavior: "smooth" })}>Review applications</Button>
            </div>
            {feedback ? <p className="mt-4 rounded-2xl bg-gold/10 px-4 py-3 text-sm font-bold text-forest">{feedback}</p> : null}
          </div>
          <div className="grid min-w-[270px] gap-3 rounded-[1.5rem] border border-forest/10 bg-linen p-4">
            <Kpi icon={Building2} label="Listings" value={`${metrics.totalListings || listings.length || 0} managed`} />
            <Kpi icon={Users} label="Applications" value={`${applications.length} active`} />
            <Kpi icon={Clock} label="Typical response" value={metrics.averageResponseTime || manager.responseTime || "2h"} />
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard icon={Building2} label="Managed properties" value={metrics.totalListings || listings.length || 0} tone="warm" />
        <StatCard icon={Users} label="Applications" value={applications.length} tone="gold" />
        <StatCard icon={FileCheck2} label="Docs complete" value={`${metrics.documentCompleteRate || 0}%`} tone="green" />
        <StatCard icon={WalletCards} label="Payment setup" value="VodaPay" tone="warm" text="Ready for tenant payments" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <Card className="p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">How this workspace works</p>
              <h3 className="mt-1 text-2xl font-black text-forest">Each property has a clear responsible contact</h3>
              <p className="mt-2 text-sm leading-6 text-ink/60">Tenant messages, viewing requests and lease questions go to the person assigned to that property — not to the wrong workspace.</p>
            </div>
            <Button variant="secondary" onClick={() => setScreen?.(SCREEN_NEW_PROPERTY)}>List property</Button>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <WorkspaceStep icon={Building2} title="List" text="Add the property and rental details." />
            <WorkspaceStep icon={MessageCircle} title="Assign" text="Choose landlord, agent or manager as the tenant contact." />
            <WorkspaceStep icon={CheckCircle2} title="Approve" text="Review applications and move good tenants forward." />
          </div>
        </Card>
        {primaryListing ? <PropertyContactCard listing={primaryListing} /> : <EmptyState title="No property yet" text="Add your first property to start receiving tenant applications." />}
      </div>

      <Card id="applications" className="p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Applications</p>
            <h3 className="mt-1 text-2xl font-black text-forest">Tenant approval pipeline</h3>
            <p className="mt-2 text-sm text-ink/60">Clear decision cards with the information needed before approving.</p>
          </div>
          <Pill tone="sand">Structured decisions</Pill>
        </div>
        <div className="mt-5 grid gap-4">
          {applications.length ? applications.map((app) => <ApplicantRankingCard key={app.id} app={app} updateApplication={updateApplication} />) : <EmptyState title="No active applications" text="Applications will appear here once tenants submit documents and request approval." />}
        </div>
      </Card>

      <Card className="p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Property contacts</p>
            <h3 className="mt-1 text-2xl font-black text-forest">Who handles each tenant step</h3>
            <p className="mt-2 text-sm text-ink/60">This keeps communication clean when landlords, agents and property managers all work on the same property.</p>
          </div>
          <Pill tone="green">Routed automatically</Pill>
        </div>
        <div className="mt-5">
          <PropertyAssignmentPanel assignments={assignments} embedded />
        </div>
      </Card>

      <Card className="p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Inventory</p>
            <h3 className="mt-1 text-2xl font-black text-forest">Verified stock performance</h3>
            <p className="mt-2 text-sm text-ink/60">Properties currently managed by you or assigned to your team.</p>
          </div>
          <Pill tone="green">Verified listings ready</Pill>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {listings.length ? listings.map((listing) => <PropertyCard key={listing.id} listing={listing} />) : <EmptyState title="No listings yet" text="Create your first rental listing to begin receiving applications." action={<Button onClick={() => setScreen?.(SCREEN_NEW_PROPERTY)}>Add property</Button>} />}
        </div>
      </Card>
    </div>
  );
}

function Kpi({ icon: Icon, label, value }) {
  return <div className="flex items-center gap-3 rounded-2xl bg-white p-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-forest text-gold"><Icon className="h-5 w-5" /></span><span><span className="block text-xs font-black uppercase tracking-wide text-ink/40">{label}</span><span className="block font-black text-forest">{value}</span></span></div>;
}

function WorkspaceStep({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-forest/10 bg-linen/70 p-4">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-forest text-gold"><Icon className="h-5 w-5" /></span>
      <p className="mt-3 font-black text-forest">{title}</p>
      <p className="mt-1 text-xs leading-5 text-ink/55">{text}</p>
    </div>
  );
}

function PropertyCard({ listing }) {
  const fallbackImage = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=70";
  const imageSrc = listing.imageUrl || listing.lowDataImageUrl || fallbackImage;
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-forest/10 bg-white shadow-sm">
      <div className="relative h-48 bg-forest/5">
        <img
          src={imageSrc}
          alt={listing.title}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = fallbackImage;
          }}
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2"><Pill tone="green">Verified</Pill></div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3"><Rating rating={listing.ratingAverage} count={listing.reviewCount} /><Pill tone="sand">Ready to lease</Pill></div>
        <p className="mt-3 line-clamp-2 text-lg font-black text-forest">{listing.title}</p>
        <p className="text-sm text-ink/55">{listing.suburb}, {listing.city}</p>
        <p className="mt-3 text-lg font-black text-gold">{money(listing.priceAmount)}/{listing.priceUnit}</p>
      </div>
    </div>
  );
}
