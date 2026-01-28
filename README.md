# Inference Learning Hub

A comprehensive SaaS platform for delivering online courses with user authentication, progress tracking, payment integration, and certificate generation. The platform focuses on teaching disaggregated inference in LLM serving.

## Features

### Authentication & User Management
- Email/password authentication via Supabase Auth
- User registration with profile creation
- Password reset functionality
- Protected routes for authenticated users
- User profile management

### Course Structure
- 7 comprehensive sections on LLM serving
- Sequential section unlocking (complete previous to access next)
- Progress tracking with visual indicators
- Markdown-based content rendering
- Responsive course viewer with collapsible sidebar

### Progress & Learning
- Real-time progress tracking
- Save and resume functionality
- Section completion markers
- Progress percentage calculation
- Automatic enrollment status updates

### Payment Integration
- Stripe payment integration structure
- One-time payment model ($249)
- Payment page with course details
- Enrollment management based on payment status
- See `STRIPE_SETUP.md` for implementation details

### Certificates
- Automatic certificate generation on course completion
- Personalized with user name and completion date
- Downloadable certificate (extensible with PDF generation)
- Professional certificate design

### Admin Dashboard
- View all user enrollments
- Track revenue and statistics
- Monitor active users
- View enrollment history
- Role-based access control

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Content**: React Markdown

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase project (database is pre-configured)

### Installation

1. Install dependencies:
```bash
npm install
```

2. The environment variables are already configured in `.env`:
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

3. Start the development server:
```bash
npm run dev
```

## Database Schema

The application uses the following tables:

- **user_profiles**: Extended user information
- **courses**: Course metadata
- **course_sections**: Individual course sections with content
- **enrollments**: User course enrollments and payment tracking
- **user_progress**: Section completion tracking

All tables have Row Level Security (RLS) enabled for data protection.

## User Flows

### Student Flow
1. Land on homepage
2. Sign up for an account
3. View course on dashboard
4. Complete payment
5. Access course sections sequentially
6. Track progress
7. Earn certificate upon completion

### Admin Flow
1. Sign in with admin account
2. Access admin dashboard
3. View enrollment statistics
4. Monitor revenue and user activity

## Project Structure

```
src/
├── components/
│   └── ProtectedRoute.tsx      # Route protection wrapper
├── contexts/
│   └── AuthContext.tsx         # Authentication context
├── lib/
│   └── supabase.ts            # Supabase client and types
├── pages/
│   ├── Landing.tsx            # Homepage
│   ├── Login.tsx              # Login page
│   ├── SignUp.tsx             # Registration page
│   ├── ForgotPassword.tsx     # Password reset
│   ├── Dashboard.tsx          # User dashboard
│   ├── CourseViewer.tsx       # Course content viewer
│   ├── Payment.tsx            # Payment page
│   ├── Settings.tsx           # User settings
│   ├── Admin.tsx              # Admin dashboard
│   └── Certificate.tsx        # Certificate page
└── App.tsx                     # Main app with routing
```

## Course Content

The course covers:

1. Introduction to LLM Serving Challenges
2. Understanding the Two-Phase Inference Process
3. Architecture of Disaggregated Systems
4. KV Cache Management and Transfer
5. Performance Optimization Techniques
6. Real-World Implementation and Deployment
7. Advanced Topics and Future Directions

## Testing the Application

### Create a Test User

1. Go to signup page
2. Create an account with email and password
3. You'll be redirected to the dashboard

### Test Enrollment (Without Stripe)

To test the full course flow without setting up Stripe, manually create an enrollment:

```sql
-- In Supabase SQL Editor
INSERT INTO enrollments (user_id, course_id, status, amount_paid)
VALUES (
  'your-user-id',  -- Get from auth.users table
  '11111111-1111-1111-1111-111111111111',
  'active',
  9900
);
```

### Create an Admin User

```sql
-- In Supabase SQL Editor
UPDATE user_profiles
SET is_admin = true
WHERE id = 'your-user-id';
```

## Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Extending the Platform

### Adding More Courses

1. Insert a new course in the `courses` table
2. Add sections to `course_sections` with appropriate `order_index`
3. The platform automatically handles multiple courses

### Customizing the Certificate

Modify `src/pages/Certificate.tsx` to:
- Change the design
- Add PDF generation with jsPDF or html2canvas
- Include additional information

### Implementing Real Stripe Payments

Follow the guide in `STRIPE_SETUP.md` to:
- Set up Stripe checkout
- Create webhook handlers
- Process real payments

## Security Features

- Row Level Security (RLS) on all database tables
- JWT-based authentication
- Secure password handling
- Protected API routes
- Input validation
- HTTPS required in production

## Support & Documentation

- Supabase Docs: https://supabase.com/docs
- React Router: https://reactrouter.com
- Tailwind CSS: https://tailwindcss.com

## License

This project is built as a demonstration of a full-stack SaaS platform with authentication, content management, and payment integration.
