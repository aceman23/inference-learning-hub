export interface Resource {
  title: string;
  url: string;
  description: string;
  type: 'blog' | 'github' | 'paper' | 'documentation' | 'benchmark' | 'community';
  icon?: string;
}

export interface ResourceSection {
  id: string;
  title: string;
  description: string;
  whyUseful: string;
  resources: Resource[];
  visualUrl?: string;
  visualCaption?: string;
}

export const module6Resources: ResourceSection[] = [
  {
    id: 'source-material',
    title: 'Original Source Material',
    description: 'The foundational research and writings that sparked the disaggregation revolution. Start here to understand the origins and evolution of disaggregated inference from the researchers who pioneered it.',
    whyUseful: 'These primary sources provide the deepest technical insights and historical context. The UCSD Hao AI Lab blog is the definitive retrospective on disaggregation\'s journey from research to production, filled with performance data, lessons learned, and future directions. The original DistServe paper establishes the theoretical foundation and initial empirical validation. Reading primary sources builds expertise that derivative content cannot match—you\'ll understand the "why" behind architectural decisions, not just the "what." For technical interviews or architecture discussions, being able to reference original research demonstrates depth and serious engagement with the field.',
    resources: [
      {
        title: 'Disaggregated Inference: 18 Months Later - UCSD Hao AI Lab',
        url: 'https://hao-ai-lab.github.io/blogs/distserve-retro/',
        description: 'The definitive retrospective on DistServe\'s journey from resistance to rapid adoption, with performance benchmarks, adoption timeline, and lessons learned from production deployments.',
        type: 'blog'
      },
      {
        title: 'DistServe: Disaggregating Prefill and Decoding (Original Paper)',
        url: 'https://arxiv.org/abs/2401.09670',
        description: 'The foundational research paper introducing disaggregated serving architecture, theoretical analysis, and initial experimental validation on real workloads.',
        type: 'paper'
      },
      {
        title: 'DistServe GitHub Repository',
        url: 'https://github.com/LLMServe/DistServe',
        description: 'Official implementation, benchmarks, and usage examples. Includes setup guides, configuration options, and integration instructions for production deployments.',
        type: 'github'
      },
      {
        title: 'Hao AI Lab Research Publications',
        url: 'https://hao-ai-lab.github.io/publications/',
        description: 'Complete collection of research from the team behind DistServe, including related work on LLM serving, scheduling, and optimization techniques.',
        type: 'documentation'
      }
    ],
    visualUrl: '/00-distserve_anime-crop.gif',
    visualCaption: 'DistServe architecture animation: visualizing the separation of prefill and decode phases'
  },
  {
    id: 'frameworks-tools',
    title: 'Core Frameworks & Production Tools',
    description: 'The open-source ecosystem that powers modern LLM serving at scale. These frameworks implement disaggregation and related optimizations, used by leading AI companies worldwide.',
    whyUseful: 'Following these repositories keeps you current with production best practices, performance optimizations, and emerging features. Each framework has its strengths: vLLM for broad model support and PagedAttention, SGLang for structured generation, NVIDIA tools for maximum hardware performance. Watching GitHub releases reveals what problems practitioners are solving in real-time. Many job postings explicitly mention these tools—familiarity signals you\'re production-ready. Contributing to these projects (even documentation or bug reports) builds credibility and network connections. Subscribe to release notes and check Stars/Issues to gauge community momentum and stability.',
    resources: [
      {
        title: 'vLLM - High-Throughput LLM Inference',
        url: 'https://github.com/vllm-project/vllm',
        description: 'The most widely adopted LLM serving framework, featuring PagedAttention, continuous batching, and disaggregation support. Used by Perplexity, Fireworks, and many others.',
        type: 'github'
      },
      {
        title: 'SGLang - Fast Serving Framework',
        url: 'https://github.com/sgl-project/sglang',
        description: 'High-performance serving with RadixAttention for prefix caching, structured generation support, and optimized scheduling. Rapidly growing adoption in 2025.',
        type: 'github'
      },
      {
        title: 'NVIDIA Dynamo - Dynamic Inference Optimization',
        url: 'https://github.com/ai-dynamo/dynamo',
        description: 'NVIDIA\'s framework for dynamic workload optimization, including disaggregation support and integration with TensorRT-LLM for maximum GPU utilization.',
        type: 'github'
      },
      {
        title: 'LMCache - Distributed KV-Cache System',
        url: 'https://github.com/LMCache/LMCache',
        description: 'Specialized distributed caching system for LLM inference, designed to optimize KV-cache transfer in disaggregated architectures with compression and replication.',
        type: 'github'
      },
      {
        title: 'MoonCake - KV-Cache Infrastructure',
        url: 'https://github.com/kvcache-ai/Mooncake',
        description: 'Production-grade KV-cache serving infrastructure optimized for large-scale deployments, with support for multi-tier storage and intelligent prefetching.',
        type: 'github'
      },
      {
        title: 'TensorRT-LLM - NVIDIA Inference SDK',
        url: 'https://github.com/NVIDIA/TensorRT-LLM',
        description: 'NVIDIA\'s official LLM inference SDK with optimized kernels, FP8 quantization, multi-GPU support, and disaggregation patterns for maximum performance.',
        type: 'github'
      },
      {
        title: 'llm-d - Disaggregated Inference Framework',
        url: 'https://github.com/llm-d/llm-d',
        description: 'Purpose-built framework specifically for disaggregated serving patterns, with clean abstractions for prefill/decode separation and KV-cache management.',
        type: 'github'
      },
      {
        title: 'Ray Serve - Prefill/Decode Architecture Guide',
        url: 'https://docs.ray.io/en/latest/serve/llm/architecture/serving-patterns/prefill-decode.html',
        description: 'Ray\'s official documentation on implementing disaggregated prefill/decode patterns, with code examples and deployment guidance for production systems.',
        type: 'documentation'
      }
    ],
    visualUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    visualCaption: 'Open-source frameworks: the foundation of modern LLM serving infrastructure'
  },
  {
    id: 'academic-papers',
    title: 'Related Papers & Academic Extensions',
    description: 'Cutting-edge research extending disaggregation and related LLM serving optimizations. These papers represent the next generation of techniques moving from research labs to production.',
    whyUseful: 'Academic papers reveal tomorrow\'s production systems today. Splitwise extends disaggregation to layer-level (Attention-FFN), CacheGen optimizes KV-cache transfer overhead, TetriInfer solves heterogeneous scheduling—each addresses a real production pain point. Reading papers builds three skills: (1) understanding emerging techniques before they become mainstream, (2) evaluating which research will succeed vs. remain academic, and (3) proposing your own extensions or contributions. For senior roles (staff engineer, research engineer), staying current with research is non-negotiable. Set up arXiv alerts for "LLM inference" or "LLM serving" to catch new papers weekly. Even skimming abstracts and figures builds intuition for what problems the field is tackling.',
    resources: [
      {
        title: 'Splitwise: Improves GPU Usage by Splitting LLM Inference Phases',
        url: 'https://www.microsoft.com/en-us/research/blog/splitwise-improves-gpu-usage-by-splitting-llm-inference-phases/',
        description: 'Microsoft Research\'s extension to disaggregation: separating Attention (memory-bound) from FFN (compute-bound) layers for even finer-grained resource optimization.',
        type: 'blog'
      },
      {
        title: 'TetriInfer: Tensor-Based Scheduling for Heterogeneous Inference',
        url: 'https://arxiv.org/abs/2401.11181',
        description: 'Advanced scheduling algorithms for disaggregated systems with heterogeneous GPU types, optimizing placement and batching across diverse hardware.',
        type: 'paper'
      },
      {
        title: 'CacheGen: Fast KV-Cache Loading for Disaggregated Inference',
        url: 'https://dl.acm.org/doi/10.1145/3651890.3672274',
        description: 'Intelligent KV-cache compression and transfer optimization to reduce the overhead of moving cached activations between prefill and decode pools.',
        type: 'paper'
      },
      {
        title: 'HexGen: Generative Inference of Large Language Models',
        url: 'https://arxiv.org/abs/2311.11802',
        description: 'Pioneering work on flexible batching and scheduling for LLM inference, including early disaggregation patterns and performance modeling.',
        type: 'paper'
      },
      {
        title: 'DeepSeek-V3: Technical Report',
        url: 'https://arxiv.org/abs/2412.19437',
        description: 'DeepSeek\'s production architecture for their latest model, including disaggregated serving strategies, MoE optimizations, and real-world scaling lessons.',
        type: 'paper'
      },
      {
        title: 'EcoServe: Cost-Effective LLM Serving',
        url: 'https://arxiv.org/abs/2410.05303',
        description: 'Economic analysis and optimization of LLM serving costs, with explicit modeling of disaggregation\'s cost benefits at different scales.',
        type: 'paper'
      },
      {
        title: 'Cronus: Optimized Multi-LLM Serving on Shared Infrastructure',
        url: 'https://arxiv.org/abs/2410.11606',
        description: 'Multi-tenant serving optimizations including disaggregation patterns for serving multiple models efficiently on shared GPU clusters.',
        type: 'paper'
      }
    ],
    visualUrl: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&q=80',
    visualCaption: 'Academic research: tomorrow\'s production systems being developed today'
  },
  {
    id: 'industry-adoption',
    title: 'Industry Adoptions & Production Benchmarks',
    description: 'Real-world implementations and performance data from leading AI companies. See how disaggregation performs at production scale and learn from industry deployment strategies.',
    whyUseful: 'Industry case studies validate that disaggregation isn\'t just academic—it\'s solving real business problems at massive scale. Fireworks and Perplexity\'s public blog posts reveal specific metrics (cost savings, latency improvements, throughput gains) that you can cite in proposals or interviews. Benchmark data (MLPerf, SemiAnalysis) provides apples-to-apples comparisons across systems and vendors. Following company engineering blogs reveals implementation details and lessons learned that research papers omit. NVIDIA\'s hardware announcements (GB200, Rubin) show how disaggregation is influencing future chip design—understanding this trajectory helps predict which techniques will scale. Use these resources to answer: "Has anyone actually deployed this successfully?" The answer is now overwhelmingly yes.',
    resources: [
      {
        title: 'Fireworks AI - Disaggregated Inference Engine',
        url: 'https://fireworks.ai/platform/disaggregated-inference-engine',
        description: 'Production deployment of disaggregated serving at Fireworks, with detailed performance benchmarks, cost analysis, and architectural deep-dive.',
        type: 'blog'
      },
      {
        title: 'Perplexity - Disaggregated Prefill and Decode',
        url: 'https://www.perplexity.ai/hub/blog/disaggregated-prefill-and-decode',
        description: 'Perplexity\'s engineering blog on adopting disaggregation for their search product, including latency improvements and scaling lessons learned.',
        type: 'blog'
      },
      {
        title: 'DeepSeek - 3-Way Flexible Serving (3FS)',
        url: 'https://github.com/deepseek-ai/DeepSeek-V3',
        description: 'DeepSeek\'s open-source implementation of advanced disaggregation patterns for their V3 model, including MoE-specific optimizations.',
        type: 'github'
      },
      {
        title: 'NVIDIA Rubin: 1M Token Context Workload Acceleration',
        url: 'https://developer.nvidia.com/blog/nvidia-rubin-cpx-accelerates-inference-performance-and-efficiency-for-1m-token-context-workloads/',
        description: 'NVIDIA\'s next-generation architecture optimized for long-context inference with hardware support for disaggregated serving patterns.',
        type: 'blog'
      },
      {
        title: 'SemiAnalysis InferenceMax - Industry Benchmark Platform',
        url: 'https://inferencemax.semianalysis.com/',
        description: 'Comprehensive benchmark comparisons of LLM serving systems across providers, including disaggregated vs. colocated performance analysis.',
        type: 'benchmark'
      },
      {
        title: 'MLPerf Inference Benchmarks',
        url: 'https://mlcommons.org/benchmarks/inference/',
        description: 'Industry-standard inference benchmarks from MLCommons, tracking performance evolution and comparing disaggregated serving implementations.',
        type: 'benchmark'
      }
    ],
    visualUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    visualCaption: 'Industry adoption: disaggregation powering production systems at leading AI companies'
  },
  {
    id: 'communities',
    title: 'Communities & Ongoing Discussions',
    description: 'Active communities where practitioners share insights, debug issues, and discuss the latest developments in LLM serving. Join conversations and stay connected with the ecosystem.',
    whyUseful: 'Communities provide real-time pulse on what\'s working (and what\'s not) in production. Reddit\'s r/MachineLearning and r/LocalLLaMA surface practical issues before they hit documentation. X/Twitter hashtags (#LLMServing, #vLLM) are where maintainers announce releases and researchers preview upcoming papers. GitHub Discussions and Discord channels for vLLM/SGLang offer direct access to core developers—great for troubleshooting and feature requests. These informal channels often reveal information 6-12 months before formal publications: "We\'re testing disaggregation for MoE models" becomes a paper a year later. Lurking in communities builds network effects: you\'ll recognize names, see who\'s hiring, and identify potential collaborators or mentors. Asking thoughtful questions demonstrates expertise and builds reputation.',
    resources: [
      {
        title: 'r/MachineLearning - LLM Serving Discussions',
        url: 'https://www.reddit.com/r/MachineLearning/search?q=LLM+serving&restrict_sr=on',
        description: 'Active subreddit with in-depth discussions on LLM inference, serving architectures, and optimization techniques from researchers and practitioners.',
        type: 'community'
      },
      {
        title: 'r/LocalLLaMA - Production LLM Deployments',
        url: 'https://www.reddit.com/r/LocalLLaMA/',
        description: 'Community focused on running and optimizing LLMs, with frequent discussions of serving frameworks, performance benchmarks, and deployment strategies.',
        type: 'community'
      },
      {
        title: 'X/Twitter - #LLMServing',
        url: 'https://twitter.com/search?q=%23LLMServing&f=live',
        description: 'Real-time updates from researchers, engineers, and companies working on LLM serving. Follow for release announcements and cutting-edge insights.',
        type: 'community'
      },
      {
        title: 'X/Twitter - #DisaggregatedInference',
        url: 'https://twitter.com/search?q=%23DisaggregatedInference&f=live',
        description: 'Specific discussions about disaggregation techniques, adoption stories, and performance comparisons from the community.',
        type: 'community'
      },
      {
        title: 'vLLM Discord Community',
        url: 'https://discord.gg/vllm',
        description: 'Official Discord for vLLM users and contributors. Get help with deployments, discuss features, and connect directly with maintainers.',
        type: 'community'
      },
      {
        title: 'Hugging Face - LLM Inference Discussions',
        url: 'https://discuss.huggingface.co/c/optimum/59',
        description: 'Hugging Face forums focused on inference optimization, with threads on disaggregation, quantization, and deployment best practices.',
        type: 'community'
      },
      {
        title: 'Papers With Code - LLM Inference Leaderboard',
        url: 'https://paperswithcode.com/task/language-modelling',
        description: 'Track latest papers with open-source implementations, benchmark comparisons, and community discussions about LLM serving techniques.',
        type: 'community'
      },
      {
        title: 'arXiv Sanity - LLM Serving Feed',
        url: 'https://arxiv-sanity-lite.com/?q=llm+inference',
        description: 'Curated feed of LLM inference papers with social features, comments, and personalized recommendations based on your interests.',
        type: 'community'
      }
    ],
    visualUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    visualCaption: 'Community engagement: learning from practitioners worldwide'
  },
  {
    id: 'wrap-up',
    title: 'Course Wrap-Up & Next Steps',
    description: 'Congratulations on completing the course! Reflect on your learning journey, share feedback, and claim your certificate of completion.',
    whyUseful: 'Taking a moment to reflect solidifies learning. Research shows that reflection and synthesis (not just consumption) drive retention and transfer to new contexts. Providing feedback helps improve the course for future learners—your insights as someone who just completed the material are invaluable. The certificate serves as a tangible credential: add it to LinkedIn, include it in portfolios, or reference it in interviews when discussing LLM serving expertise. More importantly, the act of completing and certifying creates a sense of accomplishment and closure that motivates continued learning. Use this moment to commit to next steps: Will you implement disaggregation in a project? Contribute to vLLM? Read more papers? Write a blog post? Concrete commitments increase follow-through.',
    resources: [
      {
        title: 'UCSD Hao AI Lab - DistServe Team',
        url: 'https://hao-ai-lab.github.io/',
        description: 'The research lab that created DistServe. Follow their work for future innovations in LLM serving and systems research.',
        type: 'documentation'
      },
      {
        title: 'Course GitHub Repository',
        url: 'https://github.com/yourusername/distserve-course',
        description: 'Access course materials, provide feedback via issues, or contribute improvements through pull requests.',
        type: 'github'
      },
      {
        title: 'Share Your Learning on LinkedIn',
        url: 'https://www.linkedin.com/feed/',
        description: 'Post about completing the course, share key insights, and tag relevant connections. Publicly committing to learning increases accountability.',
        type: 'community'
      }
    ],
    visualUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
    visualCaption: 'Course completion: celebrate your learning journey and next steps'
  }
];

export const reflectionQuestions = [
  {
    id: 'excited-resource',
    question: 'Which resource category are you most excited to explore next?',
    options: [
      'Original papers and research blogs',
      'Open-source frameworks (vLLM, SGLang)',
      'Academic extensions (Splitwise, TetriInfer)',
      'Industry benchmarks and case studies',
      'Community discussions and forums',
      'All of the above - I want to dive deep!'
    ]
  },
  {
    id: 'application',
    question: 'How do you plan to apply what you\'ve learned?',
    options: [
      'Implement disaggregation in a production system',
      'Contribute to open-source LLM serving projects',
      'Research and propose new optimization techniques',
      'Evaluate serving infrastructure for my company',
      'Teach others about disaggregated inference',
      'Continue learning and exploring the field'
    ]
  }
];
