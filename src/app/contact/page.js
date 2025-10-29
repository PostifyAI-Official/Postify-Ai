'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'support@postify.com'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+1 (555) 123-4567'
    },
    {
      icon: '📍',
      title: 'Office',
      value: 'San Francisco, CA'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-zinc-600">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white p-8 rounded-lg border border-zinc-200 text-center">
                <div className="text-4xl mb-4">{info.icon}</div>
                <h3 className="text-xl font-bold text-black mb-2">{info.title}</h3>
                <p className="text-zinc-600">{info.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">First Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-2">Last Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-emerald-600"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">Subject</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-emerald-600"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">Message</label>
              <textarea 
                rows="6"
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-emerald-600"
                placeholder="Your message here..."
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Have Questions?</h2>
          <p className="text-lg text-emerald-50 mb-8">Check out our FAQs for quick answers</p>
          <a href="/faqs" className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-zinc-900 transition">
            View FAQs
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
