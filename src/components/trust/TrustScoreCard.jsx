import React from "react";
import { ShieldCheck } from "lucide-react";
import { getPropertyTrust } from "../../features/qualification/qualificationEngine";
import { Card, Pill } from "../common/Primitives";

export function TrustScoreCard({ listing, title = "Trust score" }) {
  const trust = getPropertyTrust(listing);
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div><p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Verified confidence</p><h3 className="mt-1 text-xl font-black text-forest">{title}</h3></div>
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest text-gold"><ShieldCheck className="h-6 w-6" /></span>
      </div>
      <div className="mt-4 flex items-end gap-3"><span className="text-5xl font-black text-forest">{trust.score}</span><span className="pb-2 text-sm font-black text-ink/45">/100</span><Pill tone={trust.score >= 80 ? "green" : "gold"}>{trust.score >= 80 ? "Strong trust signals" : "Some checks pending"}</Pill></div>
      <div className="mt-4 grid gap-2">
        {trust.checks.map((check) => <div key={check.label} className="flex items-center justify-between rounded-2xl bg-linen px-3 py-2 text-sm"><span className="font-bold text-ink/65">{check.label}</span><span className={`font-black ${check.done ? "text-forest" : "text-ink/35"}`}>{check.done ? "Done" : "Pending"}</span></div>)}
      </div>
    </Card>
  );
}
