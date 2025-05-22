import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), '_posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  author?: string;
  excerpt?: string; // Added excerpt
  contentHtml?: string;
}

export interface PostFrontMatter {
  title: string;
  date: string;
  author?: string;
  excerpt?: string; // Added excerpt
}

export function getSortedPostsData(): Omit<PostData, 'contentHtml' | 'excerpt'>[] {
  // Get file names under /_posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md')) // Ensure only markdown files are processed
    .map(fileName => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);
      const frontmatter = matterResult.data as PostFrontMatter;

      // Generate a short excerpt if not provided in frontmatter
      let generatedExcerpt = matterResult.content.replace(/<[^>]*>?/gm, '').replace(/\n/g, ' '); // Strip HTML tags and newlines
      if (generatedExcerpt.length > 150) {
        const truncated = generatedExcerpt.substring(0, 150);
        generatedExcerpt = truncated.substring(0, Math.min(truncated.length, truncated.lastIndexOf(' '))) + '...';
      } else {
        generatedExcerpt = generatedExcerpt + '...';
      }
      const excerpt = frontmatter.excerpt || generatedExcerpt;


      // Combine the data with the slug and excerpt
      return {
        slug,
        title: frontmatter.title,
        date: frontmatter.date,
        author: frontmatter.author,
        excerpt, // Add excerpt here for sorted posts if needed for list views
      };
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  const frontmatter = matterResult.data as PostFrontMatter;

  // Generate a short excerpt if not provided in frontmatter for the full post data
  let generatedExcerptFull = matterResult.content.replace(/<[^>]*>?/gm, '').replace(/\n/g, ' '); // Strip HTML tags and newlines
  if (generatedExcerptFull.length > 150) {
    const truncated = generatedExcerptFull.substring(0, 150);
    generatedExcerptFull = truncated.substring(0, Math.min(truncated.length, truncated.lastIndexOf(' '))) + '...';
  } else {
    generatedExcerptFull = generatedExcerptFull + '...';
  }
  const excerpt = frontmatter.excerpt || generatedExcerptFull;


  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the slug, contentHtml, and excerpt
  return {
    slug,
    contentHtml,
    title: frontmatter.title,
    date: frontmatter.date,
    author: frontmatter.author,
    excerpt, // Add excerpt to the full post data
  };
}
