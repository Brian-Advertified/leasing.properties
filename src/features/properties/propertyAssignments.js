export const managedByLabel = (type = "landlord") => {
  const labels = {
    landlord: "Managed by landlord",
    agent: "Managed by leasing agent",
    agency: "Managed by agency",
    property_manager: "Managed by property manager"
  };
  return labels[type] || "Managed by property contact";
};

export const contactRoleLabel = (role = "listing_agent") => {
  const labels = {
    owner: "Property owner",
    listing_agent: "Leasing consultant",
    viewing_agent: "Viewing contact",
    lease_manager: "Lease manager",
    maintenance_manager: "Maintenance contact"
  };
  return labels[role] || "Property contact";
};

export const getPrimaryPropertyContact = (listing) => {
  if (!listing) return null;
  return listing.assignedContact || listing.manager || listing.owner || null;
};

export const getContactDisplayName = (listing) => {
  const contact = getPrimaryPropertyContact(listing);
  return contact?.displayName || contact?.agencyName || "the property contact";
};

export const canManageProperty = (user, listing) => {
  if (!user || !listing) return false;
  if (user.role === "admin") return true;
  if (listing.ownerId === user.id) return true;
  return (listing.assignments || []).some((assignment) => assignment.assignedUserId === user.id);
};
