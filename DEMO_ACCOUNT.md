# Demo Account Setup

A demo account system has been implemented that allows users to access the course without payment.

## Demo Account Credentials

**Email:** demo@learnhub.com
**Password:** demo123

## How It Works

1. **Automatic Access**: When a user signs up or logs in with the demo email address (`demo@learnhub.com`), the system automatically:
   - Creates an active enrollment for the published course
   - Sets the enrollment status to "active"
   - Grants full course access without requiring payment

2. **Visual Indicator**: Demo accounts display a "Demo Account" badge on the dashboard for easy identification.

3. **No Payment Required**: Demo accounts bypass the payment flow entirely and can access all course content immediately.

4. **Reset Progress**: Demo accounts have a "Reset Progress" button on the dashboard that allows them to:
   - Clear all completed sections and progress
   - Delete all quiz and exercise submissions
   - Remove any earned certificates
   - Start the course fresh from the beginning
   - This feature is only available to demo accounts for testing purposes

## Creating the Demo Account

### Option 1: Sign Up Through the UI (Recommended)
1. Go to the signup page
2. Enter email: `demo@learnhub.com`
3. Enter password: `demo123`
4. Complete the signup process
5. The system will automatically grant course access

**Note:** If the demo account already exists, use the "Forgot Password" feature on the login page to reset the password to `demo123`.

### Option 2: Use an Existing User
If you want to convert an existing user to a demo account, simply add their email to the `DEMO_EMAILS` array in `/src/lib/demoAccounts.ts`:

```typescript
const DEMO_EMAILS = [
  'demo@learnhub.com',
  'your-email@example.com', // Add more demo emails here
];
```

## Adding More Demo Accounts

To add additional demo accounts, edit `/src/lib/demoAccounts.ts` and add email addresses to the `DEMO_EMAILS` array:

```typescript
const DEMO_EMAILS = [
  'demo@learnhub.com',
  'demo2@learnhub.com',
  'test@learnhub.com',
];
```

## Technical Details

- Demo detection happens in `src/lib/demoAccounts.ts`
- Automatic enrollment is triggered in `src/contexts/AuthContext.tsx` when users log in
- The dashboard shows a special badge for demo accounts
- Demo accounts get $0.00 enrollment with "active" status
