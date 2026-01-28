# Admin Guide - Inference Learning Hub

## Overview

This guide explains how to use the admin features of the Inference Learning Hub platform, including user management, progress tracking, and diagram management.

## Accessing Admin Features

### Prerequisites
- Your account must have admin privileges
- Set `is_admin = true` in the `user_profiles` table for your user ID

### Admin Navigation
- Main admin panel: Navigate to `/admin`
- User details: Click on any user name in the enrollments table
- Diagram manager: Click "Manage Diagrams" button in admin dashboard

## Admin Dashboard Features

### Overview Statistics

The dashboard displays four key metrics:

1. **Total Users** - Number of registered users
2. **Active Enrollments** - Users with active course access
3. **Total Revenue** - Sum of all successful payments
4. **Total Enrollments** - All enrollments (active, pending, completed)

### Enrollments Table

View all course enrollments with:
- User name and ID
- Course name
- Enrollment status (pending/active/completed)
- Amount paid
- Enrollment date

**Action:** Click on any user name to view detailed progress

## User Detail View

### Accessing User Details
1. Go to Admin Dashboard (`/admin`)
2. Scroll to "All Enrollments" table
3. Click on any user's name

### Information Available

**Summary Cards:**
- **Progress** - Percentage of course completed
- **Quiz Score** - Percentage of correct quiz answers
- **Exercises** - Number of exercise submissions
- **Status** - Enrollment status and payment amount

**Section Progress:**
- List of all course sections
- Completion status (complete/not started)
- Completion dates for finished sections

**Exercise Submissions:**
- Full list of submitted exercises
- Section and exercise number
- Submission type (text/file/link)
- Content preview
- Submission dates
- Links to view full submissions

## Diagram Manager

### Overview

The Diagram Manager allows you to add visual diagrams, charts, and images to any course section. Diagrams appear automatically to students viewing that section.

### Accessing Diagram Manager

1. Go to Admin Dashboard (`/admin`)
2. Click "Manage Diagrams" button in the top-right
3. Or navigate directly to `/admin/diagrams`

### Adding Diagrams

#### Step 1: Prepare Your Image

Before adding a diagram, you need to host your image online. Here are recommended options:

**Option 1: Imgur (Easiest)**
1. Go to [imgur.com](https://imgur.com)
2. Click "New post" and upload your image
3. Right-click the uploaded image → "Copy image address"
4. Use this URL (should end in .jpg, .png, etc.)

**Option 2: GitHub**
1. Upload image to a GitHub repository
2. View the image in GitHub
3. Right-click → "Copy image address"
4. Use the raw GitHub URL

**Option 3: Google Drive**
1. Upload image to Google Drive
2. Right-click → "Get link" → Set to "Anyone with the link can view"
3. Copy the file ID from the URL (the long string after `/d/`)
4. Use format: `https://drive.google.com/uc?id=FILE_ID`

**Example URLs:**
- ✅ `https://i.imgur.com/abc123.png`
- ✅ `https://raw.githubusercontent.com/user/repo/main/image.png`
- ✅ `https://drive.google.com/uc?id=1ABC...XYZ`
- ❌ `https://drive.google.com/file/d/...` (won't work)

#### Step 2: Add Diagram via Interface

1. In Diagram Manager, find the section you want to add a diagram to
2. Click "Add Diagram" button for that section
3. Fill in the form:
   - **Title*** (required): Descriptive name (e.g., "Disaggregation Architecture Diagram")
   - **Image URL*** (required): The direct image URL from step 1
   - **Description** (optional): Caption or explanation
   - **Display Order** (default 0): Controls order if multiple diagrams in same section

4. Click "Save Diagram"

#### Step 3: Verify Display

1. Navigate to the course as a student
2. Go to the section where you added the diagram
3. The diagram should appear in the content
4. If it shows "Failed to load", check your image URL

### Managing Existing Diagrams

**Edit a Diagram:**
1. Find the diagram in the Diagram Manager
2. Click the edit icon (pencil)
3. Modify any fields
4. Click "Save Changes"

**Delete a Diagram:**
1. Find the diagram in the Diagram Manager
2. Click the delete icon (trash)
3. Confirm deletion
4. Diagram is immediately removed

**Reorder Diagrams:**
1. Edit a diagram
2. Change the "Display Order" number
3. Lower numbers appear first (0, 1, 2, etc.)
4. Save changes

### Best Practices for Diagrams

**Image Format:**
- Use PNG for diagrams with transparency
- Use JPG for photos
- Use SVG for vector graphics (if hosting service supports it)
- Recommended max width: 1200px
- Recommended file size: < 2MB

**Accessibility:**
- Always provide descriptive titles
- Use descriptions to explain complex diagrams
- Ensure good contrast in your images

**Organization:**
- Add diagrams to relevant sections only
- Use clear, descriptive titles
- Number diagrams if there are multiple per section

### Troubleshooting Diagrams

**Diagram not showing:**
- Verify the image URL is direct (not a page link)
- Check that image is publicly accessible
- Try opening URL in a new browser tab
- Ensure image file extension is included (.png, .jpg, etc.)

**"Failed to load image" error:**
- URL might be broken or expired
- Image might require authentication
- File might have been deleted from hosting service
- Try re-uploading image and updating URL

**Diagram appears too large/small:**
- Images automatically scale to fit container
- Consider resizing image before uploading
- Optimal width: 800-1200px

## Data Management

### User Progress Tracking

**What's Tracked:**
- Section completion (which sections completed)
- Completion timestamps
- Quiz responses (answers and correctness)
- Exercise submissions (content and files)

**Privacy Notes:**
- Quiz answers are visible only to the user and admins
- Exercise submissions are visible only to the user and admins
- Progress data helps identify struggling students

### Enrollment Management

**Enrollment Statuses:**
- **Pending** - User created account but hasn't paid
- **Active** - User has paid and can access course
- **Completed** - User finished all sections

**To manually activate a user:**
```sql
-- In Supabase SQL Editor
INSERT INTO enrollments (user_id, course_id, status, amount_paid)
VALUES (
  'user-id-here',
  '11111111-1111-1111-1111-111111111111',
  'active',
  9900
);
```

### Making a User an Admin

```sql
-- In Supabase SQL Editor
UPDATE user_profiles
SET is_admin = true
WHERE id = 'user-id-here';
```

## Reporting and Analytics

### Available Metrics

**Enrollment Metrics:**
- Total enrollments over time
- Active vs. pending users
- Completion rate

**Engagement Metrics:**
- Quiz performance (via user details)
- Exercise submission rate
- Section completion patterns

**Revenue Metrics:**
- Total revenue
- Average revenue per user
- Payment success rate

### Exporting Data

Currently, data can be exported via Supabase SQL queries:

```sql
-- Export all enrollments
SELECT
  e.*,
  p.full_name,
  p.created_at as user_joined
FROM enrollments e
LEFT JOIN user_profiles p ON p.id = e.user_id
ORDER BY e.enrolled_at DESC;

-- Export quiz performance
SELECT
  u.full_name,
  COUNT(*) as total_questions,
  SUM(CASE WHEN qr.is_correct THEN 1 ELSE 0 END) as correct_answers,
  ROUND(100.0 * SUM(CASE WHEN qr.is_correct THEN 1 ELSE 0 END) / COUNT(*), 2) as score_percentage
FROM quiz_responses qr
LEFT JOIN user_profiles u ON u.id = qr.user_id
GROUP BY u.id, u.full_name
ORDER BY score_percentage DESC;

-- Export section completion rates
SELECT
  cs.title as section_name,
  COUNT(DISTINCT up.user_id) as completed_count,
  (SELECT COUNT(*) FROM enrollments WHERE status = 'active') as total_active_users,
  ROUND(100.0 * COUNT(DISTINCT up.user_id) / (SELECT COUNT(*) FROM enrollments WHERE status = 'active'), 2) as completion_rate
FROM course_sections cs
LEFT JOIN user_progress up ON up.section_id = cs.id AND up.completed = true
GROUP BY cs.id, cs.title
ORDER BY cs.order_index;
```

## Common Admin Tasks

### Task: Add Visual Content to Module 2

1. Create or find diagram (e.g., LLM inference phases)
2. Upload to Imgur or GitHub
3. Copy direct image URL
4. Go to `/admin/diagrams`
5. Find "Module 2: Background - LLM Inference Basics"
6. Click "Add Diagram"
7. Fill in:
   - Title: "LLM Inference Phases Diagram"
   - URL: Your image URL
   - Description: "Comparison of prefill and decode phases"
8. Save and verify

### Task: Review a Struggling Student

1. Go to `/admin`
2. Identify user with low progress percentage
3. Click on their name
4. Review:
   - Which sections they've completed
   - Quiz performance (are they understanding the material?)
   - Exercise submissions (are they engaging with practice?)
5. Consider outreach if needed

### Task: Update Course Content

1. Go to Supabase SQL Editor
2. Query: `SELECT * FROM course_sections ORDER BY order_index`
3. Update content:
```sql
UPDATE course_sections
SET content = 'new markdown content here',
    updated_at = now()
WHERE id = 'section-id-here';
```

### Task: Add New Quiz Questions

```sql
INSERT INTO quizzes (section_id, question, options, correct_answer, explanation, order_index)
VALUES (
  'section-id-here',
  'What is the benefit of disaggregation?',
  '["Better resource utilization", "Smaller models", "Faster training", "More parameters"]',
  0,
  'Disaggregation separates prefill and decode phases, allowing each to be optimized independently for better resource utilization.',
  1
);
```

## Security Best Practices

1. **Protect Admin Access**
   - Only grant admin rights to trusted users
   - Use strong passwords
   - Review admin list regularly

2. **User Privacy**
   - Don't share individual user data
   - Use aggregate metrics when possible
   - Respect user submissions as private

3. **Data Backups**
   - Supabase handles automatic backups
   - Can export data via SQL for additional backups
   - Test restore procedures

## Support and Troubleshooting

### Issue: Can't access admin dashboard

**Solution:**
1. Verify you're logged in
2. Check `user_profiles` table: `SELECT * FROM user_profiles WHERE id = 'your-user-id'`
3. Ensure `is_admin = true`
4. Clear browser cache and retry

### Issue: Diagrams not saving

**Solution:**
1. Check image URL is publicly accessible
2. Verify URL is direct image link (not page link)
3. Check browser console for errors
4. Try with a different image hosting service

### Issue: User data not loading

**Solution:**
1. Check user has enrolled in course
2. Verify enrollment status is 'active'
3. Check browser console for errors
4. Verify database RLS policies are correct

## Future Admin Features

Planned enhancements:
- Bulk user management
- Email notifications to students
- Advanced analytics dashboard
- Exercise grading interface
- Comment/feedback system on submissions
- Course content editor (visual interface)
- Automated reporting

## Questions?

For technical issues:
- Check browser console for errors
- Review Supabase logs
- Check database RLS policies
- Verify environment variables

For feature requests or bugs:
- Document the issue
- Include steps to reproduce
- Note expected vs. actual behavior
