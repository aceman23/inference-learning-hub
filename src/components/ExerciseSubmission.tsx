import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, ExerciseSubmission as ExerciseSubmissionType } from '../lib/supabase';
import { CheckCircle, Upload, FileText, Link as LinkIcon } from 'lucide-react';

interface ExerciseSubmissionProps {
  sectionId: string;
  exerciseNumber: number;
  exerciseTitle: string;
}

export const ExerciseSubmission: React.FC<ExerciseSubmissionProps> = ({
  sectionId,
  exerciseNumber,
  exerciseTitle,
}) => {
  const { user } = useAuth();
  const [submission, setSubmission] = useState<ExerciseSubmissionType | null>(null);
  const [submissionType, setSubmissionType] = useState<'text' | 'file' | 'link'>('text');
  const [content, setContent] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadSubmission();
  }, [sectionId, exerciseNumber]);

  const loadSubmission = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('exercise_submissions')
        .select('*')
        .eq('user_id', user.id)
        .eq('section_id', sectionId)
        .eq('exercise_number', exerciseNumber)
        .maybeSingle();

      if (data) {
        setSubmission(data);
        setSubmissionType(data.submission_type);
        setContent(data.content || '');
        setFileUrl(data.file_url || '');
      }
    } catch (error) {
      console.error('Error loading submission:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setSaved(false);

    try {
      const submissionData = {
        user_id: user.id,
        section_id: sectionId,
        exercise_number: exerciseNumber,
        submission_type: submissionType,
        content: submissionType === 'text' ? content : null,
        file_url: submissionType !== 'text' ? fileUrl : null,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('exercise_submissions')
        .upsert([submissionData], { onConflict: 'user_id,section_id,exercise_number' })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setSubmission(data);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error('Error submitting exercise:', error);
      alert('Failed to save submission');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 my-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-900">{exerciseTitle}</h4>
        {submission && (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span>Submitted</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Submission Type
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setSubmissionType('text')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition ${
                submissionType === 'text'
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <FileText className="w-4 h-4" />
              Text
            </button>
            <button
              type="button"
              onClick={() => setSubmissionType('file')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition ${
                submissionType === 'file'
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <Upload className="w-4 h-4" />
              File URL
            </button>
            <button
              type="button"
              onClick={() => setSubmissionType('link')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition ${
                submissionType === 'link'
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <LinkIcon className="w-4 h-4" />
              Link
            </button>
          </div>
        </div>

        {submissionType === 'text' ? (
          <div>
            <label htmlFor={`content-${exerciseNumber}`} className="block text-sm font-medium text-gray-700 mb-2">
              Your Response
            </label>
            <textarea
              id={`content-${exerciseNumber}`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your response here..."
              required
            />
          </div>
        ) : (
          <div>
            <label htmlFor={`url-${exerciseNumber}`} className="block text-sm font-medium text-gray-700 mb-2">
              {submissionType === 'file' ? 'File URL' : 'Link URL'}
            </label>
            <input
              id={`url-${exerciseNumber}`}
              type="url"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder={submissionType === 'file' ? 'https://...' : 'https://...'}
              required
            />
            <p className="mt-2 text-xs text-gray-500">
              {submissionType === 'file'
                ? 'Upload your file to a service like Google Drive, Dropbox, or GitHub and paste the shareable link here'
                : 'Paste the URL to your submission'}
            </p>
          </div>
        )}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : submission ? 'Update Submission' : 'Submit'}
          </button>
          {saved && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Saved successfully!</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
