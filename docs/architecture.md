# Leasing.properties Architecture

Leasing.properties is structured as a mobile-first PWA with a REST API that can sit inside telco WebViews. The frontend keeps the first screen useful at 375px, prioritises list/map discovery, and avoids email dependency by treating MSISDN as the primary identity credential.

## Core Decisions

- PostgreSQL is the system of record for users, listings, bookings, ratings, rewards, disputes, telco sessions, and lease audits.
- Express exposes partner-friendly REST endpoints under `/api`, including telco SSO and payment webhook stubs.
- The demo app uses seeded in-memory data so it runs immediately without a local database; migration files define the production schema.
- JWT is issued after OTP verification or telco SSO. OTP is stubbed for the demo because SMS aggregator setup differs by market.
- VodaPay is the only supported payment method for the current business rules. Leasing.properties collects the one-month deposit plus processing fee only; monthly rent is not charged upfront.
- Reservation and deposit custody are modeled as a lifecycle: once VodaPay checkout is created, the listing is held as `reserved` with the booking in `held_pending_payment`; after VodaPay webhook confirmation, the booking moves to `received_pending_custody` and the lease contract PDF is generated; after reconciliation it moves to `in_custody`, then `refunded_to_tenant`, `released_to_landlord`, or `disputed` after lease-end inspection.
- Listing cards always show trust signals: verification, Neat Stock inspection, rating, and review count.
- Lease audit compares the active lease against comparable platform listings by city, suburb/category, and monthly-normalised price.
- AFHCO Available Now listings are represented as source-attributed marketplace inventory. The current prototype curates ten higher-priced mapped monthly residential rentals from AFHCO so the discovery/map surfaces use real Johannesburg-area rental stock.
- AFHCO gallery images are fetched from each source listing detail page on demand, cached in memory by listing ID, and exposed through `/api/listings/:id/gallery`.
- VodaPay checkout uses a UAT-ready payload builder at `/api/payments/vodapay/initiate`. `VODAPAY_API_KEY` must be set in the local `.env` file. Authentication is configurable with `VODAPAY_AUTH_SCHEME=apikey|basic|bearer|authorization`; API-key mode follows the working Advertified implementation by sending the key with `VODAPAY_API_KEY_HEADER=api-key` plus `test: true` in UAT. If credentials are missing or rejected, the API fails loudly before a booking is created.
- The demo dashboard includes operator controls to simulate the VodaPay webhook, custody reconciliation, tenant refund, and dispute hold. Production should restrict these endpoints to platform operations roles and reconcile against bank/payment-provider settlement files.

## African Market Considerations

- MSISDN login lowers onboarding friction where email is not a dependable identity anchor.
- Verification separates user identity, bank details, and property documents because informal supply needs staged trust building.
- Low-data images and skeleton states are included for WebView performance and expensive data environments.
- Rewards are framed around local partner vouchers, supporting SMEs while creating retention loops for tenants.
- Telco integration endpoints are intentionally provider-neutral, with `telco` and `externalSessionId` fields to map VodaPay, MTN MoMo, and Telkom mini-app SDK events.
- VodaPay notifications are accepted at both `/api/payments/webhook/vodapay` and `/payments/webhook/vodapay` so the app can mirror gateway callback paths while the local API is still running on port 4000.

## Telco Super App Constraints

- The app avoids heavy first-load dependencies such as a live maps SDK in the prototype. The map panel is API-ready and can be swapped to Mapbox/Google Maps when keys are supplied.
- All core flows fit in a WebView, use transparent pricing before confirmation, and do not rely on browser-only capabilities.
- Payment webhooks are idempotent-friendly by storing external references in the production schema.
