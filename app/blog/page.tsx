import { getAllPosts } from '@/lib/posts';
import BlogPostCard from '@/components/BlogPostCard';

export const metadata = {
  title: 'Blog - Bill Crandell',
  description: 'Thoughts on AI-assisted development, parallel execution patterns, and building at AI-speed.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Blog</h1>
        <p className="text-xl text-slate-300 max-w-2xl">
          Documenting the journey of AI-speed development, project launches, and technical insights.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="space-y-6 max-w-4xl">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">No posts yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
