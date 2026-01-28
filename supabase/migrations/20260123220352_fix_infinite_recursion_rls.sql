/*
  # Fix Infinite Recursion in RLS Policies

  1. Changes
    - Drop all policies that cause infinite recursion (admin policies that check user_profiles)
    - Create simplified policies without recursion
    - Use a security definer function for admin checks
  
  2. Security
    - Maintain secure access control
    - Users can only access their own data
    - Admin checks work without causing recursion
*/

-- Drop policies that cause infinite recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Admins can manage courses" ON courses;
DROP POLICY IF EXISTS "Admins can manage sections" ON course_sections;
DROP POLICY IF EXISTS "Admins can view all enrollments" ON enrollments;
DROP POLICY IF EXISTS "Admins can update enrollments" ON enrollments;
DROP POLICY IF EXISTS "Admins can view all progress" ON user_progress;

-- Create a security definer function to check admin status
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate admin policies using the security definer function
CREATE POLICY "Admins can view all profiles"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can manage courses"
  ON courses FOR ALL
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can manage sections"
  ON course_sections FOR ALL
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can view all enrollments"
  ON enrollments FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can update enrollments"
  ON enrollments FOR UPDATE
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can view all progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (is_admin());
