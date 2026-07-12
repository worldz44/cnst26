# CNST'26 — Paper Submission Website

A lightweight, database-free conference website for **CNST'26 — 1st National
Multidisciplinary Online Conference** (Faculty of Science & Technology,
University of Khemis Miliana). Authors submit papers directly, without any
account — every submission is emailed straight to the conference Gmail inbox
with the PDF attached, and the author automatically receives an HTML
confirmation email.

Built with Next.js 14 (App Router), React, TypeScript, Tailwind CSS,
React Hook Form, Zod, Nodemailer (Gmail SMTP), and TanStack Query.

## 1. Project structure

```
app/
  layout.tsx            Root layout, fonts, metadata
  page.tsx               Landing page
  providers.tsx           TanStack Query provider
  globals.css
  submit/page.tsx         Paper submission page
  api/submit/route.ts     Server route: validates + emails the submission
components/               Landing page sections + submission form UI
lib/
  conference-data.ts      All content extracted from the Call for Papers
  submission-schema.ts    Shared Zod schema (client + server validation)
  mailer.ts               Gmail SMTP transport (Nodemailer)
  email-templates.ts      HTML email templates (organizer + author)
  rate-limit.ts           Best-effort in-memory rate limiter
  file-utils.ts           Reference number + PDF validation helpers
.env.example
```

No database, ORM, or cloud storage is used anywhere in this project.

## 2. Local setup

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

Visit `http://localhost:3000`.

## 3. Configuring Gmail App Passwords

The conference Gmail account sends both emails (to itself, and to the
author) via SMTP. Gmail requires an **App Password** for this — not your
normal login password.

1. Go to your Google Account → **Security**.
2. Turn on **2-Step Verification** (required before app passwords are available).
3. Go to **Security → 2-Step Verification → App passwords**
   (or visit `myaccount.google.com/apppasswords` directly).
4. Choose "Other (custom name)", name it e.g. `CNST26 Website`, and click **Generate**.
5. Copy the 16-character password shown (spaces don't matter).

Set the environment variables:

```
GMAIL_USER=your-conference-account@gmail.com
GMAIL_APP_PASSWORD=the16charapppassword
```

Gmail SMTP has a sending quota (roughly 500 messages/day on a standard
Gmail account). That's generous for a conference call for papers, but if
you expect very high volume, consider a Google Workspace account instead
(same setup, higher limits).

## 4. Environment variables

See `.env.example`. Required:

| Variable | Purpose |
|---|---|
| `GMAIL_USER` | Conference Gmail address that sends & receives submissions |
| `GMAIL_APP_PASSWORD` | 16-character Gmail App Password |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public contact email shown on the site (optional; the original Call for Papers didn't publish one) |

## 5. Content sourced from the Call for Papers

Everything on the landing page — description, objectives, the six tracks,
important dates, honorary presidents, conference chairman, and the full
Scientific/Organizing Committee membership — was extracted directly from
the attached Call for Papers flyer into `lib/conference-data.ts`.

Two things were **not published** in the source document and are marked
as placeholders you should update once confirmed:
- **Submission deadline / notification / camera-ready dates** — currently "To be announced".
- **Official contact email** — set via `NEXT_PUBLIC_CONTACT_EMAIL`.
- **Manuscript template / submission portal** — the Call for Papers didn't specify one, so the site simply asks for a PDF upload; update `submission.templateNote` in `lib/conference-data.ts` if a template is issued later.

To update any of this content, edit `lib/conference-data.ts` — it's a single
typed file, no CMS needed.

## 6. Deployment (Vercel or Netlify — both free tiers)

### Vercel
1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. In **Settings → Environment Variables**, add `GMAIL_USER`,
   `GMAIL_APP_PASSWORD`, and `NEXT_PUBLIC_CONTACT_EMAIL`.
4. Deploy. Vercel auto-detects Next.js — no build configuration needed.

### Netlify
1. Push this project to a GitHub repository.
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**.
3. Build command: `npm run build`. Publish directory: leave default (Netlify's
   Next.js runtime handles this automatically via the `@netlify/plugin-nextjs` plugin,
   which Netlify installs automatically when it detects a Next.js app).
4. Add the same environment variables under **Site configuration → Environment variables**.
5. Deploy.

Both platforms' free tiers comfortably run this project: it has no database,
no persistent storage, and a single serverless API route.

## 7. Security notes

- **No database, no stored files.** Uploaded PDFs live only in server memory
  for the duration of one request, then are attached to the outgoing email
  and discarded — nothing is written to disk or any bucket.
- **Validation is duplicated** client-side (React Hook Form + Zod) and
  server-side (the same Zod schema in `app/api/submit/route.ts`) so the API
  can't be bypassed by calling it directly.
- **PDF verification** checks both the file extension/MIME type and the
  actual file header bytes (`%PDF-`) before sending, and enforces a 15 MB
  size cap.
- **XSS**: all user-submitted text is HTML-escaped before being interpolated
  into the organizer email template. React escapes all rendered content on
  the site by default.
- **SQL injection**: not applicable — there is no database or query layer
  anywhere in this project.
- **Spam protection**: a hidden honeypot field (`company`) plus a minimum
  fill-time heuristic reject obvious bots. For stronger protection, add
  Google reCAPTCHA v3 (see below).
- **Rate limiting**: `lib/rate-limit.ts` limits submissions per IP address
  within a serverless function's warm lifetime. On serverless hosts each
  cold start resets this, so it's a soft, best-effort limit, not a hard
  guarantee. For a hard limit across all instances, swap in a shared store
  such as [Upstash Redis](https://upstash.com) (has a free tier) — a few
  lines in `checkRateLimit()`.
- **Secrets**: Gmail credentials are read only from environment variables
  and are never exposed to the browser or committed to source control
  (`.env*` is git-ignored).

### Adding Google reCAPTCHA (optional, recommended for public launch)

1. Register the site at [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin) (v3, invisible).
2. Add `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET_KEY` to your environment.
3. Load the reCAPTCHA script in `app/submit/page.tsx`, get a token on submit,
   send it to `/api/submit`, and verify it server-side against
   `https://www.google.com/recaptcha/api/siteverify` before proceeding with
   the existing validation logic. The honeypot and timing check already in
   place can stay as a second layer.

## 8. Customizing design

Colors, type scale, and the schematic "six tracks → one conference" hero
diagram are defined in `tailwind.config.js` and `components/Hero.tsx`.
Fonts (Space Grotesk / Inter / IBM Plex Mono) are loaded via `next/font/google`
in `app/layout.tsx` — no separate font files to manage.

## 9. Scripts

```bash
npm run dev     # local development
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # ESLint
```
