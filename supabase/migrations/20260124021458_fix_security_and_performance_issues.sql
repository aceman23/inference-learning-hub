/*
  # Fix Security and Performance Issues

  ## Overview
  This migration addresses critical security and performance issues identified in the database audit.

  ## Changes Made

  ### 1. Add Missing Foreign Key Indexes
  Foreign keys without indexes can cause significant performance degradation on queries.
  Adding indexes for:
  - `enrollments.course_id`
  - `exercise_submissions.section_id`
  - `quiz_responses.quiz_id`
  - `user_progress.course_id`
  - `user_progress.section_id`

  ### 2. Remove Unused Indexes
  Dropping indexes that are not being used to reduce storage and maintenance overhead:
  - `idx_user_progress_user_course` (redundant with unique constraint)
  - `idx_quiz_responses_user` (redundant with unique constraint)

  ### 3. Optimize RLS Policies
  Wrapping `auth.uid()` calls with `(select auth.uid())` to prevent re-evaluation for each row.
  This significantly improves query performance at scale.
  
  All RLS policies updated for:
  - user_profiles (3 policies)
  - course_sections (1 policy)
  - enrollments (3 policies)
  - user_progress (3 policies)
  - section_diagrams (2 policies)
  - quizzes (2 policies)
  - quiz_responses (4 policies)
  - exercise_submissions (4 policies)

  ### 4. Fix Function Search Path
  Set stable search path for `is_admin` function to prevent security issues.

  ## Notes
  - Multiple permissive policies are acceptable for role-based access (admin vs user)
  - Auth connection strategy and leaked password protection require Supabase dashboard configuration
*/

-- =====================================================
-- 1. ADD MISSING FOREIGN KEY INDEXES
-- =====================================================

-- Index for enrollments.course_id (improves JOIN and WHERE performance)
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id 
ON enrollments(course_id);

-- Index for exercise_submissions.section_id
CREATE INDEX IF NOT EXISTS idx_exercise_submissions_section_id 
ON exercise_submissions(section_id);

-- Index for quiz_responses.quiz_id
CREATE INDEX IF NOT EXISTS idx_quiz_responses_quiz_id 
ON quiz_responses(quiz_id);

-- Index for user_progress.course_id
CREATE INDEX IF NOT EXISTS idx_user_progress_course_id 
ON user_progress(course_id);

-- Index for user_progress.section_id
CREATE INDEX IF NOT EXISTS idx_user_progress_section_id 
ON user_progress(section_id);

-- =====================================================
-- 2. REMOVE UNUSED INDEXES
-- =====================================================

-- Drop unused composite index (covered by unique constraint)
DROP INDEX IF EXISTS idx_user_progress_user_course;

-- Drop unused composite index (covered by unique constraint)
DROP INDEX IF EXISTS idx_quiz_responses_user;

-- =====================================================
-- 3. OPTIMIZE RLS POLICIES
-- =====================================================

-- ========== USER_PROFILES ==========

DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
CREATE POLICY "Users can insert their own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

-- ========== COURSE_SECTIONS ==========

DROP POLICY IF EXISTS "Users can view sections of enrolled courses" ON course_sections;
CREATE POLICY "Users can view sections of enrolled courses"
  ON course_sections FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM enrollments
      WHERE enrollments.course_id = course_sections.course_id
        AND enrollments.user_id = (select auth.uid())
        AND enrollments.status = 'active'
    )
  );

-- ========== ENROLLMENTS ==========

DROP POLICY IF EXISTS "Users can view their own enrollments" ON enrollments;
CREATE POLICY "Users can view their own enrollments"
  ON enrollments FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can insert their own enrollments" ON enrollments;
CREATE POLICY "Users can insert their own enrollments"
  ON enrollments FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update their own enrollments" ON enrollments;
CREATE POLICY "Users can update their own enrollments"
  ON enrollments FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

-- ========== USER_PROGRESS ==========

DROP POLICY IF EXISTS "Users can view their own progress" ON user_progress;
CREATE POLICY "Users can view their own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can insert their own progress" ON user_progress;
CREATE POLICY "Users can insert their own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update their own progress" ON user_progress;
CREATE POLICY "Users can update their own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

-- ========== SECTION_DIAGRAMS ==========

DROP POLICY IF EXISTS "Users can view diagrams of enrolled courses" ON section_diagrams;
CREATE POLICY "Users can view diagrams of enrolled courses"
  ON section_diagrams FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM course_sections
      JOIN enrollments ON enrollments.course_id = course_sections.course_id
      WHERE course_sections.id = section_diagrams.section_id
        AND enrollments.user_id = (select auth.uid())
        AND enrollments.status = 'active'
    )
  );

DROP POLICY IF EXISTS "Admins can manage diagrams" ON section_diagrams;
CREATE POLICY "Admins can manage diagrams"
  ON section_diagrams FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = (select auth.uid())
        AND user_profiles.is_admin = true
    )
  );

-- ========== QUIZZES ==========

DROP POLICY IF EXISTS "Users can view quizzes of enrolled courses" ON quizzes;
CREATE POLICY "Users can view quizzes of enrolled courses"
  ON quizzes FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM course_sections
      JOIN enrollments ON enrollments.course_id = course_sections.course_id
      WHERE course_sections.id = quizzes.section_id
        AND enrollments.user_id = (select auth.uid())
        AND enrollments.status = 'active'
    )
  );

DROP POLICY IF EXISTS "Admins can manage quizzes" ON quizzes;
CREATE POLICY "Admins can manage quizzes"
  ON quizzes FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = (select auth.uid())
        AND user_profiles.is_admin = true
    )
  );

-- ========== QUIZ_RESPONSES ==========

DROP POLICY IF EXISTS "Users can view their own quiz responses" ON quiz_responses;
CREATE POLICY "Users can view their own quiz responses"
  ON quiz_responses FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can insert their own quiz responses" ON quiz_responses;
CREATE POLICY "Users can insert their own quiz responses"
  ON quiz_responses FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update their own quiz responses" ON quiz_responses;
CREATE POLICY "Users can update their own quiz responses"
  ON quiz_responses FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Admins can view all quiz responses" ON quiz_responses;
CREATE POLICY "Admins can view all quiz responses"
  ON quiz_responses FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = (select auth.uid())
        AND user_profiles.is_admin = true
    )
  );

-- ========== EXERCISE_SUBMISSIONS ==========

DROP POLICY IF EXISTS "Users can view their own submissions" ON exercise_submissions;
CREATE POLICY "Users can view their own submissions"
  ON exercise_submissions FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can insert their own submissions" ON exercise_submissions;
CREATE POLICY "Users can insert their own submissions"
  ON exercise_submissions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update their own submissions" ON exercise_submissions;
CREATE POLICY "Users can update their own submissions"
  ON exercise_submissions FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Admins can view all submissions" ON exercise_submissions;
CREATE POLICY "Admins can view all submissions"
  ON exercise_submissions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = (select auth.uid())
        AND user_profiles.is_admin = true
    )
  );

-- =====================================================
-- 4. FIX FUNCTION SEARCH PATH
-- =====================================================

-- Recreate is_admin function with stable search path (preserves dependencies)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid()
      AND is_admin = true
  );
END;
$$;
