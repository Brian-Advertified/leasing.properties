const propertyImageOne = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='520' viewBox='0 0 900 520'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1'%3E%3Cstop stop-color='%23123d2f'/%3E%3Cstop offset='1' stop-color='%23d49a3a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='900' height='520' fill='%23f4efe4'/%3E%3Crect x='70' y='170' width='760' height='250' rx='28' fill='%23ffffff'/%3E%3Crect x='120' y='220' width='120' height='110' rx='12' fill='%23dfe9df'/%3E%3Crect x='280' y='220' width='120' height='110' rx='12' fill='%23dfe9df'/%3E%3Crect x='440' y='220' width='120' height='110' rx='12' fill='%23dfe9df'/%3E%3Crect x='600' y='220' width='120' height='110' rx='12' fill='%23dfe9df'/%3E%3Cpath d='M90 180 L450 75 L810 180 Z' fill='url(%23g)'/%3E%3Ctext x='80' y='470' font-family='Arial' font-size='36' font-weight='700' fill='%23123d2f'%3EVerified rental home%3C/text%3E%3C/svg%3E";
const propertyImageTwo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='520' viewBox='0 0 900 520'%3E%3Crect width='900' height='520' fill='%23edf5ef'/%3E%3Crect x='95' y='120' width='710' height='300' rx='26' fill='%23ffffff'/%3E%3Crect x='145' y='165' width='150' height='90' rx='12' fill='%23f4efe4'/%3E%3Crect x='325' y='165' width='150' height='90' rx='12' fill='%23f4efe4'/%3E%3Crect x='505' y='165' width='150' height='90' rx='12' fill='%23f4efe4'/%3E%3Crect x='145' y='285' width='510' height='80' rx='18' fill='%23123d2f' opacity='0.9'/%3E%3Ccircle cx='715' cy='320' r='48' fill='%23d49a3a'/%3E%3Ctext x='95' y='470' font-family='Arial' font-size='36' font-weight='700' fill='%23123d2f'%3EReady to lease%3C/text%3E%3C/svg%3E";

export const fallbackLandlordDashboard = {
  manager: {
    id: "66666666-6666-6666-6666-666666666666",
    displayName: "Sarah Mokoena",
    role: "agent",
    city: "Johannesburg",
    verificationStatus: "verified",
    ratingAverage: 4.9,
    ratingCount: 74,
    responseTime: "2 hours"
  },
  landlord: {
    id: "44444444-4444-4444-4444-444444444444",
    displayName: "AFHCO Property Management",
    role: "landlord",
    city: "Johannesburg",
    verificationStatus: "verified",
    ratingAverage: 4.5,
    ratingCount: 325
  },
  metrics: {
    totalListings: 3,
    totalApplications: 3,
    documentCompleteRate: 67,
    averageResponseTime: "2h",
    assignedContacts: 1
  },
  listings: [
    {
      id: "fallback-northgate",
      title: "Northgate Heights - 2 Bedroom Apartment",
      managedByType: "agent",
      assignedContact: { displayName: "Sarah Mokoena", role: "agent", verificationStatus: "verified", assignmentRole: "listing_agent", responseTime: "2 hours" },
      suburb: "Northgate",
      city: "Randburg",
      priceAmount: 9450,
      priceUnit: "month",
      ratingAverage: 4.6,
      reviewCount: 34,
      imageUrl: propertyImageOne,
      lowDataImageUrl: propertyImageOne
    },
    {
      id: "fallback-hillbrow",
      title: "Hillbrow Northways - 3 Bedroom Apartment",
      managedByType: "agent",
      assignedContact: { displayName: "Sarah Mokoena", role: "agent", verificationStatus: "verified", assignmentRole: "viewing_agent", responseTime: "2 hours" },
      suburb: "Hillbrow",
      city: "Johannesburg",
      priceAmount: 8250,
      priceUnit: "month",
      ratingAverage: 4.5,
      reviewCount: 31,
      imageUrl: propertyImageTwo,
      lowDataImageUrl: propertyImageTwo
    }
  ],
  assignments: [
    { propertyId: "fallback-northgate", role: "listing_agent", assignedUserId: "66666666-6666-6666-6666-666666666666", user: { displayName: "Sarah Mokoena" }, note: "Handles enquiries and application follow-ups." },
    { propertyId: "fallback-northgate", role: "viewing_agent", assignedUserId: "66666666-6666-6666-6666-666666666666", user: { displayName: "Sarah Mokoena" }, note: "Confirms viewing times and access." }
  ],
  applications: [
    {
      id: "fallback-app-1",
      status: "landlord_review",
      approvalStatus: "documents_received",
      documentsComplete: true,
      affordabilityScore: 93,
      riskLevel: "low",
      nextAction: "Review this application and either approve it, ask for more information, or decline it.",
      tenant: {
        displayName: "Amina Dlamini",
        city: "Johannesburg",
        verificationStatus: "verified",
        ratingAverage: 4.8,
        ratingCount: 18
      },
      listing: {
        title: "Northgate Heights - 2 Bedroom Apartment",
      managedByType: "agent",
      assignedContact: { displayName: "Sarah Mokoena", role: "agent", verificationStatus: "verified", assignmentRole: "listing_agent", responseTime: "2 hours" },
        suburb: "Northgate",
        city: "Randburg",
        priceAmount: 9450,
        priceUnit: "month"
      },
      applicationPack: {
        identityDocument: true,
        proofOfIncome: true,
        bankStatement: true,
        references: true
      }
    },
    {
      id: "fallback-app-2",
      status: "awaiting_documents",
      approvalStatus: "more_info_needed",
      documentsComplete: false,
      affordabilityScore: 71,
      riskLevel: "medium",
      nextAction: "Ask the applicant for the missing income documents before approval.",
      tenant: {
        displayName: "Thabo Mokoena",
        city: "Johannesburg",
        verificationStatus: "pending",
        ratingAverage: 4.2,
        ratingCount: 6
      },
      listing: {
        title: "Hillbrow Northways - 3 Bedroom Apartment",
      managedByType: "agent",
      assignedContact: { displayName: "Sarah Mokoena", role: "agent", verificationStatus: "verified", assignmentRole: "viewing_agent", responseTime: "2 hours" },
        suburb: "Hillbrow",
        city: "Johannesburg",
        priceAmount: 8250,
        priceUnit: "month"
      },
      applicationPack: {
        identityDocument: true,
        proofOfIncome: false,
        bankStatement: false,
        references: true
      }
    }
  ]
};

export const fallbackAdminDashboard = {
  metrics: {
    verificationQueue: 5,
    paymentExceptions: 2,
    openDisputes: 1,
    neatStockCount: 18
  },
  queues: [
    {
      title: "Listings to verify",
      count: 3,
      description: "Check ownership or mandate documents, photos, pricing and availability before these listings go live."
    },
    {
      title: "Applications needing review",
      count: 2,
      description: "Review tenant documents that need human attention before they are sent to the landlord."
    },
    {
      title: "Payment follow-ups",
      count: 2,
      description: "Check wallet callbacks, failed deposits and any payment that needs support before the tenant sees a confusing status."
    },
    {
      title: "Disputes and support",
      count: 1,
      description: "Handle move-in, deposit or listing issues before they damage trust in the marketplace."
    }
  ]
};
