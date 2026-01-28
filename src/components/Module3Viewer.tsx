import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { module3Topics, Topic } from '../data/module3Topics';
import TopicQuiz from './TopicQuiz';
import ReactMarkdown from 'react-markdown';

interface Module3ViewerProps {
  onComplete: () => void;
}

export const Module3Viewer: React.FC<Module3ViewerProps> = ({ onComplete }) => {
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [completedTopics, setCompletedTopics] = useState<Set<number>>(new Set());

  const currentTopic = module3Topics[currentTopicIndex];
  const progress = Math.round(((currentTopicIndex + 1) / module3Topics.length) * 100);

  const handleNext = () => {
    const newCompleted = new Set(completedTopics);
    newCompleted.add(currentTopicIndex);
    setCompletedTopics(newCompleted);

    if (currentTopicIndex < module3Topics.length - 1) {
      setCurrentTopicIndex(currentTopicIndex + 1);
      window.scrollTo(0, 0);
    } else {
      onComplete();
    }
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
      {/* Header Section - matches Module 2 style */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 mb-8 border border-emerald-100">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              Disaggregated Inference Deep Dive
            </h1>
            <p className="text-lg text-slate-700 mb-4">
              Topic {currentTopicIndex + 1} of {module3Topics.length}
            </p>
            <p className="text-slate-600 leading-relaxed">
              Understanding how separating Prefill and Decode into independent GPU pools revolutionizes
              LLM serving at scale. Learn the architecture, implementation, and production deployment strategies
              that transformed this approach from skeptical research to industry standard.
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

      {/* Topic Card - matches Module 2 green header style */}
      <div className="bg-emerald-600 rounded-t-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
              {currentTopicIndex + 1}
            </div>
            <div>
              <p className="text-emerald-100 text-sm mb-1">
                Topic {currentTopicIndex + 1} of {module3Topics.length}
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

      {/* Content Section - white background like Module 2 */}
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

          {/* Code Example - if available */}
          {currentTopic.codeExample && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-emerald-600" />
                {currentTopic.codeExample.title}
              </h3>
              <div className="bg-slate-900 rounded-xl overflow-hidden">
                <div className="bg-slate-800 px-4 py-2 text-sm text-slate-400 border-b border-slate-700">
                  {currentTopic.codeExample.language}
                </div>
                <pre className="p-6 overflow-x-auto">
                  <code className="text-sm text-slate-100 font-mono">
                    {currentTopic.codeExample.code}
                  </code>
                </pre>
              </div>
            </div>
          )}

          {/* Key Takeaways - emerald theme like Module 2 */}
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

          {/* Quiz Section - using TopicQuiz component like Module 2 */}
          <div className="pt-6 border-t-2 border-slate-200">
            <TopicQuiz questions={currentTopic.quiz} />
          </div>
        </div>
      </div>

      {/* Navigation Buttons - matches Module 2 style */}
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
          Topic {currentTopicIndex + 1} of {module3Topics.length}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition shadow-sm"
        >
          {currentTopicIndex === module3Topics.length - 1 ? 'Complete Module' : 'Next Topic'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Topic Navigation Dots - like Module 2's stepper */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {module3Topics.map((_, idx) => (
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
          <strong className="text-slate-900">Source:</strong> Content based on the{' '}
          <a
            href="https://hao-ai-lab.github.io/blogs/distserve-retro/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:text-emerald-700 underline font-medium"
          >
            UCSD Hao AI Lab DistServe Retrospective
          </a>
          {' '}and production implementations from industry leaders.
        </p>
      </div>
    </div>
  );
};
