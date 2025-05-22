import { getPostData, getSortedPostsData, PostData } from '@/lib/posts'; // Ensure PostData includes excerpt
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

// This function generates static paths for all blog posts
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

// This function fetches data for a single post
async function getPost(slug: string): Promise<PostData | null> {
  try {
    const postData = await getPostData(slug); // This should now return PostData with excerpt
    return postData;
  } catch (error) {
    // If getPostData throws (e.g., file not found), return null
    console.error(`Error fetching post data for slug ${slug}:`, error);
    return null;
  }
}

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    // If post is not found, return default metadata or handle as needed
    return {
      title: 'Post Not Found',
      description: 'The post you are looking for does not exist.',
    };
  }

  const description = post.excerpt || 'A blog post by Deekshith Reddy.'; // Fallback description

  return {
    title: post.title, // The template in layout.tsx will append site name
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      type: 'article',
      publishedTime: post.date, // Ensure date is in ISO format for Open Graph
      authors: post.author ? [post.author] : [],
      // images: ['/path/to/default-post-image.png'], // Placeholder for post-specific image
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      // images: ['/path/to/default-post-image.png'], // Placeholder for post-specific image
    },
  };
}


export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound(); // Triggers 404 page if post is not found
  }

  return (
    <article className="bg-white shadow-lg rounded-lg p-6 md:p-8 max-w-4xl mx-auto my-8 prose prose-lg lg:prose-xl prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-md prose-img:shadow-md">
      <header className="mb-8 border-b pb-4">
        <h1 className="!text-3xl md:!text-4xl font-extrabold text-gray-900 mb-3">{post.title}</h1>
        <p className="text-base text-gray-500">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {post.author && <span className="text-gray-600"> by <span className="font-semibold">{post.author}</span></span>}
        </p>
      </header>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }} />
    </article>
  );
}
