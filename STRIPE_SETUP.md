# Stripe Payment Integration

This application is integrated with Stripe Payment Links for course enrollment.

## Current Setup

The payment flow is configured with a Stripe Payment Link. When users click "Enroll Now":

1. A pending enrollment is created in the database
2. Users are redirected to the Stripe payment page
3. After successful payment, users are redirected back to `/payment-success`
4. The enrollment status is updated to 'active' automatically
5. Users gain immediate access to the course

## Stripe Payment Link Configuration

**Current Payment Link:** `https://buy.stripe.com/9B68wPcOa9h9cX20zw2wU0B`

### Important Stripe Dashboard Settings

To ensure the payment flow works correctly, configure these settings in your Stripe Payment Link:

1. **Success URL:** Set to `https://yourdomain.com/payment-success`
   - This is where users will be redirected after successful payment
   - The app will automatically activate their enrollment

2. **Collect customer email:** Enabled (pre-filled from user account)

3. **Customer ID tracking:** The app passes `client_reference_id` with the user ID

## Prerequisites

1. Stripe account at https://stripe.com
2. Stripe Payment Link created for your course

## How to Update the Payment Link

If you need to change the Stripe payment link, update it in `src/pages/Payment.tsx`:

```typescript
const stripeUrl = `https://buy.stripe.com/YOUR_NEW_LINK?client_reference_id=${user.id}&prefilled_email=${encodeURIComponent(user.email || '')}`;
```

## Payment Flow Details

### Step 1: User Clicks "Enroll Now"
The payment page (`/payment`) displays course details and pricing.

### Step 2: Creating Enrollment
When the user clicks the payment button:
- A pending enrollment is created in the `enrollments` table
- User is redirected to Stripe with their email pre-filled
- The user ID is passed as `client_reference_id` for tracking

### Step 3: Payment Processing
- User completes payment on Stripe's secure checkout page
- Stripe processes the payment

### Step 4: Return to Platform
- After successful payment, Stripe redirects to `/payment-success`
- The app automatically updates the enrollment status to 'active'
- User is redirected to the course content

## Webhook Integration (Optional Enhancement)

For production use, consider setting up a Stripe webhook to handle payment events more reliably:

1. Create a webhook endpoint in your Stripe Dashboard
2. Listen for `checkout.session.completed` events
3. Verify webhook signatures for security
4. Update enrollment status based on payment confirmation

This ensures enrollment activation even if users close the browser before the success page loads.

## Testing in Stripe Test Mode

When using Stripe test mode, use these test card numbers:
- Success: 4242 4242 4242 4242
- Decline: 4000 0000 0000 0002
- 3D Secure: 4000 0025 0000 3155

Make sure your Stripe Payment Link is in test mode during development.

## Demo Mode (Manual Enrollment)

For demo purposes or testing without Stripe, you can manually activate enrollments:

```sql
-- In Supabase SQL Editor
INSERT INTO enrollments (user_id, course_id, status, amount_paid)
VALUES ('your-user-id', '11111111-1111-1111-1111-111111111111', 'active', 9900);
```

Or update an existing pending enrollment:

```sql
UPDATE enrollments
SET status = 'active', stripe_payment_id = 'manual_test_payment'
WHERE user_id = 'your-user-id' AND course_id = '11111111-1111-1111-1111-111111111111';
```

## Security Notes

- Payment processing happens entirely on Stripe's secure servers
- No credit card data touches your application servers
- User emails are pre-filled to improve the checkout experience
- Use Supabase RLS to protect enrollment data
- Store minimal payment information in your database

## Troubleshooting

**Users aren't being redirected back after payment:**
- Check that the Success URL is configured in your Stripe Payment Link settings
- Ensure the URL matches your deployment domain

**Enrollments stay in "pending" status:**
- Verify users are reaching the `/payment-success` page
- Check browser console for any JavaScript errors
- Review Supabase logs for RLS policy issues

## Additional Resources

- Stripe Payment Links: https://stripe.com/docs/payment-links
- Stripe Documentation: https://stripe.com/docs
- Supabase RLS: https://supabase.com/docs/guides/auth/row-level-security
