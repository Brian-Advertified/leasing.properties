export const REQUIRED_LONG_LEASE_DOCUMENTS = [
  { id: "identityDocument", label: "South African ID or passport", reason: "Confirms who is applying." },
  { id: "bankStatement", label: "Latest 3 months bank statements", reason: "Helps confirm affordability." },
  { id: "proofOfResidence", label: "Proof of address", reason: "Used for verification and lease records." },
  { id: "proofOfIncome", label: "Proof of income", reason: "Gives the landlord confidence." }
];

export function getQualificationEstimate({ listing, quote, approvalPack = {}, monthlyIncome = 0 }) {
  const requiredIncome = quote?.recommendedIncome || (listing?.priceAmount || 0) * 3;
  const incomeScore = monthlyIncome ? Math.min(Math.round((monthlyIncome / Math.max(requiredIncome, 1)) * 45), 45) : 25;
  const uploadedCount = REQUIRED_LONG_LEASE_DOCUMENTS.filter((doc) => approvalPack[doc.id]).length;
  const documentScore = Math.round((uploadedCount / REQUIRED_LONG_LEASE_DOCUMENTS.length) * 35);
  const trustScore = listing?.verified ? 10 : 0;
  const neatStockScore = listing?.neatStock ? 10 : 0;
  const score = Math.min(100, incomeScore + documentScore + trustScore + neatStockScore);
  const missingDocuments = REQUIRED_LONG_LEASE_DOCUMENTS.filter((doc) => !approvalPack[doc.id]);

  let label = "A few things are still needed";
  let tone = "gold";
  let guidance = "Upload the missing documents and confirm your income range before applying.";

  if (score >= 80) {
    label = "Strong application";
    tone = "green";
    guidance = "You look ready to apply. The landlord will still make the final decision.";
  } else if (score >= 60) {
    label = "Good start";
    tone = "green";
    guidance = "You can continue, but completing the documents will improve your chances.";
  } else if (score < 45) {
    label = "Not ready yet";
    tone = "danger";
    guidance = "This home may be difficult to approve right now. We can show lower-cost options too.";
  }

  return { score, label, tone, guidance, requiredIncome, uploadedCount, missingDocuments };
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
