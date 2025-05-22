import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog', // The template in layout.tsx will append site name
  description: 'A collection of articles and insights from Deekshith Reddy on Ethereum, DAML, Canton, blockchain technology, and software development.',
};

export default function BlogPage() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-gray-900">Blog Archive</h1>
      {allPostsData.length > 0 ? (
        <div className="space-y-8">
          {allPostsData.map(({ slug, title, date, author }) => (
            <article key={slug} className="bg-white shadow-xl rounded-xl p-6 sm:p-8 hover:shadow-2xl transition-shadow duration-300 ease-in-out ring-1 ring-gray-200">
              <header>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                  <Link href={`/blog/${slug}`} className="text-blue-700 hover:text-blue-900 transition-colors duration-300">
                    {title}
                  </Link>
                </h2>
                <p className="text-sm text-gray-500 mb-3">
                  <time dateTime={date}>
                    {new Date(date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  {author && <span className="text-gray-600"> by <span className="font-semibold">{author}</span></span>}
                </p>
              </header>
              {/* Optional: Add an excerpt here if available in your PostData */}
              {/* <p className="text-gray-700 mb-4">Excerpt of the blog post...</p> */}
              <Link href={`/blog/${slug}`} className="inline-block text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300">
                Read more &rarr;
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">No posts yet. Check back soon!</p>
      )}
    </div>
  );
}
