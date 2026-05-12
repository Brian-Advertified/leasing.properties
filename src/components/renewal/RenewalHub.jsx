import React from "react";
import { RefreshCcw } from "lucide-react";
import { Card, Pill } from "../common/Primitives";

export function RenewalHub() {
  return (
    <Card className="p-4">
      <div className="flex gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-forest text-gold"><RefreshCcw className="h-5 w-5" /></span><div><p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Future lease support</p><h3 className="mt-1 text-xl font-black text-forest">Renew, renegotiate or relocate</h3><p className="mt-2 text-sm leading-6 text-ink/65">Once your lease is active, Listing.properties can remind you before renewal, compare similar homes and help you request a fair review.</p></div></div>
      <div className="mt-3 flex flex-wrap gap-2"><Pill tone="green">Renewal reminder</Pill><Pill tone="gold">Lease audit</Pill><Pill tone="sand">Similar homes</Pill></div>
    </Card>
  );
}
