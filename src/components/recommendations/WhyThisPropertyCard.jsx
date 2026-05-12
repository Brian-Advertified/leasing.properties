import React from "react";
import { Sparkles } from "lucide-react";
import { getWhyThisProperty } from "../../features/qualification/qualificationEngine";
import { Card } from "../common/Primitives";

export function WhyThisPropertyCard({ listing, quote }) {
  const reasons = getWhyThisProperty(listing, quote);
  return (
    <Card className="p-4">
      <div className="flex gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gold/15 text-gold"><Sparkles className="h-5 w-5" /></span><div><p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Why this home</p><h3 className="mt-1 text-xl font-black text-forest">Why this property may suit you</h3></div></div>
      <div className="mt-4 grid gap-2">{reasons.map((reason) => <div key={reason} className="rounded-2xl bg-linen px-4 py-3 text-sm font-bold text-forest">✓ {reason}</div>)}</div>
    </Card>
  );
}
