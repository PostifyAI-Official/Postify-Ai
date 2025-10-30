'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


export default function About() {
  const team = [
    {
      name: 'Alex Chen',
      role: 'Co-Founder & CEO',
      bio: 'AI enthusiast with 10+ years in tech'
    },
    {
      name: 'Sarah Johnson',
      role: 'Co-Founder & CTO',
      bio: 'Full-stack developer and AI researcher'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Head of Product',
      bio: 'Product strategist passionate about UX'
    },
    {
      name: 'Emma Williams',
      role: 'Head of Marketing',
      bio: 'Content strategy expert'
    }
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'We push the boundaries of AI to create better content generation tools'
    },
    {
      title: 'Simplicity',
      description: 'Making complex AI technology accessible to everyone'
    },
    {
      title: 'Quality',
      description: 'Delivering exceptional results that exceed expectations'
    },
    {
      title: 'Trust',
      description: 'Your data privacy and security is our top priority'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
            About Postify
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
            We're on a mission to revolutionize content creation with AI, making it accessible to everyone.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-black mb-8">Our Story</h2>
          <div className="space-y-6 text-lg text-zinc-600 leading-relaxed">
            <p>
              Postify was founded in 2023 by a team of AI researchers and content creators who believed that everyone should have access to powerful content generation tools.
            </p>
            <p>
              We started with a simple observation: content creators spend too much time writing and not enough time creating. We built Postify to solve this problem using cutting-edge AI technology.
            </p>
            <p>
              Today, Postify powers content creation for thousands of creators, businesses, and marketers worldwide. We're committed to continuously improving our platform and helping our users succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-black mb-16 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-zinc-50 p-8 rounded-lg border border-zinc-200">
                <h3 className="text-2xl font-bold text-black mb-3">{value.title}</h3>
                <p className="text-zinc-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-black mb-16 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-lg border border-zinc-200 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-black mb-1">{member.name}</h3>
                <p className="text-emerald-600 font-semibold mb-3">{member.role}</p>
                <p className="text-zinc-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-emerald-600 mb-2">10k+</div>
              <p className="text-zinc-300">Active Users</p>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-emerald-600 mb-2">2M+</div>
              <p className="text-zinc-300">Posts Generated</p>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-emerald-600 mb-2">95%</div>
              <p className="text-zinc-300">Retention Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Join Us?</h2>
          <p className="text-lg text-emerald-50 mb-8">Start creating amazing content today</p>
          <a href="/signup" className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-zinc-900 transition">
            Get Started Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
