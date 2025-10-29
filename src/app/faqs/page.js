'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What is Postify?',
      answer: 'Postify is an AI-powered content generation platform that helps you create engaging social media posts instantly. We use advanced AI to understand your brand voice and generate content optimized for all social platforms.'
    },
    {
      question: 'How does the AI content generation work?',
      answer: 'Our AI analyzes your input, brand guidelines, and target audience to generate unique, engaging content. You can customize the tone, style, and length to match your preferences. The more you use Postify, the better it understands your voice.'
    },
    {
      question: 'Which platforms does Postify support?',
      answer: 'Postify supports all major social media platforms including Twitter, LinkedIn, Instagram, Facebook, TikTok, and more. We optimize content for each platform\'s specific requirements and best practices.'
    },
    {
      question: 'Can I schedule posts directly from Postify?',
      answer: 'Yes! Our Pro and Enterprise plans include scheduling capabilities. You can schedule posts to publish at the optimal times for your audience engagement.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Absolutely! We offer a free Starter plan with 10 posts per month. You can also start a 14-day free trial of our Pro plan without needing a credit card.'
    },
    {
      question: 'How is my data protected?',
      answer: 'We take data security seriously. All data is encrypted in transit and at rest. We comply with GDPR, CCPA, and other privacy regulations. Your content is never used to train our models.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes! You can cancel your subscription anytime. No long-term contracts or hidden fees. Your account will remain active until the end of your billing period.'
    },
    {
      question: 'Do you offer team/business accounts?',
      answer: 'Yes! Our Enterprise plan includes team management features, multiple user seats, API access, and dedicated support. Contact our sales team for custom pricing.'
    },
    {
      question: 'How do I get started?',
      answer: 'Getting started is easy! Sign up for free, create your profile, and start generating content immediately. No credit card required for the free plan.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. All transactions are secure and processed through Stripe.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-zinc-600">
            Find answers to common questions about Postify
          </p>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-zinc-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center p-6 bg-white hover:bg-zinc-50 transition text-left"
                >
                  <span className="text-lg font-semibold text-black">{faq.question}</span>
                  <span className={`text-emerald-600 text-2xl transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                    +
                  </span>
                </button>
                {openIndex === index && (
                  <div className="p-6 bg-zinc-50 border-t border-zinc-200">
                    <p className="text-zinc-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Still have questions?</h2>
          <p className="text-lg text-emerald-50 mb-8">Our support team is here to help</p>
          <a href="/contact" className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-zinc-900 transition">
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
