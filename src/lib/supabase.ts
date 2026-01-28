import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UserProfile {
  id: string;
  full_name: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CourseSection {
  id: string;
  course_id: string;
  title: string;
  content: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: 'pending' | 'active' | 'completed';
  stripe_payment_id: string | null;
  amount_paid: number;
  enrolled_at: string;
  completed_at: string | null;
}

export interface UserProgress {
  id: string;
  user_id: string;
  course_id: string;
  section_id: string;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SectionDiagram {
  id: string;
  section_id: string;
  title: string;
  image_url: string;
  description: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Quiz {
  id: string;
  section_id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string | null;
  order_index: number;
  created_at: string;
}

export interface QuizResponse {
  id: string;
  user_id: string;
  quiz_id: string;
  selected_answer: number;
  is_correct: boolean;
  attempted_at: string;
}

export interface ExerciseSubmission {
  id: string;
  user_id: string;
  section_id: string;
  exercise_number: number;
  submission_type: 'text' | 'file' | 'link';
  content: string | null;
  file_url: string | null;
  submitted_at: string;
  updated_at: string;
}

export interface Certificate {
  id: string;
  user_id: string;
  course_id: string;
  certificate_number: string;
  issued_at: string;
  recipient_name: string;
  course_title: string;
  created_at: string;
  updated_at: string;
}
