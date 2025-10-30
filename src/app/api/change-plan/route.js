import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { polar } from '@/lib/polar/client';

export async function POST(request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { plan } = await request.json();

    if (!plan || !['pro', 'business'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // Get user's current subscription
    const { data: subscription, error: subError } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (subError) {
      console.error('Error fetching subscription:', subError);
      return NextResponse.json(
        { error: 'Failed to fetch subscription' },
        { status: 500 }
      );
    }

    // If user doesn't have an active subscription, redirect to checkout
    if (!subscription || !subscription.polar_subscription_id || subscription.plan === 'free') {
      return NextResponse.json({ 
        error: 'no_active_subscription',
        message: 'Please use checkout to subscribe'
      }, { status: 400 });
    }

    // Get the new product ID
    const newProductId = plan === 'pro' 
      ? process.env.NEXT_PUBLIC_POLAR_PRO_MONTHLY_ID 
      : process.env.NEXT_PUBLIC_POLAR_BUSINESS_MONTHLY_ID;

    try {
      // Update the subscription in Polar
      const updatedSubscription = await polar.subscriptions.update({
        id: subscription.polar_subscription_id,
        productId: newProductId,
      });

      console.log('Polar subscription updated:', updatedSubscription);

      // Update the local database
      const generationsLimit = plan === 'pro' ? 30 : 100;
      const { error: updateError } = await supabase
        .from('user_subscriptions')
        .update({
          plan: plan,
          generations_limit: generationsLimit,
          // Reset generations if upgrading from Pro to Business
          generations_used: (plan === 'business' && subscription.plan === 'pro') ? 0 : subscription.generations_used,
        })
        .eq('user_id', user.id);

      if (updateError) {
        console.error('Error updating local subscription:', updateError);
        return NextResponse.json(
          { error: 'Failed to update subscription' },
          { status: 500 }
        );
      }

      return NextResponse.json({ 
        success: true,
        message: 'Plan updated successfully',
        newPlan: plan
      });

    } catch (polarError) {
      console.error('Polar API error:', polarError);
      
      // If it's a "subscription already exists" error, try canceling and creating new
      if (polarError.message && polarError.message.includes('already has an active subscription')) {
        return NextResponse.json({
          error: 'polar_conflict',
          message: 'Please cancel your current subscription first, then subscribe to the new plan.',
          currentSubscriptionId: subscription.polar_subscription_id
        }, { status: 409 });
      }

      return NextResponse.json(
        { error: 'Failed to update subscription with payment provider' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Plan change error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
