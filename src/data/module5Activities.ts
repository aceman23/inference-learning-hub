interface ActivityStep {
  stepNumber: number;
  instruction: string;
  tip?: string;
}

interface ReflectionPrompt {
  question: string;
  placeholder: string;
}

export interface Activity {
  id: string;
  title: string;
  estimatedTime: string;
  category: 'mapping' | 'discussion' | 'exercise' | 'case-study' | 'research';
  introduction: string;
  learningOutcomes: string[];
  priorKnowledge: string[];
  steps: ActivityStep[];
  reflectionPrompts: ReflectionPrompt[];
  keyTakeaways: string[];
  visualUrl?: string;
  visualCaption?: string;
  additionalVisuals?: Array<{ url: string; caption: string }>;
  codeSnippet?: {
    language: string;
    code: string;
    description: string;
  };
  referenceLinks: Array<{ title: string; url: string }>;
  hasFileUpload: boolean;
  hasTextInputs: boolean;
  hasCodeSubmission: boolean;
}

export const module5Activities: Activity[] = [
  {
    id: '1',
    title: 'Concept Mapping: Colocation vs. Disaggregation',
    estimatedTime: '30-45 minutes',
    category: 'mapping',
    introduction: 'Visual thinking is one of the most powerful ways to understand complex systems. In this activity, you\'ll create a side-by-side architectural diagram comparing colocated serving (traditional approach where prefill and decode share GPUs) with disaggregated serving (separate GPU pools for each phase). This mirrors the exact challenge that engineers at companies like Fireworks AI, Perplexity, and Meta faced when evaluating disaggregation: "How do we visualize the differences to communicate with stakeholders?" Your diagram will show interference points (where prefill disrupts decode or vice versa), KV-cache transfer flows, scaling patterns, and resource allocation differences. This isn\'t just an academic exercise—MLOps teams use exactly these kinds of diagrams in architecture review docs, RFC proposals, and executive presentations when making infrastructure decisions that affect millions of dollars in GPU spending. By the end, you\'ll have a reusable visualization that demonstrates your understanding of disaggregated architecture and a tangible artifact for your portfolio.',
    learningOutcomes: [
      'Visualize the key architectural differences between colocation and disaggregation',
      'Identify specific interference points and their impacts on performance',
      'Understand KV-cache transfer patterns and data flow',
      'Recognize scaling patterns and resource allocation strategies',
      'Create professional technical diagrams suitable for stakeholder communication'
    ],
    priorKnowledge: [
      'Module 2: Understanding of prefill vs. decode phases',
      'Module 3: Disaggregation architecture and KV-cache transfer',
      'Module 4: Benefits of independent scaling and modularity'
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Choose your diagramming tool: draw.io (free, web-based), Lucidchart, Figma, or even pen and paper (take a photo).',
        tip: 'draw.io is recommended for beginners—it\'s free and has GPU/server icons built-in.'
      },
      {
        stepNumber: 2,
        instruction: 'Create two side-by-side sections labeled "Colocated Serving" and "Disaggregated Serving".',
        tip: 'Use a clear visual separator (dashed line or contrasting background colors).'
      },
      {
        stepNumber: 3,
        instruction: 'For colocation: Draw 4-6 GPU boxes. Show both prefill and decode requests arriving at the same GPU pool. Use different arrow colors for prefill (thick arrows) vs. decode (thin arrows).',
        tip: 'Label interference points where prefill blocks decode with red X marks or warning symbols.'
      },
      {
        stepNumber: 4,
        instruction: 'For disaggregation: Draw two separate pools—"Prefill Pool" (3 GPUs) and "Decode Pool" (5 GPUs). Show requests routing to appropriate pools.',
        tip: 'Different pool sizes illustrate independent scaling: decode needs more GPUs for high concurrency.'
      },
      {
        stepNumber: 5,
        instruction: 'Add KV-cache flow: In disaggregation, draw an arrow from Prefill Pool to Decode Pool labeled "KV-cache Transfer (1-5ms)". Show it clearly as the handoff point.',
        tip: 'Use a distinctive color (blue or purple) to highlight KV-cache transfer as the critical interface.'
      },
      {
        stepNumber: 6,
        instruction: 'Annotate interference in colocation: Add text boxes pointing to shared GPUs: "Prefill spike causes decode stalls," "Decode steals compute from prefill."',
        tip: 'Reference Module 3 Topic 2 for specific interference patterns.'
      },
      {
        stepNumber: 7,
        instruction: 'Show scaling behavior: Add a note below colocation: "Must scale for worst-case combined load." Below disaggregation: "Scale prefill and decode independently."',
        tip: 'This is the key economic difference—highlight it prominently.'
      },
      {
        stepNumber: 8,
        instruction: 'Add performance metrics: Annotate with example TTFT/TPOT numbers. Colocation: "TTFT: 50-5000ms (10x variance)," Disaggregation: "TTFT: 80-100ms (1.2x variance)."',
        tip: 'Use the metrics from Module 4 Topic 4 for realistic numbers.'
      },
      {
        stepNumber: 9,
        instruction: 'Include a legend explaining your symbols: prefill request (thick arrow), decode request (thin arrow), interference (red X), KV-cache (blue arrow).',
        tip: 'Clear legends make diagrams shareable and professional.'
      },
      {
        stepNumber: 10,
        instruction: 'Export your diagram as PNG or PDF (high resolution, 1920x1080 minimum) and upload below. If hand-drawn, take a clear photo in good lighting.',
        tip: 'Name your file descriptively: "colocation-vs-disaggregation-comparison.png"'
      }
    ],
    reflectionPrompts: [
      {
        question: 'After creating your diagram, what key advantage of disaggregation stands out most visually?',
        placeholder: 'Describe the visual element that made the biggest impression...'
      },
      {
        question: 'If you were presenting this to a CFO deciding on GPU infrastructure, which part of your diagram would you highlight first and why?',
        placeholder: 'Think about business impact and cost justification...'
      },
      {
        question: 'What was most challenging about visualizing these architectures? What would you do differently if creating a second version?',
        placeholder: 'Reflect on the design process and lessons learned...'
      }
    ],
    keyTakeaways: [
      'Visual diagrams are essential for communicating complex architectural decisions to technical and non-technical stakeholders.',
      'Colocation\'s key problem is visible when you map interference points: prefill and decode compete for the same resources at the same time.',
      'Disaggregation\'s key benefit is visual separation: independent pools eliminate interference and enable independent scaling.',
      'KV-cache transfer is the critical interface—a thin, fast data flow that enables the architectural separation.',
      'Professional diagrams become reusable assets: for documentation, presentations, interviews, and portfolio work.',
      'Creating diagrams forces deep understanding: you can\'t draw what you don\'t understand.',
      'This type of visual analysis is exactly what engineering teams do during architecture reviews and RFC processes.'
    ],
    visualUrl: '/00-distserve_anime-crop.gif',
    visualCaption: 'Reference: DistServe\'s animated visualization showing disaggregated architecture in action',
    additionalVisuals: [
      {
        url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        caption: 'Modern GPU clusters: the physical infrastructure underlying disaggregated serving'
      }
    ],
    referenceLinks: [
      {
        title: 'DistServe Retrospective - Architecture Figures',
        url: 'https://hao-ai-lab.github.io/blogs/distserve-retro/'
      },
      {
        title: 'draw.io - Free Diagramming Tool',
        url: 'https://app.diagrams.net/'
      }
    ],
    hasFileUpload: true,
    hasTextInputs: true,
    hasCodeSubmission: false
  },
  {
    id: '2',
    title: 'Discussion Questions: Critical Analysis',
    estimatedTime: '20-30 minutes',
    category: 'discussion',
    introduction: 'Deep understanding comes from wrestling with "why" questions, not just "how" questions. This activity presents three discussion questions that probe the business, technical, and strategic dimensions of disaggregated inference. These aren\'t questions with single "correct" answers—they\'re the kinds of questions debated in engineering meetings, research lab discussions, and architecture reviews at leading AI companies. Question 1 examines adoption dynamics: Why did disaggregation explode in 2025 but face skepticism in 2024? Understanding adoption curves helps you predict which future techniques will succeed. Question 2 explores composability: How does disaggregation enable the flourishing ecosystem of tools (vLLM, SGLang, LMCache)? This reveals architectural principles that transcend LLM serving. Question 3 is a technical debate: Is Attention-FFN disaggregation (next-gen) more viable for Mixture-of-Experts models or dense models? This forward-looking question tests your ability to reason about future innovations. Your thoughtful answers demonstrate critical thinking skills that employers value highly—these are the kinds of discussions that happen in staff engineer interviews and architecture review boards.',
    learningOutcomes: [
      'Analyze adoption dynamics and understand why timing matters for disruptive techniques',
      'Explain how architectural patterns enable ecosystem growth and composability',
      'Reason about future innovations and evaluate their viability across different model types',
      'Develop argumentation skills: making technical claims supported by evidence',
      'Practice writing clear, persuasive technical analysis suitable for RFCs and design docs'
    ],
    priorKnowledge: [
      'Module 3: Detailed understanding of disaggregation architecture',
      'Module 4 Topic 3: Lessons from resistance to rapid adoption',
      'Module 4 Topic 2: Modularity and composability benefits',
      'Module 4 Topic 5: Next-generation disaggregation techniques'
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Read all three questions below carefully. Note which modules/topics are most relevant to each question.',
        tip: 'Question 1 ↔ Module 4 Topic 3, Question 2 ↔ Module 4 Topic 2, Question 3 ↔ Module 4 Topic 5'
      },
      {
        stepNumber: 2,
        instruction: 'For each question, spend 5 minutes reviewing relevant course content before writing. Open Module 4 topics in another tab if helpful.',
        tip: 'Quality over speed: thoughtful answers are more valuable than quick answers.'
      },
      {
        stepNumber: 3,
        instruction: 'Structure your answers: Start with a clear thesis statement, provide 2-3 supporting points with evidence, conclude with implications.',
        tip: 'Aim for 150-250 words per question—enough depth to demonstrate understanding.'
      },
      {
        stepNumber: 4,
        instruction: 'Use specific examples and data from the course: cite metrics (e.g., "2x cost reduction every 18 months"), tools (SGLang, vLLM), or companies (Fireworks, Meta).',
        tip: 'Concrete examples make arguments more convincing than abstract statements.'
      },
      {
        stepNumber: 5,
        instruction: 'For Question 3 (the debate), explicitly state your position and provide counter-arguments you considered.',
        tip: 'Showing you understand both sides demonstrates sophisticated thinking.'
      },
      {
        stepNumber: 6,
        instruction: 'After writing, read your answers aloud. Do they sound clear and logical? Edit for clarity.',
        tip: 'Reading aloud catches awkward phrasing and logical gaps.'
      },
      {
        stepNumber: 7,
        instruction: 'Optional: If working with peers, consider sharing answers and discussing differences in reasoning.',
        tip: 'Discussion deepens understanding—consider posting in course forums if available.'
      }
    ],
    reflectionPrompts: [
      {
        question: 'Question 1: Why did disaggregation gain widespread traction in 2025 but not earlier (2023-2024)? Discuss both technical factors (e.g., infrastructure maturity, tool support) and business factors (e.g., scale pressures, cost concerns, competitive dynamics).',
        placeholder: 'Consider: deployment scales, cost pressures, infrastructure maturity, competitive landscape, open-source ecosystem development, and the "tipping point" where pain exceeded complexity...'
      },
      {
        question: 'Question 2: How does disaggregation support a composable, modular architecture for LLM serving? Give specific examples from frameworks (vLLM, SGLang, NVIDIA Dynamo), storage systems (LMCache, MoonCake), or scheduling innovations. What makes this composability valuable for the ecosystem?',
        placeholder: 'Think about: clean interfaces (KV-cache transfer), independent optimization, ecosystem growth, mixing components, innovation velocity, and the microservices parallel...'
      },
      {
        question: 'Question 3 (Debate): Attention-FFN (A-F) disaggregation is the next frontier, separating memory-bound Attention from compute-bound FFN layers. Do you think A-F disaggregation is more viable for Mixture-of-Experts (MoE) models or dense models, and why? Consider: routing complexity, load balancing, expert activation patterns, memory footprints, and transfer overhead.',
        placeholder: 'State your position clearly and support it with reasoning. Consider counter-arguments: Why might the opposite be true? What evidence would change your mind?...'
      }
    ],
    keyTakeaways: [
      'Adoption timing matters: Disruptive techniques gain traction when the pain they solve exceeds their complexity cost.',
      'Scale changes everything: What seemed unnecessary at 500 GPUs becomes essential at 5,000 GPUs.',
      'Composability emerges from clean interfaces: The KV-cache transfer boundary enables independent ecosystem innovation.',
      'Ecosystem effects are powerful: Open-source tools (SGLang, vLLM) accelerated adoption far beyond what proprietary solutions could achieve.',
      'Future techniques (A-F disaggregation) should be evaluated through the lens of existing patterns: What\'s the interface? What pain does it solve?',
      'Model architecture (MoE vs. dense) significantly impacts which optimizations work: no one-size-fits-all solution.',
      'Technical argumentation is a skill: Clear thesis, supporting evidence, addressing counter-arguments—essential for senior roles.'
    ],
    visualUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    visualCaption: 'Critical discussion and analysis: essential skills for architecture decisions',
    referenceLinks: [
      {
        title: 'DistServe Retrospective - Adoption Timeline',
        url: 'https://hao-ai-lab.github.io/blogs/distserve-retro/'
      },
      {
        title: 'SGLang - Fast Serving Framework',
        url: 'https://github.com/sgl-project/sglang'
      },
      {
        title: 'vLLM - Efficient Inference Engine',
        url: 'https://github.com/vllm-project/vllm'
      }
    ],
    hasFileUpload: false,
    hasTextInputs: true,
    hasCodeSubmission: false
  },
  {
    id: '3',
    title: 'Practical Exercise: Simulate Scaling Scenarios',
    estimatedTime: '45-60 minutes',
    category: 'exercise',
    introduction: 'Nothing beats hands-on experience for truly understanding system behavior. In this practical exercise, you\'ll write simple Python code to simulate how colocated vs. disaggregated serving responds to realistic workload patterns. You don\'t need to implement actual LLM inference—instead, you\'ll model the key characteristics: bursty prefill arrivals (think "viral tweet causes 100x traffic spike"), steady decode processing (autoregressive token generation), and compute/memory bottlenecks. Your simulation will calculate mock TTFT (Time-to-First-Token) and TPOT (Time-Per-Output-Token) under both architectures, revealing how disaggregation stabilizes latency variance. This mirrors what MLOps teams do when evaluating infrastructure changes: build simple models to predict behavior before committing to expensive rewrites. You\'ll see firsthand why P99 latency explodes in colocated systems under load, and how separate pools eliminate that variance. By the end, you\'ll have runnable code demonstrating disaggregation\'s benefits—a tangible artifact for technical interviews or portfolio projects. Even if you\'re not a Python expert, the starter code below provides the structure; you\'ll modify parameters and observe how behavior changes.',
    learningOutcomes: [
      'Model realistic LLM serving workloads: bursty prefill, steady decode',
      'Simulate interference effects in colocated systems',
      'Demonstrate latency variance reduction through disaggregation',
      'Practice performance analysis: calculating P50, P99, variance metrics',
      'Develop intuition for queue dynamics and resource contention'
    ],
    priorKnowledge: [
      'Module 2: Prefill (compute-bound) vs. Decode (memory-bound) characteristics',
      'Module 3: Disaggregation architecture and interference elimination',
      'Module 4 Topic 4: TTFT/TPOT metrics and variance stabilization',
      'Basic Python/programming (arrays, loops, random numbers)'
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Set up your environment: Open a Python notebook (Jupyter, Colab, or local Python file) or use a simple online Python editor.',
        tip: 'Google Colab is free and requires no setup: colab.research.google.com'
      },
      {
        stepNumber: 2,
        instruction: 'Copy the starter code below into your environment. Read through it to understand the structure: request generation, queue simulation, metrics calculation.',
        tip: 'The starter code uses NumPy for arrays and randomness—install with: pip install numpy'
      },
      {
        stepNumber: 3,
        instruction: 'Run the starter code as-is to see baseline behavior. Observe TTFT/TPOT distributions for colocation vs. disaggregation.',
        tip: 'Expected: Colocation shows high variance (P99/P50 ratio ~5-10x), disaggregation is stable (~1.2-1.5x)'
      },
      {
        stepNumber: 4,
        instruction: 'Experiment 1: Increase burst intensity. Change BURST_SIZE from 10 to 50. How does colocation degrade? Does disaggregation remain stable?',
        tip: 'This simulates viral traffic spikes or batch processing jobs hitting your API.'
      },
      {
        stepNumber: 5,
        instruction: 'Experiment 2: Change resource ratios. In disaggregation, try PREFILL_GPUS=2, DECODE_GPUS=8 (decode-heavy). Observe TPOT improvement.',
        tip: 'This demonstrates independent scaling: optimize for your actual workload mix.'
      },
      {
        stepNumber: 6,
        instruction: 'Experiment 3: Model KV-cache transfer overhead. Add a small constant (1-5ms) to disaggregated TTFT. Does it still win? What\'s the break-even point?',
        tip: 'Real-world disaggregation has transfer overhead, but it\'s negligible compared to interference.'
      },
      {
        stepNumber: 7,
        instruction: 'Calculate variance reduction: Compute the ratio of (Colocated P99 - Colocated P50) / (Disaggregated P99 - Disaggregated P50). How much did disaggregation reduce variance?',
        tip: 'Typical result: 5-10x variance reduction. This is why SLAs become possible.'
      },
      {
        stepNumber: 8,
        instruction: 'Create a simple visualization: Plot TTFT distributions as histograms for both architectures. Visual comparison is powerful.',
        tip: 'Use matplotlib.pyplot.hist() or even text-based histograms if you prefer.'
      },
      {
        stepNumber: 9,
        instruction: 'Document your findings: Write a summary (150-250 words) describing what you observed, which experiments were most revealing, and how this confirms course concepts.',
        tip: 'This summary is great for including in project portfolios or interview discussions.'
      },
      {
        stepNumber: 10,
        instruction: 'Submit your code and results: Upload your Python file (.py or .ipynb) or paste your code below. Include your observations summary.',
        tip: 'Even rough, exploratory code is valuable—it shows you can translate concepts into working prototypes.'
      }
    ],
    reflectionPrompts: [
      {
        question: 'How much variance reduction did you observe in disaggregation vs. colocation? Quantify it (e.g., "P99 latency 5x lower") and explain what this means for user experience.',
        placeholder: 'Be specific with numbers from your simulation results...'
      },
      {
        question: 'If you were an MLOps engineer presenting these simulation results to your team, what would be your key argument for adopting disaggregation? What concerns might stakeholders raise?',
        placeholder: 'Think about: implementation complexity, migration risk, cost of transfer overhead, operational burden...'
      },
      {
        question: 'What limitations does your simple simulation have compared to real-world LLM serving? What factors did you not model?',
        placeholder: 'Consider: network latency, GPU memory limits, batch scheduling, request heterogeneity, hardware failures...'
      }
    ],
    keyTakeaways: [
      'Simple simulations provide powerful intuition: even 50 lines of Python can demonstrate fundamental system behavior.',
      'Colocation\'s fatal flaw is visible in simulation: interference creates unbounded latency variance under load.',
      'Disaggregation\'s latency stability isn\'t theoretical—it emerges naturally from resource separation.',
      'P99 vs. P50 ratio is the key metric: colocated systems show 5-10x gaps, disaggregated systems show 1.2-1.5x.',
      'Independent scaling has huge economic impact: you can see it by varying PREFILL_GPUS and DECODE_GPUS.',
      'KV-cache transfer overhead (1-5ms) is negligible compared to interference costs (hundreds to thousands of ms).',
      'Simulation-driven decision-making is standard practice: prototype behavior before expensive production changes.'
    ],
    visualUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    visualCaption: 'Data-driven performance analysis: the foundation of infrastructure decisions',
    additionalVisuals: [
      {
        url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80',
        caption: 'Simulation and modeling: essential tools for understanding system behavior at scale'
      }
    ],
    codeSnippet: {
      language: 'python',
      code: `import numpy as np
import time

# Configuration
NUM_REQUESTS = 1000
PREFILL_TIME_MS = 50  # Compute-bound, varies with prompt length
DECODE_TIME_PER_TOKEN_MS = 25  # Memory-bound, consistent
OUTPUT_LENGTH = 50  # tokens per response
BURST_SIZE = 10  # How many requests arrive simultaneously
BURST_PROBABILITY = 0.1  # 10% of request batches are bursts

# Colocation: Prefill and decode share GPU pool
COLOCATED_GPUS = 8

# Disaggregation: Separate pools
PREFILL_GPUS = 3
DECODE_GPUS = 5

def simulate_colocation():
    """Simulate colocated serving: prefill and decode compete."""
    ttft_list = []
    tpot_list = []

    active_prefill = 0
    active_decode = 0

    for i in range(NUM_REQUESTS):
        # Burst arrival
        is_burst = np.random.rand() < BURST_PROBABILITY
        concurrent_requests = BURST_SIZE if is_burst else 1

        # Calculate interference
        gpu_load = active_prefill + active_decode
        interference_factor = 1.0 + (gpu_load / COLOCATED_GPUS) * 2.0  # Degrades with load

        # TTFT: Prefill time with interference
        ttft = PREFILL_TIME_MS * interference_factor
        ttft_list.append(ttft)

        # TPOT: Decode time with interference
        tpot = DECODE_TIME_PER_TOKEN_MS * interference_factor
        tpot_list.append(tpot)

        # Update active counters (simplified)
        active_prefill = min(concurrent_requests, COLOCATED_GPUS)
        active_decode = max(0, gpu_load - 2)  # Decode finishes gradually

    return np.array(ttft_list), np.array(tpot_list)

def simulate_disaggregation():
    """Simulate disaggregated serving: separate prefill/decode pools."""
    ttft_list = []
    tpot_list = []

    active_prefill = 0
    active_decode = 0

    for i in range(NUM_REQUESTS):
        # Burst arrival (same pattern)
        is_burst = np.random.rand() < BURST_PROBABILITY
        concurrent_requests = BURST_SIZE if is_burst else 1

        # Prefill pool: Independent, minimal interference
        prefill_load = active_prefill / PREFILL_GPUS
        prefill_factor = 1.0 + prefill_load * 0.1  # Much less interference
        ttft = PREFILL_TIME_MS * prefill_factor
        ttft_list.append(ttft)

        # Decode pool: Independent, minimal interference
        decode_load = active_decode / DECODE_GPUS
        decode_factor = 1.0 + decode_load * 0.1
        tpot = DECODE_TIME_PER_TOKEN_MS * decode_factor
        tpot_list.append(tpot)

        # Update counters
        active_prefill = min(concurrent_requests, PREFILL_GPUS)
        active_decode = max(0, i % DECODE_GPUS)

    return np.array(ttft_list), np.array(tpot_list)

# Run simulations
print("Simulating Colocated Serving...")
col_ttft, col_tpot = simulate_colocation()

print("Simulating Disaggregated Serving...")
dis_ttft, dis_tpot = simulate_disaggregation()

# Calculate metrics
print("\\n=== TTFT Metrics (Time-to-First-Token) ===")
print(f"Colocation:     P50={np.median(col_ttft):.1f}ms, P99={np.percentile(col_ttft, 99):.1f}ms, Variance={np.var(col_ttft):.1f}")
print(f"Disaggregation: P50={np.median(dis_ttft):.1f}ms, P99={np.percentile(dis_ttft, 99):.1f}ms, Variance={np.var(dis_ttft):.1f}")
print(f"P99/P50 Ratio - Colocation: {np.percentile(col_ttft, 99)/np.median(col_ttft):.2f}x, Disaggregation: {np.percentile(dis_ttft, 99)/np.median(dis_ttft):.2f}x")

print("\\n=== TPOT Metrics (Time-Per-Output-Token) ===")
print(f"Colocation:     P50={np.median(col_tpot):.1f}ms, P99={np.percentile(col_tpot, 99):.1f}ms")
print(f"Disaggregation: P50={np.median(dis_tpot):.1f}ms, P99={np.percentile(dis_tpot, 99):.1f}ms")

print("\\n=== Variance Reduction ===")
variance_reduction = (np.var(col_ttft) / np.var(dis_ttft))
print(f"TTFT Variance Reduction: {variance_reduction:.2f}x")
print("\\nDisaggregation stabilizes latency dramatically!")`,
      description: 'Starter code: Simulates colocation vs. disaggregation workloads, calculates TTFT/TPOT metrics'
    },
    referenceLinks: [
      {
        title: 'DistServe Retrospective - Performance Data',
        url: 'https://hao-ai-lab.github.io/blogs/distserve-retro/'
      },
      {
        title: 'Google Colab - Free Python Notebooks',
        url: 'https://colab.research.google.com/'
      }
    ],
    hasFileUpload: true,
    hasTextInputs: true,
    hasCodeSubmission: true
  },
  {
    id: '4',
    title: 'Case Study Analysis: DeepSeek-R1 Benchmarks',
    estimatedTime: '30 minutes',
    category: 'case-study',
    introduction: 'Real-world performance data transforms abstract concepts into concrete business decisions. In this case study, you\'ll analyze actual benchmark results from DeepSeek-R1 running on disaggregated infrastructure: 52,300 input tokens/second on 96 H100 GPUs. These aren\'t hypothetical numbers—they represent production-grade performance from one of the leading open-source LLM serving implementations. Your task is to perform the kind of analysis that engineering managers and CFOs do when evaluating infrastructure investments: calculate cost savings, determine ROI (return on investment), estimate scaling requirements, and quantify the business impact of disaggregation. You\'ll assume disaggregation reduces over-provisioning by 20-30% (conservative, based on industry reports) and calculate dollar savings at typical GPU rental rates (~$5/hour for H100). This activity builds financial literacy around infrastructure decisions—a skill that distinguishes senior engineers from junior engineers. By the end, you\'ll understand not just "disaggregation improves performance" but "disaggregation saves $X per month, pays for itself in Y weeks, and enables Z business outcomes." These are the metrics that get budget approval and drive adoption.',
    learningOutcomes: [
      'Analyze real-world benchmark data from production systems',
      'Calculate infrastructure cost savings from disaggregation',
      'Quantify ROI and break-even timelines for architectural changes',
      'Translate technical improvements into business metrics (cost, revenue, time-to-market)',
      'Develop financial literacy for infrastructure decision-making'
    ],
    priorKnowledge: [
      'Module 3: Understanding of disaggregation architecture',
      'Module 4 Topic 4: Cost optimization and business value',
      'Module 4 Topic 5: Real-world implementations (DeepSeek)',
      'Basic arithmetic and percentage calculations'
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Review the benchmark data: DeepSeek-R1 achieves 52,300 input tokens/sec on 96 H100 GPUs using disaggregated serving.',
        tip: 'This is the baseline: what performance looks like WITH disaggregation.'
      },
      {
        stepNumber: 2,
        instruction: 'Estimate colocated performance: Without disaggregation, assume you\'d need 20-30% more GPUs to achieve the same throughput due to interference and over-provisioning.',
        tip: 'Conservative estimate: 25% overhead = 96 GPUs * 1.25 = 120 GPUs needed for colocated serving.'
      },
      {
        stepNumber: 3,
        instruction: 'Calculate GPU count difference: Disaggregated (96 GPUs) vs. Colocated (120 GPUs) = 24 fewer GPUs needed.',
        tip: 'This is the hardware efficiency gain from eliminating interference and enabling right-sizing.'
      },
      {
        stepNumber: 4,
        instruction: 'Determine hourly cost per GPU: Assume $5/hour for H100 rentals (typical cloud pricing as of 2025).',
        tip: 'Real prices vary by provider: AWS $4-6/hr, GCP $4-5/hr, specialized inference providers $3-4/hr.'
      },
      {
        stepNumber: 5,
        instruction: 'Calculate hourly savings: 24 GPUs * $5/hour = $120/hour saved with disaggregation.',
        tip: 'Small per-hour numbers add up: $120/hour * 24 hours * 30 days = $86,400/month!'
      },
      {
        stepNumber: 6,
        instruction: 'Estimate monthly and annual savings: $120/hour * 730 hours/month = $87,600/month, or ~$1.05M/year.',
        tip: 'At scale, disaggregation savings exceed many engineers\' annual salaries—huge impact.'
      },
      {
        stepNumber: 7,
        instruction: 'Factor in implementation cost: Assume migrating to disaggregation requires 2 engineers * 3 months * $200K salary = ~$100K one-time cost.',
        tip: 'Be realistic: include engineering time, testing, potential downtime/risk.'
      },
      {
        stepNumber: 8,
        instruction: 'Calculate break-even time: $100K implementation cost / $87,600 monthly savings = 1.14 months to break even.',
        tip: 'Most infrastructure improvements take 6-12 months to pay off; 1 month is exceptional.'
      },
      {
        stepNumber: 9,
        instruction: 'Consider additional benefits beyond cost: improved latency stability enables SLAs, competitive differentiation, customer satisfaction. How do you quantify these?',
        tip: 'Hint: If stable latency reduces churn by even 1%, calculate (annual revenue * 0.01) as additional value.'
      },
      {
        stepNumber: 10,
        instruction: 'Write your analysis summary: Present the financial case for disaggregation as if pitching to a CFO or engineering director. Include: costs, savings, ROI, risks, timeline.',
        tip: 'Use clear structure: Executive Summary (1 paragraph), Financial Analysis (numbers), Risks & Mitigations, Recommendation.'
      }
    ],
    reflectionPrompts: [
      {
        question: 'Based on your calculations, what is the monthly cost savings from disaggregation for the DeepSeek-R1 deployment (96 vs. 120 GPUs)? Show your math.',
        placeholder: 'Walk through: GPU difference, hourly cost, hours per month, total savings...'
      },
      {
        question: 'How long does it take for disaggregation to "pay for itself" given implementation costs? Is this a good ROI compared to other infrastructure investments?',
        placeholder: 'Calculate break-even period. Compare to: hardware upgrades (0 ROI until next gen), software licenses (ongoing cost), team expansion (3-6 month ramp)...'
      },
      {
        question: 'Beyond direct cost savings, what other business value does disaggregation provide? How would you quantify "stable latency" or "faster time-to-market" in dollar terms?',
        placeholder: 'Think about: SLA compliance (avoid penalties), customer retention (churn reduction), competitive advantage (capture market share faster), developer productivity (less firefighting)...'
      }
    ],
    keyTakeaways: [
      'Real-world data (DeepSeek: 52.3k tokens/sec on 96 GPUs) makes the case concrete, not abstract.',
      'Disaggregation reduces GPU needs by 20-30% for equivalent performance—direct cost savings.',
      'At scale, savings are enormous: $87K/month for a 96-GPU deployment, over $1M/year.',
      'Break-even time is exceptionally fast: ~1 month for typical implementations.',
      'Financial literacy matters: Senior engineers quantify business impact, not just technical improvements.',
      'Beyond cost: Stable latency enables SLAs, reduces churn, and creates competitive differentiation.',
      'This analysis structure (baseline → improvement → cost → ROI → risks) applies to any infrastructure decision.'
    ],
    visualUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    visualCaption: 'Financial analysis: translating technical improvements into business value',
    additionalVisuals: [
      {
        url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
        caption: 'Cost optimization at scale: disaggregation delivers measurable ROI'
      }
    ],
    referenceLinks: [
      {
        title: 'DistServe Retrospective - Benchmark Data',
        url: 'https://hao-ai-lab.github.io/blogs/distserve-retro/'
      },
      {
        title: 'DeepSeek-R1 - Open-Source LLM Serving',
        url: 'https://github.com/deepseek-ai/DeepSeek-R1'
      }
    ],
    hasFileUpload: false,
    hasTextInputs: true,
    hasCodeSubmission: false
  },
  {
    id: '5',
    title: 'Research Extension: Explore Advanced Techniques',
    estimatedTime: '60 minutes',
    category: 'research',
    introduction: 'True expertise comes from understanding not just current techniques, but the research frontier that will become tomorrow\'s production systems. This advanced activity challenges you to explore cutting-edge papers and tools that extend disaggregation: Splitwise (multi-stage pipelines optimizing different model layers), CacheGen (intelligent KV-cache compression to reduce transfer overhead), TetriInfer (sophisticated scheduling algorithms for heterogeneous workloads), or other recent papers from conferences like MLSys, OSDI, or arXiv. Your task is twofold: First, deeply understand one of these techniques through careful reading and note-taking. Second, propose how it could extend or improve DistServe specifically—what problem does it address that DistServe doesn\'t? What new capabilities would it enable? This mirrors the research process at AI labs: scan literature, identify promising ideas, evaluate feasibility, propose concrete extensions. While optional/advanced, this activity demonstrates intellectual curiosity and research skills highly valued for roles at cutting-edge companies (OpenAI, Anthropic, leading research universities). Even if you don\'t implement anything, the exercise of reading research, critiquing it, and proposing extensions builds the mindset of a systems researcher.',
    learningOutcomes: [
      'Read and comprehend cutting-edge research papers in LLM serving',
      'Identify research gaps and opportunities for extension',
      'Propose concrete improvements to existing systems (DistServe)',
      'Develop critical evaluation skills: assessing feasibility, impact, trade-offs',
      'Practice technical writing: summarizing research and articulating proposals'
    ],
    priorKnowledge: [
      'Modules 2-4: Complete understanding of disaggregated inference',
      'Comfort reading technical papers (abstracts, figures, methodology)',
      'Familiarity with academic research process (literature review, problem identification)',
      'Advanced: Understanding of distributed systems, scheduling algorithms, compression techniques'
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Choose a research direction: Splitwise (pipeline parallelism), CacheGen (KV-cache compression), TetriInfer (advanced scheduling), or find a recent paper on arXiv/MLSys related to LLM serving.',
        tip: 'Start with abstracts: Which problem sounds most interesting or impactful to you?'
      },
      {
        stepNumber: 2,
        instruction: 'Locate and download the paper: Search on arXiv.org, Google Scholar, or conference proceedings (MLSys, OSDI, SOSP).',
        tip: 'Recommended: Splitwise (ICML 2024), CacheGen (arXiv), TetriInfer (MLSys 2024).'
      },
      {
        stepNumber: 3,
        instruction: 'First pass (15 min): Read abstract, introduction, and conclusion. Skim figures. What is the core idea? What problem does it solve?',
        tip: 'Don\'t get stuck on dense math or implementation details yet—understand the big picture first.'
      },
      {
        stepNumber: 4,
        instruction: 'Second pass (20 min): Read methodology and key results sections carefully. Take notes on: technique overview, performance gains, limitations mentioned by authors.',
        tip: 'Pay attention to figures and tables: they often convey core insights more clearly than text.'
      },
      {
        stepNumber: 5,
        instruction: 'Critical evaluation (10 min): Ask yourself: What assumptions does this technique make? Would those hold for DistServe? What are unstated limitations?',
        tip: 'Example: If it assumes homogeneous hardware, would it work with mixed GPU types?'
      },
      {
        stepNumber: 6,
        instruction: 'Identify a specific gap or opportunity: How could this technique integrate with DistServe? What new capability would it unlock?',
        tip: 'Example: "CacheGen could reduce KV-cache transfer overhead in DistServe by 2-4x through compression."'
      },
      {
        stepNumber: 7,
        instruction: 'Propose a concrete extension: Write a 1-2 paragraph proposal describing how you would modify DistServe to incorporate this technique. Be specific about architecture changes.',
        tip: 'Good proposals include: what changes (architecture), why (benefit), potential challenges (feasibility).'
      },
      {
        stepNumber: 8,
        instruction: 'Estimate impact: Quantify if possible. E.g., "Expected 2x reduction in transfer overhead, enabling 1.5x higher throughput for long-context workloads."',
        tip: 'Use the paper\'s results as a starting point, adjusted for DistServe\'s specific context.'
      },
      {
        stepNumber: 9,
        instruction: 'Consider implementation complexity: Rate the difficulty (Low/Medium/High) and time estimate (weeks to months). What expertise would be required?',
        tip: 'Be realistic: Research prototypes often require 3-6 months of engineering to production-harden.'
      },
      {
        stepNumber: 10,
        instruction: 'Write your research summary and proposal: Include (1) Paper summary (200 words), (2) Key insights, (3) DistServe extension proposal (300 words), (4) Impact estimate, (5) Implementation challenges.',
        tip: 'This format mirrors RFC (Request for Comments) documents used in engineering orgs.'
      }
    ],
    reflectionPrompts: [
      {
        question: 'Provide a concise summary (200-300 words) of the research paper/tool you explored. What problem does it solve? What is the core technique? What performance gains did authors report?',
        placeholder: 'Include: Paper title, authors, venue/date, problem statement, core innovation, key results...'
      },
      {
        question: 'How would you extend or integrate this technique with DistServe? Be specific: What architectural changes are needed? What new capabilities would it enable? What are the potential benefits and risks?',
        placeholder: 'Structure your proposal: Motivation (why), Design (how), Expected Impact (quantify if possible), Challenges (feasibility concerns), Next Steps (validation/prototyping)...'
      },
      {
        question: 'If you were presenting this extension proposal to the DistServe research team, what would be your strongest argument for why they should pursue it? What counter-arguments would you anticipate?',
        placeholder: 'Think like a researcher: Why is this the next logical step? What evidence supports feasibility? What risks need mitigation?...'
      }
    ],
    keyTakeaways: [
      'Research literacy is essential for staying at the frontier: today\'s papers become tomorrow\'s production systems.',
      'Critical reading involves understanding not just what the paper claims, but its assumptions, limitations, and applicability.',
      'Proposing extensions requires systems thinking: How do new techniques compose with existing architectures?',
      'Impact estimation matters: Quantify benefits (even rough estimates) to prioritize among many possible improvements.',
      'Implementation complexity is real: Research prototypes take months of engineering to production-harden.',
      'Reading papers actively (taking notes, asking questions, proposing extensions) builds deeper understanding than passive reading.',
      'This research process—scan literature, identify opportunities, propose concrete changes—is how cutting-edge systems evolve.'
    ],
    visualUrl: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&q=80',
    visualCaption: 'Research and innovation: understanding the frontier of LLM serving',
    additionalVisuals: [
      {
        url: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800&q=80',
        caption: 'Academic research: the foundation of next-generation production systems'
      }
    ],
    referenceLinks: [
      {
        title: 'arXiv - Latest LLM Serving Research',
        url: 'https://arxiv.org/list/cs.LG/recent'
      },
      {
        title: 'MLSys Conference Papers',
        url: 'https://mlsys.org/'
      },
      {
        title: 'DistServe Retrospective',
        url: 'https://hao-ai-lab.github.io/blogs/distserve-retro/'
      },
      {
        title: 'Google Scholar - LLM Inference Optimization',
        url: 'https://scholar.google.com/scholar?q=llm+inference+optimization'
      }
    ],
    hasFileUpload: false,
    hasTextInputs: true,
    hasCodeSubmission: false
  }
];
