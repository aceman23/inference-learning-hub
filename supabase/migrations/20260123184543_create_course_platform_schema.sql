/*
  # Inference Learning Hub - Course Platform Schema

  ## Overview
  Complete database schema for online course platform with user authentication,
  course management, progress tracking, and payment integration.

  ## New Tables
  
  ### `user_profiles`
  - `id` (uuid, references auth.users, primary key)
  - `full_name` (text, optional user's full name)
  - `is_admin` (boolean, default false, admin role flag)
  - `created_at` (timestamptz, account creation timestamp)
  - `updated_at` (timestamptz, last profile update)
  
  ### `courses`
  - `id` (uuid, primary key)
  - `title` (text, course title)
  - `description` (text, course description)
  - `price` (integer, price in cents)
  - `thumbnail_url` (text, optional course image)
  - `is_published` (boolean, default true)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### `course_sections`
  - `id` (uuid, primary key)
  - `course_id` (uuid, references courses)
  - `title` (text, section title)
  - `content` (text, markdown content)
  - `order_index` (integer, sequential order)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### `enrollments`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `course_id` (uuid, references courses)
  - `status` (text, enrollment status: 'pending', 'active', 'completed')
  - `stripe_payment_id` (text, optional Stripe payment ID)
  - `amount_paid` (integer, amount paid in cents)
  - `enrolled_at` (timestamptz)
  - `completed_at` (timestamptz, optional completion timestamp)
  
  ### `user_progress`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `course_id` (uuid, references courses)
  - `section_id` (uuid, references course_sections)
  - `completed` (boolean, default false)
  - `completed_at` (timestamptz, optional)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ## Security
  - Enable RLS on all tables
  - Users can read/update their own profiles
  - Users can view published courses
  - Users can view sections of enrolled courses
  - Users can manage their own progress
  - Users can view their own enrollments
  - Admins can view all data
  
  ## Indexes
  - Index on course_sections.course_id and order_index for efficient ordering
  - Index on user_progress for quick progress queries
  - Index on enrollments for user/course lookups
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price integer NOT NULL DEFAULT 9900,
  thumbnail_url text,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create course_sections table
CREATE TABLE IF NOT EXISTS course_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending',
  stripe_payment_id text,
  amount_paid integer DEFAULT 0,
  enrolled_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  UNIQUE(user_id, course_id)
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  section_id uuid NOT NULL REFERENCES course_sections(id) ON DELETE CASCADE,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, section_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_course_sections_course_order 
  ON course_sections(course_id, order_index);

CREATE INDEX IF NOT EXISTS idx_user_progress_user_course 
  ON user_progress(user_id, course_id);

CREATE INDEX IF NOT EXISTS idx_enrollments_user_course 
  ON enrollments(user_id, course_id);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.is_admin = true
    )
  );

-- RLS Policies for courses
CREATE POLICY "Anyone can view published courses"
  ON courses FOR SELECT
  TO authenticated
  USING (is_published = true);

CREATE POLICY "Admins can manage courses"
  ON courses FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.is_admin = true
    )
  );

-- RLS Policies for course_sections
CREATE POLICY "Users can view sections of enrolled courses"
  ON course_sections FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM enrollments
      WHERE enrollments.user_id = auth.uid()
      AND enrollments.course_id = course_sections.course_id
      AND enrollments.status = 'active'
    )
  );

CREATE POLICY "Admins can manage sections"
  ON course_sections FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.is_admin = true
    )
  );

-- RLS Policies for enrollments
CREATE POLICY "Users can view their own enrollments"
  ON enrollments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own enrollments"
  ON enrollments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all enrollments"
  ON enrollments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can update enrollments"
  ON enrollments FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.is_admin = true
    )
  );

-- RLS Policies for user_progress
CREATE POLICY "Users can view their own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.is_admin = true
    )
  );