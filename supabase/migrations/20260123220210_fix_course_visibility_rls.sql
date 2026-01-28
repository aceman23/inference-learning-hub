/*
  # Fix Course Visibility for All Users

  1. Changes
    - Add policy to allow anonymous (unauthenticated) users to view published courses
    - This ensures courses are visible on landing page and to all users
  
  2. Security
    - Only SELECT access is granted
    - Only published courses are visible
    - No data modification allowed for anon users
*/

-- Add policy for anonymous users to view published courses
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'courses' 
    AND policyname = 'Anyone can view published courses (anon)'
  ) THEN
    CREATE POLICY "Anyone can view published courses (anon)"
      ON courses FOR SELECT
      TO anon
      USING (is_published = true);
  END IF;
END $$;
