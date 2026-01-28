import { useState } from 'react';
import { CheckCircle, ChevronRight, ChevronLeft, Zap, Clock, ChevronDown, ChevronUp, Lightbulb, Code } from 'lucide-react';
import TopicQuiz from './TopicQuiz';
import { module2Topics, type Topic } from '../data/module2Topics';
import {
  PrefillPhaseDiagram,
  PrefillVsDecodeTimeline,
  KVCacheGrowthVisualization,
  ComputeVsMemoryBound,
  ColocationInterference
} from './InferenceDiagrams';

interface PrefillPhaseFlowProps {
  onComplete: () => void;
}

export default function PrefillPhaseFlow({ onComplete }: PrefillPhaseFlowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewedCards, setViewedCards] = useState<Set<number>>(new Set([0]));
  const [showReview, setShowReview] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  const topics = module2Topics;

  const handleNext = () => {
    if (currentIndex < topics.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setViewedCards((prev) => new Set([...prev, nextIndex]));
    } else {
      setShowReview(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleCardClick = (index: number) => {
    setCurrentIndex(index);
    setViewedCards((prev) => new Set([...prev, index]));
    setShowReview(false);
  };

  const allViewed = viewedCards.size === topics.length;

  if (showReview) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Review All Topics</h2>
              <p className="text-slate-600">Review what you've learned about LLM inference basics</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-white/60 rounded-lg border border-emerald-200">
            <p className="text-sm text-slate-700 leading-relaxed">
              Understanding how LLM inference works—both prefill and decode phases—is crucial for optimizing performance. These concepts form the foundation for appreciating disaggregation benefits.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {topics.map((topic, index) => (
            <div
              key={topic.id}
              className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-emerald-400 transition-all cursor-pointer"
              onClick={() => handleCardClick(index)}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-2">{topic.title}</h3>
                  <p className="text-sm text-slate-600">{topic.description}</p>
                </div>
                {viewedCards.has(index) && (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-6 border border-slate-200">
          <button
            onClick={() => setShowReview(false)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Cards
          </button>

          <button
            onClick={onComplete}
            disabled={!allViewed}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {allViewed ? 'I Understand LLM Inference Basics' : 'View All Cards First'}
            <CheckCircle className="w-5 h-5" />
          </button>
        </div>

        {!allViewed && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              Please review all topic cards before proceeding. Click on any card above to view its details.
            </p>
          </div>
        )}
      </div>
    );
  }

  const currentTopic = topics[currentIndex];
  const progress = ((currentIndex + 1) / topics.length) * 100;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">LLM Inference Basics</h2>
            <p className="text-slate-600">
              Topic {currentIndex + 1} of {topics.length}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-600 mb-2">Progress</div>
            <div className="text-2xl font-bold text-emerald-600">{Math.round(progress)}%</div>
          </div>
        </div>
        <div className="mb-4 p-4 bg-white/60 rounded-lg border border-emerald-200">
          <p className="text-sm text-slate-700 leading-relaxed">
            Understanding how LLM inference works—both prefill and decode phases—is crucial for optimizing performance. These concepts form the foundation for appreciating disaggregation benefits.
          </p>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-600 to-teal-600 h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-white font-bold text-xl">
                {currentIndex + 1}
              </div>
              <div>
                <div className="text-emerald-100 text-sm mb-1">Topic {currentIndex + 1} of {topics.length}</div>
                <h3 className="text-2xl font-bold">{currentTopic.title}</h3>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-lg">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{currentTopic.readingTime}</span>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Introduction */}
          <div>
            <p className="text-lg text-slate-700 leading-relaxed">
              {currentTopic.introduction}
            </p>
          </div>

          {/* Visual Image */}
          {currentTopic.visualUrl && (
            <div className="rounded-xl overflow-hidden border-2 border-slate-200">
              <img
                src={currentTopic.visualUrl}
                alt={currentTopic.visualCaption}
                className="w-full h-64 object-cover"
              />
              {currentTopic.visualCaption && (
                <div className="bg-slate-50 px-4 py-3 border-t border-slate-200">
                  <p className="text-sm text-slate-600 italic">{currentTopic.visualCaption}</p>
                </div>
              )}
            </div>
          )}

          {/* Detailed Sections */}
          <div className="space-y-4">
            {currentTopic.sections.map((section, sectionIdx) => {
              const isExpanded = expandedSections.has(sectionIdx);
              return (
                <div key={sectionIdx} className="border-2 border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection(sectionIdx)}
                    className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-emerald-50 hover:to-teal-50 transition-colors"
                  >
                    <h4 className="font-bold text-slate-900 text-left">{section.title}</h4>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="p-5 bg-white space-y-3">
                      {section.content.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2" />
                          <p className="text-slate-700 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Diagrams */}
          {currentTopic.diagrams && currentTopic.diagrams.length > 0 && (
            <div className="space-y-6">
              {currentTopic.diagrams.map((diagramName, idx) => {
                const DiagramComponent = {
                  PrefillPhaseDiagram,
                  PrefillVsDecodeTimeline,
                  KVCacheGrowthVisualization,
                  ComputeVsMemoryBound,
                  ColocationInterference
                }[diagramName];

                return DiagramComponent ? <DiagramComponent key={idx} /> : null;
              })}
            </div>
          )}

          {/* Code Example */}
          {currentTopic.codeExample && (
            <div className="bg-slate-900 rounded-xl p-6 border-2 border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Code className="w-5 h-5 text-emerald-400" />
                <h4 className="font-bold text-white">{currentTopic.codeExample.title}</h4>
              </div>
              <pre className="bg-slate-800 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-slate-100 font-mono whitespace-pre">
                  {currentTopic.codeExample.code}
                </code>
              </pre>
            </div>
          )}

          {/* Key Takeaways */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-200">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-emerald-600" />
              <h4 className="font-bold text-slate-900 text-lg">Key Takeaways</h4>
            </div>
            <div className="space-y-3">
              {currentTopic.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-800 leading-relaxed">{takeaway}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Section */}
          {currentTopic.quiz && currentTopic.quiz.length > 0 && (
            <div className="border-t-2 border-slate-200 pt-8">
              <TopicQuiz questions={currentTopic.quiz} />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-6 border border-slate-200">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        <div className="flex items-center gap-2">
          {topics.map((_, index) => (
            <button
              key={index}
              onClick={() => handleCardClick(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-emerald-600'
                  : viewedCards.has(index)
                  ? 'bg-green-600'
                  : 'bg-slate-300'
              }`}
              aria-label={`Go to topic ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition"
        >
          {currentIndex === topics.length - 1 ? 'Review All' : 'Next'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
