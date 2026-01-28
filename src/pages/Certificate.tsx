import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Certificate as CertificateType } from '../lib/supabase';
import { getCertificateByNumber, getUserCertificates } from '../lib/certificates';
import { Award, Download, ArrowLeft, CheckCircle, ExternalLink } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const Certificate: React.FC = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const certificateRef = useRef<HTMLDivElement>(null);

  const certNumber = searchParams.get('cert');
  const [certificate, setCertificate] = useState<CertificateType | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [isPublicView, setIsPublicView] = useState(false);

  useEffect(() => {
    loadCertificate();
  }, [user, certNumber]);

  const loadCertificate = async () => {
    try {
      if (certNumber) {
        setIsPublicView(true);
        const cert = await getCertificateByNumber(certNumber);
        if (cert) {
          setCertificate(cert);
        } else {
          navigate('/dashboard');
        }
      } else if (user) {
        const certs = await getUserCertificates(user.id);
        if (certs && certs.length > 0) {
          setCertificate(certs[0]);
        } else {
          navigate('/dashboard');
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error loading certificate:', error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!certificateRef.current || !certificate) return;

    setDownloading(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF({
        orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`certificate-${certificate.certificate_number}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Certificate not found</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const issueDate = new Date(certificate.issued_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const verificationUrl = `${window.location.origin}/certificate?cert=${certificate.certificate_number}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          {!isPublicView && (
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          )}
          {isPublicView && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Verified Certificate</span>
            </div>
          )}
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5" />
            {downloading ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>

        <div
          ref={certificateRef}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-cyan-600/5"></div>

            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"></div>

            <div className="relative p-16">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                      <Award className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Certificate of Completion</h3>
                      <p className="text-sm text-gray-600">Inference Learning Hub</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">Certificate ID</p>
                  <p className="text-sm font-mono font-semibold text-gray-900">{certificate.certificate_number}</p>
                </div>
              </div>

              <div className="text-center mb-12">
                <p className="text-lg text-gray-600 mb-4">This certifies that</p>
                <h1 className="text-5xl font-bold text-gray-900 mb-8">
                  {certificate.recipient_name}
                </h1>
                <p className="text-lg text-gray-600 mb-4">has successfully completed the course</p>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-12">
                  {certificate.course_title}
                </h2>
              </div>

              <div className="flex justify-between items-end">
                <div className="flex gap-16">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Issue Date</p>
                    <p className="text-lg font-semibold text-gray-900">{issueDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Status</p>
                    <p className="text-lg font-semibold text-green-600">Verified</p>
                  </div>
                </div>

                <div className="text-center">
                  <QRCodeSVG
                    value={verificationUrl}
                    size={100}
                    level="H"
                    includeMargin={true}
                  />
                  <p className="text-xs text-gray-500 mt-2">Scan to verify</p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Issued by</p>
                    <p className="text-xl font-bold text-gray-900">Inference Learning Hub</p>
                    <p className="text-sm text-gray-500">Professional Training & Certification</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Verification URL</p>
                    <p className="text-xs font-mono text-blue-600 max-w-xs truncate">{verificationUrl}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">About This Certificate</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              This certificate confirms that the recipient has successfully completed all course requirements
              and demonstrated proficiency in the subject matter.
            </p>
            <p>
              <strong>Verification:</strong> This certificate can be verified at any time by scanning the QR code
              or visiting the verification URL shown above.
            </p>
            <p>
              <strong>Certificate ID:</strong> {certificate.certificate_number} is a unique identifier for this certificate.
            </p>
          </div>
          {!isPublicView && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <a
                href={verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition"
              >
                <ExternalLink className="w-4 h-4" />
                View Public Verification Page
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
