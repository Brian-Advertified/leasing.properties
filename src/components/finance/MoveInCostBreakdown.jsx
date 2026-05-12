import React from "react";
import { WalletCards } from "lucide-react";
import { money } from "../../lib/formatters";
import { Card, Pill } from "../common/Primitives";

export function MoveInCostBreakdown({ listing, quote }) {
  const rows = quote.instant
    ? [
        ["Booking total", quote.rentalTotal],
        ["Fees shown before payment", 0]
      ]
    : [
        ["First month rent", quote.firstMonthRent],
        ["Refundable deposit", quote.depositAmount],
        ["Admin fee", quote.adminFee],
        ["Estimated utilities", Math.round((listing?.priceAmount || 0) * 0.12)]
      ];
  const total = quote.instant ? quote.rentalTotal : quote.moveInCost + Math.round((listing?.priceAmount || 0) * 0.12);
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Cost clarity</p>
          <h3 className="mt-1 text-xl font-black text-forest">Know the full cost before you apply</h3>
        </div>
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gold/15 text-gold"><WalletCards className="h-5 w-5" /></span>
      </div>
      <div className="mt-4 grid gap-2">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between rounded-2xl bg-linen px-4 py-3 text-sm">
            <span className="font-bold text-ink/65">{label}</span>
            <span className="font-black text-forest">{value ? money(value) : "Included"}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-2xl bg-forest px-4 py-4 text-white">
        <span className="font-black">Estimated move-in amount</span>
        <span className="text-xl font-black text-gold">{money(total)}</span>
      </div>
      <p className="mt-3 text-xs leading-5 text-ink/55">This estimate helps tenants avoid surprises. Final utility and once-off amounts may be confirmed by the landlord before signing.</p>
      <div className="mt-3"><Pill tone="green">No hidden costs before confirmation</Pill></div>
    </Card>
  );
}
