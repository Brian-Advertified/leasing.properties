import React from "react";
import { BadgeCheck, Building2, MessageCircle, Phone, UserRound } from "lucide-react";
import { Card, Pill } from "../common/Primitives";
import { contactRoleLabel, getPrimaryPropertyContact, managedByLabel } from "../../features/properties/propertyAssignments";

export function PropertyContactCard({ listing, compact = false }) {
  const contact = getPrimaryPropertyContact(listing);
  if (!contact) return null;
  return (
    <Card className={`${compact ? "p-4" : "p-5"}`}>
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-forest text-gold">
          {contact.role === "agent" || contact.role === "property_manager" ? <UserRound className="h-5 w-5" /> : <Building2 className="h-5 w-5" />}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-black text-forest">{contact.displayName}</p>
            {contact.verificationStatus === "verified" ? <Pill tone="green"><BadgeCheck className="h-3.5 w-3.5" /> Verified</Pill> : <Pill tone="gold">Checks pending</Pill>}
          </div>
          <p className="mt-1 text-sm font-bold text-ink/60">{contactRoleLabel(contact.assignmentRole)} · {managedByLabel(listing?.managedByType)}</p>
          <div className="mt-3 grid gap-2 text-xs font-bold text-ink/55 sm:grid-cols-2">
            <span className="inline-flex items-center gap-2"><MessageCircle className="h-4 w-4 text-gold" /> Replies in {contact.responseTime || "under 4 hours"}</span>
            <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> Messages route to this contact</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
