# Instructional Leadership Practice App

A fully runnable local Next.js application for scenario-based instructional leadership practice.

## What this version includes

- Quiz mode and review mode
- Toggle prompt on or off
- Toggle exemplar response on or off
- Category and difficulty filters
- Session length selection
- Click-through card flow
- Favorites
- Saved progress
- Admin dashboard
- Create, edit, archive, and restore questions
- Bulk upload with JSON or CSV text
- Basic analytics
- AI-assisted draft generator (local stub, no external API needed)

## This build is intentionally local-first

This version is designed to run immediately without Supabase or OpenAI setup.
All data is stored in browser local storage so you can use and test the full product right away.

## Run locally

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Routes

- `/` practice view
- `/favorites` saved favorites
- `/admin` admin dashboard
- `/admin/analytics` analytics
- `/admin/bulk-upload` bulk upload

## Next upgrade path

Once you are ready, you can connect:
- Supabase for real auth and database storage
- OpenAI for real admin-only question generation
- Vercel for deployment
