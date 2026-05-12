import React, { useMemo, useRef, useState } from "react";
import { ArrowRight, BriefcaseBusiness, CalendarDays, CheckCircle2, DoorOpen, FileText, Home, MessageCircle, ShieldCheck, UserRound, Wallet } from "lucide-react";
import { money } from "../../lib/formatters";
import { buildBookingRequest, getBookingQuote, isShortStayBooking, isWorkspaceBooking } from "../../features/bookings/bookingPricingEngine";
import { BackButton, Button, Field, inputClass, Pill, Rating, Verified } from "../common/Primitives";
import { SCREEN_DISCOVER } from "../../app/constants/screens";
import { QualificationPanel } from "../qualification/QualificationPanel";
import { ReservationCard } from "../reservation/ReservationCard";
import { ViewingWorkflow } from "../viewings/ViewingWorkflow";
import { FinanceCalculator } from "../finance/FinanceCalculator";

const addDays = (dateString, days) => {
  const date = new Date(`${dateString}T10:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

const getJourneyCopy = (listing) => {
  if (isWorkspaceBooking(listing)) {
    return {
      type: "workspace",
      badge: "Workspace",
      title: "Book the workspace your team needs.",
      intro: "Choose the date, time and hours. Confirm once, then arrive with access details ready.",
      primaryAction: "Book workspace",
      steps: ["Choose time", "Add company details", "Pay", "Receive access", "Use space"]
    };
  }
  if (isShortStayBooking(listing)) {
    return {
      type: "short",
      badge: "Short stay",
      title: "Book your stay up to check-in day.",
      intro: "Choose check-in and check-out dates, add guest details and receive clear arrival instructions.",
      primaryAction: "Book short stay",
      steps: ["Choose dates", "Add guests", "Pay", "Get check-in info", "Check in"]
    };
  }
  return {
    type: "long",
    badge: "Long lease",
    title: "Apply, get approved and move in without the clutter.",
    intro: "Create your account, complete the next action, and track the move-in process one step at a time.",
    primaryAction: "Start application",
    steps: ["Apply", "Budget check", "Viewing", "Get approved", "Move in"]
  };
};

export function ListingDetail({ listing, setScreen, submitBooking, requestViewing, bookingResult, bookingError, bookingSubmitting, viewingResult, currentUserId }) {
  const gallery = listing.imageGallery?.length ? listing.imageGallery : [{ medium: listing.imageUrl, large: listing.imageUrl }];
  const [selectedImage, setSelectedImage] = useState(gallery[0]?.large || listing.imageUrl);
  const [startDate, setStartDate] = useState(listing.availableFrom || new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(addDays(listing.availableFrom || new Date().toISOString().slice(0, 10), 2));
  const [startTime, setStartTime] = useState("09:00");
  const [workspaceHours, setWorkspaceHours] = useState(2);
  const [leaseMonths, setLeaseMonths] = useState(6);
  const [selectedViewingSlot, setSelectedViewingSlot] = useState(listing.viewingAvailability?.[0]?.slots?.[0]?.startsAt || "");
  const [affordability, setAffordability] = useState({ netIncome: "", expenses: {} });
  const [qualificationChecked, setQualificationChecked] = useState(false);
  const [reserved, setReserved] = useState(false);
  const [viewingNotRequired, setViewingNotRequired] = useState(false);
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [applicationStep, setApplicationStep] = useState("account");
  const [accountCreated, setAccountCreated] = useState(Boolean(currentUserId));
  const [profileComplete, setProfileComplete] = useState(false);
  const [applicantProfile, setApplicantProfile] = useState({ fullName: "", email: "", phone: "", currentAddress: "", employer: "" });
  const applicationRef = useRef(null);

  const journey = useMemo(() => getJourneyCopy(listing), [listing]);
  const quote = useMemo(() => getBookingQuote({ listing, startDate, endDate, leaseMonths, workspaceHours }), [listing, startDate, endDate, leaseMonths, workspaceHours]);
  const viewingComplete = viewingNotRequired || Boolean(viewingResult);
  const canSubmitLongLease = accountCreated && profileComplete && qualificationChecked && reserved && viewingComplete;
  const canBookInstant = accountCreated && profileComplete;

  const viewing = () => requestViewing({ listingId: listing.id, tenantId: currentUserId, requestedAt: selectedViewingSlot, note: "I want to view this property before I apply." });
  const book = () => submitBooking(buildBookingRequest({ listing, userId: currentUserId, startDate, startTime, quote, applicationPack: { applicantProfile, affordability, viewing: viewingNotRequired ? "not_required_or_already_viewed" : "requested" } }));
  const updateProfile = (field, value) => setApplicantProfile((current) => ({ ...current, [field]: value }));

  const openFlow = (target) => {
    setApplicationOpen(true);
    if (target) setApplicationStep(target);
    else setApplicationStep(!accountCreated ? "account" : !profileComplete ? "profile" : quote.instant ? "confirm" : qualificationChecked ? (reserved ? (viewingComplete ? "submit" : "viewing") : "reserve") : "qualify");
    window.setTimeout(() => applicationRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  return (
    <div className="renter-modern mx-auto max-w-6xl px-2 pb-10">
      <BackButton onClick={() => setScreen(SCREEN_DISCOVER)}>Back to listings</BackButton>

      <section className="modern-hero mt-5">
        <div className="modern-hero-image">
          <img src={selectedImage} alt={listing.title} />
          <div className="modern-hero-overlay" />
          <div className="modern-hero-badges">
            <Verified label="Verified" />
            <Pill tone="white">{journey.badge}</Pill>
          </div>
          {gallery.length > 1 ? (
            <div className="modern-gallery-rail" aria-label="Property gallery">
              {gallery.slice(0, 8).map((image, index) => {
                const imageSrc = image.thumb || image.medium || image.large;
                const targetSrc = image.large || image.medium || image.thumb;
                const isSelected = targetSrc === selectedImage;
                return (
                  <button key={`${targetSrc}-${index}`} type="button" className={isSelected ? "is-selected" : ""} onClick={() => setSelectedImage(targetSrc)} aria-label={`Show gallery image ${index + 1}`}>
                    <img src={imageSrc} alt="" loading="lazy" />
                  </button>
                );
              })}
            </div>
          ) : null}
          <div className="modern-hero-copy">
            <p>{listing.suburb}, {listing.city}</p>
            <h1>{listing.title}</h1>
          </div>
        </div>

        <aside className="modern-booking-card">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="modern-eyebrow">{quote.instant ? "Booking details" : "Rental details"}</p>
              <h2>{money(listing.priceAmount)}<span>/{listing.priceUnit}</span></h2>
            </div>
            <Rating rating={listing.ratingAverage} count={listing.reviewCount} />
          </div>
          <p className="modern-description">{listing.description}</p>

          <div className="modern-stat-grid">
            <SoftStat label={quote.instant ? "Total now" : "Move-in cost"} value={money(quote.moveInCost)} />
            <SoftStat label={quote.instant ? "Duration" : "Lease term"} value={quote.instant ? `${quote.quantity} ${listing.priceUnit}${quote.quantity > 1 ? "s" : ""}` : `${leaseMonths} months`} />
            <SoftStat label="Available" value={listing.availableFrom ? new Date(listing.availableFrom).toLocaleDateString("en-ZA", { day: "numeric", month: "short" }) : "Now"} />
          </div>

          <div className="modern-input-panel">
            {journey.type === "workspace" ? <Field label="Date"><input type="date" className={inputClass} value={startDate} onChange={(e) => setStartDate(e.target.value)} /></Field> : null}
            {journey.type === "workspace" ? <Field label="Start time"><input type="time" className={inputClass} value={startTime} onChange={(e) => setStartTime(e.target.value)} /></Field> : null}
            {journey.type === "workspace" ? <Field label="Hours"><select className={inputClass} value={workspaceHours} onChange={(e) => setWorkspaceHours(Number(e.target.value))}><option value={2}>2 hours</option><option value={4}>4 hours</option><option value={8}>Full day</option></select></Field> : null}
            {journey.type === "short" ? <Field label="Check-in"><input type="date" className={inputClass} value={startDate} onChange={(e) => setStartDate(e.target.value)} /></Field> : null}
            {journey.type === "short" ? <Field label="Check-out"><input type="date" className={inputClass} value={endDate} onChange={(e) => setEndDate(e.target.value)} /></Field> : null}
            {journey.type === "long" ? <Field label="Rental period"><select className={inputClass} value={leaseMonths} onChange={(e) => setLeaseMonths(Number(e.target.value))}><option value={6}>6 months</option><option value={8}>8 months</option><option value={12}>12 months</option></select></Field> : null}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Button onClick={() => openFlow()} className="modern-primary-action">{applicationOpen ? "Continue" : journey.primaryAction}<ArrowRight className="ml-2 h-4 w-4" /></Button>
            <button type="button" onClick={() => openFlow("viewing")} className="modern-secondary-action">Book viewing</button>
          </div>
        </aside>
      </section>

      <section className="modern-next-card mt-5">
        <div>
          <p className="modern-eyebrow">Next step</p>
          <h2>{applicationOpen ? stepLabel(applicationStep, journey.type) : journey.title}</h2>
          <p>{applicationOpen ? "Only the action you need right now is shown below." : journey.intro}</p>
        </div>
        <button type="button" onClick={() => openFlow()}>{applicationOpen ? "Continue step" : "Start now"}<ArrowRight className="h-4 w-4" /></button>
      </section>

      {applicationOpen ? (
        <section ref={applicationRef} className="modern-flow-card mt-5 scroll-mt-28">
          <div className="modern-flow-head">
            <div>
              <p className="modern-eyebrow">{quote.instant ? "Booking" : "Application"}</p>
              <h3>Complete one step at a time</h3>
            </div>
            <button type="button" onClick={() => setApplicationOpen(false)}>Close</button>
          </div>

          {quote.instant ? (
            <InstantBookingFlow applicationStep={applicationStep} setApplicationStep={setApplicationStep} accountCreated={accountCreated} setAccountCreated={setAccountCreated} profileComplete={profileComplete} profile={applicantProfile} updateProfile={updateProfile} saveProfile={() => { setProfileComplete(true); setApplicationStep("confirm"); }} quote={quote} listing={listing} journey={journey} canBook={canBookInstant} submitting={bookingSubmitting} onBook={book} />
          ) : (
            <LongLeaseFlow applicationStep={applicationStep} setApplicationStep={setApplicationStep} accountCreated={accountCreated} setAccountCreated={setAccountCreated} profileComplete={profileComplete} profile={applicantProfile} updateProfile={updateProfile} saveProfile={() => { setProfileComplete(true); setApplicationStep("qualify"); }} qualificationChecked={qualificationChecked} setQualificationChecked={setQualificationChecked} reserved={reserved} setReserved={setReserved} viewingComplete={viewingComplete} canSubmitLongLease={canSubmitLongLease} listing={listing} quote={quote} affordability={affordability} setAffordability={setAffordability} selectedViewingSlot={selectedViewingSlot} setSelectedViewingSlot={setSelectedViewingSlot} viewing={viewing} viewingResult={viewingResult} viewingNotRequired={viewingNotRequired} setViewingNotRequired={setViewingNotRequired} setScreen={setScreen} submitting={bookingSubmitting} book={book} />
          )}
          {bookingError ? <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700">{bookingError.message || String(bookingError)}</p> : null}
          {bookingResult ? <p className="mt-4 rounded-2xl bg-emerald-50 p-3 text-sm font-bold text-emerald-800">Saved. Your next step is now on your dashboard.</p> : null}
        </section>
      ) : null}

      <section className="modern-bottom-grid mt-5">
        <div className="modern-timeline-card">
          <p className="modern-eyebrow">Journey</p>
          <h3>Clear path to completion</h3>
          <div className="modern-timeline">
            {journey.steps.map((item, index) => <TimelineStep key={item} number={index + 1} label={item} active={index === 0} />)}
          </div>
        </div>
        <div className="modern-help-card">
          <MessageCircle className="h-5 w-5 text-gold" />
          <h3>Need help?</h3>
          <p>Ask the assigned contact about viewings, payments or access before you continue.</p>
          <button type="button" onClick={() => openFlow("viewing")}>Message / arrange viewing</button>
          <button type="button" onClick={() => setScreen(SCREEN_DISCOVER)}>Browse other places</button>
        </div>
      </section>

      {!quote.instant ? (
        <section className="mt-5">
          <FinanceCalculator listing={listing} quote={quote} />
        </section>
      ) : null}
    </div>
  );
}

function LongLeaseFlow(props) {
  const { applicationStep, setApplicationStep, accountCreated, setAccountCreated, profileComplete, profile, updateProfile, saveProfile, qualificationChecked, setQualificationChecked, reserved, setReserved, viewingComplete, canSubmitLongLease, listing, quote, affordability, setAffordability, selectedViewingSlot, setSelectedViewingSlot, viewing, viewingResult, viewingNotRequired, setViewingNotRequired, setScreen, submitting, book } = props;
  return <>
    <StepTabs>
      <StepTab active={applicationStep === "account"} done={accountCreated} onClick={() => setApplicationStep("account")}>Account</StepTab>
      <StepTab active={applicationStep === "profile"} done={profileComplete} disabled={!accountCreated} onClick={() => setApplicationStep("profile")}>Your details</StepTab>
      <StepTab active={applicationStep === "qualify"} done={qualificationChecked} disabled={!accountCreated || !profileComplete} onClick={() => setApplicationStep("qualify")}>Budget</StepTab>
      <StepTab active={applicationStep === "reserve"} done={reserved} disabled={!qualificationChecked} onClick={() => setApplicationStep("reserve")}>Reserve</StepTab>
      <StepTab active={applicationStep === "viewing"} done={viewingComplete} disabled={!reserved} onClick={() => setApplicationStep("viewing")}>Viewing</StepTab>
      <StepTab active={applicationStep === "submit"} disabled={!canSubmitLongLease} onClick={() => setApplicationStep("submit")}>Submit</StepTab>
    </StepTabs>
    <div className="modern-step-body">
      {applicationStep === "account" ? <AccountStep created={accountCreated} onCreate={() => { setAccountCreated(true); setApplicationStep("profile"); }} /> : null}
      {applicationStep === "profile" ? <ProfileStep profile={profile} setProfile={updateProfile} complete={profileComplete} onSave={saveProfile} /> : null}
      {applicationStep === "qualify" ? <QualificationPanel listing={listing} quote={quote} affordability={affordability} setAffordability={setAffordability} checked={qualificationChecked} setChecked={(checked) => { setQualificationChecked(checked); if (checked) setApplicationStep("reserve"); }} onShowAlternatives={() => { setScreen(SCREEN_DISCOVER); }} compact /> : null}
      {applicationStep === "reserve" ? <ReservationCard reserved={reserved} disabled={!qualificationChecked} onReserve={() => { setReserved(true); setApplicationStep("viewing"); }} compact /> : null}
      {applicationStep === "viewing" ? <ViewingWorkflow availability={listing.viewingAvailability} selectedSlot={selectedViewingSlot} setSelectedSlot={setSelectedViewingSlot} onRequest={viewing} result={viewingResult} viewingNotRequired={viewingNotRequired} setViewingNotRequired={(checked) => { setViewingNotRequired(checked); if (checked) setApplicationStep("submit"); }} compact /> : null}
      {applicationStep === "submit" ? <SubmitBox canSubmit={canSubmitLongLease} submitting={submitting} onSubmit={book} /> : null}
    </div>
  </>;
}

function InstantBookingFlow({ applicationStep, setApplicationStep, accountCreated, setAccountCreated, profileComplete, profile, updateProfile, saveProfile, quote, listing, journey, canBook, submitting, onBook }) {
  return <>
    <StepTabs>
      <StepTab active={applicationStep === "account"} done={accountCreated} onClick={() => setApplicationStep("account")}>Account</StepTab>
      <StepTab active={applicationStep === "profile"} done={profileComplete} disabled={!accountCreated} onClick={() => setApplicationStep("profile")}>{journey.type === "workspace" ? "Company details" : "Guest details"}</StepTab>
      <StepTab active={applicationStep === "confirm"} disabled={!canBook} onClick={() => setApplicationStep("confirm")}>Confirm</StepTab>
    </StepTabs>
    <div className="modern-step-body">
      {applicationStep === "account" ? <AccountStep created={accountCreated} onCreate={() => { setAccountCreated(true); setApplicationStep("profile"); }} /> : null}
      {applicationStep === "profile" ? <ProfileStep profile={profile} setProfile={updateProfile} complete={profileComplete} onSave={saveProfile} /> : null}
      {applicationStep === "confirm" ? <ConfirmBox quote={quote} listing={listing} canBook={canBook} submitting={submitting} onBook={onBook} /> : null}
    </div>
  </>;
}

function AccountStep({ created, onCreate }) {
  return <div className="modern-inner-panel"><p className="modern-eyebrow">Create account</p><h4>Save your journey before you continue</h4><p>Your account keeps applications, bookings, affordability and messages in one secure place.</p><div className="modern-mini-grid"><MiniStep icon={UserRound} title="Your profile" text="Add contact details once." /><MiniStep icon={FileText} title="Affordability" text="Capture income and expenses." /><MiniStep icon={ShieldCheck} title="Your status" text="Track every next step." /></div><Button className="mt-5 px-5 py-3" onClick={onCreate}>{created ? "Continue" : "Create account and continue"}<ArrowRight className="ml-2 h-4 w-4" /></Button></div>;
}

function ProfileStep({ profile, setProfile, complete, onSave }) {
  return <div className="modern-inner-panel"><p className="modern-eyebrow">Your details</p><h4>Tell the property contact who is booking</h4><p>These details are used for updates, access instructions and final confirmation.</p><div className="mt-5 grid gap-3 md:grid-cols-2"><Field label="Full name / company name"><input className={inputClass} value={profile.fullName} onChange={(e) => setProfile("fullName", e.target.value)} placeholder="Name or company" /></Field><Field label="Phone number"><input className={inputClass} value={profile.phone} onChange={(e) => setProfile("phone", e.target.value)} placeholder="e.g. +27821234567" /></Field><Field label="Email address"><input className={inputClass} value={profile.email} onChange={(e) => setProfile("email", e.target.value)} placeholder="you@example.com" /></Field><Field label="Employer or company"><input className={inputClass} value={profile.employer} onChange={(e) => setProfile("employer", e.target.value)} placeholder="Company, self-employed or other" /></Field><div className="md:col-span-2"><Field label="Current address"><input className={inputClass} value={profile.currentAddress} onChange={(e) => setProfile("currentAddress", e.target.value)} placeholder="Where you currently stay or trade from" /></Field></div></div><Button className="mt-5 px-5 py-3" onClick={onSave}>{complete ? "Details saved" : "Save details and continue"}<ArrowRight className="ml-2 h-4 w-4" /></Button></div>;
}

function ConfirmBox({ quote, listing, canBook, submitting, onBook }) {
  return <div className="modern-inner-panel"><p className="modern-eyebrow">Confirm booking</p><h4>Pay {money(quote.dueBeforeConfirmation)} to secure this booking</h4><p>We will save the booking, confirm the time with the host and place the details on your dashboard.</p><div className="modern-stat-grid mt-5"><SoftStat label="Space" value={listing.title} /><SoftStat label="Duration" value={`${quote.quantity} ${listing.priceUnit}${quote.quantity > 1 ? "s" : ""}`} /><SoftStat label="Total" value={money(quote.rentalTotal)} /></div><Button className="mt-5 px-5 py-3" disabled={!canBook || submitting} onClick={onBook}>{submitting ? "Confirming..." : "Pay and confirm"}<ArrowRight className="ml-2 h-4 w-4" /></Button></div>;
}

function SubmitBox({ canSubmit, submitting, onSubmit }) {
  return <div className="modern-inner-panel"><p className="modern-eyebrow">Final step</p><h4>Ready to send your application</h4><p>Submitting creates the rental application, sends your profile, affordability summary, lease dates and viewing status to the assigned property contact, and puts the application on your dashboard for landlord review.</p><Button className="mt-5 px-5 py-3" disabled={!canSubmit || submitting} onClick={onSubmit}>{submitting ? "Submitting..." : "Submit application"}<ArrowRight className="ml-2 h-4 w-4" /></Button></div>;
}

function StepTabs({ children }) { return <div className="modern-step-tabs">{children}</div>; }
function StepTab({ active, done, disabled, onClick, children }) { return <button type="button" disabled={disabled} onClick={onClick} className={`modern-step-tab ${active ? "is-active" : ""} ${done ? "is-done" : ""}`}>{done ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}{children}</button>; }
function TimelineStep({ number, label, active }) { return <div className={`modern-timeline-step ${active ? "is-active" : ""}`}><span>{number}</span><strong>{label}</strong></div>; }
function SoftStat({ label, value }) { return <div className="modern-soft-stat"><span>{label}</span><strong>{value}</strong></div>; }
function MiniStep({ icon: Icon, title, text }) { return <div className="modern-mini-step"><Icon className="h-5 w-5" /><div><strong>{title}</strong><span>{text}</span></div></div>; }
function stepLabel(step, type) {
  const labels = { account: "Create account", profile: type === "workspace" ? "Company details" : type === "short" ? "Guest details" : "Your details", qualify: "Budget check", reserve: "Reserve home", viewing: "Viewing", submit: "Submit application", confirm: "Pay and confirm" };
  return labels[step] || "Next step";
}
