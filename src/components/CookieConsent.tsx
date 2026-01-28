import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slide-up"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-2xl border border-slate-200 p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Cookie className="w-6 h-6 text-blue-600" />
            </div>
          </div>

          <div className="flex-1">
            <h3 id="cookie-consent-title" className="text-lg font-semibold text-slate-900 mb-2">
              We value your privacy
            </h3>
            <p id="cookie-consent-description" className="text-slate-600 text-sm mb-4">
              We use cookies to enhance your browsing experience, provide personalized content, and
              analyze our traffic. By clicking "Accept All", you consent to our use of cookies.{' '}
              <Link to="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                Learn more in our Privacy Policy
              </Link>
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAccept}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Accept All
              </button>
              <button
                onClick={handleDecline}
                className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              >
                Decline Optional
              </button>
              <Link
                to="/privacy"
                className="px-6 py-2.5 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              >
                Learn More
              </Link>
            </div>
          </div>

          <button
            onClick={handleDecline}
            className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 rounded"
            aria-label="Close cookie consent"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
