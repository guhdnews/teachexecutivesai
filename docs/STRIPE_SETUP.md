# Stripe Setup Guide

This guide walks you through creating the Stripe products needed for AI for Boomers.

## Products to Create

### 1. AI SOPs Bundle ($37)

**In Stripe Dashboard:**
1. Go to Products → Add Product
2. Name: "AI SOPs Bundle"
3. Price: $37.00 (One-time)
4. Copy the `price_xxx` ID

**Environment Variable:** `STRIPE_PRICE_SOP`

---

### 2. AI Prompt Vault - Order Bump ($17)

**In Stripe Dashboard:**
1. Go to Products → Add Product
2. Name: "AI Prompt Vault"
3. Price: $17.00 (One-time)
4. Copy the `price_xxx` ID

**Environment Variable:** `STRIPE_PRICE_BUMP`

---

### 3. AI Essentials Course ($197)

**In Stripe Dashboard:**
1. Go to Products → Add Product
2. Name: "AI Essentials Course"
3. Price: $197.00 (One-time)
4. Copy the `price_xxx` ID

**Environment Variables:**
- `STRIPE_PRICE_CAIO`
- `NEXT_PUBLIC_STRIPE_PRICE_CAIO`

---

### 4. AI Essentials - 3 Payment Plan ($79/mo)

**In Stripe Dashboard:**
1. Go to Products → Add Product (or add price to existing)
2. Name: "AI Essentials Course - Payment Plan"
3. Price: $79.00/month, billed for 3 months
4. Copy the `price_xxx` ID

**Environment Variable:** `STRIPE_PRICE_CAIO_PLAN`

---

### 5. Complete AI Mastery ($497)

**In Stripe Dashboard:**
1. Go to Products → Add Product
2. Name: "Complete AI Mastery"
3. Price: $497.00 (One-time)
4. Copy the `price_xxx` ID

**Environment Variables:**
- `STRIPE_PRICE_LAUNCHPAD`
- `NEXT_PUBLIC_STRIPE_PRICE_LAUNCHPAD`

---

### 6. Complete AI Mastery - 4 Payment Plan ($149/mo)

**In Stripe Dashboard:**
1. Go to Products → Add Product (or add price to existing)
2. Name: "Complete AI Mastery - Payment Plan"
3. Price: $149.00/month, billed for 4 months
4. Copy the `price_xxx` ID

**Environment Variable:** `STRIPE_PRICE_LAUNCHPAD_PLAN`

---

## Webhook Setup

### Create Webhook Endpoint

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Enter your endpoint URL: `https://yourdomain.com/api/webhook/stripe`
4. Select these events:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
   - `invoice.paid`
   - `invoice.payment_failed`
   - `customer.subscription.deleted`
5. Click "Add endpoint"
6. Copy the "Signing secret" (starts with `whsec_`)

**Environment Variable:** `STRIPE_WEBHOOK_SECRET`

---

## Test Mode vs Live Mode

**Development (Test Mode):**
- Use Stripe test API keys (start with `sk_test_` and `pk_test_`)
- Create test products with test prices
- Use test card: `4242 4242 4242 4242`

**Production (Live Mode):**
- Switch to live API keys (start with `sk_live_` and `pk_live_`)
- Create live products with real prices
- Set up live webhook endpoint

---

## Complete Environment Variables

After creating all products, your `.env.local` should include:

```env
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Product Prices
STRIPE_PRICE_SOP=price_...
STRIPE_PRICE_BUMP=price_...
STRIPE_PRICE_CAIO=price_...
STRIPE_PRICE_CAIO_PLAN=price_...
STRIPE_PRICE_LAUNCHPAD=price_...
STRIPE_PRICE_LAUNCHPAD_PLAN=price_...

# Client-side prices (for checkout buttons)
NEXT_PUBLIC_STRIPE_PRICE_CAIO=price_...
NEXT_PUBLIC_STRIPE_PRICE_LAUNCHPAD=price_...
```

---

## Testing Checkout

1. Start dev server: `npm run dev`
2. Go to `/certification` or `/launchpad`
3. Click "Enroll Now" or "Get Complete Access"
4. Use test card `4242 4242 4242 4242` with any future expiry
5. Complete checkout
6. Verify webhook received at `/api/webhook/stripe`
7. Check user's tier updated in Firebase
