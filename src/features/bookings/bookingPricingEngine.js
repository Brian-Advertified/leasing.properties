const INSTANT_DURATIONS = new Set(["short", "hourly", "daily"]);

const daysBetween = (startDate, endDate) => {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  const diff = Math.ceil((end - start) / 86400000);
  return Math.max(1, Number.isFinite(diff) ? diff : 1);
};

export const isInstantBooking = (listing) => INSTANT_DURATIONS.has(listing.duration);
export const isWorkspaceBooking = (listing) => listing.category === "commercial" || listing.priceUnit === "hour" || listing.duration === "hourly";
export const isShortStayBooking = (listing) => listing.duration === "short" || listing.duration === "daily";

export const getBookingQuantity = (listing, leaseMonths, endDate, startDate, workspaceHours = 2) => {
  if (!isInstantBooking(listing)) return leaseMonths;
  if (listing.priceUnit === "hour" || listing.duration === "hourly") return Math.max(1, Number(workspaceHours) || 1);
  return daysBetween(startDate, endDate);
};

export const getLeaseEndDate = (startDate, leaseMonths) => {
  const date = new Date(`${startDate}T10:00:00`);
  date.setMonth(date.getMonth() + leaseMonths);
  return date.toISOString().slice(0, 10);
};

export const getBookingQuote = ({ listing, startDate, endDate, leaseMonths, workspaceHours }) => {
  const instant = isInstantBooking(listing);
  const workspace = isWorkspaceBooking(listing);
  const shortStay = isShortStayBooking(listing);
  const calculatedEndDate = instant ? (endDate || startDate) : getLeaseEndDate(startDate, leaseMonths);
  const quantity = getBookingQuantity(listing, leaseMonths, calculatedEndDate, startDate, workspaceHours);
  const rentalTotal = listing.priceAmount * quantity;
  const depositAmount = instant ? 0 : listing.priceAmount;
  const adminFee = instant ? 0 : 950;
  const processingFee = Math.round(depositAmount * 0.03);
  const firstMonthRent = instant ? rentalTotal : listing.priceAmount;
  const moveInCost = instant ? rentalTotal : firstMonthRent + depositAmount + adminFee;
  const recommendedIncome = instant ? 0 : listing.priceAmount * 3;
  const dueBeforeConfirmation = instant ? rentalTotal : depositAmount + processingFee;

  return {
    instant,
    workspace,
    shortStay,
    quantity,
    rentalTotal,
    depositAmount,
    adminFee,
    firstMonthRent,
    moveInCost,
    recommendedIncome,
    processingFee,
    dueBeforeConfirmation,
    endDate: calculatedEndDate,
    affordabilityStatus: instant ? (workspace ? "Book and pay" : "Pay to confirm") : listing.priceAmount <= 9000 ? "Likely affordable" : "Income check needed"
  };
};

export const buildBookingRequest = ({ listing, userId, startDate, startTime = "10:00", quote, approvalPack, applicationPack }) => {
  const startsAt = `${startDate}T${startTime}:00Z`;
  let endsAt = `${quote.endDate}T10:00:00Z`;
  if (quote.instant && (listing.priceUnit === "hour" || listing.duration === "hourly")) {
    const start = new Date(startsAt);
    start.setHours(start.getHours() + quote.quantity);
    endsAt = start.toISOString();
  } else if (quote.instant) {
    endsAt = `${quote.endDate}T10:00:00Z`;
  }

  return {
    listingId: listing.id,
    tenantId: userId,
    startsAt,
    endsAt,
    quantity: quote.quantity,
    depositMonths: quote.instant ? 0 : 1,
    applicationPack: quote.instant ? undefined : (applicationPack || approvalPack)
  };
};
