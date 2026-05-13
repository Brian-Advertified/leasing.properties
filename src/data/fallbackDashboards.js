export const fallbackLandlordDashboard = {
  manager: {
    id: "local-manager",
    displayName: "Property manager",
    role: "landlord",
    city: "",
    verificationStatus: "pending",
    ratingAverage: 0,
    ratingCount: 0,
    responseTime: "Not set"
  },
  landlord: null,
  metrics: {
    totalListings: 0,
    totalApplications: 0,
    documentCompleteRate: 0,
    averageResponseTime: "Not set",
    assignedContacts: 0
  },
  listings: [],
  assignments: [],
  applications: []
};

export const fallbackAdminDashboard = {
  metrics: {
    verificationQueue: 0,
    paymentExceptions: 0,
    openDisputes: 0,
    neatStockCount: 0
  },
  queues: [
    {
      title: "Listings to verify",
      count: 0,
      description: "New landlord, agent and property submissions will appear here after registration or listing creation."
    },
    {
      title: "Applications needing review",
      count: 0,
      description: "Tenant applications that need human review will appear here."
    },
    {
      title: "Payment follow-ups",
      count: 0,
      description: "Failed or pending deposit payments will appear here."
    },
    {
      title: "Disputes and support",
      count: 0,
      description: "Move-in, deposit and listing support cases will appear here."
    }
  ]
};
