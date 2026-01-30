import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, CheckCircle, Clock, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { module4Topics, Topic } from '../data/module4Topics';
import TopicQuiz from './TopicQuiz';

interface Module4ViewerProps {
  onComplete: () => void;
  courseId: string;
  sectionId: string;
}

export const Module4Viewer: React.FC<Module4ViewerProps> = ({ onComplete, courseId, sectionId }) => {
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [completedTopics, setCompletedTopics] = useState<Set<number>>(new Set());
  const [expandedInsights, setExpandedInsights] = useState<Set<number>>(new Set());
  const [quizCompleted, setQuizCompleted] = useState<Record<number, boolean>>({});
  const [showQuizWarning, setShowQuizWarning] = useState(false);

  const currentTopic = module4Topics[currentTopicIndex];
  const progress = Math.round(((currentTopicIndex + 1) / module4Topics.length) * 100);
  const isCurrentQuizCompleted = quizCompleted[currentTopicIndex] || false;

  const toggleInsight = (topicIdx: number) => {
    const newExpanded = new Set(expandedInsights);
    if (newExpanded.has(topicIdx)) {
      newExpanded.delete(topicIdx);
    } else {
      newExpanded.add(topicIdx);
    }
    setExpandedInsights(newExpanded);
  };

  const handleNext = () => {
    if (!isCurrentQuizCompleted) {
      setShowQuizWarning(true);
      setTimeout(() => setShowQuizWarning(false), 5000);
      return;
    }

    setShowQuizWarning(false);
    const newCompleted = new Set(completedTopics);
    newCompleted.add(currentTopicIndex);
    setCompletedTopics(newCompleted);

    if (currentTopicIndex < module4Topics.length - 1) {
      setCurrentTopicIndex(currentTopicIndex + 1);
      window.scrollTo(0, 0);
    } else {
      onComplete();
    }
  };

  const handleQuizCompletion = (topicIndex: number, allAnswered: boolean) => {
    setQuizCompleted(prev => ({ ...prev, [topicIndex]: allAnswered }));
  };

  const handlePrevious = () => {
    if (currentTopicIndex > 0) {
      setCurrentTopicIndex(currentTopicIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  const goToTopic = (index: number) => {
    setCurrentTopicIndex(index);
    window.scrollTo(0, 0);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Section - matches Module 2/3 style */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 mb-8 border border-emerald-100">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              Key Takeaways & Synthesis
            </h1>
            <p className="text-lg text-slate-700 mb-4">
              Topic {currentTopicIndex + 1} of {module4Topics.length}
            </p>
            <p className="text-slate-600 leading-relaxed">
              Synthesizing the lessons learned from disaggregated inference: from foundational technique
              to production standard, examining its impact on metrics, costs, innovation, and your career
              in AI infrastructure.
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

      {/* Topic Card - matches Module 2/3 green header style */}
      <div className="bg-emerald-600 rounded-t-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
              {currentTopicIndex + 1}
            </div>
            <div>
              <p className="text-emerald-100 text-sm mb-1">
                Topic {currentTopicIndex + 1} of {module4Topics.length}
              </p>
              <h2 className="text-2xl font-bold">{currentTopic.title}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
            <Clock className="w-4 h-4" />
            <span className="font-medium">{currentTopic.readingTime}</span>
          </div>
        </div>
      </div>

      {/* Content Section - white background like Module 2/3 */}
      <div className="bg-white rounded-b-2xl shadow-lg border border-slate-200 border-t-0">
        <div className="p-8 space-y-8">
          {/* Introduction */}
          <div>
            <p className="text-lg text-slate-700 leading-relaxed">
              {currentTopic.introduction}
            </p>
          </div>

          {/* Visual Image - if available */}
          {currentTopic.visualUrl && (
            <div className="rounded-xl overflow-hidden border border-slate-200">
              <img
                src={currentTopic.visualUrl}
                alt={currentTopic.visualCaption}
                className="w-full h-80 object-cover"
              />
              {currentTopic.visualCaption && (
                <div className="bg-slate-50 px-6 py-3 text-sm text-slate-600 italic border-t border-slate-200">
                  {currentTopic.visualCaption}
                </div>
              )}
            </div>
          )}

          {/* Main Content Sections */}
          {currentTopic.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </span>
                {section.title}
              </h3>
              <ul className="space-y-3 ml-11">
                {section.content.map((point, pointIdx) => (
                  <li key={pointIdx} className="flex items-start gap-3 text-slate-700">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Deeper Insight - Collapsible Section */}
          {currentTopic.deeperInsight && (
            <div className="border-2 border-emerald-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleInsight(currentTopicIndex)}
                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 transition"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-slate-900">
                    Deeper Insight: {currentTopic.deeperInsight.title}
                  </span>
                </div>
                {expandedInsights.has(currentTopicIndex) ? (
                  <ChevronUp className="w-5 h-5 text-emerald-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-emerald-600" />
                )}
              </button>
              {expandedInsights.has(currentTopicIndex) && (
                <div className="p-6 bg-white border-t-2 border-emerald-100">
                  <p className="text-slate-700 italic leading-relaxed">
                    {currentTopic.deeperInsight.content}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Key Takeaways - emerald theme like Module 2/3 */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              Key Takeaways
            </h3>
            <ul className="space-y-3">
              {currentTopic.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-slate-800 leading-relaxed">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quiz Section - using TopicQuiz component like Module 2/3 */}
          <div className="pt-6 border-t-2 border-slate-200">
            <TopicQuiz
              questions={currentTopic.quiz}
              courseId={courseId}
              sectionId={sectionId}
              topicId={currentTopic.id}
              onAllAnswered={(allAnswered) => handleQuizCompletion(currentTopicIndex, allAnswered)}
            />
          </div>
        </div>
      </div>

      {/* Quiz Completion Warning */}
      {showQuizWarning && !isCurrentQuizCompleted && (
        <div className="mt-6 bg-amber-50 border-2 border-amber-400 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900">Complete the Quiz First</p>
            <p className="text-sm text-amber-800 mt-1">
              Please answer all quick self-check questions before moving to the next topic.
            </p>
          </div>
        </div>
      )}

      {/* Navigation Buttons - matches Module 2/3 style */}
      <div className="flex items-center justify-between mt-8 bg-white rounded-xl shadow-md p-6 border border-slate-200">
        <button
          onClick={handlePrevious}
          disabled={currentTopicIndex === 0}
          className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        <div className="text-center text-sm text-slate-600">
          Topic {currentTopicIndex + 1} of {module4Topics.length}
        </div>

        <button
          onClick={handleNext}
          disabled={!isCurrentQuizCompleted}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition shadow-sm ${
            isCurrentQuizCompleted
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-slate-300 text-slate-500 cursor-not-allowed'
          }`}
        >
          {currentTopicIndex === module4Topics.length - 1 ? 'Complete Module' : 'Next Topic'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Topic Navigation Dots - like Module 2/3's stepper */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {module4Topics.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToTopic(idx)}
            className={`transition-all ${
              idx === currentTopicIndex
                ? 'w-8 h-3 bg-emerald-600 rounded-full'
                : idx < currentTopicIndex
                ? 'w-3 h-3 bg-emerald-400 rounded-full hover:bg-emerald-500'
                : 'w-3 h-3 bg-slate-300 rounded-full hover:bg-slate-400'
            }`}
            title={`Topic ${idx + 1}`}
          />
        ))}
      </div>

      {/* Source Attribution */}
      <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <p className="text-sm text-slate-600">
          <strong className="text-slate-900">Source:</strong> Key takeaways synthesized from the{' '}
          <a
            href="https://hao-ai-lab.github.io/blogs/distserve-retro/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:text-emerald-700 underline font-medium"
          >
            UCSD Hao AI Lab DistServe Retrospective
          </a>
          {' '}and 18 months of production experience (2024-2025).
        </p>
      </div>
    </div>
  );
};
