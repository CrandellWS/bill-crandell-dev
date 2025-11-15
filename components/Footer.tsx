import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-400 text-sm">
          © {new Date().getFullYear()} Bill Crandell. Built with Next.js and AI-speed development.
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/CrandellWS"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <Github size={20} />
            <span className="text-sm">GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
