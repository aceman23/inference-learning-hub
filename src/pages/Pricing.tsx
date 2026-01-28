import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Award,
  Clock,
  Users,
  Zap,
  Shield,
  Video,
  FileText,
  BarChart,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const hero = useScrollAnimation();
  const pricing = useScrollAnimation();
  const features = useScrollAnimation();
  const comparison = useScrollAnimation();
  const faq = useScrollAnimation();
  const cta = useScrollAnimation();

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Is this a one-time payment or subscription?',
      answer: 'This is a one-time payment of $249 for lifetime access. No recurring charges, no hidden fees. You pay once and have permanent access to all course materials and future updates.'
    },
    {
      question: 'Who is this course for?',
      answer: 'This course is designed for ML engineers, platform engineers, researchers, and technical professionals working with or interested in LLM serving infrastructure. If you\'re deploying models in production, evaluating serving solutions, or researching optimization techniques, this course provides the deep technical knowledge you need.'
    },
    {
      question: 'What prerequisites do I need?',
      answer: 'You should have basic familiarity with LLMs (transformer architecture, inference vs. training), Python programming, and cloud/distributed systems concepts. Prior experience with serving frameworks (TensorFlow Serving, TorchServe, etc.) is helpful but not required. This is an intermediate to advanced course, not for absolute beginners.'
    },
    {
      question: 'How is this different from reading research papers or blog posts?',
      answer: 'While the course is based on cutting-edge research (including the DistServe paper and UCSD Hao AI Lab retrospective), it provides structured learning with interactive diagrams, hands-on exercises, quizzes, and real-world case studies. You\'ll get curated, synthesized knowledge instead of spending weeks piecing together scattered resources—saving you 20+ hours of research time.'
    },
    {
      question: 'Will this help me in job interviews?',
      answer: 'Absolutely. Disaggregated inference is rapidly becoming industry standard at companies like Fireworks, Perplexity, and DeepSeek. Being able to discuss prefill-decode separation, KV-cache optimization, and interference elimination signals deep technical expertise. The certificate demonstrates your commitment to staying current with production ML systems.'
    },
    {
      question: 'Can I expense this as professional development?',
      answer: 'Many students successfully expense the course as professional development or training. We provide a detailed receipt with course description, learning objectives, and total hours that you can submit to your employer. At $249, it\'s significantly more cost-effective than traditional training programs ($2,000+) or conferences.'
    },
    {
      question: 'How long does it take to complete the course?',
      answer: 'Most students complete the course in 6-10 hours spread over 1-2 weeks, though you can go faster or slower based on your schedule. The 6 modules are self-paced: Module 1 (30 min), Module 2 (45 min), Module 3 (2-3 hours), Module 4 (1 hour), Module 5 (3-4 hours), Module 6 (15 min). You have lifetime access, so there\'s no rush.'
    },
    {
      question: 'Do I get access to future updates and new content?',
      answer: 'Yes! Your one-time payment includes all future updates, new modules, additional exercises, and content additions at no extra cost. As LLM serving techniques evolve (new frameworks, optimization methods, research papers), we\'ll update the course to keep you current. Once enrolled, you\'re always enrolled.'
    },
    {
      question: 'Are there hands-on coding exercises or just theory?',
      answer: 'The course includes both conceptual learning and practical application. Module 5 features 5 hands-on activities: creating serving diagrams, analyzing scheduling algorithms, designing disaggregated architectures, simulating workloads, and evaluating real-world systems. You\'ll build artifacts you can use in interviews or add to your portfolio.'
    },
    {
      question: 'What frameworks and tools are covered?',
      answer: 'We cover production frameworks used by leading AI companies: vLLM (PagedAttention, continuous batching), SGLang (RadixAttention), NVIDIA TensorRT-LLM, Ray Serve, and emerging tools like LMCache and MoonCake. The focus is on vendor-agnostic principles applicable across any serving stack, not just one tool.'
    },
    {
      question: 'Will I be able to implement disaggregation after taking this course?',
      answer: 'Yes. You\'ll understand the architecture deeply enough to evaluate existing frameworks (vLLM, SGLang), design disaggregated systems for your use case, make informed build-vs-buy decisions, and contribute to open-source projects. The course bridges research and implementation with real-world deployment considerations.'
    },
    {
      question: 'Is the content up-to-date with 2025 best practices?',
      answer: 'Absolutely. The course is based on the "Disaggregated Inference: 18 Months Later" retrospective (published December 2024) covering the evolution from initial resistance to rapid industry adoption. We include 2024-2025 developments: Splitwise (Attention-FFN disaggregation), TetriInfer, DeepSeek-V3, NVIDIA Rubin, and production deployments at Fireworks/Perplexity.'
    },
    {
      question: 'What if I\'m not satisfied with the course?',
      answer: 'We offer a 14-day money-back guarantee. If you\'re not completely satisfied with the course content, depth, or quality within 14 days of enrollment, email us for a full refund—no questions asked, no hassle. We\'re confident you\'ll find the content valuable, but we want you to feel confident too.'
    },
    {
      question: 'Can I share my certificate on LinkedIn?',
      answer: 'Yes! The Certificate of Completion is designed to be shared on LinkedIn (Education or Licenses & Certifications sections), your resume, portfolio, or personal website. It includes your name, completion date, course title, and credential details. Many students report positive engagement from recruiters and colleagues after posting their certificate.'
    },
    {
      question: 'Is there a community or discussion forum?',
      answer: 'Yes! Enrolled students get access to our course community where you can ask questions, share insights, discuss implementation challenges, and connect with fellow ML engineers and researchers. Module 6 also provides curated links to active communities (vLLM Discord, Reddit r/MachineLearning, Twitter hashtags) where you can engage with the broader ecosystem.'
    },
    {
      question: 'Can multiple people from my team enroll?',
      answer: 'Absolutely! We encourage team learning. Each team member needs their own enrollment ($249/person) for certificate issuance and progress tracking. For teams of 5+, contact us for potential volume discounts. Group learning is powerful—teams can discuss concepts together and align on serving architecture decisions.'
    },
    {
      question: 'How does this compare to a university course on LLM serving?',
      answer: 'University courses cost $2,000-5,000+, require fixed schedules, and often lack production focus (emphasizing theory over real-world deployment). Our course costs $249, offers lifetime access at your own pace, and is taught by practitioners based on systems running at scale. You get production-ready knowledge in a fraction of the time and cost.'
    },
    {
      question: 'What if I have questions while taking the course?',
      answer: 'Each module includes detailed explanations, diagrams, and examples designed to be self-explanatory. For additional questions, you can engage with the course community, explore the 36+ curated resources in Module 6 (academic papers, GitHub repos, communities), or contact course support. The content is structured to minimize confusion and maximize clarity.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 antialiased text-slate-900 relative">
      <div className="fixed -z-10 mix-blend-multiply top-0 right-0 bottom-0 left-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-100"></div>
        <div className="absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-gradient-to-tr from-sky-200 to-blue-200 blur-3xl opacity-70"></div>
        <div className="bg-gradient-to-tr from-blue-200 to-cyan-200 opacity-60 w-72 h-72 rounded-full absolute bottom-0 left-[-10%] blur-3xl"></div>
      </div>

      <header className="relative z-10 opacity-0 animate-fade-in">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex pt-5 pb-5 items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 hover:opacity-80 transition"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">Inference Learning Hub</span>
            </button>
            <div className="flex items-center gap-3">
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

      <section ref={hero.ref} className="relative z-10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 max-w-4xl mx-auto opacity-0 ${hero.isVisible ? 'animate-fade-slide-in animation-delay-100' : ''}`}>
              Simple, Transparent Pricing
            </h1>
            <p className={`mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto opacity-0 ${hero.isVisible ? 'animate-fade-slide-in animation-delay-200' : ''}`}>
              One-time payment. Lifetime access. No subscriptions, no recurring fees.
            </p>
          </div>
        </div>
      </section>

      <section ref={pricing.ref} className="relative z-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className={`bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 rounded-3xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] ring-1 ring-blue-800/20 overflow-hidden opacity-0 ${pricing.isVisible ? 'animate-scale-in' : ''}`}>
              <div className="relative">
                <div className="absolute top-0 right-0 bg-gradient-to-br from-cyan-400 to-cyan-500 text-blue-900 text-xs font-semibold px-4 py-1.5 rounded-bl-2xl">
                  BEST VALUE
                </div>

                <div className="p-8 md:p-12">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Complete Course Access</h2>
                    <p className="text-blue-100">Everything you need to master disaggregated LLM serving</p>
                  </div>

                  <div className="text-center mb-8 pb-8 border-b border-blue-400/30">
                    <div className="flex items-baseline justify-center gap-2 mb-2">
                      <span className="text-6xl font-bold text-white">$249</span>
                    </div>
                    <p className="text-blue-100">One-time payment • Lifetime access</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {[
                      { icon: BookOpen, text: '6 comprehensive modules with deep-dive content' },
                      { icon: Video, text: 'Interactive diagrams and visual explanations' },
                      { icon: FileText, text: 'Hands-on exercises and real-world case studies' },
                      { icon: BarChart, text: 'Quizzes and progress tracking' },
                      { icon: Award, text: 'Certificate of Completion' },
                      { icon: Clock, text: 'Lifetime access to all materials' },
                      { icon: Zap, text: 'All future course updates included' },
                      { icon: Users, text: 'Access to course community' },
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-5 h-5 text-cyan-200" />
                        </div>
                        <p className="text-blue-50 text-sm pt-2">{feature.text}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => navigate('/signup')}
                    className="w-full inline-flex justify-center hover:bg-slate-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl text-base font-medium text-blue-900 bg-white rounded-xl py-4 px-8 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] gap-2 items-center font-semibold"
                  >
                    Enroll Now for $249
                    <ArrowRight className="h-5 w-5" />
                  </button>

                  <div className="mt-6 flex items-center justify-center gap-6 text-sm text-blue-100">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-cyan-200" />
                      <span>14-day money-back guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-600">
                Have questions? <button onClick={() => navigate('/login')} className="text-slate-900 font-semibold hover:underline">Contact us</button>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={features.ref} className="relative z-10 pb-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className={`text-center mb-12 opacity-0 ${features.isVisible ? 'animate-fade-slide-in animation-delay-100' : ''}`}>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
              What You Get With Your Enrollment
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              A comprehensive learning experience designed to take you from understanding to implementation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: BookOpen,
                title: 'Expert-Crafted Content',
                desc: 'Six comprehensive modules covering everything from LLM serving fundamentals to advanced optimization techniques used by leading AI companies.',
                highlight: '20+ hours of content'
              },
              {
                icon: Zap,
                title: 'Hands-On Learning',
                desc: 'Interactive quizzes, real-world exercises, and case studies that reinforce your understanding and build practical skills.',
                highlight: '50+ practice exercises'
              },
              {
                icon: Award,
                title: 'Professional Recognition',
                desc: 'Earn a verifiable Certificate of Completion to showcase your expertise on LinkedIn, your resume, and professional portfolio.',
                highlight: 'Shareable credential'
              },
              {
                icon: Users,
                title: 'Community Access',
                desc: 'Connect with fellow engineers and researchers tackling similar challenges in production LLM serving infrastructure.',
                highlight: 'Peer learning'
              },
              {
                icon: Clock,
                title: 'Learn at Your Pace',
                desc: 'No deadlines, no pressure. Complete the course on your own schedule with lifetime access to all materials and updates.',
                highlight: 'Forever yours'
              },
              {
                icon: Shield,
                title: 'Risk-Free Investment',
                desc: 'Try the course risk-free with our 14-day money-back guarantee. Not satisfied? Get a full refund, no questions asked.',
                highlight: '100% satisfaction guarantee'
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:from-blue-100 hover:to-cyan-100 opacity-0 ${features.isVisible ? 'animate-fade-slide-in' : ''}`}
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 mb-4">{item.desc}</p>
                <div className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                  <CheckCircle className="w-4 h-4" />
                  {item.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={comparison.ref} className="relative z-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 opacity-0 ${comparison.isVisible ? 'animate-fade-slide-in animation-delay-100' : ''}`}>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
              Compare Your Options
            </h2>
            <p className="text-lg text-slate-600">
              See why our course offers exceptional value for your professional development
            </p>
          </div>

          <div className={`max-w-5xl mx-auto bg-white rounded-3xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] ring-1 ring-black/5 overflow-hidden opacity-0 ${comparison.isVisible ? 'animate-scale-in animation-delay-200' : ''}`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Option</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Self-Learning</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">University Course</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-blue-700 bg-blue-100">This Course</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {[
                    { feature: 'Structured curriculum', self: false, university: true, course: true },
                    { feature: 'Expert guidance', self: false, university: true, course: true },
                    { feature: 'Hands-on exercises', self: false, university: true, course: true },
                    { feature: 'Production focus', self: false, university: false, course: true },
                    { feature: 'Lifetime access', self: true, university: false, course: true },
                    { feature: 'Learn at your pace', self: true, university: false, course: true },
                    { feature: 'Certificate', self: false, university: true, course: true },
                    { feature: 'Cost', self: 'Free', university: '$2,000+', course: '$249' },
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-blue-50/30 transition">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{row.feature}</td>
                      <td className="px-6 py-4 text-center">
                        {typeof row.self === 'boolean' ? (
                          row.self ? (
                            <CheckCircle className="w-5 h-5 text-slate-400 mx-auto" />
                          ) : (
                            <div className="w-5 h-5 mx-auto border-2 border-slate-300 rounded-full"></div>
                          )
                        ) : (
                          <span className="text-sm text-slate-700">{row.self}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {typeof row.university === 'boolean' ? (
                          row.university ? (
                            <CheckCircle className="w-5 h-5 text-slate-400 mx-auto" />
                          ) : (
                            <div className="w-5 h-5 mx-auto border-2 border-slate-300 rounded-full"></div>
                          )
                        ) : (
                          <span className="text-sm text-slate-700">{row.university}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center bg-blue-50/50">
                        {typeof row.course === 'boolean' ? (
                          row.course ? (
                            <CheckCircle className="w-5 h-5 text-blue-600 mx-auto" />
                          ) : (
                            <div className="w-5 h-5 mx-auto border-2 border-slate-300 rounded-full"></div>
                          )
                        ) : (
                          <span className="text-sm font-semibold text-blue-700">{row.course}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section ref={faq.ref} className="relative z-10 pb-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className={`text-center mb-12 opacity-0 ${faq.isVisible ? 'animate-fade-slide-in animation-delay-100' : ''}`}>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06)] ring-1 ring-blue-100 overflow-hidden transition-all duration-300 opacity-0 ${faq.isVisible ? 'animate-fade-slide-in' : ''}`}
                style={{ animationDelay: `${(index + 2) * 50}ms` }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left hover:bg-blue-50 transition"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold text-slate-900">{item.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-600 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-5 pl-14 text-slate-600 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={cta.ref} className="relative z-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] p-12 md:p-16 text-center opacity-0 ${cta.isVisible ? 'animate-scale-in' : ''}`}>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4">
              Ready to Transform Your LLM Serving Skills?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of engineers already mastering disaggregated inference. Your investment today will pay dividends throughout your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/signup')}
                className="inline-flex hover:bg-slate-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl text-base font-medium text-slate-900 bg-white rounded-xl pt-4 pr-8 pb-4 pl-8 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] gap-2 items-center justify-center"
              >
                Enroll Now for $249
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-blue-100 mt-6">
              14-day money-back guarantee • Lifetime access • All future updates included
            </p>
          </div>
        </div>
      </section>

      <footer className="relative z-10 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-3 mb-4 hover:opacity-80 transition"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900">Inference Learning Hub</span>
              </button>
              <p className="text-slate-600 max-w-md">
                Master cutting-edge techniques for optimizing large language model performance in production environments.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Course</h4>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('/pricing')} className="text-slate-600 hover:text-slate-900 transition">Pricing</button></li>
                <li><button onClick={() => navigate('/')} className="text-slate-600 hover:text-slate-900 transition">Curriculum</button></li>
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
