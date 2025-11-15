import Link from 'next/link';
import { Calendar, Tag } from 'lucide-react';
import type { PostMetadata } from '@/lib/posts';

interface BlogPostCardProps {
  post: PostMetadata;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/20">
      <Link href={`/blog/${post.slug}`}>
        <h2 className="text-2xl font-bold text-white mb-3 hover:text-blue-400 transition-colors">
          {post.title}
        </h2>
      </Link>

      <div className="flex items-center gap-4 text-slate-400 text-sm mb-4">
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <time dateTime={post.date}>{formattedDate}</time>
        </div>
      </div>

      <p className="text-slate-300 mb-4">{post.excerpt}</p>

      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-slate-700 text-blue-400 text-sm rounded-full font-mono flex items-center gap-1"
          >
            <Tag size={12} />
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
