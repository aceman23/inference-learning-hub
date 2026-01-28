import { useState } from 'react';
import { CheckCircle, ChevronRight, ChevronLeft, Boxes } from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  description: string;
  details?: string[];
}

interface DisaggregationFlowProps {
  onComplete: () => void;
}

export default function DisaggregationFlow({ onComplete }: DisaggregationFlowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewedCards, setViewedCards] = useState<Set<number>>(new Set([0]));
  const [showReview, setShowReview] = useState(false);

  const topics: Topic[] = [
    {
      id: '1',
      title: 'The Core Idea of Disaggregation',
      description: 'Understand the fundamental concept: separating prefill and decode into dedicated GPU pools.',
      details: [
        'Physical separation of compute resources',
        'Each pool optimized for its specific workload',
        'Independent scaling capabilities',
        'Efficient KV-cache transfer between clusters',
      ],
    },
    {
      id: '2',
      title: 'Key Benefits of Disaggregation',
      description: 'Learn why disaggregation provides massive performance and cost improvements.',
      details: [
        'Eliminates interference between prefill and decode',
        'Independent scaling of each phase',
        'Optimized hardware configurations per workload',
        'Cost efficiency through better resource utilization',
      ],
    },
    {
      id: '3',
      title: 'From Colocation to Disaggregation',
      description: 'Trace the evolution from skepticism to industry standard adoption.',
      details: [
        'Early 2024: Novel research concept',
        'Late 2024: Growing adoption as models scaled',
        'Early 2025: Production standard across industry',
        'Why the shift happened: scale, composability, and business needs',
      ],
    },
    {
      id: '4',
      title: 'DistServe: The Pioneer System',
      description: 'Explore the foundational architecture that introduced disaggregated inference.',
      details: [
        'Separate compute pools with different optimizations',
        'Efficient KV-cache transfer mechanisms',
        'Pull-based scheduling for load management',
        'Design principles that became industry standards',
      ],
    },
    {
      id: '5',
      title: 'Production Framework Ecosystem',
      description: 'Discover the modern tools and frameworks supporting disaggregation.',
      details: [
        'Orchestration: NVIDIA Dynamo, llm-d, Ray Serve LLM',
        'Storage: LMCache, MoonCake for KV-cache management',
        'Engines: SGLang, vLLM, TensorRT-LLM',
        'Complete stack support from hardware to application',
      ],
    },
    {
      id: '6',
      title: 'Industry Adoption and Use Cases',
      description: 'See how leading companies implement disaggregation at scale.',
      details: [
        'Fireworks AI: 3-4x cost reduction',
        'Perplexity: <100ms TTFT for real-time search',
        'Meta: Billions of requests daily for Llama models',
        'Amazon Bedrock: Multi-tenant SLA guarantees',
      ],
    },
    {
      id: '7',
      title: 'Production Performance Results',
      description: 'Understand real-world performance improvements and metrics.',
      details: [
        'SGLang on DeepSeek-R1: 3.2x better throughput',
        'NVIDIA Dynamo on GB200: 4.8x decode improvement',
        'vLLM with Expert Parallelism: 75% GPU utilization',
        'Cost per request reduced by 70% with same hardware',
      ],
    },
    {
      id: '8',
      title: 'Future Directions and Innovations',
      description: 'Explore emerging research and next-generation optimizations.',
      details: [
        'Multi-stage pipelines (Splitwise, TetriInfer)',
        'Heterogeneous hardware configurations',
        'Attention-FFN disaggregation for MoE models',
        'Specialized hardware designed for disaggregation',
      ],
    },
  ];

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
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-8 border border-violet-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center">
              <Boxes className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Review All Topics</h2>
              <p className="text-slate-600">Review disaggregated inference concepts before diving deeper</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-white/60 rounded-lg border border-violet-200">
            <p className="text-sm text-slate-700 leading-relaxed">
              You're now ready to explore the complete technical deep dive with detailed diagrams, code examples, performance data, and production insights.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {topics.map((topic, index) => (
            <div
              key={topic.id}
              className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-violet-400 transition-all cursor-pointer"
              onClick={() => handleCardClick(index)}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
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
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {allViewed ? 'Continue to Full Deep Dive' : 'View All Cards First'}
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
      <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Disaggregated Inference Deep Dive</h2>
            <p className="text-slate-600">
              Topic {currentIndex + 1} of {topics.length}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-600 mb-2">Progress</div>
            <div className="text-2xl font-bold text-violet-600">{Math.round(progress)}%</div>
          </div>
        </div>
        <div className="mb-4 p-4 bg-white/60 rounded-lg border border-violet-200">
          <p className="text-sm text-slate-700 leading-relaxed">
            After this overview, you'll access the complete module with detailed architecture diagrams, code examples, performance benchmarks, and production case studies.
          </p>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-violet-600 to-purple-600 h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-white font-bold text-xl">
              {currentIndex + 1}
            </div>
            <div>
              <div className="text-violet-100 text-sm mb-1">Topic {currentIndex + 1}</div>
              <h3 className="text-2xl font-bold">{currentTopic.title}</h3>
            </div>
          </div>
        </div>

        <div className="p-8">
          <p className="text-lg text-slate-700 mb-6">{currentTopic.description}</p>

          {currentTopic.details && currentTopic.details.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 mb-3">Key concepts:</h4>
              {currentTopic.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
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
          {topics.map((_, index) => (
            <button
              key={index}
              onClick={() => handleCardClick(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-violet-600'
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
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-purple-700 transition"
        >
          {currentIndex === topics.length - 1 ? 'Review All' : 'Next'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
