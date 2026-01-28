import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for LearnHub - Learn how we collect, use, and protect your personal information."
        canonical={`${window.location.origin}/privacy`}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
        <p className="text-slate-600 mb-8">Last updated: January 23, 2026</p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Introduction</h2>
            <p className="text-slate-700 mb-4">
              LearnHub is committed to protecting your privacy. This Privacy Policy explains how
              we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
            <p className="text-slate-700 mb-4">
              Please read this privacy policy carefully. If you do not agree with the terms of
              this privacy policy, please do not access the site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Personal Information</h3>
            <p className="text-slate-700 mb-4">We collect information that you provide directly to us:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
              <li>Name and email address (required for account creation)</li>
              <li>Payment information (processed securely through Stripe)</li>
              <li>Profile information you choose to provide</li>
              <li>Course progress and completion data</li>
              <li>Quiz and exercise submissions</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
              <li>Device and browser information</li>
              <li>IP address and location data</li>
              <li>Usage patterns and interactions with our platform</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-slate-700 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your enrollment and payments</li>
              <li>Send you course updates and administrative information</li>
              <li>Respond to your comments and questions</li>
              <li>Track your course progress and provide certificates</li>
              <li>Analyze usage patterns to improve user experience</li>
              <li>Prevent fraud and enhance security</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Information Sharing and Disclosure</h2>
            <p className="text-slate-700 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may
              share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
              <li>With service providers who assist in operating our platform (e.g., payment processors)</li>
              <li>When required by law or to respond to legal process</li>
              <li>To protect our rights, property, or safety</li>
              <li>With your consent or at your direction</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Data Security</h2>
            <p className="text-slate-700 mb-4">
              We implement appropriate technical and organizational measures to protect your
              personal information against unauthorized access, alteration, disclosure, or
              destruction.
            </p>
            <p className="text-slate-700 mb-4">
              However, no method of transmission over the Internet is 100% secure. While we strive
              to protect your information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Cookies and Tracking Technologies</h2>
            <p className="text-slate-700 mb-4">
              We use cookies and similar tracking technologies to track activity on our platform
              and hold certain information. You can instruct your browser to refuse all cookies or
              to indicate when a cookie is being sent.
            </p>
            <p className="text-slate-700 mb-4">Types of cookies we use:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the platform to function</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our platform</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Your Privacy Rights</h2>
            <p className="text-slate-700 mb-4">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
            </ul>
            <p className="text-slate-700 mt-4">
              To exercise these rights, please contact us at{' '}
              <a href="mailto:privacy@learnhub.com" className="text-blue-600 hover:text-blue-700">
                privacy@learnhub.com
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. GDPR Compliance (EU Users)</h2>
            <p className="text-slate-700 mb-4">
              If you are in the European Economic Area (EEA), we process your personal data based
              on the following legal grounds:
            </p>
            <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
              <li>Your consent</li>
              <li>Performance of a contract with you</li>
              <li>Compliance with legal obligations</li>
              <li>Our legitimate interests</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. CCPA Compliance (California Users)</h2>
            <p className="text-slate-700 mb-4">
              California residents have specific rights regarding their personal information under
              the California Consumer Privacy Act (CCPA). You have the right to know what personal
              information we collect, use, and disclose.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">10. Children's Privacy</h2>
            <p className="text-slate-700 mb-4">
              Our platform is not intended for children under 13 years of age. We do not knowingly
              collect personal information from children under 13. If you believe we have
              collected information from a child, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">11. Data Retention</h2>
            <p className="text-slate-700 mb-4">
              We retain your personal information only for as long as necessary to fulfill the
              purposes outlined in this Privacy Policy, unless a longer retention period is
              required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">12. Changes to This Policy</h2>
            <p className="text-slate-700 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any
              changes by posting the new Privacy Policy on this page and updating the "Last
              updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">13. Contact Us</h2>
            <p className="text-slate-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <p className="text-slate-700">
              Email:{' '}
              <a href="mailto:privacy@learnhub.com" className="text-blue-600 hover:text-blue-700">
                privacy@learnhub.com
              </a>
            </p>
            <p className="text-slate-700 mt-2">
              Support:{' '}
              <a href="mailto:support@learnhub.com" className="text-blue-600 hover:text-blue-700">
                support@learnhub.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
