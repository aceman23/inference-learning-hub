import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase, UserProfile, CourseSection, UserProgress, QuizResponse, ExerciseSubmission, Enrollment } from '../lib/supabase';
import { ArrowLeft, User, BookOpen, CheckCircle, Circle, Award } from 'lucide-react';

interface UserDetails {
  profile: UserProfile;
  enrollment: Enrollment | null;
  sections: CourseSection[];
  progress: UserProgress[];
  quizResponses: QuizResponse[];
  exerciseSubmissions: ExerciseSubmission[];
}

export const AdminUserDetails: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile?.is_admin) {
      navigate('/dashboard');
      return;
    }
    if (userId) {
      loadUserDetails(userId);
    }
  }, [userId, profile]);

  const loadUserDetails = async (uid: string) => {
    try {
      const [
        { data: profileData },
        { data: enrollmentData },
        { data: sectionsData },
        { data: progressData },
        { data: quizData },
        { data: exerciseData },
      ] = await Promise.all([
        supabase.from('user_profiles').select('*').eq('id', uid).single(),
        supabase.from('enrollments').select('*').eq('user_id', uid).maybeSingle(),
        supabase.from('course_sections').select('*').order('order_index'),
        supabase.from('user_progress').select('*').eq('user_id', uid),
        supabase.from('quiz_responses').select('*').eq('user_id', uid),
        supabase.from('exercise_submissions').select('*').eq('user_id', uid),
      ]);

      if (profileData) {
        setUserDetails({
          profile: profileData,
          enrollment: enrollmentData,
          sections: sectionsData || [],
          progress: progressData || [],
          quizResponses: quizData || [],
          exerciseSubmissions: exerciseData || [],
        });
      }
    } catch (error) {
      console.error('Error loading user details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">User not found</p>
          <button
            onClick={() => navigate('/admin')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Admin
          </button>
        </div>
      </div>
    );
  }

  const { profile: userProfile, enrollment, sections, progress, quizResponses, exerciseSubmissions } = userDetails;

  const completedSections = progress.filter(p => p.completed).length;
  const totalSections = sections.length;
  const progressPercent = (completedSections / totalSections) * 100;

  const correctQuizzes = quizResponses.filter(r => r.is_correct).length;
  const totalQuizzes = quizResponses.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Admin Dashboard
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {userProfile.full_name || 'No name provided'}
              </h1>
              <p className="text-gray-600">User ID: {userProfile.id.slice(0, 8)}...</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Progress</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">{Math.round(progressPercent)}%</p>
            <p className="text-sm text-gray-600 mt-1">{completedSections}/{totalSections} sections</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Quiz Score</h3>
            </div>
            <p className="text-3xl font-bold text-green-600">
              {totalQuizzes > 0 ? Math.round((correctQuizzes / totalQuizzes) * 100) : 0}%
            </p>
            <p className="text-sm text-gray-600 mt-1">{correctQuizzes}/{totalQuizzes} correct</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-amber-600" />
              <h3 className="font-semibold text-gray-900">Exercises</h3>
            </div>
            <p className="text-3xl font-bold text-amber-600">{exerciseSubmissions.length}</p>
            <p className="text-sm text-gray-600 mt-1">submissions</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <User className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Status</h3>
            </div>
            <p className="text-lg font-bold text-gray-900 capitalize">
              {enrollment?.status || 'Not enrolled'}
            </p>
            {enrollment && (
              <p className="text-sm text-gray-600 mt-1">
                ${(enrollment.amount_paid / 100).toFixed(2)} paid
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Section Progress</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {sections.map((section, index) => {
                const sectionProgress = progress.find(p => p.section_id === section.id);
                const isCompleted = sectionProgress?.completed || false;

                return (
                  <div key={section.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{section.title}</h3>
                      {sectionProgress?.completed_at && (
                        <p className="text-sm text-gray-600">
                          Completed: {new Date(sectionProgress.completed_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="text-sm font-medium">
                      <span className={isCompleted ? 'text-green-600' : 'text-gray-400'}>
                        {isCompleted ? 'Complete' : 'Not started'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {exerciseSubmissions.length > 0 && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Exercise Submissions</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {exerciseSubmissions.map((submission) => {
                  const section = sections.find(s => s.id === submission.section_id);
                  return (
                    <div key={submission.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {section?.title} - Exercise {submission.exercise_number}
                        </h3>
                        <span className="text-sm text-gray-600">
                          {new Date(submission.submitted_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Type: <span className="font-medium capitalize">{submission.submission_type}</span>
                      </p>
                      {submission.content && (
                        <p className="text-sm text-gray-700 bg-white p-3 rounded border border-gray-200">
                          {submission.content.slice(0, 200)}
                          {submission.content.length > 200 && '...'}
                        </p>
                      )}
                      {submission.file_url && (
                        <a
                          href={submission.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-700 underline"
                        >
                          View submission
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
