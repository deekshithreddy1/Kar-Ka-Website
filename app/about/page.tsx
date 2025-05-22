import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me', // The template in layout.tsx will append site name
  description: 'Learn more about Deekshith Reddy, an application developer, problem solver, and blockchain enthusiast with hobbies in gardening, fish keeping, and hackathons.',
  openGraph: {
    // title will inherit from layout's default + page title
    description: 'Learn more about Deekshith Reddy, an application developer, problem solver, and blockchain enthusiast with hobbies in gardening, fish keeping, and hackathons.',
  },
  twitter: {
    // title will inherit from layout's default + page title
    description: 'Learn more about Deekshith Reddy, an application developer, problem solver, and blockchain enthusiast with hobbies in gardening, fish keeping, and hackathons.',
  }
};

export default function AboutPage() {
  return (
    <div className="bg-white shadow-xl rounded-xl p-6 sm:p-10 max-w-4xl mx-auto my-8 ring-1 ring-gray-200">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center text-gray-900">About Me</h1>
      <section className="mb-10">
        <p className="text-lg text-gray-700 leading-relaxed">
          I am an application developer and problem solver, deeply passionate about
          blockchain technology, both as an enthusiast and a hands-on developer. My journey in tech
          is driven by a constant curiosity and a desire to build impactful solutions.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">My Hobbies</h2>
        <ul className="space-y-3 text-lg text-gray-700">
          <li className="flex items-center">
            <span className="text-green-500 mr-3 text-xl">🌿</span>
            Gardening: Cultivating plants and creating green spaces.
          </li>
          <li className="flex items-center">
            <span className="text-blue-500 mr-3 text-xl">🐠</span>
            Fish keeping: Designing and maintaining aquatic ecosystems.
          </li>
          <li className="flex items-center">
            <span className="text-purple-500 mr-3 text-xl">💡</span>
            Attending hackathons: Collaborating and innovating on new ideas.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">Gallery</h2>
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <p className="text-gray-600 text-lg">
            [Images showcasing my hobbies and projects will be displayed here soon. Stay tuned!]
          </p>
        </div>
      </section>
    </div>
  );
}
