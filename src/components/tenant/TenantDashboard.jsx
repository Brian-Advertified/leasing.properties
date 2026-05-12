import React from "react";
import { ArrowRight, CalendarDays, CheckCircle2, FileText, Gift, Home, KeyRound, MapPin, MessageCircle, Search, ShieldCheck, Sparkles, Wallet, Wrench } from "lucide-react";
import { money } from "../../lib/formatters";
import { ActionTile, Button, Card, EmptyState, Pill, Rating, StatCard, Verified } from "../common/Primitives";
import { SCREEN_DISCOVER, SCREEN_LEASE_PACK, SCREEN_MESSAGE_LANDLORD, SCREEN_MOVE_IN } from "../../app/constants/screens";
import { getHumanBookingStatus } from "../../utils/humanStatusMessages";
import { DepositProtectionBanner } from "../deposit/DepositProtectionBanner";
import { RenewalHub } from "../renewal/RenewalHub";
import { LeaseSupportHub } from "../support/LeaseSupportHub";

const statusOrder = ["tenant_verification_pending", "awaiting_property contact_review", "approved", "deposit_received", "deposit_secured", "active"];

export function TenantDashboard({ dashboard, runAudit, setScreen, openTenantProcess, gatewayCallback }) {
  if (!dashboard) return <DashboardLoading title="Preparing your dashboard" text="We are loading your rental journey and any recent payment update." />;
  const activeBooking = dashboard.bookings?.[0];
  const listing = activeBooking?.listing;
  const moveInDate = activeBooking?.startsAt ? new Date(activeBooking.startsAt).toLocaleDateString("en-ZA", { day: "numeric", month: "long" }) : "Pending";
  const human = getHumanBookingStatus(activeBooking?.status);
  const progressIndex = Math.max(statusOrder.indexOf(activeBooking?.status), 0);
  const progress = Math.min(100, Math.round(((progressIndex + 1) / statusOrder.length) * 100));
  const goToTenantProcess = (targetScreen) => {
    if (!activeBooking) return;
    openTenantProcess(targetScreen, activeBooking);
  };

  return (
    <div className="grid gap-6">
      {!activeBooking ? (
        <EmptyState title="Ready to find your next place?" text="Start with a verified listing, check if you qualify, reserve the property, request a viewing and submit your documents." action={<Button onClick={() => setScreen(SCREEN_DISCOVER)}>Find a property</Button>} />
      ) : (
        <>
          {gatewayCallback && <PaymentCallbackNotice callback={gatewayCallback} />}
          <section className="force-white relative overflow-hidden rounded-[2rem] border border-white/60 bg-[#181818] text-white shadow-premium">
            <img src={listing.lowDataImageUrl || listing.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-28" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/35" />
            <div className="relative grid gap-6 p-5 md:grid-cols-[1.1fr_0.75fr] md:p-8">
              <div className="flex min-h-[320px] flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-2"><Pill tone="gold">Your rental journey</Pill><Pill tone="white">{human.title}</Pill></div>
                  <h1 className="force-white mt-5 max-w-2xl text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">Your next home is moving forward.</h1>
                  <p className="force-muted-white mt-4 max-w-xl text-base leading-7 text-white/75">{human.text}</p>
                  <p className="force-white mt-3 max-w-xl rounded-2xl bg-white/10 p-3 text-sm font-bold text-white/85">Next: {human.next}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button variant="gold" onClick={() => goToTenantProcess(SCREEN_LEASE_PACK)}><FileText className="mr-2 h-4 w-4" /> View lease documents</Button>
                  <Button variant="glass" onClick={() => goToTenantProcess(SCREEN_MESSAGE_LANDLORD)}><MessageCircle className="mr-2 h-4 w-4" /> Message property contact</Button>
                  <Button variant="glass" onClick={() => setScreen(SCREEN_DISCOVER)}><Search className="mr-2 h-4 w-4" /> Browse another place</Button>
                </div>
              </div>

              <div className="rounded-[1.6rem] border border-white/15 bg-white/95 p-4 text-ink shadow-2xl backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">What matters now</p>
                <div className="mt-4 grid gap-3">
                  <HeroStatus icon={ShieldCheck} label="Documents" value={activeBooking.approvalStatus === "approved" ? "Approved" : "Being checked"} />
                  <HeroStatus icon={Wallet} label="Deposit" value={activeBooking.depositAmount ? `${money(activeBooking.depositAmount)} tracked` : "Not required yet"} />
                  <HeroStatus icon={CalendarDays} label="Move-in" value={moveInDate} />
                </div>
                <div className="mt-5 rounded-2xl bg-linen p-4">
                  <div className="flex items-center justify-between gap-3"><span className="text-sm font-black text-forest">Journey progress</span><span className="text-sm font-black text-gold">{progress}%</span></div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-forest/10"><div className="h-full rounded-full bg-gold" style={{ width: `${progress}%` }} /></div>
                  <p className="mt-3 text-xs leading-5 text-ink/60">This dashboard shows only the steps that matter to you. Support handles the background checks.</p>
                </div>
              </div>
            </div>
          </section>

          <div className="grid gap-4 md:grid-cols-3">
            <StatCard icon={Home} label="Current property" value={listing.suburb} text={listing.city} tone="warm" />
            <StatCard icon={Wallet} label="Move-in deposit" value={money(activeBooking.depositAmount || 0)} text="Tracked on your booking" tone="gold" />
            <StatCard icon={ShieldCheck} label="Application status" value={human.title} text={human.next} tone="green" />
          </div>

          <Card className="border-gold/20 bg-gold/10 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black text-forest">You can still apply for another rental.</p>
                <p className="mt-1 text-sm leading-6 text-ink/60">A pending application does not lock your profile. Each property has its own approval, viewing, documents and payment steps.</p>
              </div>
              <Button variant="secondary" onClick={() => setScreen(SCREEN_DISCOVER)}><Search className="mr-2 h-4 w-4" /> Find another verified place</Button>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[330px] overflow-hidden bg-forest">
                <img src={listing.lowDataImageUrl || listing.imageUrl} alt={listing.title} className="h-full w-full object-cover" />
                <div className="absolute inset-x-4 bottom-4 rounded-[1.4rem] border border-white/20 bg-black/45 p-4 text-white backdrop-blur-md">
                  <div className="flex flex-wrap items-center gap-2"><Verified label="Verified stock" /><Rating rating={listing.ratingAverage} count={listing.reviewCount} /></div>
                  <h2 className="mt-3 text-2xl font-black leading-tight">{listing.title}</h2>
                  <p className="mt-2 flex items-center gap-2 text-sm text-white/75"><MapPin className="h-4 w-4" /> {listing.suburb}, {listing.city}</p>
                </div>
              </div>

              <div className="grid gap-5 p-5 md:p-6">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Next best action</p>
                  <h3 className="mt-2 text-3xl font-black text-forest">Keep the rental moving.</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/60">Use these actions to review documents, ask questions and prepare for move-in.</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <Metric icon={Home} label="Lease term" value={`${activeBooking.leaseTermMonths || 12} months`} />
                  <Metric icon={Wallet} label="Deposit" value={money(activeBooking.depositAmount || 0)} />
                  <Metric icon={CalendarDays} label="Payment" value={(activeBooking.paymentStatus || "pending").replaceAll("_", " ")} />
                </div>

                <div className="grid gap-3">
                  <ActionTile icon={FileText} title="View your lease documents" text="Available once the property contact approves and the lease is generated." meta="Primary" onClick={() => goToTenantProcess(SCREEN_LEASE_PACK)} active />
                  <ActionTile icon={MessageCircle} title="Message property contact" text="Request information, ask for a change, confirm viewing or send a document." onClick={() => goToTenantProcess(SCREEN_MESSAGE_LANDLORD)} />
                  <ActionTile icon={KeyRound} title="Move-in checklist" text="Track keys, inspection, deposit protection and first payment status." onClick={() => goToTenantProcess(SCREEN_MOVE_IN)} />
                </div>

                <Button variant="secondary" className="w-full" onClick={() => runAudit(activeBooking.id)}>Check if your rent is still fair <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </div>
          </Card>

          {dashboard.bookings?.length > 1 ? <ApplicationsSwitcher bookings={dashboard.bookings} openTenantProcess={openTenantProcess} /> : null}

          <Card className="p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div><p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Progress</p><h3 className="mt-1 text-2xl font-black text-forest">Application timeline</h3><p className="mt-2 text-sm text-ink/60">You always know who is waiting and what happens next.</p></div>
              <Pill tone="sand">Guided journey</Pill>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-6">
              {statusOrder.map((status, index) => <TimelineStep key={status} title={getHumanBookingStatus(status).title} active={index === progressIndex} done={index < progressIndex} index={index} />)}
            </div>
          </Card>

          <div className="grid gap-5 lg:grid-cols-2"><DepositProtectionBanner /><RenewalHub /></div>
          <LeaseSupportHub />
          <TrustAndRewards dashboard={dashboard} />
        </>
      )}
    </div>
  );
}

function ApplicationsSwitcher({ bookings = [], openTenantProcess }) {
  return (
    <Card className="p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Your applications</p>
          <h3 className="mt-1 text-2xl font-black text-forest">Track more than one rental</h3>
          <p className="mt-2 text-sm leading-6 text-ink/60">You can apply for more than one property. Open the right application before viewing documents, messaging the property contact or preparing for move-in.</p>
        </div>
        <Pill tone="green">{bookings.length} active</Pill>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {bookings.map((booking) => {
          const listing = booking.listing || {};
          const human = getHumanBookingStatus(booking.status);
          return (
            <button key={booking.id} type="button" onClick={() => openTenantProcess(SCREEN_LEASE_PACK, booking)} className="rounded-2xl border border-forest/10 bg-white p-4 text-left transition hover:border-gold/40 hover:shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-black text-forest">{listing.title || "Rental application"}</p>
                  <p className="mt-1 text-sm text-ink/55">{[listing.suburb, listing.city].filter(Boolean).join(", ")}</p>
                </div>
                <Pill tone="sand">{human.title}</Pill>
              </div>
              <p className="mt-3 text-xs leading-5 text-ink/55">{human.next}</p>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function PaymentCallbackNotice({ callback }) {
  const message = callback.responseMessage || callback.message || "Payment update received";
  const code = callback.responseCode || callback.status || "received";
  return (
    <Card className="border-gold/25 bg-gold/10 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Payment update received</p>
          <p className="mt-1 text-sm font-bold text-forest">{message}</p>
          <p className="mt-1 text-xs text-ink/55">Reference: {callback.transactionId || callback.traceId || code}</p>
        </div>
        <Pill tone="green">URL cleaned</Pill>
      </div>
    </Card>
  );
}

function DashboardLoading({ title, text }) {
  return (
    <Card className="p-6">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Loading</p>
      <h2 className="mt-2 text-2xl font-black text-forest">{title}</h2>
      <p className="mt-2 text-sm text-ink/60">{text}</p>
    </Card>
  );
}

function HeroStatus({ icon: Icon, label, value }) {
  return <div className="flex items-center gap-3 rounded-2xl border border-forest/10 bg-white p-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-forest text-gold"><Icon className="h-5 w-5" /></span><span><span className="block text-xs font-black uppercase tracking-wide text-ink/40">{label}</span><span className="block font-black text-forest">{value}</span></span></div>;
}
function Metric({ icon: Icon, label, value }) { return <div className="rounded-2xl bg-linen p-4"><Icon className="h-5 w-5 text-gold" /><p className="mt-2 text-xs font-black uppercase tracking-wide text-ink/40">{label}</p><p className="mt-1 font-black capitalize text-forest">{value}</p></div>; }
function TimelineStep({ title, active, done, index }) {
  const state = done ? "bg-forest text-white" : active ? "bg-gold text-ink ring-4 ring-gold/20" : "bg-linen text-forest";
  return <div className={`rounded-[1.3rem] p-4 ${state}`}><span className={`grid h-8 w-8 place-items-center rounded-full text-xs font-black ${done ? "bg-white/15 text-gold" : active ? "bg-white/45" : "bg-white text-ink/40"}`}>{done ? <CheckCircle2 className="h-4 w-4" /> : index + 1}</span><p className="mt-4 text-sm font-black">{title}</p></div>;
}
function TrustAndRewards({ dashboard }) {
  return <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
    <Card className="p-5 md:p-6"><div className="flex items-start gap-4"><span className="grid h-14 w-14 place-items-center rounded-3xl bg-forest text-gold"><ShieldCheck className="h-7 w-7" /></span><div><p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Trust score</p><h3 className="mt-1 text-2xl font-black text-forest">Build a stronger tenant profile</h3><p className="mt-2 text-sm leading-6 text-ink/60">Verified documents, on-time payments, completed inspections and good reviews make future approvals easier.</p></div></div><div className="mt-5 grid gap-2"><TrustRow text="Identity and affordability checks improve confidence" /><TrustRow text="On-time payments can improve your tenant history" /><TrustRow text="Good reviews unlock better rental options" /></div></Card>
    <Card className="p-5 md:p-6"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Rewards</p><h3 className="mt-1 text-3xl font-black text-forest">{dashboard.rewards.points.toLocaleString("en-ZA")} points</h3><p className="mt-1 text-sm text-ink/60">Earn rewards for verified reviews, renewals, referrals and good tenant behaviour.</p></div><span className="grid h-14 w-14 place-items-center rounded-3xl bg-gold/15"><Gift className="h-8 w-8 text-gold" /></span></div><div className="mt-4 grid gap-3 md:grid-cols-3">{dashboard.rewards.vouchers.map((voucher) => <div key={voucher.id} className="rounded-2xl border border-forest/10 bg-linen p-4"><p className="text-sm font-black text-forest">{voucher.title}</p><p className="mt-1 text-xs text-ink/55">{voucher.partnerName}</p><p className="mt-3 inline-flex items-center rounded-full bg-gold/15 px-2 py-1 text-xs font-black text-forest"><Sparkles className="mr-1 h-3 w-3" /> {voucher.pointsCost} points</p></div>)}</div></Card>
  </div>;
}
function TrustRow({ text }) { return <div className="flex items-center gap-2 rounded-2xl bg-linen px-3 py-2 text-sm font-bold text-forest"><CheckCircle2 className="h-4 w-4 text-gold" /> {text}</div>; }
