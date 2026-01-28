/*
  # Add Quizzes, Exercises, and Diagrams Support

  ## Overview
  Extends the course platform with interactive learning features including quizzes,
  exercise submissions, and visual diagrams for each module.

  ## New Tables
  
  ### `section_diagrams`
  - `id` (uuid, primary key)
  - `section_id` (uuid, references course_sections)
  - `title` (text, diagram title)
  - `image_url` (text, URL to diagram image)
  - `description` (text, optional description)
  - `order_index` (integer, display order)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### `quizzes`
  - `id` (uuid, primary key)
  - `section_id` (uuid, references course_sections)
  - `question` (text, quiz question)
  - `options` (jsonb, array of answer options)
  - `correct_answer` (integer, index of correct option)
  - `explanation` (text, optional explanation)
  - `order_index` (integer, question order)
  - `created_at` (timestamptz)
  
  ### `quiz_responses`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `quiz_id` (uuid, references quizzes)
  - `selected_answer` (integer, user's answer)
  - `is_correct` (boolean, whether answer was correct)
  - `attempted_at` (timestamptz)
  
  ### `exercise_submissions`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `section_id` (uuid, references course_sections)
  - `exercise_number` (integer, which exercise)
  - `submission_type` (text, 'text', 'file', 'link')
  - `content` (text, submission content)
  - `file_url` (text, optional file URL)
  - `submitted_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ## Security
  - Enable RLS on all tables
  - Users can view quizzes for enrolled courses
  - Users can submit and view their own responses
  - Admins can view all responses and manage content
*/

-- Create section_diagrams table
CREATE TABLE IF NOT EXISTS section_diagrams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid NOT NULL REFERENCES course_sections(id) ON DELETE CASCADE,
  title text NOT NULL,
  image_url text NOT NULL,
  description text,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid NOT NULL REFERENCES course_sections(id) ON DELETE CASCADE,
  question text NOT NULL,
  options jsonb NOT NULL,
  correct_answer integer NOT NULL,
  explanation text,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create quiz_responses table
CREATE TABLE IF NOT EXISTS quiz_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id uuid NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  selected_answer integer NOT NULL,
  is_correct boolean NOT NULL,
  attempted_at timestamptz DEFAULT now(),
  UNIQUE(user_id, quiz_id)
);

-- Create exercise_submissions table
CREATE TABLE IF NOT EXISTS exercise_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  section_id uuid NOT NULL REFERENCES course_sections(id) ON DELETE CASCADE,
  exercise_number integer NOT NULL,
  submission_type text NOT NULL DEFAULT 'text',
  content text,
  file_url text,
  submitted_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, section_id, exercise_number)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_section_diagrams_section 
  ON section_diagrams(section_id, order_index);

CREATE INDEX IF NOT EXISTS idx_quizzes_section 
  ON quizzes(section_id, order_index);

CREATE INDEX IF NOT EXISTS idx_quiz_responses_user 
  ON quiz_responses(user_id, quiz_id);

CREATE INDEX IF NOT EXISTS idx_exercise_submissions_user 
  ON exercise_submissions(user_id, section_id);

-- Enable RLS
ALTER TABLE section_diagrams ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for section_diagrams
CREATE POLICY "Users can view diagrams of enrolled courses"
  ON section_diagrams FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM course_sections cs
      JOIN enrollments e ON e.course_id = cs.course_id
      WHERE cs.id = section_diagrams.section_id
      AND e.user_id = auth.uid()
      AND e.status = 'active'
    )
  );

CREATE POLICY "Admins can manage diagrams"
  ON section_diagrams FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.is_admin = true
    )
  );

-- RLS Policies for quizzes
CREATE POLICY "Users can view quizzes of enrolled courses"
  ON quizzes FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM course_sections cs
      JOIN enrollments e ON e.course_id = cs.course_id
      WHERE cs.id = quizzes.section_id
      AND e.user_id = auth.uid()
      AND e.status = 'active'
    )
  );

CREATE POLICY "Admins can manage quizzes"
  ON quizzes FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.is_admin = true
    )
  );

-- RLS Policies for quiz_responses
CREATE POLICY "Users can view their own quiz responses"
  ON quiz_responses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz responses"
  ON quiz_responses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quiz responses"
  ON quiz_responses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all quiz responses"
  ON quiz_responses FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.is_admin = true
    )
  );

-- RLS Policies for exercise_submissions
CREATE POLICY "Users can view their own submissions"
  ON exercise_submissions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own submissions"
  ON exercise_submissions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own submissions"
  ON exercise_submissions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all submissions"
  ON exercise_submissions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.is_admin = true
    )
  );