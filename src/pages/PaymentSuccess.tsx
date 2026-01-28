import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { CheckCircle, GraduationCap } from 'lucide-react';

export const PaymentSuccess: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');

  useEffect(() => {
    processPayment();
  }, [user]);

  const processPayment = async () => {
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
        setStatus('error');
        return;
      }

      const sessionId = searchParams.get('session_id');

      const { data: enrollment, error: fetchError } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseData.id)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching enrollment:', fetchError);
        setStatus('error');
        return;
      }

      if (enrollment && enrollment.status !== 'active') {
        const { error: updateError } = await supabase
          .from('enrollments')
          .update({
            status: 'active',
            stripe_payment_id: sessionId || null,
          })
          .eq('id', enrollment.id);

        if (updateError) {
          console.error('Error updating enrollment:', updateError);
          setStatus('error');
          return;
        }
      } else if (!enrollment) {
        const { error: insertError } = await supabase
          .from('enrollments')
          .insert([
            {
              user_id: user.id,
              course_id: courseData.id,
              status: 'active',
              amount_paid: courseData.price,
              stripe_payment_id: sessionId || null,
            },
          ]);

        if (insertError) {
          console.error('Error creating enrollment:', insertError);
          setStatus('error');
          return;
        }
      }

      setStatus('success');
      setTimeout(() => {
        navigate('/course');
      }, 3000);
    } catch (error) {
      console.error('Payment processing error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {status === 'processing' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment</h2>
            <p className="text-gray-600">Please wait while we confirm your enrollment...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your enrollment has been confirmed. You now have full access to the course.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <GraduationCap className="w-4 h-4" />
              <span>Redirecting to course...</span>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Error</h2>
            <p className="text-gray-600 mb-6">
              There was an issue processing your payment. Please contact support.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
