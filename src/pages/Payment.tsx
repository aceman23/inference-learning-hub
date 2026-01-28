import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Course } from '../lib/supabase';
import { CreditCard, CheckCircle, ShieldCheck, Clock, Award, GraduationCap, ArrowLeft } from 'lucide-react';

export const Payment: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

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

      setCourse(courseData);

      const { data: enrollmentData } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseData.id)
        .maybeSingle();

      if (enrollmentData?.status === 'active') {
        navigate('/course');
        return;
      }
    } catch (error) {
      console.error('Error loading course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!user || !course) {
      alert('Unable to process payment. Please refresh and try again.');
      return;
    }

    setProcessing(true);

    try {
      const { data: existingEnrollment, error: fetchError } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', course.id)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching enrollment:', fetchError);
        alert('Error checking enrollment status. Please try again.');
        setProcessing(false);
        return;
      }

      if (!existingEnrollment) {
        const { error: enrollmentError } = await supabase
          .from('enrollments')
          .insert([
            {
              user_id: user.id,
              course_id: course.id,
              status: 'pending',
              amount_paid: course.price,
            },
          ]);

        if (enrollmentError) {
          console.error('Error creating enrollment:', enrollmentError);
          alert(`Failed to create enrollment: ${enrollmentError.message}`);
          setProcessing(false);
          return;
        }
      }

      const stripeUrl = `https://buy.stripe.com/3cI3cv6pMdxp7CI5TQ2wU0C?client_reference_id=${user.id}&prefilled_email=${encodeURIComponent(user.email || '')}`;

      setTimeout(() => {
        window.location.href = stripeUrl;
      }, 100);
    } catch (error) {
      console.error('Payment error:', error);
      alert(`An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!course) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Inference Learning Hub</span>
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Enroll in the Course</h1>
          <p className="text-lg text-gray-600">
            Unlock full access to all course materials and earn your certificate
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{course.title}</h2>
              <p className="text-gray-600 mb-6">{course.description}</p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">7 Comprehensive Sections</h3>
                    <p className="text-sm text-gray-600">
                      From fundamentals to advanced implementation techniques
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Lifetime Access</h3>
                    <p className="text-sm text-gray-600">
                      Learn at your own pace with unlimited access
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Certificate of Completion</h3>
                    <p className="text-sm text-gray-600">
                      Earn a certificate when you complete all sections
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Progress Tracking</h3>
                    <p className="text-sm text-gray-600">
                      Track your progress and pick up where you left off
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">What You'll Learn:</h3>
                <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    LLM Serving Challenges
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Two-Phase Inference Process
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    System Architecture Design
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    KV Cache Management
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Performance Optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Production Deployment
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Advanced Techniques
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Future Directions
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  ${(course.price / 100).toFixed(2)}
                </div>
                <p className="text-gray-600">One-time payment</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Course access</span>
                  <span className="font-semibold text-gray-900">Lifetime</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Certificate</span>
                  <span className="font-semibold text-gray-900">Included</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Support</span>
                  <span className="font-semibold text-gray-900">Email</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={processing}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                {processing ? 'Processing...' : 'Enroll Now'}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Secure payment powered by Stripe
              </p>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2 font-medium">Money-back guarantee:</p>
                <p className="text-xs text-gray-500">
                  Not satisfied? Get a full refund within 14 days, no questions asked.
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium transition"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
