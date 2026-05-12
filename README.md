
## Notifications and Resend email

The app now supports in-app notifications plus Resend email delivery for tenant and landlord updates.

Required production environment values:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
RESEND_FROM=Listing.properties <notifications@yourdomain.co.za>
RESEND_REPLY_TO=support@yourdomain.co.za
APP_BASE_URL=https://your-production-url
```

Resend requires an API key and a verified sending domain before production email delivery.
