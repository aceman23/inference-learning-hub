import { useState } from 'react';
import { CheckCircle, ChevronRight, ChevronLeft, List } from 'lucide-react';

interface Objective {
  id: string;
  title: string;
  description: string;
  details?: string[];
}

interface ObjectivesFlowProps {
  onComplete: () => void;
}

export default function ObjectivesFlow({ onComplete }: ObjectivesFlowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewedCards, setViewedCards] = useState<Set<number>>(new Set([0]));
  const [showReview, setShowReview] = useState(false);

  const objectives: Objective[] = [
    {
      id: '1',
      title: 'Master Traditional LLM Inference Challenges',
      description: 'Learn about the limitations of traditional LLM inference where prefill and decode are colocated on the same GPUs.',
      details: [
        'Understand the prefill phase (processing input tokens)',
        'Understand the decode phase (generating output tokens)',
        'Learn why colocation creates critical bottlenecks',
      ],
    },
    {
      id: '2',
      title: 'Identify Critical Bottlenecks in LLM Serving',
      description: 'Recognize the fundamental challenges in LLM serving that disaggregation solves.',
      details: [
        'Interference between prefill and decode operations',
        'Coupled scaling limitations',
        'Resource inefficiencies and bottlenecks',
        'Impact on latency and throughput',
      ],
    },
    {
      id: '3',
      title: 'Discover How Disaggregation Solves These Challenges',
      description: 'Understand the core concept of separating prefill and decode into independent compute pools.',
      details: [
        'Physical separation of prefill and decode',
        'Independent scaling capabilities',
        'Reduced interference and contention',
        'Optimized resource allocation',
      ],
    },
    {
      id: '4',
      title: 'Master DistServe Architecture',
      description: 'Learn the key components and design decisions behind the DistServe system.',
      details: [
        'Prefill-decode separation architecture',
        'KV-cache management and transfer mechanisms',
        'Pull-based scheduling for efficient coordination',
        'Separate compute pools and their benefits',
      ],
    },
    {
      id: '5',
      title: 'Understand Architectural Design Decisions',
      description: 'Explore the reasoning behind architectural choices in disaggregated systems.',
      details: [
        'Why separate compute pools improve performance',
        'Trade-offs in KV-cache transfer',
        'Benefits of pull-based vs push-based scheduling',
        'Resource allocation strategies',
      ],
    },
    {
      id: '6',
      title: 'Optimize System Configuration',
      description: 'Learn how to tune and configure disaggregated systems for different workloads.',
      details: [
        'Balancing prefill and decode resources',
        'Tuning for optimal performance',
        'Workload-specific configurations',
        'Cost-performance trade-offs',
      ],
    },
    {
      id: '7',
      title: 'Track the Journey from Research to Production',
      description: 'Follow the evolution from research concept to industry-standard production system.',
      details: [
        'Early research and prototypes',
        'Key milestones in development',
        'Adoption by major providers (OpenAI, Anthropic, Google)',
        'Real-world implementations and case studies',
        'Performance improvements over time',
      ],
    },
    {
      id: '8',
      title: 'Measure Real-World Performance Impact',
      description: 'Assess the tangible benefits on critical performance metrics and cost efficiency.',
      details: [
        'Latency reduction (TTFT and TPOT metrics)',
        'Throughput improvements',
        'Cost optimization and efficiency gains',
        'Scalability enhancements',
      ],
    },
  ];

  const handleNext = () => {
    if (currentIndex < objectives.length - 1) {
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

  const allViewed = viewedCards.size === objectives.length;

  if (showReview) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <List className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Review All Objectives</h2>
              <p className="text-slate-600">Review what you'll learn in this course</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-white/60 rounded-lg border border-blue-200">
            <p className="text-sm text-slate-700 leading-relaxed">
              By mastering these objectives, you'll gain the knowledge used by leading AI teams to serve LLMs at scale efficiently.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {objectives.map((objective, index) => (
            <div
              key={objective.id}
              className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-blue-400 transition-all cursor-pointer"
              onClick={() => handleCardClick(index)}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-2">{objective.title}</h3>
                  <p className="text-sm text-slate-600">{objective.description}</p>
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
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {allViewed ? 'I Understand These Objectives' : 'View All Cards First'}
            <CheckCircle className="w-5 h-5" />
          </button>
        </div>

        {!allViewed && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              Please review all objective cards before proceeding. Click on any card above to view its details.
            </p>
          </div>
        )}
      </div>
    );
  }

  const currentObjective = objectives[currentIndex];
  const progress = ((currentIndex + 1) / objectives.length) * 100;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Course Objectives</h2>
            <p className="text-slate-600">
              Learning Objective {currentIndex + 1} of {objectives.length}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-600 mb-2">Progress</div>
            <div className="text-2xl font-bold text-blue-600">{Math.round(progress)}%</div>
          </div>
        </div>
        <div className="mb-4 p-4 bg-white/60 rounded-lg border border-blue-200">
          <p className="text-sm text-slate-700 leading-relaxed">
            By mastering these objectives, you'll gain the knowledge used by leading AI teams to serve LLMs at scale efficiently.
          </p>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-600 to-cyan-600 h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-white font-bold text-xl">
              {currentIndex + 1}
            </div>
            <div>
              <div className="text-blue-100 text-sm mb-1">Objective {currentIndex + 1}</div>
              <h3 className="text-2xl font-bold">{currentObjective.title}</h3>
            </div>
          </div>
        </div>

        <div className="p-8">
          <p className="text-lg text-slate-700 mb-6">{currentObjective.description}</p>

          {currentObjective.details && currentObjective.details.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 mb-3">What you'll learn:</h4>
              {currentObjective.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">{detail}</p>
                </div>
              ))}
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
          {objectives.map((_, index) => (
            <button
              key={index}
              onClick={() => handleCardClick(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-blue-600'
                  : viewedCards.has(index)
                  ? 'bg-green-600'
                  : 'bg-slate-300'
              }`}
              aria-label={`Go to objective ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition"
        >
          {currentIndex === objectives.length - 1 ? 'Review All' : 'Next'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
