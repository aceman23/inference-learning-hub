import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Terms of Service"
        description="Terms of Service for LearnHub - Please read these terms carefully before using our platform."
        canonical={`${window.location.origin}/terms`}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
        <p className="text-slate-600 mb-8">Last updated: January 23, 2026</p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-700 mb-4">
              By accessing and using LearnHub, you accept and agree to be bound by the terms and
              provision of this agreement. If you do not agree to these terms, please do not use
              our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Use License</h2>
            <p className="text-slate-700 mb-4">
              Permission is granted to temporarily access the materials on LearnHub for personal,
              non-commercial use only. This is the grant of a license, not a transfer of title.
            </p>
            <p className="text-slate-700 mb-4">Under this license you may not:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software</li>
              <li>Remove any copyright or proprietary notations</li>
              <li>Transfer the materials to another person</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. User Accounts</h2>
            <p className="text-slate-700 mb-4">
              When you create an account with us, you must provide accurate, complete, and current
              information. Failure to do so constitutes a breach of the Terms.
            </p>
            <p className="text-slate-700 mb-4">
              You are responsible for safeguarding the password and for all activities that occur
              under your account. You agree not to disclose your password to any third party.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Course Access</h2>
            <p className="text-slate-700 mb-4">
              Upon enrollment and payment, you will be granted access to the course materials.
              Access is non-transferable and is for your personal use only.
            </p>
            <p className="text-slate-700 mb-4">
              We reserve the right to modify, suspend, or discontinue any course at any time
              without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Payment and Refunds</h2>
            <p className="text-slate-700 mb-4">
              All payments are processed securely through our payment processor. Prices are subject
              to change without notice.
            </p>
            <p className="text-slate-700 mb-4">
              Refunds are handled on a case-by-case basis. Please contact support for refund
              requests within 30 days of purchase.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Intellectual Property</h2>
            <p className="text-slate-700 mb-4">
              All course content, including but not limited to text, graphics, images, and
              software, is the property of LearnHub or its content suppliers and is protected by
              copyright laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Prohibited Activities</h2>
            <p className="text-slate-700 mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
              <li>Share your account credentials with others</li>
              <li>Distribute or share course materials without permission</li>
              <li>Use the platform for any illegal purposes</li>
              <li>Harass or harm other users</li>
              <li>Attempt to gain unauthorized access to any systems</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-slate-700 mb-4">
              LearnHub shall not be liable for any indirect, incidental, special, consequential,
              or punitive damages resulting from your use or inability to use the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Termination</h2>
            <p className="text-slate-700 mb-4">
              We may terminate or suspend your account immediately, without prior notice, for any
              breach of these Terms. Upon termination, your right to use the service will
              immediately cease.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">10. Changes to Terms</h2>
            <p className="text-slate-700 mb-4">
              We reserve the right to modify these terms at any time. We will notify users of any
              material changes by posting the new Terms on this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">11. Contact Information</h2>
            <p className="text-slate-700 mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-slate-700">
              Email: <a href="mailto:support@learnhub.com" className="text-blue-600 hover:text-blue-700">support@learnhub.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
