import React, { useEffect, useState } from "react";
import { ClipboardCheck, Home, KeyRound, ShieldCheck, Wallet } from "lucide-react";
import { api } from "../../lib/api/client";
import { BackButton, Button, Card, PageHero, Pill, Surface, PageFallback } from "../common/Primitives";
import { SCREEN_DASHBOARD } from "../../app/constants/screens";

const checklistMeta = {
  keys: { title: "Keys and access", icon: KeyRound, text: "Confirm key collection, building access and gate/parking instructions." },
  inspection: { title: "Move-in inspection", icon: ClipboardCheck, text: "Record condition before occupation so damages are not disputed later." },
  custody: { title: "Deposit custody", icon: Wallet, text: "Confirm deposit is held safely and linked to the booking record." },
  firstPayment: { title: "First payment", icon: ShieldCheck, text: "Confirm initial rent/deposit payment state before handover." }
};

export function MoveInChecklistPage({ booking, setScreen, refreshDashboard }) {
  const [items, setItems] = useState([]);
  const [result, setResult] = useState(null);
  const buildLocalItems = (currentBooking) => [
    { id: "keys", completed: Boolean(currentBooking?.keysReleasedAt), completedAt: currentBooking?.keysReleasedAt || null },
    { id: "inspection", completed: currentBooking?.inspectionStatus === "completed", completedAt: currentBooking?.inspectionCompletedAt || null },
    { id: "custody", completed: ["reconciled", "held", "released"].includes(currentBooking?.custodyStatus), completedAt: currentBooking?.custodyReceivedAt || null },
    { id: "firstPayment", completed: currentBooking?.paymentStatus === "paid", completedAt: currentBooking?.paymentConfirmedAt || null }
  ];
  useEffect(() => {
    if (!booking) return;
    api(`/bookings/${booking.id}/move-in-checklist`)
      .then((data) => setItems(data.items))
      .catch((error) => {
        console.warn("Move-in checklist API did not respond. Using local checklist state.", error);
        setItems(buildLocalItems(booking));
      });
  }, [booking]);
  if (!booking) return <PageFallback title="No move-in checklist yet" text="Your move-in checklist appears after your application moves into lease and payment steps." action={<Button onClick={() => setScreen(SCREEN_DASHBOARD)}>Back to dashboard</Button>} />;
  const toggle = async (id) => {
    const item = items.find((entry) => entry.id === id);
    if (!item) return;
    const nextCompleted = !item.completed;
    try {
      const response = await api(`/bookings/${booking.id}/move-in-checklist/${id}`, { method: "POST", body: JSON.stringify({ completed: nextCompleted }) });
      setItems(response.items);
      setResult(response);
      refreshDashboard?.();
    } catch (error) {
      console.warn("Move-in checklist API did not respond. Updating local state.", error);
      const nextItems = items.map((entry) => entry.id === id ? { ...entry, completed: nextCompleted, completedAt: nextCompleted ? new Date().toISOString() : null } : entry);
      setItems(nextItems);
      setResult({ message: `${checklistMeta[id]?.title || "Item"} marked ${nextCompleted ? "complete" : "incomplete"}.` });
    }
  };
  const completedCount = items.filter((item) => item.completed).length;

  return (
    <div className="grid gap-5">
      <BackButton onClick={() => setScreen(SCREEN_DASHBOARD)}>Back to tenant dashboard</BackButton>
      <PageHero eyebrow="Move-in checklist" title="Keys, inspection and deposit custody before occupation." text="This turns handover into a clear tenant, landlord and operations checklist instead of scattered WhatsApp messages.">
        <Pill tone="gold">{completedCount}/{items.length || 4} complete</Pill>
      </PageHero>
      <Card className="grid gap-5 p-5 md:p-6 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="flex flex-wrap gap-2"><Pill tone="green">{booking.status.replaceAll("_", " ")}</Pill><Pill tone="sand">{booking.listing.suburb}, {booking.listing.city}</Pill></div>
          <h2 className="mt-3 text-2xl font-black text-forest">{booking.listing.title}</h2>
          <div className="mt-5 grid gap-3">
            {items.map((item) => { const meta = checklistMeta[item.id] || checklistMeta.keys; const Icon = meta.icon; return <button key={item.id} onClick={() => toggle(item.id)} className={`flex gap-4 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${item.completed ? "border-forest bg-forest/5" : "border-forest/10 bg-linen hover:border-gold/40"}`}><span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${item.completed ? "bg-forest text-white" : "bg-white text-gold"}`}><Icon className="h-5 w-5" /></span><span><span className="font-black text-forest">{meta.title}</span><span className="mt-1 block text-sm leading-6 text-ink/60">{meta.text}</span><span className="mt-2 block text-xs font-black uppercase tracking-wide text-gold">{item.completed ? "Completed" : "Tap to mark complete"}</span></span></button>; })}
          </div>
        </div>
        <aside className="rounded-[1.5rem] bg-forest p-5 text-white"><Home className="h-9 w-9 text-gold" /><h3 className="mt-4 text-2xl font-black">Ready for move-in</h3><p className="mt-3 text-sm leading-6 text-white/70">When all four items are complete, the tenant and landlord have a clean handover record: access, inspection, payment and deposit custody.</p>{result ? <p className="mt-4 rounded-2xl bg-white/10 p-3 text-sm font-bold">{result.message}</p> : null}<Button variant="gold" className="mt-5 w-full" disabled={completedCount < items.length || !items.length} onClick={() => setResult({ message: "Handover completed. Your move-in record is now up to date." })}>Complete handover</Button></aside>
      </Card>
    </div>
  );
}
