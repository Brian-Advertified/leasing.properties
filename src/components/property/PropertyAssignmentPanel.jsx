import React from "react";
import { Building2, CalendarDays, FileSignature, Hammer, MessageCircle } from "lucide-react";
import { Card, Pill } from "../common/Primitives";
import { contactRoleLabel } from "../../features/properties/propertyAssignments";

const icons = { listing_agent: MessageCircle, viewing_agent: CalendarDays, lease_manager: FileSignature, maintenance_manager: Hammer, owner: Building2 };

export function PropertyAssignmentPanel({ assignments = [], embedded = false }) {
  const content = (
    <>
      {!embedded ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Property contacts</p>
            <h3 className="mt-1 text-xl font-black text-forest">Who handles what</h3>
          </div>
          <Pill tone="sand">Routed automatically</Pill>
        </div>
      ) : null}
      <div className={`${embedded ? "" : "mt-4"} grid gap-3 md:grid-cols-2`}>
        {assignments.map((assignment) => {
          const Icon = icons[assignment.role] || MessageCircle;
          return (
            <div key={`${assignment.propertyId}-${assignment.role}-${assignment.assignedUserId}`} className="rounded-2xl border border-forest/10 bg-linen/60 p-4">
              <Icon className="h-5 w-5 text-gold" />
              <p className="mt-2 font-black text-forest">{contactRoleLabel(assignment.role)}</p>
              <p className="mt-1 text-sm font-bold text-ink/60">{assignment.user?.displayName || "Assigned contact"}</p>
              <p className="mt-1 text-xs leading-5 text-ink/45">{assignment.note || "Tenant updates and tasks are sent to this person."}</p>
            </div>
          );
        })}
        {!assignments.length ? <p className="text-sm text-ink/55">No assignments yet. The owner receives all messages until a contact is assigned.</p> : null}
      </div>
    </>
  );

  return embedded ? content : <Card className="p-5">{content}</Card>;
}
