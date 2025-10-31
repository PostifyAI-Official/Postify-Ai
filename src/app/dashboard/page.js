'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function Dashboard() {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('post-1.0');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [subscription, setSubscription] = useState(null);
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  const { user, signOut } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  const subscriptionChannelRef = useRef(null);

  // Setup real-time subscription listener
  useEffect(() => {
    if (!user) return;

    // Initial fetch
    fetchSubscription();

    // Subscribe to real-time changes
    subscriptionChannelRef.current = supabase
      .channel('subscription-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_subscriptions',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('Real-time subscription update:', payload);
          // Update local state immediately
          if (payload.new) {
            setSubscription(payload.new);
          }
        }
      )
      .subscribe();

    // Cleanup on unmount
    return () => {
      if (subscriptionChannelRef.current) {
        supabase.removeChannel(subscriptionChannelRef.current);
      }
    };
  }, [user]);

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/subscription');
      const data = await response.json();
      if (response.ok) {
        setSubscription(data.subscription);
      }
    } catch (error) {
      console.error('Failed to fetch subscription:', error);
    } finally {
      setLoadingSubscription(false);
    }
  };

  const handleUpgrade = async (plan) => {
    // Optimistically update UI to show upgrading state
    const previousSubscription = subscription;
    setSubscription({
      ...subscription,
      plan: plan,
      generations_limit: plan === 'pro' ? 30 : 100,
      subscription_status: 'pending',
    });

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
        // Redirect to checkout - subscription will be updated via webhook
        window.location.href = data.url;
      } else {
        // Revert optimistic update on error
        setSubscription(previousSubscription);
        alert(data.message || 'Failed to start checkout');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      // Revert optimistic update on error
      setSubscription(previousSubscription);
      alert('An error occurred');
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? You will be downgraded to the free plan immediately.')) {
      return;
    }

    // Optimistically update UI to show free plan immediately
    const previousSubscription = subscription;
    setSubscription({
      ...subscription,
      plan: 'free',
      generations_limit: 0,
      subscription_status: 'canceled',
    });

    try {
      const response = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        alert(data.message || 'Your subscription has been canceled successfully!');
        // Fetch fresh data to ensure consistency
        await fetchSubscription();
      } else {
        // Revert optimistic update on error
        setSubscription(previousSubscription);
        alert(data.message || 'Failed to cancel subscription');
      }
    } catch (error) {
      console.error('Cancel subscription error:', error);
      // Revert optimistic update on error
      setSubscription(previousSubscription);
      alert('An error occurred while canceling your subscription');
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedContent('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to generate content');
        return;
      }

      setGeneratedContent(data.content);
      
      // Refresh subscription to update usage count
      if (data.usage) {
        fetchSubscription();
      }
    } catch (err) {
      setError('An error occurred while generating content');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    alert('Content copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg"></div>
              <span className="text-xl font-bold text-black">Postify</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-zinc-600">
                {user?.email}
              </div>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-zinc-700 hover:text-zinc-900 border border-zinc-300 rounded-lg hover:bg-zinc-50 transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Subscription Status Banner */}
        {!loadingSubscription && subscription && (
          <div className="mb-8 p-6 bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-lg">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-black capitalize">
                    {subscription.plan} Plan
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    subscription.plan === 'free' 
                      ? 'bg-zinc-200 text-zinc-700' 
                      : subscription.plan === 'pro'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {subscription.plan === 'free' ? 'Free' : 'Active'}
                  </span>
                </div>
                <p className="text-zinc-700">
                  <span className="font-semibold">{subscription.generations_used}</span> of{' '}
                  <span className="font-semibold">{subscription.generations_limit}</span> generations used this month
                </p>
                {subscription.plan === 'free' && (
                  <p className="text-sm text-zinc-600 mt-1">
                    Upgrade to get more generations: Pro (30) or Business (100)
                  </p>
                )}
                {subscription.plan === 'business' && subscription.generations_used >= subscription.generations_limit && (
                  <p className="text-sm text-orange-600 mt-1 font-medium">
                    ⚠️ You've reached your monthly limit. Consider switching plans or wait for next month's reset.
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {subscription.plan === 'free' && (
                  <>
                    <button
                      onClick={() => handleUpgrade('pro')}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Upgrade to Pro - $5/mo
                    </button>
                    <button
                      onClick={() => handleUpgrade('business')}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
                    >
                      Upgrade to Business - $30/mo
                    </button>
                  </>
                )}
                {subscription.plan === 'pro' && (
                  <>
                    <button
                      onClick={() => handleUpgrade('business')}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
                    >
                      Upgrade to Business - $30/mo
                    </button>
                    <button
                      onClick={handleCancelSubscription}
                      className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                    >
                      Cancel Subscription
                    </button>
                  </>
                )}
                {subscription.plan === 'business' && (
                  <button
                    onClick={handleCancelSubscription}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                  >
                    Cancel Subscription
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">
            AI Content Generator
          </h1>
          <p className="text-lg text-zinc-600">
            Generate engaging content for your social media in seconds
          </p>
        </div>

        {/* Generator Form */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleGenerate} className="space-y-6">
            {/* Model Selection Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Select AI Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white text-black"
                disabled={loading}
              >
                <option value="post-1.0">Post 1.0</option>
                <option value="post-2.0">Post 2.0</option>
                <option value="post-smart-1.0">Post Smart 1.0</option>
              </select>
            </div>

            {/* Prompt Input */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                What content would you like to generate?
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., Write an engaging Instagram post about sustainable fashion..."
                className="w-full h-32 px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-emerald-600 resize-none bg-white text-black placeholder-zinc-400"
                disabled={loading}
              />
            </div>

            {/* Generate Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition disabled:bg-emerald-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                'Generate Content'
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Generated Content */}
          {generatedContent && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold text-black">Generated Content</h2>
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 border border-emerald-600 rounded-lg hover:bg-emerald-50 transition"
                >
                  Copy to Clipboard
                </button>
              </div>
              <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-lg">
                <p className="text-black whitespace-pre-wrap leading-relaxed">
                  {generatedContent}
                </p>
              </div>
            </div>
          )}

          {/* Tips Section */}
          <div className="mt-12 p-6 bg-emerald-50 border border-emerald-200 rounded-lg">
            <h3 className="text-lg font-bold text-black mb-3">💡 Tips for better results:</h3>
            <ul className="space-y-2 text-zinc-700">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Be specific about your target audience and platform</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Include the tone you want (professional, casual, funny, etc.)</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Mention any hashtags or emojis you'd like to include</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Specify the desired length (short caption, long-form post, etc.)</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
