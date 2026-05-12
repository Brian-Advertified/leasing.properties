import React from "react";
import { Wrench, ShieldAlert, ReceiptText } from "lucide-react";
import { Card } from "../common/Primitives";

export function LeaseSupportHub() {
  const items = [
    { icon: Wrench, title: "Maintenance help", text: "Report issues after move-in and keep a clear record." },
    { icon: ReceiptText, title: "Payment records", text: "Track rent, deposit and wallet confirmations in one place." },
    { icon: ShieldAlert, title: "Dispute support", text: "Raise a concern with context, photos and messages attached." }
  ];
  return <Card className="p-4"><p className="text-xs font-black uppercase tracking-[0.2em] text-gold">After move-in</p><h3 className="mt-1 text-xl font-black text-forest">Support does not stop after payment</h3><div className="mt-4 grid gap-3 md:grid-cols-3">{items.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl bg-linen p-3"><Icon className="h-5 w-5 text-gold" /><p className="mt-2 font-black text-forest">{title}</p><p className="mt-1 text-xs leading-5 text-ink/55">{text}</p></div>)}</div></Card>;
}
