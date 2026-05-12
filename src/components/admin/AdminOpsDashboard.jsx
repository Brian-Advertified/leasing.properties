import React from "react";
import { AlertTriangle, Banknote, CheckCircle2, FileSearch, ListChecks, ShieldCheck, Siren } from "lucide-react";
import { Card, Pill, StatCard, Surface } from "../common/Primitives";
import { fallbackAdminDashboard } from "../../data/fallbackDashboards";

export function AdminOpsDashboard({ data }) {
  const dashboardData = data || fallbackAdminDashboard;
  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-forest/10 bg-[#10251d] p-6 text-white shadow-premium md:p-8">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Pill tone="white">Support workspace</Pill>
            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight md:text-6xl">Protect trust before problems reach tenants.</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/65">Verification, payment questions and disputes are handled here so client pages stay simple and calm.</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4 backdrop-blur"><p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Support overview</p><p className="mt-2 text-4xl font-black">{dashboardData.metrics.verificationQueue + dashboardData.metrics.paymentExceptions + dashboardData.metrics.openDisputes}</p><p className="text-sm text-white/55">items to review</p></div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-4"><StatCard icon={ShieldCheck} label="Verification queue" value={dashboardData.metrics.verificationQueue} tone="warm" /><StatCard icon={Banknote} label="Payment questions" value={dashboardData.metrics.paymentExceptions} tone="gold" /><StatCard icon={AlertTriangle} label="Open disputes" value={dashboardData.metrics.openDisputes} tone={dashboardData.metrics.openDisputes ? "gold" : "green"} /><StatCard icon={CheckCircle2} label="Verified listings" value={dashboardData.metrics.neatStockCount} tone="warm" /></div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-5 md:p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Support queues</p><h3 className="mt-1 text-2xl font-black text-forest">Work that needs attention</h3><p className="mt-2 text-sm text-ink/60">Every queue helps the support team keep rentals moving safely.</p></div><Pill tone="sand">Verification-first</Pill></div><div className="mt-5 grid gap-3">{dashboardData.queues.map((queue) => <QueueCard key={queue.title} queue={queue} />)}</div></Card>
        <Card className="p-5 md:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Operating rules</p><h3 className="mt-1 text-2xl font-black text-forest">Keep the marketplace clean</h3><div className="mt-5 grid gap-3"><Rule icon={ListChecks} title="Tenants see next steps" text="Tenants only see clear next steps on their dashboards." /><Rule icon={ShieldCheck} title="Trust checks before publish" text="Landlord mandate, property docs, photo validation and listing verification status." /><Rule icon={Siren} title="Escalate urgent items" text="Payment problems and disputes should be turned into support tasks immediately." /></div></Card>
      </div>
    </div>
  );
}
function QueueCard({ queue }) { return <Surface className="p-4"><div className="flex items-start gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gold/15"><FileSearch className="h-5 w-5 text-gold" /></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-black text-forest">{queue.title}</p><Pill tone="gold">{queue.count} items</Pill></div><p className="mt-1 text-sm leading-6 text-ink/60">{queue.description}</p></div></div></Surface>; }
function Rule({ icon: Icon, title, text }) { return <div className="rounded-2xl bg-linen p-4"><Icon className="h-5 w-5 text-gold" /><p className="mt-3 font-black text-forest">{title}</p><p className="mt-1 text-sm leading-6 text-ink/60">{text}</p></div>; }

function AdminLoading() {
  return (
    <Card className="p-6">
      <Pill tone="white">Support workspace</Pill>
      <h2 className="mt-3 text-2xl font-black text-forest">Loading support workspace</h2>
      <p className="mt-2 text-sm text-ink/60">We are loading verification, payment and dispute queues.</p>
    </Card>
  );
}
