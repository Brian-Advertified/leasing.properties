import React from "react";
import { CalendarDays, CheckCircle2, MapPin, MessageCircle } from "lucide-react";
import { formatViewingDateTime } from "../../lib/formatters";
import { Button, Card } from "../common/Primitives";

export function ViewingWorkflow({ availability = [], selectedSlot, setSelectedSlot, onRequest, result, viewingNotRequired = false, setViewingNotRequired }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Viewing</p><h3 className="mt-1 text-xl font-black text-forest">Choose a viewing time</h3><p className="mt-2 text-sm leading-6 text-ink/60">The landlord confirms the time, then you receive access details and directions.</p></div><CalendarDays className="h-6 w-6 text-gold" /></div>
      <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-2xl border border-forest/10 bg-linen p-3 text-sm font-bold text-forest">
        <input type="checkbox" className="mt-1 h-4 w-4 accent-[#ed1c24]" checked={viewingNotRequired} onChange={(event) => setViewingNotRequired?.(event.target.checked)} />
        <span>
          Viewing is not required or I have already viewed
          <span className="mt-1 block text-xs font-semibold leading-5 text-ink/55">This marks the viewing step as done and lets you submit the application.</span>
        </span>
      </label>
      <div className="mt-4 grid gap-2">
        {availability.slice(0, 3).map((day) => <div key={day.date} className={`rounded-2xl border border-forest/10 p-3 ${viewingNotRequired ? "bg-linen/55 opacity-60" : "bg-linen"}`}><p className="text-xs font-black text-forest">{day.weekday} {day.day} {day.month}</p><div className="mt-2 flex flex-wrap gap-2">{day.slots.map((slot) => <button key={slot.startsAt} disabled={viewingNotRequired} onClick={() => setSelectedSlot(slot.startsAt)} className={`rounded-full px-3 py-1 text-xs font-bold disabled:cursor-not-allowed ${selectedSlot === slot.startsAt ? "bg-[#181818] text-white" : "bg-white text-forest"}`}>{formatViewingDateTime(slot.startsAt).split(", ").pop()}</button>)}</div></div>)}
      </div>
      {selectedSlot ? <div className="mt-3 grid gap-2 rounded-2xl bg-white p-3 text-sm"><p className="font-black text-forest"><MapPin className="mr-1 inline h-4 w-4 text-gold" /> Selected: {formatViewingDateTime(selectedSlot)}</p><p className="text-ink/60"><MessageCircle className="mr-1 inline h-4 w-4 text-gold" /> After confirmation, ask questions through structured messages.</p></div> : null}
      {viewingNotRequired ? <p className="mt-3 rounded-2xl bg-gold/10 p-3 text-sm font-bold text-forest"><CheckCircle2 className="mr-1 inline h-4 w-4 text-gold" /> Viewing step marked as done.</p> : null}
      {result ? <p className="mt-3 rounded-2xl bg-forest/5 p-3 text-sm font-semibold text-forest">{result.message}</p> : null}
      <Button className="mt-3 w-full" variant="secondary" disabled={!selectedSlot || viewingNotRequired} onClick={onRequest}>Request viewing</Button>
    </Card>
  );
}
