export const BOOKING_STATES = {
  DRAFT: "draft",
  ENQUIRY_SUBMITTED: "enquiry_submitted",
  VIEWING_REQUESTED: "viewing_requested",
  VIEWING_CONFIRMED: "viewing_confirmed",
  TENANT_VERIFICATION_PENDING: "tenant_verification_pending",
  TENANT_VERIFIED: "tenant_verified",
  LANDLORD_REVIEW: "landlord_review",
  APPROVED: "approved",
  LEASE_GENERATED: "lease_generated",
  AWAITING_SIGNATURE: "awaiting_signature",
  AWAITING_PAYMENT: "awaiting_payment",
  ACTIVE: "active",
  DECLINED: "declined",
  CANCELLED: "cancelled",
  EXPIRED: "expired"
};

export const LONG_LEASE_JOURNEY = [
  BOOKING_STATES.ENQUIRY_SUBMITTED,
  BOOKING_STATES.VIEWING_REQUESTED,
  BOOKING_STATES.TENANT_VERIFICATION_PENDING,
  BOOKING_STATES.LANDLORD_REVIEW,
  BOOKING_STATES.LEASE_GENERATED,
  BOOKING_STATES.AWAITING_PAYMENT,
  BOOKING_STATES.ACTIVE
];

export const SHORT_BOOKING_JOURNEY = [
  BOOKING_STATES.DRAFT,
  BOOKING_STATES.AWAITING_PAYMENT,
  BOOKING_STATES.ACTIVE
];

export const stateLabels = {
  [BOOKING_STATES.DRAFT]: "Draft",
  [BOOKING_STATES.ENQUIRY_SUBMITTED]: "Enquiry submitted",
  [BOOKING_STATES.VIEWING_REQUESTED]: "Viewing requested",
  [BOOKING_STATES.VIEWING_CONFIRMED]: "Viewing confirmed",
  [BOOKING_STATES.TENANT_VERIFICATION_PENDING]: "Tenant verification",
  [BOOKING_STATES.TENANT_VERIFIED]: "Tenant verified",
  [BOOKING_STATES.LANDLORD_REVIEW]: "Landlord review",
  [BOOKING_STATES.APPROVED]: "Approved",
  [BOOKING_STATES.LEASE_GENERATED]: "Lease generated",
  [BOOKING_STATES.AWAITING_SIGNATURE]: "Awaiting signature",
  [BOOKING_STATES.AWAITING_PAYMENT]: "Awaiting payment",
  [BOOKING_STATES.ACTIVE]: "Active",
  [BOOKING_STATES.DECLINED]: "Declined",
  [BOOKING_STATES.CANCELLED]: "Cancelled",
  [BOOKING_STATES.EXPIRED]: "Expired"
};

export const getJourneyForListing = (listing, instant) =>
  instant ? SHORT_BOOKING_JOURNEY : LONG_LEASE_JOURNEY;
