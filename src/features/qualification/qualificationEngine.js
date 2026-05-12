export const REQUIRED_LONG_LEASE_DOCUMENTS = [
  { id: "identityDocument", label: "South African ID or passport", reason: "Confirms who is applying." },
  { id: "bankStatement", label: "Latest 3 months bank statements", reason: "Helps confirm affordability." },
  { id: "proofOfResidence", label: "Proof of address", reason: "Used for verification and lease records." },
  { id: "proofOfIncome", label: "Proof of income", reason: "Gives the landlord confidence." }
];

export const AFFORDABILITY_EXPENSES = [
  { id: "rentOrBond", label: "Current rent or bond" },
  { id: "foodAndGroceries", label: "Food and groceries" },
  { id: "transport", label: "Transport and fuel" },
  { id: "utilities", label: "Electricity, water and rates" },
  { id: "insuranceMedical", label: "Insurance, medical aid and healthcare" },
  { id: "schoolDependants", label: "School fees and dependants" },
  { id: "creditCommitments", label: "Loans, credit cards and store accounts" },
  { id: "otherCommitted", label: "Other monthly commitments" }
];

const sumValues = (values = {}) =>
  Object.values(values).reduce((total, value) => total + (Number(value) || 0), 0);

export function getQualificationEstimate({ listing, quote, approvalPack = {}, monthlyIncome = 0, affordability = {} }) {
  const requiredIncome = quote?.recommendedIncome || (listing?.priceAmount || 0) * 3;
  const netIncome = Number(affordability.netIncome || monthlyIncome) || 0;
  const totalExpenses = sumValues(affordability.expenses);
  const disposableIncome = Math.max(netIncome - totalExpenses, 0);
  const rentBuffer = (listing?.priceAmount || 0) * 1.15;
  const incomeScore = netIncome ? Math.min(Math.round((netIncome / Math.max(requiredIncome, 1)) * 35), 35) : 12;
  const disposableScore = disposableIncome ? Math.min(Math.round((disposableIncome / Math.max(rentBuffer, 1)) * 45), 45) : 0;
  const trustScore = listing?.verified ? 10 : 0;
  const neatStockScore = listing?.neatStock ? 10 : 0;
  const score = Math.min(100, incomeScore + disposableScore + trustScore + neatStockScore);
  const missingDocuments = REQUIRED_LONG_LEASE_DOCUMENTS.filter((doc) => !approvalPack[doc.id]);

  let label = "Affordability needs work";
  let tone = "gold";
  let guidance = "Add your income and monthly commitments so we can estimate whether the rent leaves enough room for essentials.";

  if (score >= 80) {
    label = "Strong affordability";
    tone = "green";
    guidance = "Your estimated disposable income looks comfortable for this rental. The property contact still makes the final decision.";
  } else if (score >= 60) {
    label = "Good start";
    tone = "green";
    guidance = "You can continue, but keep your committed expenses realistic before submitting.";
  } else if (score < 45) {
    label = "Not ready yet";
    tone = "danger";
    guidance = "This home may be difficult to approve right now. Lower-cost options may be easier.";
  }

  return { score, label, tone, guidance, requiredIncome, netIncome, totalExpenses, disposableIncome, missingDocuments };
}

export function getPropertyTrust(listing) {
  const checks = [
    { label: "Landlord details checked", done: Boolean(listing?.owner?.verificationStatus === "verified" || listing?.verified) },
    { label: "Property photos reviewed", done: Boolean(listing?.imageUrl) },
    { label: "Price checked against similar homes", done: Boolean(listing?.priceAmount) },
    { label: "Availability confirmed", done: Boolean(listing?.availableFrom) },
    { label: "Inspection-ready listing", done: Boolean(listing?.neatStock) }
  ];
  const score = Math.round((checks.filter((item) => item.done).length / checks.length) * 100);
  return { score, checks };
}

export function getWhyThisProperty(listing, quote) {
  const reasons = [];
  if (listing?.verified) reasons.push("The listing has verification checks in place.");
  if (listing?.neatStock) reasons.push("The home is marked as inspected stock.");
  if (quote?.moveInCost) reasons.push("You can see the move-in cost before applying.");
  if (listing?.ratingAverage >= 4.5) reasons.push("The landlord/property has strong marketplace reviews.");
  reasons.push(`It is available in ${listing?.suburb || "your selected area"}.`);
  return reasons.slice(0, 4);
}
