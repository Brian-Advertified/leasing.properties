# Packages Workspace

Target workspace for shared platform packages.

- `ui`: design system primitives and product components.
- `shared-types`: DTOs, enums, and validation schemas shared by web and API.
- `sdk`: typed client SDK for internal web app and future partners.
- `telco-adapters`: VodaPay and future telco wallet/session adapters.

Keep package APIs small and versionable. Business features should depend on contracts, not on transport details.
