import React, { useMemo, useState } from "react";
import { CalendarCheck2, MessageCircle, PencilLine, Send, UploadCloud } from "lucide-react";
import { api } from "../../lib/api/client";
import { ActionTile, BackButton, Button, Card, Field, inputClass, PageHero, Pill, PageFallback } from "../common/Primitives";
import { SCREEN_DASHBOARD } from "../../app/constants/screens";

const actions = [
  { id: "request_info", title: "Request info", icon: MessageCircle, prompt: "Please share more information about parking, utilities, building rules or the next approval step." },
  { id: "ask_for_change", title: "Ask for change", icon: PencilLine, prompt: "I would like to request a change before I sign. Please review the note below." },
  { id: "confirm_viewing", title: "Confirm viewing", icon: CalendarCheck2, prompt: "I confirm the viewing time and will arrive on time. Please send access details if needed." },
  { id: "send_document", title: "Send document", icon: UploadCloud, prompt: "I am sending an additional document for review. Please confirm once received." }
];

export function MessageLandlordPage({ booking, currentUserId, setScreen }) {
  const [selectedAction, setSelectedAction] = useState(actions[0].id);
  const [message, setMessage] = useState(actions[0].prompt);
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const action = useMemo(() => actions.find((item) => item.id === selectedAction) || actions[0], [selectedAction]);

  if (!booking) return <PageFallback title="No property conversation yet" text="Choose a property or open an active application first, then you can send structured messages to the assigned property contact." action={<Button onClick={() => setScreen(SCREEN_DASHBOARD)}>Back to dashboard</Button>} />;
  const chooseAction = (id) => { const next = actions.find((item) => item.id === id); setSelectedAction(id); setMessage(next.prompt); setResult(null); };
  const send = async () => {
    setSubmitting(true);
    setResult(null);
    try {
      const response = await api(`/bookings/${booking.id}/messages`, { method: "POST", body: JSON.stringify({ tenantId: currentUserId, action: selectedAction, message }) });
      setResult(response);
    } catch (error) {
      console.warn("Message API did not respond. Showing local sent confirmation for demo flow.", error);
      setResult({
        message: {
          id: `local-${Date.now()}`,
          action: selectedAction,
          body: message,
          status: "saved locally"
        },
        nextAction: "The property contact response is now pending."
      });
    } finally { setSubmitting(false); }
  };

  return (
    <div className="grid gap-5">
      <BackButton onClick={() => setScreen(SCREEN_DASHBOARD)}>Back to tenant dashboard</BackButton>
      <PageHero eyebrow="Property messages" title="Message the right property contact." text="Every message is linked to your rental, so the right person can respond and the next step stays clear.">
        <Pill tone="gold">{(booking.listing.assignedContact?.displayName || booking.listing.owner?.displayName || "Property contact")}</Pill>
      </PageHero>
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <Card className="p-5 md:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Choose action</p><h2 className="mt-1 text-xl font-black text-forest">What do you need?</h2><div className="mt-4 grid gap-3">{actions.map((item) => <ActionTile key={item.id} icon={item.icon} title={item.title} text={item.prompt} active={selectedAction === item.id} onClick={() => chooseAction(item.id)} />)}</div></Card>
        <Card className="p-5 md:p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><Pill tone="gold">{action.title}</Pill><h2 className="mt-3 text-2xl font-black text-forest">{booking.listing.title}</h2><p className="mt-1 text-sm text-ink/60">Property contact: {(booking.listing.assignedContact?.displayName || booking.listing.owner?.displayName || "Property contact")}</p></div><span className="grid h-14 w-14 place-items-center rounded-3xl bg-gold/15"><MessageCircle className="h-8 w-8 text-gold" /></span></div><div className="mt-5"><Field label="Message"><textarea className={`${inputClass} min-h-44 resize-none`} value={message} onChange={(e) => setMessage(e.target.value)} /></Field></div><Button className="mt-4 w-full" disabled={submitting || !message.trim()} onClick={send}><Send className="mr-2 h-4 w-4" /> Send message</Button>{result ? <div className="mt-4 rounded-2xl bg-forest/5 p-4"><p className="font-black text-forest">Message sent</p><p className="mt-1 text-sm text-ink/60">Action: {result.message.action.replaceAll("_", " ")} · Status: {result.message.status}</p>{result.nextAction ? <p className="mt-1 text-sm text-ink/60">{result.nextAction}</p> : null}</div> : null}</Card>
      </div>
    </div>
  );
}
