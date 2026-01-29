import { useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, Award, Clock, CheckCircle, ArrowRight, Play, Users, Briefcase, TrendingUp, Shield, Rocket, Target, Star, Quote, Zap, DollarSign, ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useState, useEffect } from 'react';
import SEO from '../components/SEO';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const hero = useScrollAnimation({ threshold: 0, triggerOnce: true });
  const features = useScrollAnimation();
  const curriculum = useScrollAnimation();
  const audience = useScrollAnimation();
  const benefits = useScrollAnimation();
  const testimonials = useScrollAnimation();
  const quote = useScrollAnimation();
  const faq = useScrollAnimation();
  const cta = useScrollAnimation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Disaggregated Inference Course: Master LLM Serving Optimization',
    description: 'Master disaggregated inference and LLM serving optimization techniques. Comprehensive course covering prefill-decode disaggregation, KV cache management, and distributed serving strategies.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Inference Learning Hub',
      url: window.location.origin,
    },
    url: window.location.origin,
    image: `${window.location.origin}/image.png`,
    educationalLevel: 'Advanced',
    coursePrerequisites: 'Basic understanding of machine learning and large language models',
    offers: {
      '@type': 'Offer',
      category: 'Educational Courses',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 antialiased text-slate-900 relative">
      <SEO
        title="Disaggregated Inference Course: Master LLM Serving Optimization"
        description="Master disaggregated inference and LLM serving optimization techniques. Comprehensive course covering prefill-decode disaggregation, KV cache management, and distributed serving strategies."
        canonical={window.location.origin}
        structuredData={structuredData}
      />
      <div className="fixed -z-10 mix-blend-multiply top-0 right-0 bottom-0 left-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-100"></div>
        <div className="absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-gradient-to-tr from-sky-200 to-blue-200 blur-3xl opacity-70"></div>
        <div className="bg-gradient-to-tr from-blue-200 to-cyan-200 opacity-60 w-72 h-72 rounded-full absolute bottom-0 left-[-10%] blur-3xl"></div>
      </div>

      <header className={`relative z-10 transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex pt-5 pb-5 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">Inference Learning Hub</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/pricing')}
                className="hidden md:inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 transition-all duration-300 hover:scale-105"
              >
                Pricing
              </button>
              <button
                onClick={() => navigate('/login')}
                className="hidden sm:inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 transition-all duration-300 hover:scale-105"
              >
                Sign in
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="inline-flex hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg px-4 py-2.5 gap-2 items-center"
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </header>

      <section ref={hero.ref} className="z-10 xl:pb-20 pb-20 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12 lg:py-20">
            <div className={`inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600 shadow-sm mb-5 opacity-0 ${hero.isVisible ? 'animate-fade-in animation-delay-100' : ''}`}>
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              New: Interactive quizzes and hands-on exercises
            </div>
            <h1 className={`mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 max-w-4xl mx-auto opacity-0 ${hero.isVisible ? 'animate-fade-slide-in animation-delay-150' : ''}`}>
              Master Disaggregated Inference in LLM Serving
            </h1>
            <div className={`mt-8 mb-8 max-w-2xl mx-auto opacity-0 ${hero.isVisible ? 'animate-fade-slide-in animation-delay-200' : ''}`}>
              <img
                src="/00-distserve_anime-crop.gif"
                alt="DistServe Architecture Animation"
                className="w-full rounded-2xl shadow-2xl border border-slate-200"
              />
            </div>
            <p className={`mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto opacity-0 ${hero.isVisible ? 'animate-fade-slide-in animation-delay-300' : ''}`}>
              Learn cutting-edge techniques for optimizing large language model performance, reducing
              latency, and improving resource utilization in production environments.
            </p>
            <div className={`mt-6 flex flex-col sm:flex-row gap-3 justify-center opacity-0 ${hero.isVisible ? 'animate-fade-slide-in animation-delay-400' : ''}`}>
              <button
                onClick={() => navigate('/signup')}
                className="inline-flex hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl pt-3 pr-5 pb-3 pl-5 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] gap-2 items-center justify-center"
              >
                Start Learning
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="inline-flex gap-2 hover:bg-slate-50 transition-all duration-300 hover:scale-105 hover:shadow-2xl text-sm font-medium text-slate-900 bg-white rounded-xl pt-3 pr-5 pb-3 pl-5 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] items-center justify-center"
              >
                <Play className="h-4 w-4" />
                View Demo
              </button>
            </div>
            <div className={`mt-8 flex items-center justify-center gap-4 opacity-0 ${hero.isVisible ? 'animate-fade-in animation-delay-500' : ''}`}>
              <p className="text-sm text-slate-600">
                Trusted by engineers worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={features.ref} className="relative z-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className={`bg-white rounded-3xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] ring-1 ring-black/5 p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 opacity-0 ${features.isVisible ? 'animate-fade-slide-in animation-delay-100' : ''}`}>
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-slate-900 group-hover:text-white">
                <BookOpen className="w-6 h-6 text-slate-900 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-slate-900 mb-3">6 Comprehensive Modules</h3>
              <p className="text-slate-600">
                From LLM serving challenges to advanced optimization techniques and production
                deployment strategies.
              </p>
            </div>

            <div className={`bg-white rounded-3xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] ring-1 ring-black/5 p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 opacity-0 ${features.isVisible ? 'animate-fade-slide-in animation-delay-200' : ''}`}>
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4 transition-all duration-300">
                <Clock className="w-6 h-6 text-slate-900" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-slate-900 mb-3">Learn at Your Own Pace</h3>
              <p className="text-slate-600">
                Lifetime access to all course materials. Complete sections in order and track your
                progress along the way.
              </p>
            </div>

            <div className={`bg-white rounded-3xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] ring-1 ring-black/5 p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 opacity-0 ${features.isVisible ? 'animate-fade-slide-in animation-delay-300' : ''}`}>
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4 transition-all duration-300">
                <Award className="w-6 h-6 text-slate-900" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-slate-900 mb-3">Certificate of Completion</h3>
              <p className="text-slate-600">
                Earn a professional certificate upon completing all sections to showcase your
                expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={curriculum.ref} className="relative z-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`bg-white rounded-3xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] ring-1 ring-black/5 overflow-hidden transition-all duration-500 hover:shadow-2xl opacity-0 ${curriculum.isVisible ? 'animate-scale-in' : ''}`}>
            <div className="md:flex">
              <div className="md:w-1/2 p-12">
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-6">What You'll Learn</h2>
                <ul className="space-y-4">
                  {[
                    'Understanding LLM serving challenges and bottlenecks',
                    'The two-phase inference process: prefill and decode',
                    'Architecting disaggregated systems for optimal performance',
                    'KV cache management and efficient transfer techniques',
                    'Performance optimization strategies and batching',
                    'Real-world implementation and deployment patterns',
                    'Advanced topics and future research directions',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 group transition-all duration-300 hover:translate-x-2">
                      <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 p-12 flex flex-col justify-center items-center text-white">
                <div className="text-center">
                  <p className="text-lg mb-4 text-blue-100">One-time payment</p>
                  <div className="text-6xl font-bold mb-6">$249</div>
                  <button
                    onClick={() => navigate('/signup')}
                    className="px-8 py-4 bg-white text-blue-900 text-sm font-semibold rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-300 hover:scale-105 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
                  >
                    Enroll Now
                  </button>
                  <p className="text-sm mt-4 text-blue-100">14-day money-back guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={audience.ref} className="relative z-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 opacity-0 ${audience.isVisible ? 'animate-fade-slide-in animation-delay-100' : ''}`}>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4">Who This Course Is For</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              This course is designed for technical professionals who want to master production-grade LLM serving optimization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { icon: Briefcase, title: 'AI/ML Engineers & Researchers', desc: 'Building or optimizing LLM inference pipelines' },
              { icon: Shield, title: 'ML Infrastructure / MLOps Engineers', desc: 'Managing production serving at scale' },
              { icon: TrendingUp, title: 'Data Scientists', desc: 'Transitioning to systems-level optimization for large models' },
              { icon: Rocket, title: 'Startup Founders & Tech Leads', desc: 'Deploying cost-efficient LLM services (chatbots, agents, APIs)' },
              { icon: Target, title: 'Students & Professionals', desc: 'Preparing for roles in frontier AI companies (xAI, OpenAI, Anthropic)' },
              { icon: Users, title: 'Production Engineers', desc: 'Scaling inference infrastructure for enterprise applications' },
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] ring-1 ring-black/5 p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 opacity-0 ${audience.isVisible ? 'animate-fade-slide-in' : ''}`}
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-slate-900" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className={`bg-slate-100 border border-slate-200 rounded-2xl p-6 max-w-3xl mx-auto opacity-0 ${audience.isVisible ? 'animate-fade-in animation-delay-500' : ''}`}>
            <p className="text-sm text-slate-700 text-center">
              <strong>Note:</strong> This course assumes basic familiarity with LLMs, Python, and inference concepts. Not for absolute beginners.
            </p>
          </div>

          <div className={`text-center mt-8 opacity-0 ${audience.isVisible ? 'animate-fade-slide-in animation-delay-600' : ''}`}>
            <button
              onClick={() => navigate('/signup')}
              className="inline-flex hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl pt-3 pr-5 pb-3 pl-5 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] gap-2 items-center justify-center"
            >
              Start Mastering Disaggregated Serving Today
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section ref={benefits.ref} className="relative z-10 pb-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className={`text-center mb-12 opacity-0 ${benefits.isVisible ? 'animate-fade-slide-in animation-delay-100' : ''}`}>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
              How This Course Will Accelerate Your Career in AI
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Invest in skills that deliver tangible ROI and position you at the forefront of LLM infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: TrendingUp,
                title: 'Stand Out in High-Demand Roles',
                desc: 'Expertise in disaggregated inference (prefill-decode separation, KV-cache optimization) is rare and increasingly required at top AI labs and inference providers (Fireworks, Groq, Together AI).',
              },
              {
                icon: DollarSign,
                title: 'Reduce Serving Costs Dramatically',
                desc: 'Learn techniques that cut GPU bills 2-5x in production – directly impacting company bottom line and your value as an engineer.',
              },
              {
                icon: Shield,
                title: 'Build Production-Grade Systems',
                desc: 'Master real-world patterns used by leading teams (vLLM, SGLang, NVIDIA Dynamo) to handle bursty workloads and scale to thousands of GPUs.',
              },
              {
                icon: Zap,
                title: 'Future-Proof Your Skills',
                desc: 'Stay ahead of trends like heterogeneous hardware, Attention-FFN disaggregation, and open-source breakthroughs (DeepSeek, LMCache) – positioning you for 2026-2028 advancements.',
              },
              {
                icon: Award,
                title: 'Earn a Verifiable Credential',
                desc: 'Share your Certificate of Completion on LinkedIn/X/resume to signal deep systems knowledge in the fast-moving LLM space.',
              },
              {
                icon: Clock,
                title: 'Lifetime Access + Updates',
                desc: 'Revisit materials as the field evolves (new frameworks, hardware like Rubin/Blackwell impacts). One payment, continuous learning.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 transition-all duration-300 hover:from-blue-100 hover:to-cyan-100 hover:shadow-xl opacity-0 ${benefits.isVisible ? 'animate-fade-slide-in' : ''}`}
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`text-center mt-12 opacity-0 ${benefits.isVisible ? 'animate-fade-slide-in animation-delay-800' : ''}`}>
            <button
              onClick={() => navigate('/signup')}
              className="inline-flex hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl pt-3 pr-5 pb-3 pl-5 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] gap-2 items-center justify-center"
            >
              Invest in Skills That Pay Off for Years – Enroll Now for $249
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section ref={testimonials.ref} className="relative z-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 opacity-0 ${testimonials.isVisible ? 'animate-fade-slide-in animation-delay-100' : ''}`}>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
              What Early Learners Are Saying
            </h2>
            <p className="text-lg text-slate-600">
              Join engineers and researchers already mastering disaggregated inference
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: 'This course finally connected the dots between research papers and production serving. The KV-cache transfer deep-dive alone saved our team weeks.',
                author: 'ML Engineer',
                company: 'AI Startup',
                rating: 5,
              },
              {
                quote: 'Perfect mix of theory and practical deployment patterns. Highly recommend for anyone scaling LLMs in production environments.',
                author: 'MLOps Lead',
                company: 'Tech Company',
                rating: 5,
              },
              {
                quote: 'Clear explanations of why colocation fails and how disaggregation fixes it. Eye-opening content for systems engineers.',
                author: 'AI Researcher',
                company: 'Research Lab',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] ring-1 ring-black/5 p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 opacity-0 ${testimonials.isVisible ? 'animate-fade-slide-in' : ''}`}
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="border-t border-slate-200 pt-4">
                  <p className="font-semibold text-slate-900">{testimonial.author}</p>
                  <p className="text-sm text-slate-600">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={quote.ref} className="relative z-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-3xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] overflow-hidden opacity-0 ${quote.isVisible ? 'animate-scale-in' : ''}`}>
            <div className="relative">
              <div className="absolute top-8 left-8 opacity-10">
                <Quote className="w-16 h-16 text-white" />
              </div>

              <div className="grid md:grid-cols-[200px_1fr] gap-8 p-12 md:p-16 items-center">
                <div className="flex justify-center md:justify-start">
                  <img
                    src="/elon.png"
                    alt="Elon Musk"
                    className="w-40 h-40 rounded-2xl object-cover grayscale opacity-90"
                  />
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-6">
                    Why Algorithmic Efficiency Matters More Than Ever
                  </h3>
                  <blockquote className="text-lg sm:text-xl text-slate-200 leading-relaxed mb-6 font-light">
                    "Most people in the AI community don't yet understand this: the intelligence density potential is vastly greater than what we're currently experiencing. We could extract 100x more intelligence per gigabyte, per watt, per transistor — just from algorithmic improvements alone."
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="h-px w-12 bg-slate-600"></div>
                    <p className="text-slate-400 text-sm">
                      Elon Musk on intelligence density and algorithmic optimization
                    </p>
                    <div className="h-px w-12 bg-slate-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={faq.ref} className="relative z-10 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 opacity-0 ${faq.isVisible ? 'animate-fade-slide-in animation-delay-100' : ''}`}>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need to know about the course
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: 'What prerequisites do I need for this course?',
                answer: 'You should have basic familiarity with LLMs, Python programming, and general inference concepts. This course is not designed for absolute beginners - it assumes you understand what transformer models are and have some experience with ML systems.',
              },
              {
                question: 'How long does it take to complete the course?',
                answer: 'The course is self-paced and most learners complete it within 2-4 weeks, spending 3-5 hours per week. You have lifetime access, so you can take as much time as you need and revisit materials whenever you want.',
              },
              {
                question: 'Will I get a certificate upon completion?',
                answer: 'Yes! After completing all 6 modules and passing the quizzes, you\'ll receive a digital Certificate of Completion that you can share on LinkedIn, your resume, or portfolio to showcase your expertise in disaggregated inference.',
              },
              {
                question: 'What if I\'m not satisfied with the course?',
                answer: 'We offer a 14-day money-back guarantee. If you\'re not satisfied with the course for any reason within the first 14 days of enrollment, simply contact us for a full refund - no questions asked.',
              },
              {
                question: 'Is this a one-time payment or subscription?',
                answer: 'It\'s a one-time payment of $249. You get lifetime access to all course materials, including any future updates and additions. No recurring fees or hidden costs.',
              },
              {
                question: 'Will the course be updated with new content?',
                answer: 'Yes! The field of LLM serving is rapidly evolving. We regularly update the course with new frameworks, hardware considerations (like NVIDIA Blackwell/Rubin), and emerging techniques to ensure you stay current with the latest developments.',
              },
              {
                question: 'Can I access the course on mobile devices?',
                answer: 'Absolutely! The course platform is fully responsive and works seamlessly on desktop, tablet, and mobile devices. You can learn anywhere, anytime.',
              },
              {
                question: 'Do you offer team or enterprise pricing?',
                answer: 'Yes! If you\'re looking to train multiple team members, please contact us through the contact page for volume discounts and enterprise licensing options.',
              },
              {
                question: 'What makes this course different from free resources online?',
                answer: 'While there are research papers and blog posts available, this course provides a structured, comprehensive curriculum that connects theory to practice. You get hands-on exercises, quizzes to test your knowledge, real-world implementation patterns, and a clear learning path - all in one place.',
              },
              {
                question: 'Can I try the course before purchasing?',
                answer: 'Yes! You can login with the demo account (demo@learnhub.com / demo123) to explore the course content and interface before making a purchase decision.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06)] ring-1 ring-black/5 overflow-hidden transition-all duration-300 hover:shadow-xl opacity-0 ${faq.isVisible ? 'animate-fade-slide-in' : ''}`}
                style={{ animationDelay: `${(index + 2) * 50}ms` }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-slate-900 pr-4">{item.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-600 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-5 text-slate-600 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`text-center mt-12 opacity-0 ${faq.isVisible ? 'animate-fade-slide-in animation-delay-600' : ''}`}>
            <p className="text-slate-600 mb-4">Still have questions?</p>
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition"
            >
              Contact us
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section ref={cta.ref} className="relative z-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] p-12 md:p-16 text-center opacity-0 ${cta.isVisible ? 'animate-scale-in' : ''}`}>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4">
              Ready to Master LLM Serving?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Join engineers and researchers worldwide building the next generation of AI infrastructure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/signup')}
                className="inline-flex hover:shadow-[0_0_0_3px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105 text-sm font-medium text-blue-900 bg-white rounded-xl pt-3 pr-6 pb-3 pl-6 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] gap-2 items-center justify-center font-semibold"
              >
                Enroll Now for $249
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-sm text-blue-100">14-day money-back guarantee • Lifetime access</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900">Inference Learning Hub</span>
              </div>
              <p className="text-slate-600 max-w-md">
                Master cutting-edge techniques for optimizing large language model performance in production environments.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Course</h4>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('/')} className="text-slate-600 hover:text-slate-900 transition">Curriculum</button></li>
                <li><button onClick={() => navigate('/pricing')} className="text-slate-600 hover:text-slate-900 transition">Pricing</button></li>
                <li><button onClick={() => navigate('/signup')} className="text-slate-600 hover:text-slate-900 transition">Certificate</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Get Started</h4>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('/signup')} className="text-slate-600 hover:text-slate-900 transition">Sign Up</button></li>
                <li><button onClick={() => navigate('/login')} className="text-slate-600 hover:text-slate-900 transition">Login</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 text-center">
            <p className="text-sm text-slate-600">
              &copy; 2026 Inference Learning Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
