const statusCopy = {
  confirmed: {
    title: "Your booking is confirmed",
    text: "Your payment step is complete and the booking details are ready on your dashboard.",
    next: "Check your arrival or access instructions before you go."
  },
  reserved: {
    title: "This place is reserved for you",
    text: "The listing is on hold while you complete the next step.",
    next: "Continue the application or payment step before the hold expires."
  },
  tenant_verification_pending: {
    title: "We are checking your documents",
    text: "Your application has been received. We are checking the documents before the landlord makes a decision.",
    next: "Keep your phone nearby in case we need one more document."
  },
  awaiting_landlord_review: {
    title: "The landlord is reviewing your application",
    text: "Your documents are ready and the landlord can now review your application.",
    next: "You will be notified once the landlord approves, asks a question, or declines."
  },
  landlord_requested_info: {
    title: "The landlord needs more information",
    text: "The landlord asked for one more detail before making a decision.",
    next: "Open messages and send the requested information."
  },
  approved: {
    title: "Good news — your application was approved",
    text: "Your lease documents can now be prepared and payment can be completed.",
    next: "Review your lease documents before paying."
  },
  deposit_received: {
    title: "Your payment was received",
    text: "Your deposit is being placed into protected deposit handling.",
    next: "Complete your move-in checklist before collecting keys."
  },
  deposit_secured: {
    title: "Your deposit is safely protected",
    text: "The deposit has been recorded and protected while move-in is completed.",
    next: "Confirm inspection, keys and first payment."
  },
  active: {
    title: "Your lease is active",
    text: "You can now use support, rewards and future rent-check tools.",
    next: "Keep payments on time to build your tenant trust score."
  },
  declined: {
    title: "This application was not approved",
    text: "You can still apply for another property that better matches your budget and documents.",
    next: "View recommended alternatives."
  }
};

export function getHumanBookingStatus(status) {
  return statusCopy[status] || {
    title: "Your rental journey is in progress",
    text: "We will show the next step here as soon as it is ready.",
    next: "Check your dashboard for the latest update."
  };
}
