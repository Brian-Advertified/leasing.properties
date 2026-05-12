import React from "react";
import { CalendarDays, MapPin, MessageCircle } from "lucide-react";
import { formatViewingDateTime } from "../../lib/formatters";
import { Button, Card, Pill } from "../common/Primitives";

export function ViewingWorkflow({ availability = [], selectedSlot, setSelectedSlot, onRequest, result }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Viewing</p><h3 className="mt-1 text-xl font-black text-forest">Choose a viewing time</h3><p className="mt-2 text-sm leading-6 text-ink/60">The landlord confirms the time, then you receive access details and directions.</p></div><CalendarDays className="h-6 w-6 text-gold" /></div>
      <div className="mt-4 grid gap-2">
        {availability.slice(0, 3).map((day) => <div key={day.date} className="rounded-2xl border border-forest/10 bg-linen p-3"><p className="text-xs font-black text-forest">{day.weekday} {day.day} {day.month}</p><div className="mt-2 flex flex-wrap gap-2">{day.slots.map((slot) => <button key={slot.startsAt} onClick={() => setSelectedSlot(slot.startsAt)} className={`rounded-full px-3 py-1 text-xs font-bold ${selectedSlot === slot.startsAt ? "bg-forest text-white" : "bg-white text-forest"}`}>{formatViewingDateTime(slot.startsAt).split(", ").pop()}</button>)}</div></div>)}
      </div>
      {selectedSlot ? <div className="mt-3 grid gap-2 rounded-2xl bg-white p-3 text-sm"><p className="font-black text-forest"><MapPin className="mr-1 inline h-4 w-4 text-gold" /> Selected: {formatViewingDateTime(selectedSlot)}</p><p className="text-ink/60"><MessageCircle className="mr-1 inline h-4 w-4 text-gold" /> After confirmation, ask questions through structured messages.</p></div> : null}
      {result ? <p className="mt-3 rounded-2xl bg-forest/5 p-3 text-sm font-semibold text-forest">{result.message}</p> : null}
      <Button className="mt-3 w-full" variant="secondary" disabled={!selectedSlot} onClick={onRequest}>Request viewing</Button>
    </Card>
  );
}
