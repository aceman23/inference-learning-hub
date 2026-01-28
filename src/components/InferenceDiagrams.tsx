import { ArrowRight, Database, Cpu, Clock } from 'lucide-react';

export function PrefillPhaseDiagram() {
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 border-2 border-emerald-200">
      <h4 className="text-center font-bold text-slate-900 mb-6">Prefill Phase: Parallel Token Processing</h4>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="text-center">
            <div className="bg-white rounded-lg p-4 shadow-md border-2 border-emerald-300 mb-2">
              <p className="text-sm font-semibold text-slate-700">Token 1</p>
              <p className="text-xs text-slate-500">Hello</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-lg p-4 shadow-md border-2 border-emerald-300 mb-2">
              <p className="text-sm font-semibold text-slate-700">Token 2</p>
              <p className="text-xs text-slate-500">world</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-lg p-4 shadow-md border-2 border-emerald-300 mb-2">
              <p className="text-sm font-semibold text-slate-700">Token 3</p>
              <p className="text-xs text-slate-500">how</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-lg p-4 shadow-md border-2 border-emerald-300 mb-2">
              <p className="text-sm font-semibold text-slate-700">Token N</p>
              <p className="text-xs text-slate-500">...</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowRight className="w-8 h-8 text-emerald-600" />
        </div>

        <div className="flex items-center justify-center">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl p-6 shadow-lg max-w-md">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Cpu className="w-6 h-6" />
              <p className="font-bold text-lg">Attention Computation</p>
            </div>
            <p className="text-sm text-center">All tokens processed simultaneously in parallel</p>
            <div className="mt-3 bg-white/20 rounded px-3 py-2 text-xs font-mono text-center">
              Q·K<sup>T</sup> → Attention Scores → Softmax → Output
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowRight className="w-8 h-8 text-emerald-600" />
        </div>

        <div className="flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-teal-300 max-w-md">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Database className="w-6 h-6 text-teal-600" />
              <p className="font-bold text-lg text-slate-900">KV-Cache Generated</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="bg-teal-50 rounded p-2 text-center">
                <p className="text-xs font-semibold text-teal-700">Keys (K)</p>
                <p className="text-xs text-slate-600">Context vectors</p>
              </div>
              <div className="bg-teal-50 rounded p-2 text-center">
                <p className="text-xs font-semibold text-teal-700">Values (V)</p>
                <p className="text-xs text-slate-600">Content vectors</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center bg-emerald-100 rounded-lg p-4">
          <p className="text-sm font-semibold text-emerald-900">Result: First Token + Complete KV-Cache</p>
          <p className="text-xs text-slate-600 mt-1">Ready for autoregressive decode phase</p>
        </div>
      </div>
    </div>
  );
}

export function PrefillVsDecodeTimeline() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 border-2 border-slate-200">
      <h4 className="text-center font-bold text-slate-900 mb-6">Prefill vs. Decode: Temporal Pattern</h4>

      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-24 font-semibold text-emerald-700">Prefill</div>
            <div className="text-xs text-slate-600">Bursty, parallel, compute-intensive</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-lg h-16 shadow-lg flex items-center justify-center text-white font-bold text-sm px-4" style={{width: '25%'}}>
              <Clock className="w-4 h-4 mr-2" />
              50-500ms
            </div>
            <div className="h-16 border-2 border-dashed border-slate-300 rounded flex-1 flex items-center justify-center text-slate-400 text-xs">
              Idle (waiting for next request)
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-24 font-semibold text-blue-700">Decode</div>
            <div className="text-xs text-slate-600">Continuous, sequential, memory-bound</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded h-12 shadow flex items-center justify-center text-white text-xs font-semibold" style={{width: '8%'}}>
              T1
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded h-12 shadow flex items-center justify-center text-white text-xs font-semibold" style={{width: '8%'}}>
              T2
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded h-12 shadow flex items-center justify-center text-white text-xs font-semibold" style={{width: '8%'}}>
              T3
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded h-12 shadow flex items-center justify-center text-white text-xs font-semibold" style={{width: '8%'}}>
              T4
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded h-12 shadow flex items-center justify-center text-white text-xs" style={{width: '8%'}}>
              ...
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded h-12 shadow flex items-center justify-center text-white text-xs font-semibold" style={{width: '8%'}}>
              T50
            </div>
            <div className="flex-1 h-12 bg-slate-200 rounded flex items-center justify-center text-slate-500 text-xs">
              Continuous for 1-10 seconds
            </div>
          </div>
          <div className="mt-2 text-xs text-center text-slate-600">
            Each step: 20-50ms × 50-500 tokens = 1-25 seconds total
          </div>
        </div>

        <div className="mt-6 bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-amber-900 mb-2">Key Insight:</p>
          <p className="text-sm text-slate-700">
            Prefill is a short, intense burst. Decode is a long, steady stream. They have completely different resource usage patterns!
          </p>
        </div>
      </div>
    </div>
  );
}

export function KVCacheGrowthVisualization() {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border-2 border-purple-200">
      <h4 className="text-center font-bold text-slate-900 mb-6">KV-Cache Growth During Generation</h4>

      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold text-purple-900 mb-3">After Prefill (100 input tokens):</p>
          <div className="grid grid-cols-10 gap-1">
            {[...Array(100)].map((_, i) => (
              <div key={i} className="aspect-square bg-purple-400 rounded-sm"></div>
            ))}
          </div>
          <p className="text-xs text-slate-600 mt-2 text-center">100 tokens cached (Keys + Values)</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-pink-900 mb-3">After 50 Decode Steps:</p>
          <div className="grid grid-cols-10 gap-1">
            {[...Array(100)].map((_, i) => (
              <div key={i} className="aspect-square bg-purple-400 rounded-sm"></div>
            ))}
            {[...Array(50)].map((_, i) => (
              <div key={i} className="aspect-square bg-pink-400 rounded-sm"></div>
            ))}
          </div>
          <p className="text-xs text-slate-600 mt-2 text-center">150 tokens cached (growing with each decode step)</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-rose-900 mb-3">After 200 Decode Steps:</p>
          <div className="grid grid-cols-10 gap-1">
            {[...Array(100)].map((_, i) => (
              <div key={i} className="aspect-square bg-purple-400 rounded-sm"></div>
            ))}
            {[...Array(50)].map((_, i) => (
              <div key={i} className="aspect-square bg-pink-400 rounded-sm"></div>
            ))}
            {[...Array(150)].map((_, i) => (
              <div key={i} className="aspect-square bg-rose-400 rounded-sm"></div>
            ))}
          </div>
          <p className="text-xs text-slate-600 mt-2 text-center">300 tokens cached (memory usage grows linearly)</p>
        </div>

        <div className="bg-purple-100 border-2 border-purple-300 rounded-lg p-4 mt-4">
          <p className="text-sm font-semibold text-purple-900 mb-2">Memory Impact:</p>
          <div className="space-y-1 text-sm text-slate-700">
            <p>• Cache size grows with every generated token</p>
            <p>• For long outputs (500+ tokens), cache becomes several GB</p>
            <p>• Decode must fetch this entire cache from memory each step</p>
            <p>• This is why Decode is memory-bandwidth limited!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ComputeVsMemoryBound() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 border-2 border-slate-300">
      <h4 className="text-center font-bold text-slate-900 mb-6">Compute-Bound vs. Memory-Bound</h4>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 border-2 border-emerald-300 shadow-lg">
          <div className="text-center mb-4">
            <div className="inline-block bg-emerald-100 rounded-full p-3 mb-2">
              <Cpu className="w-8 h-8 text-emerald-600" />
            </div>
            <h5 className="font-bold text-emerald-900 text-lg">Prefill: Compute-Bound</h5>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-slate-600 mb-1">GPU Compute Utilization</p>
              <div className="w-full bg-slate-200 rounded-full h-6">
                <div className="bg-emerald-600 h-6 rounded-full flex items-center justify-end pr-2" style={{width: '85%'}}>
                  <span className="text-xs font-bold text-white">85%</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-600 mb-1">Memory Bandwidth Usage</p>
              <div className="w-full bg-slate-200 rounded-full h-6">
                <div className="bg-slate-400 h-6 rounded-full flex items-center justify-end pr-2" style={{width: '35%'}}>
                  <span className="text-xs font-bold text-white">35%</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-emerald-50 rounded">
              <p className="text-xs text-slate-700">
                <span className="font-semibold">Bottleneck:</span> GPU compute (TFLOPS)
              </p>
              <p className="text-xs text-slate-700 mt-1">
                <span className="font-semibold">Best Hardware:</span> High-TFLOPS GPUs (H100, A100)
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border-2 border-blue-300 shadow-lg">
          <div className="text-center mb-4">
            <div className="inline-block bg-blue-100 rounded-full p-3 mb-2">
              <Database className="w-8 h-8 text-blue-600" />
            </div>
            <h5 className="font-bold text-blue-900 text-lg">Decode: Memory-Bound</h5>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-slate-600 mb-1">GPU Compute Utilization</p>
              <div className="w-full bg-slate-200 rounded-full h-6">
                <div className="bg-slate-400 h-6 rounded-full flex items-center justify-end pr-2" style={{width: '25%'}}>
                  <span className="text-xs font-bold text-white">25%</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-600 mb-1">Memory Bandwidth Usage</p>
              <div className="w-full bg-slate-200 rounded-full h-6">
                <div className="bg-blue-600 h-6 rounded-full flex items-center justify-end pr-2" style={{width: '90%'}}>
                  <span className="text-xs font-bold text-white">90%</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded">
              <p className="text-xs text-slate-700">
                <span className="font-semibold">Bottleneck:</span> Memory bandwidth (GB/s)
              </p>
              <p className="text-xs text-slate-700 mt-1">
                <span className="font-semibold">Best Hardware:</span> High-bandwidth memory GPUs
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
        <p className="text-sm font-semibold text-amber-900 mb-2">Why This Matters for Disaggregation:</p>
        <p className="text-sm text-slate-700">
          Since Prefill and Decode need different types of hardware, running them on the same GPUs wastes resources.
          Disaggregation allows each phase to use hardware optimized for its specific bottleneck.
        </p>
      </div>
    </div>
  );
}

export function ColocationInterference() {
  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8 border-2 border-red-200">
      <h4 className="text-center font-bold text-slate-900 mb-6">Resource Interference in Colocation</h4>

      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-3">Scenario: Shared GPU Pool</p>
          <div className="bg-white rounded-lg p-4 border-2 border-slate-300">
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-emerald-500 text-white rounded p-3 text-center text-xs font-semibold">
                Prefill
              </div>
              <div className="bg-blue-500 text-white rounded p-3 text-center text-xs font-semibold">
                Decode
              </div>
              <div className="bg-blue-500 text-white rounded p-3 text-center text-xs font-semibold">
                Decode
              </div>
              <div className="bg-blue-500 text-white rounded p-3 text-center text-xs font-semibold">
                Decode
              </div>
            </div>
            <p className="text-xs text-center text-slate-600 mt-2">GPU working normally</p>
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowRight className="w-6 h-6 text-red-600" />
        </div>

        <div>
          <p className="text-sm font-semibold text-red-700 mb-3">Burst of Prefill Requests Arrives!</p>
          <div className="bg-white rounded-lg p-4 border-2 border-red-400">
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-emerald-600 text-white rounded p-3 text-center text-xs font-bold border-4 border-yellow-400">
                Prefill
              </div>
              <div className="bg-emerald-600 text-white rounded p-3 text-center text-xs font-bold border-4 border-yellow-400">
                Prefill
              </div>
              <div className="bg-emerald-600 text-white rounded p-3 text-center text-xs font-bold border-4 border-yellow-400">
                Prefill
              </div>
              <div className="bg-blue-300 text-slate-600 rounded p-3 text-center text-xs line-through">
                Decode
              </div>
            </div>
            <p className="text-xs text-center text-red-700 mt-2 font-semibold">Decode requests starved! TPOT spikes 3-5x</p>
          </div>
        </div>

        <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4">
          <p className="text-sm font-semibold text-red-900 mb-2">Impact:</p>
          <ul className="space-y-1 text-sm text-slate-700">
            <li>• TPOT increases from 30ms to 100ms+</li>
            <li>• Users experience stuttering output</li>
            <li>• Response times become unpredictable</li>
            <li>• P99 latency spikes dramatically</li>
          </ul>
        </div>

        <div className="flex justify-center">
          <ArrowRight className="w-6 h-6 text-green-600" />
        </div>

        <div>
          <p className="text-sm font-semibold text-green-700 mb-3">Solution: Disaggregated Architecture</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border-2 border-emerald-400">
              <p className="text-xs font-semibold text-center mb-2 text-emerald-900">Prefill GPUs</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-emerald-500 text-white rounded p-2 text-center text-xs">Prefill</div>
                <div className="bg-emerald-500 text-white rounded p-2 text-center text-xs">Prefill</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border-2 border-blue-400">
              <p className="text-xs font-semibold text-center mb-2 text-blue-900">Decode GPUs</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-500 text-white rounded p-2 text-center text-xs">Decode</div>
                <div className="bg-blue-500 text-white rounded p-2 text-center text-xs">Decode</div>
              </div>
            </div>
          </div>
          <p className="text-xs text-center text-green-700 mt-3 font-semibold">No interference! Stable, predictable latency</p>
        </div>
      </div>
    </div>
  );
}
