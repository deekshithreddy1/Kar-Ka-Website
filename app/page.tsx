import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts'; // PostData type not strictly needed for this page
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // title will use default from layout.tsx, which is fine for homepage
  description: 'Welcome to the personal site of Deekshith Reddy, exploring blockchain development (Ethereum, DAML, Canton), problem-solving, and more.',
  openGraph: {
    // title will inherit from layout's default
    description: 'Welcome to the personal site of Deekshith Reddy, exploring blockchain development (Ethereum, DAML, Canton), problem-solving, and more.',
  },
  twitter: {
    // title will inherit from layout's default
    description: 'Welcome to the personal site of Deekshith Reddy, exploring blockchain development (Ethereum, DAML, Canton), problem-solving, and more.',
  }
};

export default function Home() {
  const allPostsData = getSortedPostsData();
  const recentPosts = allPostsData.slice(0, 3); // Get the 3 most recent posts

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="text-center my-10 md:my-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Welcome to My Digital Space
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          I&apos;m Deekshith Reddy, an application developer and problem solver with a deep passion for blockchain technology.
          Explore my thoughts on Ethereum, DAML, Canton, and various tech innovations.
        </p>
      </section>

      <section className="my-10 md:my-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
          Latest Insights
        </h2>
        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map(({ slug, title, date, author }) => (
              <article key={slug} className="bg-white shadow-xl rounded-xl p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300 ease-in-out ring-1 ring-gray-200">
                <div>
                  <header>
                    <h3 className="text-xl lg:text-2xl font-bold mb-2">
                      <Link href={`/blog/${slug}`} className="text-blue-700 hover:text-blue-900 transition-colors duration-300">
                        {title}
                      </Link>
                    </h3>
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
                  {/* Optional: Add an excerpt here if available */}
                </div>
                <Link href={`/blog/${slug}`} className="self-start mt-4 text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300">
                  Read more &rarr;
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">No recent posts. Check the blog archive!</p>
        )}
        {allPostsData.length > 3 && (
          <div className="text-center mt-10">
            <Link href="/blog" className="text-lg text-blue-700 hover:text-blue-900 font-bold transition-colors duration-300">
              View All Posts &rarr;
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
