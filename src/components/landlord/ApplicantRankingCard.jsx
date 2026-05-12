import React, { useState } from "react";
import { BadgeCheck, CheckCircle2, Clock, FileCheck2, Info, ShieldAlert, TrendingUp, XCircle } from "lucide-react";
import { Button, Pill, Surface } from "../common/Primitives";

const actionCopy = {
  approve: {
    title: "Approve applicant",
    busy: "Approving...",
    done: "Approved",
    note: "Application approved. The tenant can now review the lease documents and complete payment."
  },
  "request-info": {
    title: "Ask for more info",
    busy: "Sending request...",
    done: "Info requested",
    note: "More information has been requested from the tenant."
  },
  decline: {
    title: "Decline politely",
    busy: "Declining...",
    done: "Declined",
    note: "Application declined politely. The tenant can continue searching for other options."
  }
};

export function ApplicantRankingCard({ app, updateApplication }) {
  const [busyAction, setBusyAction] = useState(null);
  const [localNote, setLocalNote] = useState(null);
  const score = typeof app.affordabilityScore === "number" ? app.affordabilityScore : app.affordabilityScore === "strong" ? 92 : 68;
  const riskTone = app.riskLevel === "low" ? "green" : "gold";
  const isFinal = ["approved", "declined"].includes(app.approvalStatus) || ["approved", "declined"].includes(app.status);

  const act = async (action) => {
    if (busyAction || isFinal) return;
    setBusyAction(action);
    setLocalNote(null);
    try {
      await updateApplication(app.id, action);
      setLocalNote(actionCopy[action].note);
    } catch (error) {
      setLocalNote("We could not save that decision. Please try again.");
    } finally {
      setBusyAction(null);
    }
  };

  const shownNote = localNote || app.landlordActionNote;

  return (
    <Surface className="overflow-hidden p-0">
      <div className="grid gap-0 lg:grid-cols-[1fr_260px]">
        <div className="p-4 md:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xl font-black text-forest">{app.tenant.displayName}</p>
              <p className="mt-1 text-sm text-ink/55">Applying for {app.listing.title}</p>
            </div>
            <div className="flex flex-wrap gap-2"><Pill tone={riskTone}>{app.riskLevel} risk</Pill><Pill tone="gold">{score}% match</Pill></div>
          </div>
          <p className="mt-3 rounded-2xl bg-white p-3 text-sm font-bold text-forest">This applicant appears to be {score >= 85 ? "a strong match" : "worth reviewing"}. Check the documents and affordability before making a decision.</p>
          <div className="mt-4 grid gap-2 md:grid-cols-4"><Mini icon={BadgeCheck} label="Identity" value={app.tenant.verificationStatus} /><Mini icon={FileCheck2} label="Documents" value={app.documentsComplete ? "Complete" : "Missing"} /><Mini icon={TrendingUp} label="Affordability" value={`${score}%`} /><Mini icon={Clock} label="Status" value={(app.status || "review").replaceAll("_", " ")} /></div>
          {shownNote ? <p className="mt-3 rounded-2xl border border-forest/10 bg-white p-3 text-sm font-bold text-forest">{shownNote}</p> : null}
        </div>
        <div className="flex flex-col justify-center gap-2 border-t border-forest/10 bg-white p-4 lg:border-l lg:border-t-0">
          <Button onClick={() => act("approve")} disabled={busyAction || isFinal} className="w-full py-2">
            <CheckCircle2 className="mr-2 h-4 w-4" /> {busyAction === "approve" ? actionCopy.approve.busy : isFinal && app.approvalStatus === "approved" ? actionCopy.approve.done : actionCopy.approve.title}
          </Button>
          <Button variant="secondary" onClick={() => act("request-info")} disabled={busyAction || isFinal} className="w-full py-2">
            <Info className="mr-2 h-4 w-4" /> {busyAction === "request-info" ? actionCopy["request-info"].busy : actionCopy["request-info"].title}
          </Button>
          <Button variant="secondary" onClick={() => act("decline")} disabled={busyAction || isFinal} className="w-full py-2" style={{ color: "#b91c1c" }}>
            <XCircle className="mr-2 h-4 w-4" /> {busyAction === "decline" ? actionCopy.decline.busy : isFinal && app.approvalStatus === "declined" ? actionCopy.decline.done : actionCopy.decline.title}
          </Button>
        </div>
      </div>
    </Surface>
  );
}
function Mini({ icon: Icon, label, value }) { return <div className="rounded-2xl bg-white p-3"><Icon className="h-4 w-4 text-gold" /><p className="mt-2 text-[10px] font-black uppercase tracking-wide text-ink/40">{label}</p><p className="mt-1 text-sm font-black capitalize text-forest">{value}</p></div>; }
