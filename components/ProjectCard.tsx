import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';
import type { ProjectMetadata } from '@/lib/projects';

interface ProjectCardProps {
  project: ProjectMetadata;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/20">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">
          <Link href={`/projects/${project.slug}`} className="hover:text-blue-400 transition-colors">
            {project.title}
          </Link>
        </h3>

        <div className="flex gap-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="View on GitHub"
          >
            <Github size={20} />
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="View live demo"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>

      <p className="text-slate-300 mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-slate-700 text-blue-400 text-sm rounded-full font-mono"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
