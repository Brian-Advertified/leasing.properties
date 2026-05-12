import React from "react";
import { CheckCircle2, FileText, Gauge, Search } from "lucide-react";
import { getQualificationEstimate, REQUIRED_LONG_LEASE_DOCUMENTS } from "../../features/qualification/qualificationEngine";
import { money } from "../../lib/formatters";
import { Button, Card, Pill } from "../common/Primitives";

export function QualificationPanel({ listing, quote, approvalPack, monthlyIncome, setMonthlyIncome, checked, setChecked, onShowAlternatives }) {
  const estimate = getQualificationEstimate({ listing, quote, approvalPack, monthlyIncome: Number(monthlyIncome) || 0 });
  return (
    <Card className="overflow-hidden">
      <div className="bg-forest p-5 text-white">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Before you apply</p>
        <h3 className="mt-2 text-2xl font-black">Check if this home fits your budget</h3>
        <p className="mt-2 text-sm leading-6 text-white/70">This does not guarantee approval. It helps you avoid applying for a home that may not fit your current income and documents.</p>
      </div>
      <div className="grid gap-4 p-5">
        <label className="grid gap-2 text-sm font-black text-forest">
          Estimated monthly income
          <input value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)} inputMode="numeric" placeholder="Example: 28000" className="rounded-2xl border border-forest/10 px-4 py-3 text-sm outline-none focus:border-gold focus:ring-4 focus:ring-gold/15" />
        </label>
        <div className="rounded-2xl bg-linen p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-ink/40">Approval estimate</p>
              <p className="mt-1 text-3xl font-black text-forest">{estimate.score}%</p>
            </div>
            <Pill tone={estimate.tone}>{estimate.label}</Pill>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-gold" style={{ width: `${estimate.score}%` }} /></div>
          <p className="mt-3 text-sm leading-6 text-ink/65">{estimate.guidance}</p>
          <p className="mt-2 text-xs font-bold text-ink/50">Income guide for this property: {money(estimate.requiredIncome)} per month.</p>
        </div>
        <div className="grid gap-2">
          {REQUIRED_LONG_LEASE_DOCUMENTS.map((doc) => {
            const done = Boolean(approvalPack?.[doc.id]);
            return <div key={doc.id} className="flex gap-3 rounded-2xl border border-forest/10 bg-white p-3"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-2xl ${done ? "bg-forest text-gold" : "bg-linen text-ink/35"}`}>{done ? <CheckCircle2 className="h-5 w-5" /> : <FileText className="h-5 w-5" />}</span><span><span className="block text-sm font-black text-forest">{doc.label}</span><span className="block text-xs leading-5 text-ink/55">{doc.reason}</span></span></div>;
          })}
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <Button onClick={() => setChecked(true)}><Gauge className="mr-2 h-4 w-4" /> {checked ? "Qualification checked" : "Check if I qualify"}</Button>
          {estimate.score < 60 ? <Button variant="secondary" onClick={onShowAlternatives}><Search className="mr-2 h-4 w-4" /> Show easier options</Button> : null}
        </div>
      </div>
    </Card>
  );
}
