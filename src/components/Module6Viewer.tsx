import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Bookmark, ExternalLink, CheckCircle, Download, Star, Github, FileText, MessageSquare, Award } from 'lucide-react';
import { module6Resources, reflectionQuestions, ResourceSection } from '../data/module6Resources';
import { useAuth } from '../contexts/AuthContext';

interface Module6ViewerProps {
  onComplete: () => void;
}

export const Module6Viewer: React.FC<Module6ViewerProps> = ({ onComplete }) => {
  const { user } = useAuth();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['source-material']));
  const [bookmarkedResources, setBookmarkedResources] = useState<Set<string>>(new Set());
  const [personalNotes, setPersonalNotes] = useState<{ [key: string]: string }>({});
  const [reflectionAnswers, setReflectionAnswers] = useState<{ [key: string]: string }>({});
  const [feedbackText, setFeedbackText] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    loadProgress();
    markAsViewed();
  }, []);

  const loadProgress = () => {
    const savedBookmarks = localStorage.getItem('module6_bookmarks');
    const savedNotes = localStorage.getItem('module6_notes');
    const savedReflections = localStorage.getItem('module6_reflections');
    const savedFeedback = localStorage.getItem('module6_feedback');

    if (savedBookmarks) setBookmarkedResources(new Set(JSON.parse(savedBookmarks)));
    if (savedNotes) setPersonalNotes(JSON.parse(savedNotes));
    if (savedReflections) setReflectionAnswers(JSON.parse(savedReflections));
    if (savedFeedback) setFeedbackText(savedFeedback);
  };

  const markAsViewed = () => {
    localStorage.setItem('module6_viewed', 'true');
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const toggleBookmark = (resourceUrl: string) => {
    const newBookmarks = new Set(bookmarkedResources);
    if (newBookmarks.has(resourceUrl)) {
      newBookmarks.delete(resourceUrl);
    } else {
      newBookmarks.add(resourceUrl);
    }
    setBookmarkedResources(newBookmarks);
    localStorage.setItem('module6_bookmarks', JSON.stringify(Array.from(newBookmarks)));
  };

  const updateNote = (sectionId: string, note: string) => {
    const newNotes = { ...personalNotes, [sectionId]: note };
    setPersonalNotes(newNotes);
    localStorage.setItem('module6_notes', JSON.stringify(newNotes));
  };

  const updateReflection = (questionId: string, answer: string) => {
    const newReflections = { ...reflectionAnswers, [questionId]: answer };
    setReflectionAnswers(newReflections);
    localStorage.setItem('module6_reflections', JSON.stringify(newReflections));
  };

  const saveFeedback = (text: string) => {
    setFeedbackText(text);
    localStorage.setItem('module6_feedback', text);
  };

  const handleDownloadCertificate = () => {
    setShowCertificate(true);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleCompleteCourse = () => {
    onComplete();
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'paper':
        return <FileText className="w-4 h-4" />;
      case 'blog':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 mb-8 border border-emerald-100">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              Further Resources & Ongoing Learning
            </h1>
            <p className="text-lg text-slate-700 mb-4 flex items-center gap-3">
              <Award className="w-6 h-6 text-emerald-600" />
              Module 6 of 6 - Course Completion
            </p>
            <p className="text-slate-600 leading-relaxed">
              Explore curated resources, connect with communities, and continue your journey in LLM serving optimization.
              Bookmark valuable links and take notes for future reference.
            </p>
          </div>
          <div className="ml-8 text-right">
            <div className="text-sm font-medium text-slate-600 mb-2">Estimated Time</div>
            <div className="text-2xl font-bold text-emerald-600">10-20 min</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full w-full" />
        </div>
        <p className="text-sm text-emerald-700 font-medium mt-2 text-right">100% Complete</p>
      </div>

      {/* Introduction */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-8">
        <div className="prose prose-lg max-w-none">
          <p className="text-slate-700 leading-relaxed mb-4">
            Congratulations on reaching the final module! Over the past five modules, you've journeyed from understanding
            the fundamental prefill-decode separation to exploring disaggregated inference architectures, their benefits,
            and hands-on applications. You've learned why disaggregation went from resistance to rapid adoption, how it
            eliminates interference and enables independent scaling, and the real-world impact on companies like Fireworks,
            Perplexity, and DeepSeek.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            The field of LLM serving is evolving rapidly. New papers appear weekly on arXiv, frameworks release major updates
            monthly, and production systems continuously push performance boundaries. This module serves as your launchpad
            for staying current: curated sources, active communities, and emerging research that will keep you at the frontier.
          </p>
          <p className="text-slate-700 leading-relaxed">
            <strong className="text-slate-900">Career Impact:</strong> Bookmark these resources and follow them actively.
            Hiring managers look for candidates who stay current with research, contribute to open-source projects, and
            understand production systems. Being able to discuss "I follow vLLM's releases" or "I read the latest TetriInfer
            paper" signals serious engagement. These resources are your competitive advantage—use them, share them, and
            contribute back to the community that makes this field so dynamic.
          </p>
        </div>
      </div>

      {/* Resource Sections */}
      <div className="space-y-6 mb-8">
        {module6Resources.map((section) => (
          <div key={section.id} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            {/* Section Header - Clickable Accordion */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-6 bg-emerald-600 text-white hover:bg-emerald-700 transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  {section.id === 'wrap-up' ? (
                    <Award className="w-5 h-5" />
                  ) : (
                    <Star className="w-5 h-5" />
                  )}
                </div>
                <h2 className="text-xl font-bold text-left">{section.title}</h2>
              </div>
              {expandedSections.has(section.id) ? (
                <ChevronUp className="w-6 h-6 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-6 h-6 flex-shrink-0" />
              )}
            </button>

            {/* Expandable Content */}
            {expandedSections.has(section.id) && (
              <div className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <p className="text-slate-700 leading-relaxed mb-4">{section.description}</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-sm font-bold text-blue-900 mb-2">Why This Is Useful</h3>
                    <p className="text-sm text-blue-800 leading-relaxed">{section.whyUseful}</p>
                  </div>
                </div>

                {/* Visual Embed */}
                {section.visualUrl && (
                  <div className="rounded-xl overflow-hidden border border-slate-200">
                    <img
                      src={section.visualUrl}
                      alt={section.visualCaption}
                      className="w-full h-64 object-cover"
                    />
                    {section.visualCaption && (
                      <div className="bg-slate-50 px-4 py-2 text-sm text-slate-600 italic border-t border-slate-200">
                        {section.visualCaption}
                      </div>
                    )}
                  </div>
                )}

                {/* Resources List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <ExternalLink className="w-5 h-5 text-emerald-600" />
                    Curated Resources
                  </h3>
                  <div className="grid gap-4">
                    {section.resources.map((resource, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-emerald-300 transition group"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 group-hover:bg-emerald-200 transition">
                          {getIconForType(resource.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-900 font-semibold hover:text-emerald-600 transition flex items-center gap-2"
                            >
                              {resource.title}
                              <ExternalLink className="w-4 h-4 flex-shrink-0" />
                            </a>
                            <button
                              onClick={() => toggleBookmark(resource.url)}
                              className={`flex-shrink-0 p-1 rounded transition ${
                                bookmarkedResources.has(resource.url)
                                  ? 'text-yellow-500 hover:text-yellow-600'
                                  : 'text-slate-400 hover:text-yellow-500'
                              }`}
                              title={bookmarkedResources.has(resource.url) ? 'Remove bookmark' : 'Bookmark this'}
                            >
                              <Bookmark
                                className="w-5 h-5"
                                fill={bookmarkedResources.has(resource.url) ? 'currentColor' : 'none'}
                              />
                            </button>
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed">{resource.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs px-2 py-1 bg-slate-200 text-slate-700 rounded font-medium">
                              {resource.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Personal Notes Section */}
                {section.id !== 'wrap-up' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <label className="block text-sm font-bold text-amber-900 mb-2">
                      📝 Your Personal Notes
                    </label>
                    <textarea
                      value={personalNotes[section.id] || ''}
                      onChange={(e) => updateNote(section.id, e.target.value)}
                      placeholder="Jot down key insights, resources to revisit, or action items..."
                      rows={3}
                      className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:border-amber-500 focus:outline-none resize-none text-slate-800 text-sm"
                    />
                    <p className="text-xs text-amber-700 mt-1">Auto-saved • Private to you</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Reflection Quiz */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 mb-8 border border-emerald-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
          <MessageSquare className="w-7 h-7 text-emerald-600" />
          Quick Reflection
        </h2>
        <p className="text-slate-700 mb-6">
          Take a moment to reflect on your learning journey and next steps:
        </p>
        <div className="space-y-6">
          {reflectionQuestions.map((question) => (
            <div key={question.id}>
              <label className="block text-slate-900 font-semibold mb-3">{question.question}</label>
              <div className="space-y-2">
                {question.options.map((option, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition ${
                      reflectionAnswers[question.id] === option
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-slate-200 bg-white hover:border-emerald-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option}
                      checked={reflectionAnswers[question.id] === option}
                      onChange={(e) => updateReflection(question.id, e.target.value)}
                      className="w-4 h-4 text-emerald-600"
                    />
                    <span className="text-slate-800">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
          <MessageSquare className="w-7 h-7 text-emerald-600" />
          Course Feedback
        </h2>
        <p className="text-slate-700 mb-4">
          Your feedback helps us improve this course for future learners. What worked well? What could be better?
        </p>
        <textarea
          value={feedbackText}
          onChange={(e) => saveFeedback(e.target.value)}
          placeholder="Share your thoughts on the course content, structure, activities, pacing, or anything else..."
          rows={6}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-emerald-500 focus:outline-none resize-none text-slate-800"
        />
        <p className="text-sm text-slate-600 mt-2">{feedbackText.length} characters • Auto-saved</p>
      </div>

      {/* Bookmarked Resources Summary */}
      {bookmarkedResources.size > 0 && (
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-bold text-yellow-900 mb-3 flex items-center gap-2">
            <Bookmark className="w-5 h-5" fill="currentColor" />
            Your Bookmarked Resources ({bookmarkedResources.size})
          </h3>
          <p className="text-sm text-yellow-800 mb-4">
            You've bookmarked {bookmarkedResources.size} resource(s). These are saved in your browser for quick access.
          </p>
          <div className="flex gap-2 flex-wrap">
            {Array.from(bookmarkedResources).map((url, idx) => (
              <a
                key={idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-3 py-1 bg-yellow-200 text-yellow-900 rounded-full hover:bg-yellow-300 transition flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                Bookmark {idx + 1}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Certificate & Completion */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Award className="w-10 h-10" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-3">Congratulations! 🎉</h2>
            <p className="text-emerald-50 leading-relaxed mb-6">
              You've completed all six modules of the Disaggregated LLM Inference course. You now understand the
              architecture, benefits, challenges, and real-world applications of disaggregated serving—a critical
              skill for modern LLM infrastructure engineers. Download your certificate and share your achievement!
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleDownloadCertificate}
                className="flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 rounded-lg font-bold hover:bg-emerald-50 transition shadow-lg"
              >
                <Download className="w-5 h-5" />
                Download Certificate
              </button>
              <button
                onClick={handleCompleteCourse}
                className="flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-lg font-bold hover:bg-white/30 transition border-2 border-white/30"
              >
                <CheckCircle className="w-5 h-5" />
                Complete Course & Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Preview (for printing) */}
      {showCertificate && (
        <div className="hidden print:block fixed inset-0 bg-white z-50 p-12">
          <div className="max-w-4xl mx-auto border-8 border-emerald-600 rounded-3xl p-16 text-center">
            <div className="mb-8">
              <Award className="w-24 h-24 text-emerald-600 mx-auto mb-4" />
              <h1 className="text-5xl font-bold text-slate-900 mb-2">Certificate of Completion</h1>
              <div className="w-32 h-1 bg-emerald-600 mx-auto"></div>
            </div>
            <p className="text-xl text-slate-700 mb-8">This certifies that</p>
            <p className="text-4xl font-bold text-emerald-700 mb-8">{user?.email || 'Student'}</p>
            <p className="text-xl text-slate-700 mb-8">has successfully completed</p>
            <p className="text-3xl font-bold text-slate-900 mb-12">
              Disaggregated LLM Inference: From Resistance to Rapid Adoption
            </p>
            <div className="grid grid-cols-2 gap-8 text-left max-w-2xl mx-auto mb-12">
              <div>
                <p className="text-sm text-slate-600 mb-1">Modules Completed</p>
                <p className="text-2xl font-bold text-slate-900">6 of 6</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Date Completed</p>
                <p className="text-2xl font-bold text-slate-900">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              Course based on research from UCSD Hao AI Lab • DistServe Project
            </p>
          </div>
        </div>
      )}

      {/* Source Attribution */}
      <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <p className="text-sm text-slate-600">
          <strong className="text-slate-900">Primary Source:</strong> Resources curated from the{' '}
          <a
            href="https://hao-ai-lab.github.io/blogs/distserve-retro/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:text-emerald-700 underline font-medium"
          >
            UCSD Hao AI Lab DistServe Retrospective
          </a>
          {' '}and related academic publications, open-source projects, and industry implementations.
        </p>
      </div>
    </div>
  );
};
