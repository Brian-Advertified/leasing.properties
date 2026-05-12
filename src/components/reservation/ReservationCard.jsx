import React from "react";
import { Clock3, ShieldCheck } from "lucide-react";
import { Button, Card, Pill } from "../common/Primitives";

export function ReservationCard({ reserved, onReserve, disabled }) {
  return (
    <Card className="p-4">
      <div className="flex gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-forest text-gold"><Clock3 className="h-5 w-5" /></span>
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="font-black text-forest">Reserve this property</h3>{reserved ? <Pill tone="green">48-hour hold active</Pill> : <Pill tone="gold">Recommended</Pill>}</div>
          <p className="mt-2 text-sm leading-6 text-ink/65">Hold the property while you finish documents and the landlord reviews your application. This prevents confusion where multiple people apply for the same home at the same time.</p>
          {reserved ? <p className="mt-3 rounded-2xl bg-linen p-3 text-sm font-bold text-forest">This property is reserved for you for the next 48 hours. Complete the application before the hold expires.</p> : <Button className="mt-3" variant="secondary" disabled={disabled} onClick={onReserve}><ShieldCheck className="mr-2 h-4 w-4" /> Reserve for 48 hours</Button>}
        </div>
      </div>
    </Card>
  );
}
