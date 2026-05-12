# Listing.properties implementation notes

This rewrite focused on the business flow and user experience, not only visual polish.

## What changed

- Split the previous long JSX prototype into feature-focused React components.
- Added a clearer tenant journey: discovery, affordability, viewing, approval pack, application, dashboard and lease audit.
- Added a landlord dashboard with listing stock, applicant cards, document status, risk level and action buttons.
- Added an admin/ops dashboard so custody, verification and payment exception logic does not appear in the tenant UI.
- Improved listing cards to show rent, move-in cost, recommended income and trust signals upfront.
- Reworked listing detail into a guided long-lease flow instead of a generic “book now” flow.
- Added Vite, Tailwind and package scripts so the app can be installed, run and built normally.
- Added backend dashboard endpoints for landlord and admin workflows.

## Key flows

Tenant:
Find property -> check affordability -> request viewing -> upload documents -> submit application -> landlord review -> lease -> deposit/payment -> move-in -> audit/rewards.

Landlord:
Review stock -> review applications -> check verification and documents -> approve/request info/decline -> lease and payment tracking.

Admin/Ops:
Verify listings -> review approval packs -> monitor VodaPay/payment custody -> manage disputes and trust controls.

## Commands

```bash
npm install
npm run dev
npm run build
```

Frontend dev server: http://localhost:5174
API server: http://localhost:4000
