/*
  # Add User Enrollment Update Policy

  1. Changes
    - Add policy to allow users to update their own enrollments
    - This is needed for the payment success flow to activate enrollments
  
  2. Security
    - Users can only update their own enrollments
    - Users cannot change user_id or course_id (ownership)
*/

-- Add policy for users to update their own enrollments
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'enrollments' 
    AND policyname = 'Users can update their own enrollments'
  ) THEN
    CREATE POLICY "Users can update their own enrollments"
      ON enrollments FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;
