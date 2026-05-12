import { nanoid } from "nanoid";
import { Resend } from "resend";

const notifications = [];
const emailLog = [];

const resendApiKey = process.env.RESEND_API_KEY || "";
const resendFrom = process.env.RESEND_FROM || "Listing.properties <notifications@listing.properties>";
const resendReplyTo = process.env.RESEND_REPLY_TO || "support@listing.properties";
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const notificationEvents = {
  APPLICATION_SUBMITTED: "application_submitted",
  APPLICATION_APPROVED: "application_approved",
  APPLICATION_INFO_REQUESTED: "application_info_requested",
  APPLICATION_DECLINED: "application_declined",
  VIEWING_REQUESTED: "viewing_requested",
  MESSAGE_SENT: "message_sent",
  PAYMENT_CONFIRMED: "payment_confirmed",
  LEASE_READY: "lease_ready",
  MOVE_IN_UPDATED: "move_in_updated",
  RENT_REVIEW_REQUESTED: "rent_review_requested"
};

const roleLabels = {
  tenant: "tenant",
  landlord: "landlord",
  ops: "ops"
};

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const buildEmailHtml = ({ title, message, actionText, actionUrl, propertyTitle }) => `
  <div style="margin:0;background:#fbf7ef;padding:32px;font-family:Arial,sans-serif;color:#13231c">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e7dfd1;border-radius:24px;overflow:hidden">
      <div style="padding:24px 28px;background:#12382d;color:white">
        <div style="font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#d8b45c">Listing.properties</div>
        <h1 style="margin:12px 0 0;font-size:26px;line-height:1.1">${escapeHtml(title)}</h1>
      </div>
      <div style="padding:28px">
        ${propertyTitle ? `<p style="margin:0 0 12px;color:#6b655e;font-size:14px">${escapeHtml(propertyTitle)}</p>` : ""}
        <p style="margin:0 0 22px;font-size:16px;line-height:1.6">${escapeHtml(message)}</p>
        ${actionUrl ? `<a href="${escapeHtml(actionUrl)}" style="display:inline-block;background:#12382d;color:#ffffff;text-decoration:none;border-radius:14px;padding:12px 18px;font-weight:700">${escapeHtml(actionText || "Open Listing.properties")}</a>` : ""}
        <p style="margin:28px 0 0;color:#8a8176;font-size:12px;line-height:1.5">You are receiving this because there was an update on a rental, viewing, lease, payment or message linked to your Listing.properties profile.</p>
      </div>
    </div>
  </div>
`;

export const createNotification = ({ userId, role = "tenant", type, title, message, bookingId, listingId, actionLabel, actionRoute, priority = "normal", metadata = {} }) => {
  if (!userId || !title || !message) return null;
  const item = {
    id: nanoid(),
    userId,
    role: roleLabels[role] || role,
    type,
    title,
    message,
    bookingId: bookingId || null,
    listingId: listingId || null,
    actionLabel: actionLabel || "Open update",
    actionRoute: actionRoute || "/dashboard",
    priority,
    read: false,
    createdAt: new Date().toISOString(),
    metadata
  };
  notifications.unshift(item);
  return item;
};

export const notifyMany = (items = []) => items.map(createNotification).filter(Boolean);

export const getNotificationsForUser = (userId) => notifications.filter((item) => item.userId === userId);

export const markNotificationRead = (id, userId) => {
  const item = notifications.find((entry) => entry.id === id && (!userId || entry.userId === userId));
  if (!item) return null;
  item.read = true;
  item.readAt = new Date().toISOString();
  return item;
};

export const markAllNotificationsRead = (userId) => {
  const items = getNotificationsForUser(userId);
  const now = new Date().toISOString();
  items.forEach((item) => {
    item.read = true;
    item.readAt = item.readAt || now;
  });
  return items;
};

export const sendNotificationEmail = async ({ to, subject, title, message, actionText, actionUrl, propertyTitle, tags = [] }) => {
  const entry = { id: nanoid(), to, subject, status: "skipped", createdAt: new Date().toISOString() };
  if (!to) {
    entry.reason = "No email address on profile";
    emailLog.unshift(entry);
    return entry;
  }
  if (!resend) {
    entry.reason = "RESEND_API_KEY is not configured";
    emailLog.unshift(entry);
    return entry;
  }

  const { data, error } = await resend.emails.send({
    from: resendFrom,
    to: [to],
    replyTo: resendReplyTo,
    subject,
    html: buildEmailHtml({ title, message, actionText, actionUrl, propertyTitle }),
    text: `${title}\n\n${message}${actionUrl ? `\n\n${actionText || "Open Listing.properties"}: ${actionUrl}` : ""}`,
    tags: tags.map((tag) => ({ name: tag.name, value: String(tag.value).slice(0, 256) }))
  });

  if (error) {
    entry.status = "failed";
    entry.error = error.message || String(error);
  } else {
    entry.status = "sent";
    entry.providerId = data?.id;
  }
  emailLog.unshift(entry);
  return entry;
};

export const getEmailLog = () => emailLog;
