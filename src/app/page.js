'use client';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Home() {
  const features = [
    {
      icon: '✨',
      title: 'AI-Powered Content',
      description: 'Generate engaging social media posts in seconds with advanced AI technology'
    },
    {
      icon: '⚡',
      title: 'Multi-Platform Support',
      description: 'Create content optimized for all major platforms'
    },
    {
      icon: '🎯',
      title: 'Smart Analytics',
      description: 'Real-time insights on engagement and performance metrics'
    },
    {
      icon: '🔄',
      title: 'Easy Scheduling',
      description: 'Schedule posts for optimal posting times'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Manage everything from your smartphone or tablet'
    },
    {
      icon: '🤝',
      title: 'Team Collaboration',
      description: 'Work together with your entire team seamlessly'
    },
    {
      icon: '🎨',
      title: 'Custom Templates',
      description: 'Choose from dozens of professionally designed templates'
    },
    {
      icon: '🚀',
      title: 'Instant Publishing',
      description: 'Publish directly to all your social media accounts'
    }
  ];

  const useCases = [
    {
      title: 'Social Media Managers',
      description: 'Manage multiple accounts and maintain consistent posting schedules',
      icon: '👔'
    },
    {
      title: 'Content Creators',
      description: 'Never run out of ideas with AI-powered content suggestions',
      icon: '🎬'
    },
    {
      title: 'Small Businesses',
      description: 'Grow your online presence without a dedicated marketing team',
      icon: '🏢'
    },
    {
      title: 'Agencies',
      description: 'Deliver better results to clients with powerful tools',
      icon: '🏆'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Navbar />

      {/* Hero Section - Enhanced */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-100 bg-gradient-to-b from-emerald-50/30 to-white" style={{
        backgroundImage: 'radial-gradient(circle, rgb(16 185 129 / 0.2) 2px, transparent 2px)',
        backgroundSize: '30px 30px'
      }}>
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <span className="inline-block bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-200">
              ✨ Powered by Advanced AI Technology
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight text-center">
            Transform Your Ideas Into <span className="text-emerald-600">Captivating Content</span> in Seconds
          </h1>
          
          <p className="text-lg sm:text-xl text-zinc-600 mb-12 max-w-3xl mx-auto text-center leading-relaxed">
            Postify AI uses cutting-edge artificial intelligence to help content creators and businesses generate engaging social media posts instantly. Focus on your strategy while our AI handles the writing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="group bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition text-base flex items-center justify-center space-x-2">
              <span>Start Creating for Free</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button className="border-2 border-zinc-300 text-black px-8 py-4 rounded-lg font-semibold hover:border-emerald-600 hover:bg-emerald-50 transition text-base">
              Watch Demo Video
            </button>
          </div>

          {/* Hero Image/Preview */}
          <div className="rounded-xl overflow-hidden border border-zinc-200 shadow-2xl">
            <img 
              src="/banner.webp" 
              alt="AI Content Generator - Postify AI Circuit Board Banner" 
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-emerald-600 font-bold">10,000+</span>
              <span className="text-zinc-600">Active Users</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-zinc-300"></div>
            <div className="flex items-center space-x-2">
              <span className="text-emerald-600 font-bold">2M+</span>
              <span className="text-zinc-600">Posts Created</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-zinc-300"></div>
            <div className="flex items-center space-x-2">
              <span className="text-emerald-600 font-bold">99%</span>
              <span className="text-zinc-600">Satisfaction Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Perfect For Everyone</h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Whether you're a solo creator or managing a team, Postify adapts to your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="group p-6 border border-zinc-200 rounded-lg hover:border-emerald-600 hover:shadow-md transition">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{useCase.icon}</div>
                <h3 className="text-lg font-bold text-black mb-2">{useCase.title}</h3>
                <p className="text-zinc-600 text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Powerful Features</h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Everything you need to create, manage, and optimize your social media presence
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white p-8 rounded-lg border border-zinc-200 hover:border-emerald-600 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-lg font-bold text-black mb-3">{feature.title}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">{feature.description}</p>
                <div className="mt-4 h-1 w-0 group-hover:w-full bg-emerald-600 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="text-5xl sm:text-6xl font-bold text-emerald-600 mb-3 group-hover:scale-110 transition-transform">10k+</div>
              <p className="text-xl text-zinc-300 font-semibold">Active Users</p>
              <p className="text-sm text-zinc-500 mt-2">Growing every day</p>
            </div>
            <div className="text-center group">
              <div className="text-5xl sm:text-6xl font-bold text-emerald-600 mb-3 group-hover:scale-110 transition-transform">2M+</div>
              <p className="text-xl text-zinc-300 font-semibold">Posts Generated</p>
              <p className="text-sm text-zinc-500 mt-2">And counting</p>
            </div>
            <div className="text-center group">
              <div className="text-5xl sm:text-6xl font-bold text-emerald-600 mb-3 group-hover:scale-110 transition-transform">99%</div>
              <p className="text-xl text-zinc-300 font-semibold">User Satisfaction</p>
              <p className="text-sm text-zinc-500 mt-2">Highest rated</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Start free. Upgrade when you need to. No credit card required.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="group bg-white border border-zinc-200 rounded-xl p-8 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-2">Starter</h3>
              <p className="text-zinc-600 mb-6">Perfect for beginners</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-black">$0</span>
                <span className="text-zinc-600 ml-2">/month</span>
              </div>
              <button className="w-full bg-zinc-100 text-black px-6 py-3 rounded-lg font-semibold hover:bg-zinc-200 transition mb-6">
                Get Started
              </button>
              <ul className="space-y-3 text-sm text-zinc-600">
                <li className="flex items-center"><span className="text-emerald-600 mr-3">✓</span>10 posts per month</li>
                <li className="flex items-center"><span className="text-emerald-600 mr-3">✓</span>1 platform</li>
                <li className="flex items-center"><span className="text-emerald-600 mr-3">✓</span>Basic analytics</li>
                <li className="flex items-center"><span className="text-emerald-600 mr-3">✓</span>Community support</li>
              </ul>
            </div>

            {/* Pro Plan - Featured */}
            <div className="group relative bg-black text-white rounded-xl p-8 border-2 border-emerald-600 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-zinc-300 mb-6">For serious creators</p>
              <div className="mb-6">
                <span className="text-5xl font-bold">$29</span>
                <span className="text-zinc-400 ml-2">/month</span>
              </div>
              <button className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition mb-6 flex items-center justify-center space-x-2">
                <span>Start Free Trial</span>
                <span>→</span>
              </button>
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex items-center"><span className="text-emerald-400 mr-3">✓</span>Unlimited posts</li>
                <li className="flex items-center"><span className="text-emerald-400 mr-3">✓</span>All platforms</li>
                <li className="flex items-center"><span className="text-emerald-400 mr-3">✓</span>Advanced analytics</li>
                <li className="flex items-center"><span className="text-emerald-400 mr-3">✓</span>Priority support</li>
                <li className="flex items-center"><span className="text-emerald-400 mr-3">✓</span>Custom templates</li>
                <li className="flex items-center"><span className="text-emerald-400 mr-3">✓</span>Team collaboration</li>
              </ul>
            </div>

            {/* Enterprise Plan */}
            <div className="group bg-white border border-zinc-200 rounded-xl p-8 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-2">Enterprise</h3>
              <p className="text-zinc-600 mb-6">For teams and agencies</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-black">Custom</span>
              </div>
              <button className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition mb-6">
                Contact Sales
              </button>
              <ul className="space-y-3 text-sm text-zinc-600">
                <li className="flex items-center"><span className="text-emerald-600 mr-3">✓</span>Everything in Pro</li>
                <li className="flex items-center"><span className="text-emerald-600 mr-3">✓</span>Unlimited users</li>
                <li className="flex items-center"><span className="text-emerald-600 mr-3">✓</span>API access</li>
                <li className="flex items-center"><span className="text-emerald-600 mr-3">✓</span>Dedicated support</li>
                <li className="flex items-center"><span className="text-emerald-600 mr-3">✓</span>Custom integrations</li>
                <li className="flex items-center"><span className="text-emerald-600 mr-3">✓</span>White-label options</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">How It Works</h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Get started in just three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 bg-emerald-600 text-white rounded-full font-bold text-2xl mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-black text-center mb-4">Choose Your Style</h3>
              <p className="text-center text-zinc-600">
                Select your brand voice, tone, and target audience for personalized content
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <div className="text-4xl text-emerald-600">→</div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 bg-emerald-600 text-white rounded-full font-bold text-2xl mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-black text-center mb-4">Generate Content</h3>
              <p className="text-center text-zinc-600">
                Our AI generates engaging posts in seconds based on your preferences
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <div className="text-4xl text-emerald-600">→</div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 bg-emerald-600 text-white rounded-full font-bold text-2xl mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-black text-center mb-4">Publish & Track</h3>
              <p className="text-center text-zinc-600">
                Publish directly to all your platforms and track performance in real-time
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-emerald-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Ready to Transform Your Content Strategy?</h2>
          <p className="text-lg sm:text-xl text-emerald-50 mb-10 max-w-2xl mx-auto">
            Join thousands of creators, marketers, and businesses who are already saving time and creating better content with Postify AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-white text-emerald-600 px-10 py-4 rounded-lg font-bold hover:bg-emerald-50 transition text-lg flex items-center justify-center space-x-2">
              <span>Start Your Free Trial</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button className="bg-emerald-700 text-white px-10 py-4 rounded-lg font-bold hover:bg-emerald-800 transition text-lg border-2 border-white/30">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>


      {/* Footer */}
      <Footer />
    </div>
  );
}
  