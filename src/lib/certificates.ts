import { supabase } from './supabase';

export const generateCertificateNumber = (): string => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `CERT-${year}-${randomNum}`;
};

export const checkCourseCompletion = async (userId: string, courseId: string): Promise<boolean> => {
  const { data: sections } = await supabase
    .from('course_sections')
    .select('id')
    .eq('course_id', courseId);

  if (!sections || sections.length === 0) return false;

  const { data: progress } = await supabase
    .from('user_progress')
    .select('id, completed')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .eq('completed', true);

  return progress ? progress.length === sections.length : false;
};

export const generateCertificate = async (
  userId: string,
  courseId: string,
  recipientName: string,
  courseTitle: string
): Promise<string | null> => {
  try {
    const existingCert = await supabase
      .from('certificates')
      .select('certificate_number')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .maybeSingle();

    if (existingCert.data) {
      return existingCert.data.certificate_number;
    }

    const isCompleted = await checkCourseCompletion(userId, courseId);
    if (!isCompleted) {
      return null;
    }

    const certificateNumber = generateCertificateNumber();

    const { data, error } = await supabase
      .from('certificates')
      .insert({
        user_id: userId,
        course_id: courseId,
        certificate_number: certificateNumber,
        recipient_name: recipientName,
        course_title: courseTitle,
        issued_at: new Date().toISOString(),
      })
      .select('certificate_number')
      .single();

    if (error) throw error;

    await supabase
      .from('enrollments')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .eq('course_id', courseId);

    return data.certificate_number;
  } catch (error) {
    console.error('Error generating certificate:', error);
    return null;
  }
};

export const getCertificateByNumber = async (certificateNumber: string) => {
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .eq('certificate_number', certificateNumber)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const getUserCertificates = async (userId: string) => {
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .eq('user_id', userId)
    .order('issued_at', { ascending: false });

  if (error) throw error;
  return data;
};
