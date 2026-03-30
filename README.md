# Andalusia Marine Website
**Integrated Marine Solutions: Trading • Maintenance • Shipbuilding**

A professional, high-performance web platform for Andalusia Marine, featuring a bilingual CMS to manage the technical portfolio and service offerings.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Database:** PostgreSQL via Neon + Prisma ORM
- **Media Storage:** Supabase Storage (up to 50MB per file)
- **Deployment:** Vercel
- **UI:** Tailwind CSS, Lucide Icons

## Key Features
- Dynamic portfolio with image and video support
- Bilingual interface (Arabic / English) with RTL support
- Admin dashboard for managing site content without coding
- Dark / Light mode
- Fully responsive for all screen sizes
- Google Maps integration with direct navigation link

## Project Structure
- `app/page.tsx` — Public landing page
- `app/admin/page.tsx` — Admin management portal
- `app/api/projects/` — Projects CRUD API
- `app/api/settings/` — Admin settings API (password management)
- `lib/prisma.ts` — Prisma client
- `lib/supabase.ts` — Supabase storage client
- `prisma/schema.prisma` — Database schema

## Admin Access
The admin panel is accessible at `/admin`. The access key is managed securely through the database and can be changed from within the admin panel at any time.

---
© 2026 Andalusia Marine. All rights reserved.
