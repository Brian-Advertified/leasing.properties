# API Modules

Target home for backend bounded contexts.

Planned modules:

- `auth`: OTP, telco SSO, JWT/session exchange.
- `listings`: inventory search, availability policy, galleries, map data.
- `bookings`: reservation state machine and pricing.
- `leases`: PDF generation, signing, amendments.
- `payments`: VodaPay checkout, webhooks, idempotency.
- `rewards`: points ledger and voucher redemption.
- `audits`: lease comparables and renegotiation recommendations.
- `ratings`: reviews, trust scoring, dispute signals.

The current `server/index.js` should be decomposed route-by-route into these modules as each production feature hardens.
