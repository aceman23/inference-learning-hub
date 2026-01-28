import { supabase } from './supabase';

const DEMO_EMAILS = [
  'demo@learnhub.com',
];

export const isDemoAccount = (email: string | undefined): boolean => {
  if (!email) return false;
  return DEMO_EMAILS.includes(email.toLowerCase());
};

export const ensureDemoEnrollment = async (userId: string, email: string | undefined) => {
  if (!isDemoAccount(email)) return;

  try {
    const { data: course } = await supabase
      .from('courses')
      .select('id')
      .eq('is_published', true)
      .maybeSingle();

    if (!course) return;

    const { data: existingEnrollment } = await supabase
      .from('enrollments')
      .select('id, status')
      .eq('user_id', userId)
      .eq('course_id', course.id)
      .maybeSingle();

    if (!existingEnrollment) {
      await supabase.from('enrollments').insert({
        user_id: userId,
        course_id: course.id,
        status: 'active',
        amount_paid: 0,
      });
    } else if (existingEnrollment.status !== 'active') {
      await supabase
        .from('enrollments')
        .update({ status: 'active' })
        .eq('id', existingEnrollment.id);
    }
  } catch (error) {
    console.error('Error ensuring demo enrollment:', error);
  }
};
