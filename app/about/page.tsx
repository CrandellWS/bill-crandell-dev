import { Github } from 'lucide-react';

export const metadata = {
  title: 'About - Bill Crandell',
  description: 'Full-stack developer focused on AI-assisted development and parallel execution patterns.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">About Me</h1>

      <div className="prose prose-invert prose-slate max-w-none prose-headings:text-white prose-a:text-blue-400">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">Who I Am</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-4">
            Full-stack developer focused on AI-assisted development and parallel execution patterns.
            I specialize in building modern web applications with Next.js, React, and TypeScript,
            leveraging AI tools to achieve unprecedented development velocity.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">Expertise</h2>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start">
              <span className="text-blue-400 mr-3 mt-1">▸</span>
              <span><strong>Next.js / React / TypeScript</strong> - Building production-ready web applications with modern tooling</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-3 mt-1">▸</span>
              <span><strong>AI-Speed Development</strong> - 70% faster through parallel orchestration and intelligent team delegation</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-3 mt-1">▸</span>
              <span><strong>Canvas Rendering & Animations</strong> - High-performance graphics and smooth visual effects</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-3 mt-1">▸</span>
              <span><strong>State Management</strong> - Zustand, Redux, and other modern state solutions</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-3 mt-1">▸</span>
              <span><strong>GitHub Pages Deployment</strong> - Static site generation and CI/CD workflows</span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">Current Projects</h2>
          <div className="space-y-4">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-2">GameWheel</h3>
              <p className="text-slate-300 mb-3">
                Advanced random selection spinner with multiple game modes, visual effects, and chat integration.
                Features include First Win, Last Remaining, and Full Tilt ladder climb modes.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-2 py-1 bg-slate-900 text-blue-400 text-xs rounded font-mono">Next.js 14</span>
                <span className="px-2 py-1 bg-slate-900 text-blue-400 text-xs rounded font-mono">TypeScript</span>
                <span className="px-2 py-1 bg-slate-900 text-blue-400 text-xs rounded font-mono">Canvas API</span>
                <span className="px-2 py-1 bg-slate-900 text-blue-400 text-xs rounded font-mono">Zustand</span>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-2">Multi-Team Orchestrator</h3>
              <p className="text-slate-300 mb-3">
                Parallel AI development system that coordinates multiple specialized teams simultaneously.
                Achieves 70% time savings through intelligent work distribution and wave-based execution.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-2 py-1 bg-slate-900 text-blue-400 text-xs rounded font-mono">AI Orchestration</span>
                <span className="px-2 py-1 bg-slate-900 text-blue-400 text-xs rounded font-mono">Parallel Execution</span>
                <span className="px-2 py-1 bg-slate-900 text-blue-400 text-xs rounded font-mono">Agent Engineering</span>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-2">Daily Growth Tracker</h3>
              <p className="text-slate-300 mb-3">
                Personal development system with ChannelLog multi-stream progress tracking across 6 life channels.
                Combines daily logging, habit tracking, and goal management with pattern recognition.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-2 py-1 bg-slate-900 text-blue-400 text-xs rounded font-mono">Markdown</span>
                <span className="px-2 py-1 bg-slate-900 text-blue-400 text-xs rounded font-mono">Pattern Recognition</span>
                <span className="px-2 py-1 bg-slate-900 text-blue-400 text-xs rounded font-mono">Semantic Versioning</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">Development Philosophy</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-4">
            I believe in <strong className="text-white">parallelism at every level</strong> - from code architecture
            to team coordination to life management. When you think in streams and orchestrate work intelligently,
            you unlock exponential productivity gains.
          </p>
          <p className="text-slate-300 text-lg leading-relaxed">
            My approach combines traditional software engineering best practices with cutting-edge AI assistance,
            creating a development methodology that's both fast and high-quality. The result? Same-day conception
            to production deployments with zero TypeScript errors and comprehensive documentation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-white">Get in Touch</h2>
          <div className="flex gap-4">
            <a
              href="https://github.com/CrandellWS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-600"
            >
              <Github size={20} />
              GitHub
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
