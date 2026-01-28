import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Clock, Upload, Copy, Check, FileText, Code, MessageSquare } from 'lucide-react';
import { module5Activities, Activity } from '../data/module5Activities';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Module5ViewerProps {
  onComplete: () => void;
}

interface ActivityProgress {
  reflections: { [key: string]: string };
  fileUrls: string[];
  codeSubmission: string;
  completed: boolean;
}

export const Module5Viewer: React.FC<Module5ViewerProps> = ({ onComplete }) => {
  const { user } = useAuth();
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [completedActivities, setCompletedActivities] = useState<Set<number>>(new Set());
  const [activityProgress, setActivityProgress] = useState<{ [key: number]: ActivityProgress }>({});
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const currentActivity = module5Activities[currentActivityIndex];
  const progress = Math.round(((currentActivityIndex + 1) / module5Activities.length) * 100);

  useEffect(() => {
    loadProgress();
  }, [currentActivityIndex]);

  const loadProgress = () => {
    const saved = localStorage.getItem(`activity_${currentActivityIndex}_progress`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setActivityProgress(prev => ({ ...prev, [currentActivityIndex]: parsed }));
    }
  };

  const saveProgress = (data: Partial<ActivityProgress>) => {
    const current = activityProgress[currentActivityIndex] || {
      reflections: {},
      fileUrls: [],
      codeSubmission: '',
      completed: false
    };
    const updated = { ...current, ...data };
    setActivityProgress(prev => ({ ...prev, [currentActivityIndex]: updated }));
    localStorage.setItem(`activity_${currentActivityIndex}_progress`, JSON.stringify(updated));
  };

  const handleReflectionChange = (questionIndex: number, value: string) => {
    const current = activityProgress[currentActivityIndex] || { reflections: {}, fileUrls: [], codeSubmission: '', completed: false };
    const updatedReflections = { ...current.reflections, [questionIndex]: value };
    saveProgress({ reflections: updatedReflections });
  };

  const handleCodeChange = (value: string) => {
    saveProgress({ codeSubmission: value });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const current = activityProgress[currentActivityIndex] || { reflections: {}, fileUrls: [], codeSubmission: '', completed: false };
    const fileName = `${user?.id}/${currentActivity.id}/${Date.now()}_${file.name}`;

    saveProgress({ fileUrls: [...current.fileUrls, fileName] });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      saveProgress({ completed: true });
      const newCompleted = new Set(completedActivities);
      newCompleted.add(currentActivityIndex);
      setCompletedActivities(newCompleted);

      setTimeout(() => {
        setSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error('Error submitting activity:', error);
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentActivityIndex < module5Activities.length - 1) {
      setCurrentActivityIndex(currentActivityIndex + 1);
      window.scrollTo(0, 0);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentActivityIndex > 0) {
      setCurrentActivityIndex(currentActivityIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  const goToActivity = (index: number) => {
    setCurrentActivityIndex(index);
    window.scrollTo(0, 0);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentProgress = activityProgress[currentActivityIndex] || {
    reflections: {},
    fileUrls: [],
    codeSubmission: '',
    completed: false
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 mb-8 border border-emerald-100">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              Activities and Exercises
            </h1>
            <p className="text-lg text-slate-700 mb-4">
              Activity {currentActivityIndex + 1} of {module5Activities.length}
            </p>
            <p className="text-slate-600 leading-relaxed">
              Hands-on practice cementing your understanding through concept mapping, discussion, simulation,
              case analysis, and research extension. Apply your knowledge to real-world scenarios.
            </p>
          </div>
          <div className="ml-8 text-right">
            <div className="text-sm font-medium text-slate-600 mb-2">Progress</div>
            <div className="text-4xl font-bold text-emerald-600">{progress}%</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Activity Card */}
      <div className="bg-emerald-600 rounded-t-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
              {currentActivityIndex + 1}
            </div>
            <div>
              <p className="text-emerald-100 text-sm mb-1">
                Activity {currentActivityIndex + 1} of {module5Activities.length}
              </p>
              <h2 className="text-2xl font-bold">{currentActivity.title}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
            <Clock className="w-4 h-4" />
            <span className="font-medium">{currentActivity.estimatedTime}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-b-2xl shadow-lg border border-slate-200 border-t-0">
        <div className="p-8 space-y-8">
          {/* Introduction */}
          <div>
            <p className="text-lg text-slate-700 leading-relaxed">
              {currentActivity.introduction}
            </p>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              Learning Outcomes
            </h3>
            <ul className="space-y-2">
              {currentActivity.learningOutcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prior Knowledge */}
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Builds On</h3>
            <ul className="space-y-2">
              {currentActivity.priorKnowledge.map((knowledge, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-amber-500 rounded-full mt-2" />
                  <span>{knowledge}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual Reference */}
          {currentActivity.visualUrl && (
            <div className="rounded-xl overflow-hidden border border-slate-200">
              <img
                src={currentActivity.visualUrl}
                alt={currentActivity.visualCaption}
                className="w-full h-80 object-cover"
              />
              {currentActivity.visualCaption && (
                <div className="bg-slate-50 px-6 py-3 text-sm text-slate-600 italic border-t border-slate-200">
                  {currentActivity.visualCaption}
                </div>
              )}
            </div>
          )}

          {/* Step-by-Step Instructions */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              Step-by-Step Instructions
            </h3>
            <div className="space-y-4">
              {currentActivity.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.stepNumber}
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-800 mb-2">{step.instruction}</p>
                    {step.tip && (
                      <p className="text-sm text-slate-600 italic">💡 Tip: {step.tip}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Snippet (if applicable) */}
          {currentActivity.codeSnippet && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                  <Code className="w-6 h-6 text-emerald-600" />
                  {currentActivity.codeSnippet.description}
                </h3>
                <button
                  onClick={() => copyToClipboard(currentActivity.codeSnippet!.code)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
              <div className="bg-slate-900 rounded-xl overflow-hidden">
                <div className="bg-slate-800 px-4 py-2 text-sm text-slate-400 border-b border-slate-700">
                  {currentActivity.codeSnippet.language}
                </div>
                <pre className="p-6 overflow-x-auto max-h-96">
                  <code className="text-sm text-slate-100 font-mono whitespace-pre">
                    {currentActivity.codeSnippet.code}
                  </code>
                </pre>
              </div>
            </div>
          )}

          {/* Additional Visuals */}
          {currentActivity.additionalVisuals && currentActivity.additionalVisuals.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentActivity.additionalVisuals.map((visual, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden border border-slate-200">
                  <img src={visual.url} alt={visual.caption} className="w-full h-48 object-cover" />
                  <div className="bg-slate-50 px-4 py-2 text-sm text-slate-600 border-t border-slate-200">
                    {visual.caption}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Interactive Components - Reflection Prompts */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-emerald-600" />
              Your Response
            </h3>
            <div className="space-y-6">
              {currentActivity.reflectionPrompts.map((prompt, idx) => (
                <div key={idx}>
                  <label className="block text-slate-900 font-semibold mb-2">
                    {idx > 0 && currentActivity.category === 'discussion' ? `Question ${idx + 1}: ` : ''}
                    {prompt.question}
                  </label>
                  <textarea
                    value={currentProgress.reflections[idx] || ''}
                    onChange={(e) => handleReflectionChange(idx, e.target.value)}
                    placeholder={prompt.placeholder}
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none resize-none text-slate-800"
                  />
                  <p className="text-sm text-slate-600 mt-1">
                    {currentProgress.reflections[idx]?.length || 0} characters • Auto-saved
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Code Submission (if applicable) */}
          {currentActivity.hasCodeSubmission && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Code className="w-6 h-6 text-emerald-600" />
                Submit Your Code
              </h3>
              <textarea
                value={currentProgress.codeSubmission || ''}
                onChange={(e) => handleCodeChange(e.target.value)}
                placeholder="Paste your modified code, simulation results, or observations here..."
                rows={12}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-emerald-500 focus:outline-none resize-none text-slate-800 font-mono text-sm"
              />
            </div>
          )}

          {/* File Upload (if applicable) */}
          {currentActivity.hasFileUpload && (
            <div className="border-2 border-dashed border-emerald-300 rounded-xl p-6 text-center bg-emerald-50">
              <Upload className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Upload Your Work</h3>
              <p className="text-slate-600 mb-4">
                PNG, JPG, PDF, or TXT files • Max 10MB
              </p>
              <label className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 cursor-pointer transition">
                Choose File
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.pdf,.txt,.py,.ipynb"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              {currentProgress.fileUrls.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-emerald-700 font-medium">
                    ✓ {currentProgress.fileUrls.length} file(s) uploaded
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Key Takeaways */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              Key Takeaways
            </h3>
            <ul className="space-y-3">
              {currentActivity.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-slate-800 leading-relaxed">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Reference Links */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Reference Links</h3>
            <ul className="space-y-2">
              {currentActivity.referenceLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:text-emerald-700 underline font-medium"
                  >
                    {link.title} →
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Submit Button */}
          {!currentProgress.completed && (
            <div className="flex items-center justify-center">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    Submit & Mark Complete
                  </>
                )}
              </button>
            </div>
          )}

          {/* Completion Confirmation */}
          {currentProgress.completed && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-900 mb-2">Great Job!</h3>
              <p className="text-green-800 mb-4">
                You've completed this activity. Your responses have been saved.
              </p>
              <p className="text-sm text-green-700">
                Ready to move on? Click "Next Activity" below.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8 bg-white rounded-xl shadow-md p-6 border border-slate-200">
        <button
          onClick={handlePrevious}
          disabled={currentActivityIndex === 0}
          className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        <div className="text-center text-sm text-slate-600">
          Activity {currentActivityIndex + 1} of {module5Activities.length}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition shadow-sm"
        >
          {currentActivityIndex === module5Activities.length - 1 ? 'Complete Module' : 'Next Activity'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Activity Navigation Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {module5Activities.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToActivity(idx)}
            className={`transition-all ${
              idx === currentActivityIndex
                ? 'w-8 h-3 bg-emerald-600 rounded-full'
                : completedActivities.has(idx)
                ? 'w-3 h-3 bg-emerald-400 rounded-full hover:bg-emerald-500'
                : 'w-3 h-3 bg-slate-300 rounded-full hover:bg-slate-400'
            }`}
            title={`Activity ${idx + 1}`}
          />
        ))}
      </div>

      {/* Source Attribution */}
      <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <p className="text-sm text-slate-600">
          <strong className="text-slate-900">Source:</strong> Activities designed around concepts from the{' '}
          <a
            href="https://hao-ai-lab.github.io/blogs/distserve-retro/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:text-emerald-700 underline font-medium"
          >
            UCSD Hao AI Lab DistServe Retrospective
          </a>
          {' '}with real-world application scenarios.
        </p>
      </div>
    </div>
  );
};
