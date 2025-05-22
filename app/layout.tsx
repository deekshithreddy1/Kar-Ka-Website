import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css"; // Ensure Tailwind's preflight and any global styles are here

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'), // Placeholder: User needs to update this
  title: {
    template: '%s | Deekshith Reddy - Blockchain Developer',
    default: 'Deekshith Reddy - Blockchain Developer & Enthusiast',
  },
  description: "Personal website and blog of Deekshith Reddy, focusing on application development, blockchain (Ethereum, DAML, Canton), and technology problem-solving.",
  // Basic Open Graph metadata for sharing
  openGraph: {
    title: 'Deekshith Reddy - Blockchain Developer & Enthusiast',
    description: "Personal website and blog of Deekshith Reddy, focusing on application development, blockchain (Ethereum, DAML, Canton), and technology problem-solving.",
    // images: ['/og-image.png'], // Placeholder: Add a default OG image later
    type: 'website',
    locale: 'en_US',
    // url: 'https://example.com', // Will be taken from metadataBase
  },
  // Basic Twitter card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Deekshith Reddy - Blockchain Developer & Enthusiast',
    description: "Personal website and blog of Deekshith Reddy, focusing on application development, blockchain (Ethereum, DAML, Canton), and technology problem-solving.",
    // images: ['/twitter-image.png'], // Placeholder: Add a default Twitter image later
    // site: '@yourtwitterhandle', // Placeholder: Add Twitter handle if available
  },
  // Favicon will be automatically picked up if app/favicon.ico exists
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-800 selection:bg-blue-500 selection:text-white">
        <header className="bg-gray-900 text-white p-4 shadow-md sticky top-0 z-50">
          <nav className="container mx-auto flex flex-wrap justify-between items-center">
            <Link href="/" className="text-xl font-bold hover:text-blue-400 transition-colors duration-300">
              Deekshith Reddy
            </Link>
            <div className="space-x-4">
              <Link href="/" className="hover:text-blue-400 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link href="/blog" className="hover:text-blue-400 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium">
                Blog
              </Link>
              <Link href="/about" className="hover:text-blue-400 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium">
                About Me
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-grow container mx-auto p-6 md:p-8">
          {children}
        </main>
        <footer className="bg-gray-800 text-gray-300 p-6 text-center text-sm">
          © {new Date().getFullYear()} Deekshith Reddy. All rights reserved.
          <p className="mt-1">Built with Next.js & Tailwind CSS.</p>
        </footer>
      </body>
    </html>
  );
}
