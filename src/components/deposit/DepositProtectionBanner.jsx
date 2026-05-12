import React from "react";
import { LockKeyhole } from "lucide-react";

export function DepositProtectionBanner({ compact = false }) {
  return (
    <div className={`rounded-[1.5rem] border border-gold/25 bg-gold/10 ${compact ? "p-3" : "p-4"}`}>
      <div className="flex gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gold text-ink"><LockKeyhole className="h-5 w-5" /></span>
        <div>
          <p className="font-black text-forest">Your deposit is safely protected</p>
          <p className="mt-1 text-sm leading-6 text-ink/65">The deposit is tracked on the booking and only moves forward after payment confirmation and move-in checks.</p>
        </div>
      </div>
    </div>
  );
}
