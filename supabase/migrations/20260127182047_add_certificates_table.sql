/*
  # Add Certificates Table

  1. New Tables
    - `certificates`
      - `id` (uuid, primary key) - Unique certificate identifier
      - `user_id` (uuid, foreign key) - Reference to user who earned the certificate
      - `course_id` (uuid, foreign key) - Reference to completed course
      - `certificate_number` (text, unique) - Human-readable certificate number (e.g., CERT-2024-001234)
      - `issued_at` (timestamptz) - When the certificate was issued
      - `recipient_name` (text) - Name of certificate recipient
      - `course_title` (text) - Title of the completed course
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `certificates` table
    - Add policy for users to view their own certificates
    - Add policy for public verification of certificates by certificate number
    - Add policy for admin users to view all certificates

  3. Indexes
    - Add index on user_id for efficient user certificate lookups
    - Add index on certificate_number for verification lookups
    - Add unique index on user_id + course_id to prevent duplicate certificates
*/

CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  certificate_number text UNIQUE NOT NULL,
  issued_at timestamptz NOT NULL DEFAULT now(),
  recipient_name text NOT NULL,
  course_title text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_certificates_user_course 
  ON certificates(user_id, course_id);

CREATE INDEX IF NOT EXISTS idx_certificates_user_id 
  ON certificates(user_id);

CREATE INDEX IF NOT EXISTS idx_certificates_certificate_number 
  ON certificates(certificate_number);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own certificates"
  ON certificates
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public can verify certificates by number"
  ON certificates
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Admin users can view all certificates"
  ON certificates
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.is_admin = true
    )
  );

CREATE POLICY "System can insert certificates"
  ON certificates
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);