<!--  --># Button and route audit

## Implemented in this pass

### Tenant dashboard actions
- **View lease pack** now opens a real `LeasePackPage` screen.
  - Shows lease status, payment confirmation, deposit custody status and lease document readiness.
  - Opens `/api/bookings/:id/lease.pdf` only when `leaseContractStatus === generated`.
- **Message landlord** now opens a real `MessageLandlordPage` screen.
  - Supports structured actions: `request_info`, `ask_for_change`, `confirm_viewing`, `send_document`.
  - Posts to `/api/bookings/:id/messages`.
- **Move-in checklist** now opens a real `MoveInChecklistPage` screen.
  - Tracks keys/access, inspection, deposit custody and first payment.
  - Uses `/api/bookings/:id/move-in-checklist` and `/api/bookings/:id/move-in-checklist/:itemId`.

### Lease audit
- **Start renegotiation request** was previously a visual button only.
- It now posts to `/api/bookings/:id/renegotiation` and shows confirmation.

### Landlord dashboard
- **Approve**, **Request info** and **Decline** were previously visual buttons only.
- They now post to `/api/landlord/applications/:id/:action` and update the visible application card.

## Reviewed and intentionally left as-is

### Discovery map toggle
- The map panel is still a placeholder, but it is not a broken route.
- It is intentionally left as a Mapbox/Google Maps integration point because live API keys and map provider choice should be handled outside the prototype.

### Admin ops queue cards
- Queue cards are currently informational only.
- They are not broken links. A future pass should add queue detail pages for listing verification, tenant approval packs and payment exceptions.

## No missing navigation found after this pass
- Header navigation opens real screens.
- Landing page search and featured listing cards open real flows.
- Listing detail CTAs submit viewing/application flows.
- Tenant dashboard actions now open real screens.
- Landlord action buttons now call backend code.
- Lease audit renegotiation now calls backend code.
