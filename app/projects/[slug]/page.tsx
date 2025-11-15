import { getProjectBySlug, getAllProjects } from '@/lib/projects';
import { Github, ExternalLink } from 'lucide-react';
import { notFound } from 'next/navigation';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return {
    title: `${project.title} - Bill Crandell`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  let project;
  try {
    project = await getProjectBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{project.title}</h1>
        <p className="text-xl text-slate-300 mb-6">{project.description}</p>

        <div className="flex gap-4 mb-6">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-600"
          >
            <Github size={20} />
            View on GitHub
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <ExternalLink size={20} />
              Live Demo
            </a>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-slate-800 text-blue-400 text-sm rounded-full font-mono border border-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div
        className="prose prose-invert prose-slate max-w-none prose-headings:text-white prose-a:text-blue-400 prose-code:text-green-400"
        dangerouslySetInnerHTML={{ __html: project.content }}
      />
    </article>
  );
}
