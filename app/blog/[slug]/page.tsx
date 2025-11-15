import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { Calendar, Tag } from 'lucide-react';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return {
    title: `${post.title} - Bill Crandell`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{post.title}</h1>

        <div className="flex items-center gap-4 text-slate-400 mb-6">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-slate-800 text-blue-400 text-sm rounded-full font-mono border border-slate-700 flex items-center gap-1"
            >
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div
        className="prose prose-invert prose-slate max-w-none prose-headings:text-white prose-a:text-blue-400 prose-code:text-green-400 prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
