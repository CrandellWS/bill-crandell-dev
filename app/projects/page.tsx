import { getAllProjects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';

export const metadata = {
  title: 'Projects - Bill Crandell',
  description: 'Explore my portfolio of projects built with modern web technologies and AI-assisted development.',
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Projects</h1>
        <p className="text-xl text-slate-300 max-w-2xl">
          A showcase of projects built with Next.js, TypeScript, and AI-speed development techniques.
        </p>
      </div>

      {projects.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">No projects yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
