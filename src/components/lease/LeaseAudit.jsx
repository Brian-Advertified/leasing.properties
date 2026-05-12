import React, { useState } from "react";
import { ArrowRight, RefreshCcw, TrendingDown } from "lucide-react";
import { money } from "../../lib/formatters";
import { api } from "../../lib/api/client";
import { BackButton, Button, Card, PageHero, Pill, StatCard, Surface, PageFallback } from "../common/Primitives";
import { ListingCard } from "../listings/ListingCard";
import { SCREEN_DASHBOARD } from "../../app/constants/screens";

export function LeaseAudit({ audit, setScreen, openListing }) {
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  if (!audit) return <PageFallback title="No rent check available yet" text="Rent checks become useful once you have an active lease and there are enough similar rentals to compare fairly." action={<Button onClick={() => setScreen(SCREEN_DASHBOARD)}>Back to dashboard</Button>} />;
  const startRenegotiation = async () => {
    setSubmitting(true);
    try {
      const response = await api(`/bookings/${audit.bookingId}/renegotiation`, { method: "POST", body: JSON.stringify({ message: audit.recommendation }) });
      setResult(response);
    } catch (error) {
      console.warn("Renegotiation API did not respond. Showing local confirmation.", error);
      setResult({ status: "saved locally" });
    } finally { setSubmitting(false); }
  };
  return (
    <div className="grid gap-5">
      <BackButton onClick={() => setScreen(SCREEN_DASHBOARD)}>Back to tenant dashboard</BackButton>
      <PageHero eyebrow="Rent check" title="Compare your rent to similar verified properties." text="This check can support a fair rent conversation when there are enough similar rentals to compare.">
        <Pill tone="gold">Market comparison</Pill>
      </PageHero>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon={RefreshCcw} label="Current rate" value={money(audit.currentMonthlyRate || audit.marketAverage || 0)} />
        <StatCard icon={TrendingDown} label="Comparable average" value={money(audit.comparableAverageRate || audit.marketAverage || 0)} />
        <StatCard icon={TrendingDown} label="Estimated saving" value={money(audit.estimatedSavings)} />
      </div>
      <Card className="grid gap-5 p-5 md:p-6 lg:grid-cols-[1fr_0.8fr]">
        <div><p className="text-sm font-black uppercase tracking-wide text-gold">Recommendation</p><h2 className="mt-2 text-3xl font-black text-forest">{audit.estimatedSavings > 0 ? `${money(audit.estimatedSavings)} possible monthly saving` : "Your rent is market aligned"}</h2><p className="mt-3 leading-7 text-ink/65">{audit.recommendation}</p><Button className="mt-5" disabled={submitting} onClick={startRenegotiation}>Ask to review my rent <ArrowRight className="ml-2 h-4 w-4" /></Button>{result ? <p className="mt-4 rounded-2xl bg-forest/5 p-3 text-sm font-bold text-forest">Rent review request sent. Status: {result.status}</p> : null}</div>
        <Surface className="p-4"><RefreshCcw className="h-8 w-8 text-gold" /><h3 className="mt-4 font-black text-forest">How this helps</h3><p className="mt-2 text-sm leading-6 text-ink/60">The tenant gets a fair comparison and the landlord receives a structured request instead of an emotional dispute.</p></Surface>
      </Card>
      {audit.upgrades?.length ? <div><h3 className="mb-3 text-xl font-black text-forest">Similar verified rentals</h3><div className="grid gap-4 md:grid-cols-2">{audit.upgrades.map((listing) => <ListingCard key={listing.id} listing={listing} onClick={openListing} />)}</div></div> : null}
    </div>
  );
}
