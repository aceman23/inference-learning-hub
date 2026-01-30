import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { supabase, Course, Enrollment } from "../lib/supabase";
import { isDemoAccount } from "../lib/demoAccounts";
import { getUserCertificates } from "../lib/certificates";
import {
  GraduationCap,
  BookOpen,
  Clock,
  Award,
  LogOut,
  Settings as SettingsIcon,
  ShieldCheck,
  Sparkles,
  RefreshCw,
} from "lucide-react";

export const Dashboard: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [hasCertificate, setHasCertificate] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .select("*")
        .eq("is_published", true)
        .maybeSingle();

      console.log("Course Data:", courseData);

      if (courseError) {
        console.error("Error loading course:", courseError);
      }

      if (courseData) {
        setCourse(courseData);

        const { data: enrollmentData } = await supabase
          .from("enrollments")
          .select("*")
          .eq("user_id", user.id)
          .eq("course_id", courseData.id)
          .maybeSingle();

        setEnrollment(enrollmentData);

        if (enrollmentData && enrollmentData.status === "active") {
          const { data: sectionsData } = await supabase
            .from("course_sections")
            .select("id")
            .eq("course_id", courseData.id);

          const totalSections = sectionsData?.length || 0;

          const { data: progressData } = await supabase
            .from("user_progress")
            .select("*")
            .eq("user_id", user.id)
            .eq("course_id", courseData.id)
            .eq("completed", true);

          const completedSections = progressData?.length || 0;
          setProgress(
            totalSections > 0 ? (completedSections / totalSections) * 100 : 0,
          );

          const certs = await getUserCertificates(user.id);
          setHasCertificate(certs && certs.length > 0);
        }
      }
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartCourse = () => {
    if (!enrollment || enrollment.status !== "active") {
      navigate("/payment");
    } else {
      navigate("/course");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const handleResetProgress = async () => {
    if (!user || !isDemoAccount(user.email)) return;

    const confirmed = window.confirm(
      "Are you sure you want to reset all course progress? This will delete all completed sections, quiz submissions, and exercise submissions. You will start from the very beginning of the course.",
    );

    if (!confirmed) return;

    setResetting(true);

    try {
      await supabase.from("user_progress").delete().eq("user_id", user.id);
      await supabase
        .from("exercise_submissions")
        .delete()
        .eq("user_id", user.id);
      await supabase.from("certificates").delete().eq("user_id", user.id);

      await loadDashboardData();

      alert(
        "Course progress reset successfully! You can now start fresh from the beginning.",
      );
    } catch (err: any) {
      console.error("Error resetting progress:", err);
      alert(err.message || "Failed to reset progress");
    } finally {
      setResetting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center relative">
        <div className="fixed -z-10 mix-blend-multiply top-0 right-0 bottom-0 left-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-100"></div>
          <div className="absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-gradient-to-tr from-sky-200 to-blue-200 blur-3xl opacity-70"></div>
          <div className="bg-gradient-to-tr from-blue-200 to-cyan-200 opacity-60 w-72 h-72 rounded-full absolute bottom-0 left-[-10%] blur-3xl"></div>
        </div>
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 relative">
      <div className="fixed -z-10 mix-blend-multiply top-0 right-0 bottom-0 left-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-100"></div>
        <div className="absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-gradient-to-tr from-sky-200 to-blue-200 blur-3xl opacity-70"></div>
        <div className="bg-gradient-to-tr from-blue-200 to-cyan-200 opacity-60 w-72 h-72 rounded-full absolute bottom-0 left-[-10%] blur-3xl"></div>
      </div>

      <nav
        className={`bg-white/80 backdrop-blur-sm shadow-sm border-b border-slate-200 transition-opacity duration-500 relative z-10 ${mounted ? "opacity-100" : "opacity-0"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">
                Inference Learning Hub
              </span>
            </button>
            <div className="flex items-center gap-4">
              {profile?.is_admin && (
                <button
                  onClick={() => navigate("/admin")}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-all duration-300 hover:scale-105"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Admin
                </button>
              )}
              <button
                onClick={() => navigate("/settings")}
                className="p-2 text-slate-600 hover:text-slate-900 transition-all duration-300 hover:scale-110"
              >
                <SettingsIcon className="w-5 h-5" />
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-all duration-300 hover:scale-105"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div
          className={`mb-8 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        >
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-slate-900">
              Welcome back,{" "}
              {profile?.full_name || user?.email?.split("@")[0] || "Student"}!
            </h1>
            {isDemoAccount(user?.email) && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 text-sm font-semibold rounded-full border border-amber-200">
                <Sparkles className="w-4 h-4" />
                Demo Account
              </span>
            )}
          </div>
          <p className="text-slate-600">Continue your learning journey</p>
        </div>

        {course ? (
          <div
            className={`bg-white rounded-3xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] ring-1 ring-black/5 overflow-hidden mb-8 transition-all duration-700 delay-200 hover:shadow-2xl ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 p-8 flex items-center justify-center">
                <BookOpen className="w-32 h-32 text-white opacity-90 transition-transform duration-500 hover:scale-110" />
              </div>
              <div className="md:w-2/3 p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  {course.title}
                </h2>
                <p className="text-slate-600 mb-6">{course.description}</p>

                {enrollment && enrollment.status === "active" ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-slate-600 mb-2">
                        <span>Course Progress</span>
                        <span>{Math.round(progress)}% Complete</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-cyan-600 h-full transition-all duration-500 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={handleStartCourse}
                        className="flex-1 min-w-[200px] bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        {progress > 0 ? "Continue Learning" : "Start Course"}
                      </button>
                      {hasCertificate && (
                        <button
                          onClick={() => navigate("/certificate")}
                          className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                          <Award className="w-5 h-5" />
                          View Certificate
                        </button>
                      )}
                      {isDemoAccount(user?.email) && (
                        <button
                          onClick={handleResetProgress}
                          disabled={resetting}
                          className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <RefreshCw
                            className={`w-5 h-5 ${resetting ? "animate-spin" : ""}`}
                          />
                          {resetting ? "Resetting..." : "Reset Progress"}
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <p className="text-sm text-blue-800 font-medium">
                        {enrollment?.status === "pending"
                          ? "Complete payment to access the full course"
                          : "Enroll now to start learning"}
                      </p>
                    </div>
                    <button
                      onClick={handleStartCourse}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      Enroll Now - ${(course.price / 100).toFixed(2)}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`bg-white rounded-3xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] ring-1 ring-black/5 overflow-hidden mb-8 p-12 text-center transition-all duration-700 delay-200 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <BookOpen className="w-20 h-20 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              No Courses Available
            </h2>
            <p className="text-slate-600">Check back soon for new courses!</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          <div
            className={`bg-white rounded-2xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] ring-1 ring-black/5 p-6 transition-all duration-700 delay-300 hover:shadow-2xl hover:-translate-y-1 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Enrolled Courses
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  {enrollment?.status === "active" ? "1" : "0"}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`bg-white rounded-2xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] ring-1 ring-black/5 p-6 transition-all duration-700 delay-400 hover:shadow-2xl hover:-translate-y-1 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <Clock className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Progress</h3>
                <p className="text-2xl font-bold text-emerald-600">
                  {Math.round(progress)}%
                </p>
              </div>
            </div>
          </div>

          <div
            className={`bg-white rounded-2xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] ring-1 ring-black/5 p-6 transition-all duration-700 delay-500 hover:shadow-2xl hover:-translate-y-1 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Certificates</h3>
                <p className="text-2xl font-bold text-amber-600">
                  {hasCertificate ? "1" : "0"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
