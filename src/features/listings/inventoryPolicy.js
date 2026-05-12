export const isReservedListing = (listing) => listing?.availabilityStatus === "reserved";

export const availableInventoryOnly = (listings) =>
  listings.filter((listing) => !isReservedListing(listing));
