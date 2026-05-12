export const RENTAL_INTENTS = [
  {
    id: "rent_home",
    label: "Rent a home",
    category: "residential",
    durations: ["monthly", "long"],
    description: "Verified long-lease homes with affordability and tenant checks."
  },
  {
    id: "short_stay",
    label: "Book a room / short stay",
    category: "residential",
    durations: ["daily", "short"],
    description: "Instant booking for short stays where stock supports it."
  },
  {
    id: "workspace",
    label: "Book workspace",
    category: "commercial",
    durations: ["hourly", "daily", "monthly"],
    description: "Boardrooms, offices, and flexible workspaces."
  },
  {
    id: "list_property",
    label: "List my property",
    category: "",
    durations: [],
    description: "Landlord onboarding, document verification, and listing approval."
  }
];

export const getIntentById = (intentId) =>
  RENTAL_INTENTS.find((intent) => intent.id === intentId) || RENTAL_INTENTS[0];

export const getFiltersForIntent = (intentId) => {
  const intent = getIntentById(intentId);
  return {
    category: intent.category,
    duration: intent.durations[0] || ""
  };
};
