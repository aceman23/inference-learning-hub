/*
  # Add Quiz Tracking Table

  ## Overview
  This migration creates a table to track user answers to quiz questions in modules 2-6.
  This ensures users must answer all "quick self-check" questions before progressing to the next topic.

  ## New Tables
  
  ### `quiz_answers`
  - `id` (uuid, primary key) - Unique identifier for each quiz answer
  - `user_id` (uuid, foreign key) - References auth.users, identifies who answered
  - `course_id` (uuid, foreign key) - References courses table
  - `section_id` (uuid, foreign key) - References course_sections table
  - `topic_id` (text) - Identifier for the specific topic within the module
  - `question_index` (integer) - Index of the question within the topic's quiz array
  - `answered` (boolean) - Whether the question has been answered
  - `created_at` (timestamptz) - When the answer was first recorded
  - `updated_at` (timestamptz) - When the answer was last updated

  ## Security
  - Enable RLS on quiz_answers table
  - Users can read their own quiz answers
  - Users can insert their own quiz answers
  - Users can update their own quiz answers
  - Admins can read all quiz answers

  ## Indexes
  - Composite index on (user_id, course_id, section_id, topic_id) for fast lookups
  - Index on user_id for user-specific queries

  ## Important Notes
  - The table tracks whether questions have been answered, not the actual answers themselves
  - This enforces completion without storing potentially sensitive quiz response data
  - Each user can have multiple records per question as they progress through topics
*/

-- Create quiz_answers table
CREATE TABLE IF NOT EXISTS quiz_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  section_id uuid NOT NULL REFERENCES course_sections(id) ON DELETE CASCADE,
  topic_id text NOT NULL,
  question_index integer NOT NULL,
  answered boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id, section_id, topic_id, question_index)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_quiz_answers_user_course 
  ON quiz_answers(user_id, course_id, section_id, topic_id);

CREATE INDEX IF NOT EXISTS idx_quiz_answers_user 
  ON quiz_answers(user_id);

-- Enable RLS
ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can read their own quiz answers
CREATE POLICY "Users can view own quiz answers"
  ON quiz_answers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own quiz answers
CREATE POLICY "Users can create own quiz answers"
  ON quiz_answers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own quiz answers
CREATE POLICY "Users can update own quiz answers"
  ON quiz_answers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Admins can view all quiz answers (for analytics/support)
CREATE POLICY "Admins can view all quiz answers"
  ON quiz_answers
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.is_admin = true
    )
  );

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_quiz_answers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function
DROP TRIGGER IF EXISTS quiz_answers_updated_at ON quiz_answers;
CREATE TRIGGER quiz_answers_updated_at
  BEFORE UPDATE ON quiz_answers
  FOR EACH ROW
  EXECUTE FUNCTION update_quiz_answers_updated_at();