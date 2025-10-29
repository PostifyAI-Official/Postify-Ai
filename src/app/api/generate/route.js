import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';

const supabaseService = createServiceClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    // Verify user is authenticated
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check user subscription and usage
    const { data: subscription, error: subError } = await supabaseService
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (subError) {
      console.error('Error fetching subscription:', subError);
      return NextResponse.json({ error: 'Failed to check subscription' }, { status: 500 });
    }

    // Check if user has reached their limit (only for paid plans)
    if (subscription.plan !== 'free' && subscription.generations_used >= subscription.generations_limit) {
      return NextResponse.json(
        { error: 'Generation limit reached. Please upgrade your plan or wait for next billing cycle.' },
        { status: 403 }
      );
    }

    const { prompt } = await request.json();

    if (!prompt || prompt.trim() === '') {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL,
        'X-Title': 'Postify AI Content Generator',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.2-3b-instruct:free',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant that creates engaging social media content. Generate creative, attention-grabbing content based on the user\'s request.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenRouter API error:', error);
      return NextResponse.json(
        { error: 'Failed to generate content' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const generatedContent = data.choices[0]?.message?.content || 'No content generated';

    // Increment usage count for paid plans
    if (subscription.plan !== 'free') {
      await supabaseService
        .from('user_subscriptions')
        .update({ generations_used: subscription.generations_used + 1 })
        .eq('user_id', user.id);
    }

    return NextResponse.json({ 
      content: generatedContent,
      usage: {
        used: subscription.plan !== 'free' ? subscription.generations_used + 1 : 0,
        limit: subscription.generations_limit,
      }
    });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
