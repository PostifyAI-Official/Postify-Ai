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
        message: 'Please use checkout to subscribe',
        requiresCheckout: true
      }, { status: 400 });
    }

    // Get the new product ID
    const newProductId = plan === 'pro' 
      ? process.env.NEXT_PUBLIC_POLAR_PRO_MONTHLY_ID 
      : process.env.NEXT_PUBLIC_POLAR_BUSINESS_MONTHLY_ID;

    try {
      // Step 1: Cancel the current subscription in Polar
      console.log('Canceling current subscription:', subscription.polar_subscription_id);
      await polar.subscriptions.revoke(subscription.polar_subscription_id);

      // Step 2: Create a new checkout session for the new plan
      console.log('Creating new checkout session for plan:', plan);
      const checkout = await polar.checkouts.create({
        productId: newProductId,
        customerEmail: user.email,
      });

      // Step 3: Update the local database to mark transition
      const { error: updateError } = await supabase
        .from('user_subscriptions')
        .update({
          polar_subscription_id: null, // Will be updated after new checkout
          plan: 'free', // Temporary until new subscription is active
          status: 'transitioning',
        })
        .eq('user_id', user.id);

      if (updateError) {
        console.error('Error updating local subscription:', updateError);
      }

      // Return the checkout URL for the new plan
      return NextResponse.json({ 
        success: true,
        message: 'Please complete the checkout to activate your new plan',
        checkoutUrl: checkout.url,
        requiresCheckout: true
      });

    } catch (polarError) {
      console.error('Polar API error:', polarError);
      
      return NextResponse.json(
        { 
          error: 'Failed to change plan',
          message: polarError.message || 'An error occurred while changing your plan',
          details: polarError
        },
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
