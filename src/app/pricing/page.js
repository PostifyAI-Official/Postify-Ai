'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Pricing() {
  const router = useRouter();
  const { user } = useAuth();

  const handleSelectPlan = async (plan) => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (plan === 'free') {
      router.push('/dashboard');
      return;
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      });

      const data = await response.json();
      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred');
    }
  };

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Try Postify for free',
      features: [
        'Unlimited access to AI',
        'No generation limits on Free plan',
        'All AI models',
        'Community support',
      ],
      cta: 'Get Started',
      popular: false,
      planId: 'free',
    },
    {
      name: 'Pro',
      price: '$5',
      period: '/month',
      description: 'For content creators',
      features: [
        '30 generations per month',
        'All AI models',
        'Priority support',
        'No watermarks',
        'Commercial license',
      ],
      cta: 'Upgrade to Pro',
      popular: true,
      planId: 'pro',
    },
    {
      name: 'Business',
      price: '$30',
      period: '/month',
      description: 'For teams and agencies',
      features: [
        '100 generations per month',
        'All AI models',
        'Premium support',
        'API access',
        'Team collaboration',
        'Priority processing',
      ],
      cta: 'Upgrade to Business',
      popular: false,
      planId: 'business',
    },
    {
      name: 'Enterprise',
      price: 'Contact',
      period: '',
      description: 'For large teams and agencies',
      features: [
        'Dedicated support',
        'Advanced analytics',
        'White-label options',
        'Custom contracts',
      ],
      cta: 'Contact Sales',
      popular: false,
      planId: 'enterprise',
    },
  ];
  

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-zinc-600">
            Choose the plan that fits your needs. No hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`rounded-lg p-8 ${
                  plan.popular 
                    ? 'bg-black text-white border-2 border-emerald-600 relative' 
                    : 'bg-white border border-zinc-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-black'}`}>
                  {plan.name}
                </h3>
                <p className={`mb-6 ${plan.popular ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  {plan.description}
                </p>
                
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-black'}`}>
                    {plan.price}
                  </span>
                  <span className={`${plan.popular ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {plan.period}
                  </span>
                </div>

                <button 
                  onClick={() => handleSelectPlan(plan.planId)}
                  className={`w-full py-3 rounded-lg font-semibold mb-6 transition ${
                  plan.popular
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-zinc-100 text-black hover:bg-zinc-200'
                }`}>
                  {plan.cta}
                </button>

                <ul className={`space-y-3 text-sm ${plan.popular ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <span className={`mr-3 ${plan.popular ? 'text-emerald-400' : 'text-emerald-600'}`}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-12 text-center">
            Feature Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-300">
                  <th className="text-left p-4 font-bold text-black">Feature</th>
                  <th className="text-center p-4 font-bold text-black">Starter</th>
                  <th className="text-center p-4 font-bold text-black">Pro</th>
                  <th className="text-center p-4 font-bold text-black">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-200">
                  <td className="p-4 text-zinc-700">Posts per month</td>
                  <td className="text-center p-4">10</td>
                  <td className="text-center p-4 text-emerald-600 font-bold">Unlimited</td>
                  <td className="text-center p-4 text-emerald-600 font-bold">Unlimited</td>
                </tr>
                <tr className="border-b border-zinc-200 bg-white">
                  <td className="p-4 text-zinc-700">Platforms</td>
                  <td className="text-center p-4">1</td>
                  <td className="text-center p-4 text-emerald-600 font-bold">All</td>
                  <td className="text-center p-4 text-emerald-600 font-bold">All</td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <td className="p-4 text-zinc-700">Analytics</td>
                  <td className="text-center p-4">Basic</td>
                  <td className="text-center p-4 text-emerald-600 font-bold">Advanced</td>
                  <td className="text-center p-4 text-emerald-600 font-bold">Advanced+</td>
                </tr>
                <tr className="border-b border-zinc-200 bg-white">
                  <td className="p-4 text-zinc-700">Scheduling</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4 text-emerald-600 font-bold">✓</td>
                  <td className="text-center p-4 text-emerald-600 font-bold">✓</td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <td className="p-4 text-zinc-700">Team Users</td>
                  <td className="text-center p-4">1</td>
                  <td className="text-center p-4">3</td>
                  <td className="text-center p-4 text-emerald-600 font-bold">Unlimited</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-4 text-zinc-700">API Access</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4 text-emerald-600 font-bold">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-12 text-center">
            Pricing Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-black mb-2">Can I change plans anytime?</h3>
              <p className="text-zinc-600">Yes! You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black mb-2">Is there a free trial?</h3>
              <p className="text-zinc-600">Yes! You can start a 14-day free trial of our Pro plan without needing a credit card.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black mb-2">Do you offer annual billing discounts?</h3>
              <p className="text-zinc-600">Yes! Pay annually and get 2 months free. Contact our sales team for more details.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black mb-2">What's included in the Starter plan?</h3>
              <p className="text-zinc-600">The Starter plan includes 10 AI-generated posts per month, access to 1 platform, basic analytics, and community support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg text-emerald-50 mb-8">Join thousands of creators already using Postify</p>
          <a href="/signup" className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-zinc-900 transition">
            Start Free Trial
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
