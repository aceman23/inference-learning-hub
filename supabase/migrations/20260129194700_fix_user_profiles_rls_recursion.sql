/*
  # Fix Infinite Recursion in user_profiles RLS Policy

  ## Problem
  The "Admins can view all profiles" policy calls is_admin(), which queries
  user_profiles, causing infinite recursion (PostgreSQL error 42P17).

  ## Solution
  1. Drop the recursive admin policy on user_profiles
  2. Recreate is_admin() to bypass RLS by using SET row_security = off
     (works because function owner 'postgres' has BYPASSRLS privilege)
  3. Recreate the admin policy using the fixed is_admin() function
*/

-- Drop the problematic policy
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;

-- Recreate is_admin function with RLS bypass
-- The function owner (postgres) has BYPASSRLS, so setting row_security = off works
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public
SET row_security = off
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid()
      AND is_admin = true
  );
END;
$$;

-- Recreate the admin policy using the fixed function
CREATE POLICY "Admins can view all profiles"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (is_admin());
