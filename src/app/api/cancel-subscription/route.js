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

    // Check if user has a paid subscription to cancel
    if (!subscription || !subscription.polar_subscription_id || subscription.plan === 'free') {
      return NextResponse.json({ 
        error: 'no_active_subscription',
        message: 'You do not have an active paid subscription to cancel'
      }, { status: 400 });
    }

    // Only allow canceling Pro or Business plans
    if (!['pro', 'business'].includes(subscription.plan)) {
      return NextResponse.json({ 
        error: 'invalid_plan',
        message: 'Invalid subscription plan'
      }, { status: 400 });
    }

    try {
      // Cancel the subscription in Polar using UPDATE method with revoke flag
      console.log('Canceling subscription:', subscription.polar_subscription_id);
      
      try {
        await polar.subscriptions.update({
          id: subscription.polar_subscription_id,
          subscriptionUpdate: {
            revoke: true,
          },
        });

        console.log('✅ Subscription canceled in Polar');
      } catch (polarError) {
        // If subscription is already canceled/scheduled for cancellation, that's okay
        // We'll proceed to downgrade the user anyway
        console.log('Polar cancellation response:', polarError.body$ || polarError.message);
        
        if (polarError.body$ && polarError.body$.includes('AlreadyCanceledSubscription')) {
          console.log('⚠️ Subscription already canceled in Polar, proceeding to downgrade user...');
        } else {
          // If it's a different error, throw it
          throw polarError;
        }
      }

      // Immediately downgrade to free plan in our database
      console.log('📝 Downgrading user to free plan...');
      const { error: updateError } = await supabase
        .from('user_subscriptions')
        .update({
          polar_subscription_id: null,
          plan: 'free',
          generations_limit: 0,
          generations_used: 0,
          subscription_status: 'canceled',
          current_period_start: null,
          current_period_end: null,
        })
        .eq('user_id', user.id);

      if (updateError) {
        console.error('Error updating local subscription:', updateError);
        return NextResponse.json(
          { error: 'Failed to update subscription' },
          { status: 500 }
        );
      }

      console.log('✅✅✅ User successfully downgraded to free plan!');

      return NextResponse.json({ 
        success: true,
        message: 'Your subscription has been canceled. You have been downgraded to the free plan.'
      });

    } catch (polarError) {
      console.error('Polar API error:', polarError);
      
      return NextResponse.json(
        { 
          error: 'Failed to cancel subscription',
          message: polarError.message || 'An error occurred while canceling your subscription'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Cancel subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
