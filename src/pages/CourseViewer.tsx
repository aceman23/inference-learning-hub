import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Course, CourseSection, UserProgress } from '../lib/supabase';
import { generateCertificate } from '../lib/certificates';
import { ChevronLeft, ChevronRight, CheckCircle, Circle, Home, Lock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import ObjectivesFlow from '../components/ObjectivesFlow';
import PrefillPhaseFlow from '../components/PrefillPhaseFlow';
import { Module3Viewer } from '../components/Module3Viewer';
import { Module4Viewer } from '../components/Module4Viewer';
import { Module5Viewer } from '../components/Module5Viewer';
import { Module6Viewer } from '../components/Module6Viewer';

export const CourseViewer: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [sections, setSections] = useState<CourseSection[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [progress, setProgress] = useState<Map<string, UserProgress>>(new Map());
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [objectivesCompleted, setObjectivesCompleted] = useState(false);
  const [prefillPhaseCompleted, setPrefillPhaseCompleted] = useState(false);
  const [module3Completed, setModule3Completed] = useState(false);
  const [module4Completed, setModule4Completed] = useState(false);
  const [module5Completed, setModule5Completed] = useState(false);
  const [module6Completed, setModule6Completed] = useState(false);

  useEffect(() => {
    loadCourseData();
  }, [user]);

  const loadCourseData = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const { data: courseData } = await supabase
        .from('courses')
        .select('*')
        .eq('is_published', true)
        .maybeSingle();

      if (!courseData) {
        navigate('/dashboard');
        return;
      }

      const { data: enrollmentData } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseData.id)
        .maybeSingle();

      if (!enrollmentData || enrollmentData.status !== 'active') {
        navigate('/payment');
        return;
      }

      setCourse(courseData);

      const { data: sectionsData } = await supabase
        .from('course_sections')
        .select('*')
        .eq('course_id', courseData.id)
        .order('order_index', { ascending: true });

      setSections(sectionsData || []);

      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseData.id);

      const progressMap = new Map<string, UserProgress>();
      progressData?.forEach((p) => {
        progressMap.set(p.section_id, p);
      });
      setProgress(progressMap);

      const lastIncompleteIndex = sectionsData?.findIndex(
        (s) => !progressMap.get(s.id)?.completed
      );
      if (lastIncompleteIndex !== undefined && lastIncompleteIndex !== -1) {
        setCurrentSectionIndex(lastIncompleteIndex);
      }
    } catch (error) {
      console.error('Error loading course:', error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const markSectionComplete = async (sectionId: string) => {
    if (!user || !course) return;

    try {
      const { data: existing } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('section_id', sectionId)
        .maybeSingle();

      if (existing) {
        await supabase
          .from('user_progress')
          .update({
            completed: true,
            completed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id);
      } else {
        await supabase.from('user_progress').insert([
          {
            user_id: user.id,
            course_id: course.id,
            section_id: sectionId,
            completed: true,
            completed_at: new Date().toISOString(),
          },
        ]);
      }

      await loadCourseData();

      const { data: allProgress } = await supabase
        .from('user_progress')
        .select('id, completed')
        .eq('user_id', user.id)
        .eq('course_id', course.id)
        .eq('completed', true);

      if (allProgress && allProgress.length === sections.length) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('full_name')
          .eq('id', user.id)
          .maybeSingle();

        const recipientName = profile?.full_name || user.email?.split('@')[0] || 'Student';

        await generateCertificate(
          user.id,
          course.id,
          recipientName,
          course.title
        );
      }
    } catch (error) {
      console.error('Error marking section complete:', error);
    }
  };

  const canAccessSection = (index: number) => {
    if (index === 0) return true;
    const previousSection = sections[index - 1];
    return progress.get(previousSection?.id)?.completed || false;
  };

  const goToSection = (index: number) => {
    if (canAccessSection(index)) {
      setCurrentSectionIndex(index);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    const currentSection = sections[currentSectionIndex];
    if (currentSection && !progress.get(currentSection.id)?.completed) {
      markSectionComplete(currentSection.id);
    }

    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      window.scrollTo(0, 0);
    } else {
      navigate('/dashboard');
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  const currentSection = sections[currentSectionIndex];
  const isCurrentCompleted = currentSection ? progress.get(currentSection.id)?.completed : false;
  const completedCount = Array.from(progress.values()).filter((p) => p.completed).length;
  const progressPercent = (completedCount / sections.length) * 100;

  return (
    <div className="flex h-screen bg-gray-50">
      <aside
        className={`${
          sidebarOpen ? 'w-80' : 'w-0'
        } bg-white border-r border-gray-200 overflow-y-auto transition-all duration-300`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Course Progress</h2>
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 text-gray-600 hover:text-gray-900 transition"
            >
              <Home className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-2">
              {completedCount}/{sections.length} Modules Complete
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          <nav className="space-y-2">
            {sections.map((section, index) => {
              const isCompleted = progress.get(section.id)?.completed;
              const isCurrent = index === currentSectionIndex;
              const canAccess = canAccessSection(index);

              return (
                <button
                  key={section.id}
                  onClick={() => goToSection(index)}
                  disabled={!canAccess}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    isCurrent
                      ? 'bg-blue-50 border-2 border-blue-600'
                      : canAccess
                      ? 'hover:bg-gray-50 border-2 border-transparent'
                      : 'opacity-50 cursor-not-allowed border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {!canAccess ? (
                        <Lock className="w-5 h-5 text-gray-400" />
                      ) : isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Module {index + 1}</div>
                      <div
                        className={`text-sm font-medium ${
                          isCurrent ? 'text-blue-600' : 'text-gray-900'
                        }`}
                      >
                        {section.title}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mb-6 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            {sidebarOpen ? 'Hide' : 'Show'} Sidebar
          </button>

          {currentSection && (
            <>
              {currentSectionIndex === 0 && !objectivesCompleted ? (
                <ObjectivesFlow
                  onComplete={async () => {
                    setObjectivesCompleted(true);
                    await markSectionComplete(currentSection.id);
                    if (currentSectionIndex < sections.length - 1) {
                      setCurrentSectionIndex(currentSectionIndex + 1);
                      window.scrollTo(0, 0);
                    }
                  }}
                />
              ) : currentSectionIndex === 1 && !prefillPhaseCompleted ? (
                <PrefillPhaseFlow
                  courseId={course.id}
                  sectionId={currentSection.id}
                  onComplete={async () => {
                    setPrefillPhaseCompleted(true);
                    await markSectionComplete(currentSection.id);
                    if (currentSectionIndex < sections.length - 1) {
                      setCurrentSectionIndex(currentSectionIndex + 1);
                      window.scrollTo(0, 0);
                    }
                  }}
                />
              ) : currentSectionIndex === 2 && !module3Completed ? (
                <Module3Viewer
                  courseId={course.id}
                  sectionId={currentSection.id}
                  onComplete={async () => {
                    setModule3Completed(true);
                    await markSectionComplete(currentSection.id);
                    if (currentSectionIndex < sections.length - 1) {
                      setCurrentSectionIndex(currentSectionIndex + 1);
                      window.scrollTo(0, 0);
                    }
                  }}
                />
              ) : currentSectionIndex === 3 && !module4Completed ? (
                <Module4Viewer
                  courseId={course.id}
                  sectionId={currentSection.id}
                  onComplete={async () => {
                    setModule4Completed(true);
                    await markSectionComplete(currentSection.id);
                    if (currentSectionIndex < sections.length - 1) {
                      setCurrentSectionIndex(currentSectionIndex + 1);
                      window.scrollTo(0, 0);
                    }
                  }}
                />
              ) : currentSectionIndex === 4 && !module5Completed ? (
                <Module5Viewer
                  courseId={course.id}
                  sectionId={currentSection.id}
                  onComplete={async () => {
                    setModule5Completed(true);
                    await markSectionComplete(currentSection.id);
                    if (currentSectionIndex < sections.length - 1) {
                      setCurrentSectionIndex(currentSectionIndex + 1);
                      window.scrollTo(0, 0);
                    }
                  }}
                />
              ) : currentSectionIndex === 5 && !module6Completed ? (
                <Module6Viewer
                  courseId={course.id}
                  sectionId={currentSection.id}
                  onComplete={async () => {
                    setModule6Completed(true);
                    await markSectionComplete(currentSection.id);
                    navigate('/dashboard');
                  }}
                />
              ) : (
                <article className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                  {(currentSectionIndex === 0 && objectivesCompleted) ||
                   (currentSectionIndex === 1 && prefillPhaseCompleted) ||
                   (currentSectionIndex === 2 && module3Completed) ||
                   (currentSectionIndex === 3 && module4Completed) ||
                   (currentSectionIndex === 4 && module5Completed) ||
                   (currentSectionIndex === 5 && module6Completed) ? (
                    <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                      <button
                        onClick={() => {
                          if (currentSectionIndex === 0) setObjectivesCompleted(false);
                          if (currentSectionIndex === 1) setPrefillPhaseCompleted(false);
                          if (currentSectionIndex === 2) setModule3Completed(false);
                          if (currentSectionIndex === 3) setModule4Completed(false);
                          if (currentSectionIndex === 4) setModule5Completed(false);
                          if (currentSectionIndex === 5) setModule6Completed(false);
                          window.scrollTo(0, 0);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition shadow-sm border border-blue-200"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Interactive Overview
                      </button>
                    </div>
                  ) : null}

                  <div className="mb-6">
                    <div className="text-sm text-blue-600 font-semibold mb-2">
                      Module {currentSectionIndex + 1} of {sections.length}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                      {currentSection.title}
                    </h1>
                    {isCurrentCompleted && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Completed
                      </div>
                    )}
                  </div>

                  <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100">
                    <ReactMarkdown>{currentSection.content}</ReactMarkdown>
                  </div>
                </article>
              )}
            </>
          )}

          {!(currentSectionIndex === 0 && !objectivesCompleted) &&
           !(currentSectionIndex === 1 && !prefillPhaseCompleted) &&
           !(currentSectionIndex === 2 && !module3Completed) &&
           !(currentSectionIndex === 3 && !module4Completed) &&
           !(currentSectionIndex === 4 && !module5Completed) &&
           !(currentSectionIndex === 5 && !module6Completed) && (
            <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-6">
              <button
                onClick={handlePrevious}
                disabled={currentSectionIndex === 0}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                {currentSectionIndex === sections.length - 1
                  ? 'Complete Course'
                  : isCurrentCompleted
                  ? 'Next Section'
                  : 'Mark Complete & Continue'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
