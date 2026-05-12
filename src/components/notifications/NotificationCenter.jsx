import React, { useState } from "react";
import { Bell, CheckCheck, Clock, FileText, Home, Mail, MessageCircle, ShieldCheck, X } from "lucide-react";
import { Button } from "../common/Primitives";

const iconByType = {
  application_submitted: FileText,
  application_approved: ShieldCheck,
  application_info_requested: FileText,
  application_declined: X,
  viewing_requested: Home,
  message_sent: MessageCircle,
  payment_confirmed: ShieldCheck,
  lease_ready: FileText,
  move_in_updated: CheckCheck,
  rent_review_requested: Clock
};

export function NotificationCenter({ notifications = [], unreadCount = 0, onOpenNotification, onMarkAllRead, isLanding = false }) {
  const [open, setOpen] = useState(false);
  const latest = notifications.slice(0, 8);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`${isLanding ? "border-white/10 bg-white/10 text-white" : "border-forest/10 bg-white text-forest shadow-sm"} relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border transition hover:brightness-95`}
        aria-label="Open notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 ? (
          <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-[#ff4d2d] px-1 text-[10px] font-black text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 top-full mt-2 z-50 w-[min(92vw,390px)] overflow-hidden rounded-[1.4rem] border border-forest/10 bg-white text-ink shadow-2xl">
          <div className="flex items-center justify-between gap-3 border-b border-forest/10 p-4">
            <div>
              <p className="text-sm font-black text-forest">Updates</p>
              <p className="text-xs text-ink/55">Rental, lease, payment and message changes appear here.</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full p-2 text-ink/45 hover:bg-forest/5"><X className="h-4 w-4" /></button>
          </div>

          <div className="max-h-[420px] overflow-y-auto p-2">
            {latest.length ? latest.map((item) => {
              const Icon = iconByType[item.type] || Mail;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => { onOpenNotification?.(item); setOpen(false); }}
                  className={`w-full rounded-2xl p-3 text-left transition hover:bg-linen ${item.read ? "opacity-75" : "bg-gold/10"}`}
                >
                  <div className="flex gap-3">
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${item.read ? "bg-forest/5 text-forest" : "bg-gold text-ink"}`}><Icon className="h-4 w-4" /></span>
                    <span className="min-w-0">
                      <span className="block text-sm font-black text-forest">{item.title}</span>
                      <span className="mt-1 line-clamp-2 block text-xs leading-5 text-ink/60">{item.message}</span>
                      <span className="mt-2 block text-[11px] font-bold text-gold">{item.actionLabel || "Open update"}</span>
                    </span>
                  </div>
                </button>
              );
            }) : (
              <div className="p-6 text-center">
                <p className="font-black text-forest">No updates yet</p>
                <p className="mt-1 text-sm leading-6 text-ink/55">When something changes, tenants and landlords will see it here and receive an email if configured.</p>
              </div>
            )}
          </div>

          {latest.length ? (
            <div className="border-t border-forest/10 p-3">
              <Button variant="secondary" className="w-full min-h-10 py-2" onClick={() => onMarkAllRead?.()}>Mark all as read</Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
