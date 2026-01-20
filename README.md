# AI Courses for Adults

AI training platform designed for adults 55 and older. Learn to use ChatGPT, stay safe online, and embrace AI — all at your own pace.

## Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS 4
- **Auth/Database**: Firebase (Auth, Firestore, Storage)
- **Payments**: Stripe
- **AI**: xAI Grok API
- **Hosting**: Vercel

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in all the required values (see [Environment Variables](#environment-variables) below).

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

### Firebase (Required)

Get these from [Firebase Console](https://console.firebase.google.com) → Project Settings:

```env
# Client-side (NEXT_PUBLIC_)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Server-side (Service Account JSON)
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

> **Note**: Wrap `FIREBASE_ADMIN_PRIVATE_KEY` in quotes and keep the `\n` characters.

### Stripe (Required for Payments)

Get these from [Stripe Dashboard](https://dashboard.stripe.com/apikeys):

```env
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Create products in Stripe and get price IDs
STRIPE_PRICE_SOP=price_...
STRIPE_PRICE_BUMP=price_...
STRIPE_PRICE_CAIO=price_...
STRIPE_PRICE_CAIO_PLAN=price_...
STRIPE_PRICE_LAUNCHPAD=price_...
STRIPE_PRICE_LAUNCHPAD_PLAN=price_...

# Client-side for checkout
NEXT_PUBLIC_STRIPE_PRICE_CAIO=price_...
NEXT_PUBLIC_STRIPE_PRICE_LAUNCHPAD=price_...
```

### xAI Grok (Required for AI Tools)

Get from [xAI Console](https://console.x.ai):

```env
XAI_API_KEY=xai-...
```

### App URL

```env
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## Vercel Deployment

1. Push code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Add all environment variables in Project Settings → Environment Variables
4. Deploy

### Stripe Webhook Setup

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhook/stripe`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
   - `invoice.paid`
   - `invoice.payment_failed`
   - `customer.subscription.deleted`
4. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

## Project Structure

```
src/
├── app/
│   ├── (auth)/              # Login, signup, forgot-password
│   ├── (dashboard)/         # Protected dashboard pages
│   │   └── dashboard/
│   │       ├── tools/       # AI tools (niche, authority, deal)
│   │       ├── referrals/   # Referral tracking
│   │       └── settings/    # User settings
│   ├── api/                 # API routes
│   │   ├── ai/              # AI tool endpoints
│   │   ├── checkout/        # Stripe checkout
│   │   ├── lead/            # Email capture
│   │   └── webhook/         # Stripe webhooks
│   ├── certification/       # $197 sales page
│   ├── launchpad/          # $497 sales page
│   ├── free/               # Lead magnet page
│   └── checkout/           # Success/cancel pages
├── components/             # Reusable components
├── contexts/               # Auth & User contexts
├── lib/                    # Firebase, Stripe, Grok clients
└── types/                  # TypeScript definitions
```

## Features

### Marketing
- Homepage with testimonials and offer stack
- Lead magnet page (`/free`)
- Sales pages (`/certification`, `/launchpad`)

### Authentication
- Email/password signup and login
- Google OAuth
- Password reset
- Magic link login

### Dashboard
- User profile and settings
- Referral program (20% commission)
- AI tools (Launchpad tier only)

### AI Tools
- **Niche Architect**: Find consulting niches from experience
- **Authority Engine**: Generate LinkedIn posts, newsletters, emails
- **Deal Maker**: Create SOWs and contracts

### Payments
- Stripe Checkout integration
- Automatic tier upgrades via webhook
- Referral commission tracking

## User Tiers

| Tier | Access |
|------|--------|
| `free` | Lead magnet only |
| `sop` | Basic content |
| `caio` | AI Essentials course |
| `launchpad` | Everything + AI Tools |

## Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Type check
npm run lint
```

## License

Proprietary - All rights reserved.
