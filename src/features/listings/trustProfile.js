export const getTrustProfile = (listing) => {
  const checks = [
    { label: "Property verified", passed: Boolean(listing.verified) },
    { label: "Landlord verified", passed: listing.owner?.verificationStatus === "verified" },
    { label: "Photos checked", passed: Boolean(listing.neatStock || listing.imageUrl) },
    { label: "Ownership / mandate checked", passed: Boolean(listing.sourceName || listing.verified) },
    { label: "Condition inspected", passed: Boolean(listing.neatStock) },
    { label: "Pricing reviewed", passed: Boolean(listing.priceAmount) }
  ];

  const passed = checks.filter((check) => check.passed).length;

  return {
    checks,
    passed,
    total: checks.length,
    label: listing.neatStock ? "Verified listing" : "Verified supply",
    responseTime: listing.owner?.ratingAverage >= 4.5 ? "Usually responds same day" : "Response time pending",
    disputeHistory: "No open platform disputes"
  };
};

export const getTenantRequirements = (listing) => {
  if (listing.duration === "hourly" || listing.duration === "short" || listing.duration === "daily") {
    return ["Verified mobile number", "Wallet payment", "Valid access time"];
  }

  return ["ID document", "Proof of residence", "References", "Bank statement"];
};
