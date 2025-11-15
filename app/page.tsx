import { getAllPosts } from '@/lib/posts';
import { getAllProjects } from '@/lib/projects';
import BlogPostCard from '@/components/BlogPostCard';
import ProjectCard from '@/components/ProjectCard';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const posts = await getAllPosts();
  const projects = await getAllProjects();

  const latestPosts = posts.slice(0, 3);
  const featuredProjects = projects.filter(p => p.featured).slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
          Building at AI-Speed
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
          Full-stack developer focused on AI-assisted development and parallel execution patterns.
          Achieving 70% faster development through intelligent orchestration.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/projects"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            View Projects
          </Link>
          <Link
            href="/blog"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors border border-slate-600"
          >
            Read Blog
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
            <Link
              href="/projects"
              className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors"
            >
              View all
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Latest Blog Posts */}
      {latestPosts.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Latest Updates</h2>
            <Link
              href="/blog"
              className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors"
            >
              View all
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="space-y-6">
            {latestPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
