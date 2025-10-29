import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const payload = await request.json();
    const event = payload.type;

    console.log('Polar webhook received:', event);

    switch (event) {
      case 'checkout.completed':
        await handleCheckoutCompleted(payload.data);
        break;
      
      case 'subscription.created':
        await handleSubscriptionCreated(payload.data);
        break;
      
      case 'subscription.updated':
        await handleSubscriptionUpdated(payload.data);
        break;
      
      case 'subscription.canceled':
        await handleSubscriptionCanceled(payload.data);
        break;

      default:
        console.log('Unhandled event type:', event);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(data) {
  const { customer, metadata, subscription } = data;
  
  if (!metadata?.user_id || !metadata?.plan) {
    console.error('Missing user_id or plan in metadata');
    return;
  }

  const plan = metadata.plan;
  const generationsLimit = plan === 'pro' ? 30 : 100;

  // Update user subscription
  const { error } = await supabase
    .from('user_subscriptions')
    .update({
      plan: plan,
      generations_limit: generationsLimit,
      generations_used: 0,
      polar_customer_id: customer.id,
      polar_subscription_id: subscription?.id || null,
      subscription_status: 'active',
      current_period_start: subscription?.currentPeriodStart || null,
      current_period_end: subscription?.currentPeriodEnd || null,
    })
    .eq('user_id', metadata.user_id);

  if (error) {
    console.error('Error updating subscription:', error);
  } else {
    console.log('Subscription updated successfully for user:', metadata.user_id);
  }
}

async function handleSubscriptionCreated(data) {
  const { customer, metadata } = data;
  
  if (!metadata?.user_id) return;

  const plan = metadata.plan;
  const generationsLimit = plan === 'pro' ? 30 : 100;

  await supabase
    .from('user_subscriptions')
    .update({
      plan: plan,
      generations_limit: generationsLimit,
      polar_subscription_id: data.id,
      subscription_status: 'active',
      current_period_start: data.currentPeriodStart,
      current_period_end: data.currentPeriodEnd,
    })
    .eq('user_id', metadata.user_id);
}

async function handleSubscriptionUpdated(data) {
  const { metadata } = data;
  
  if (!metadata?.user_id) return;

  await supabase
    .from('user_subscriptions')
    .update({
      subscription_status: data.status,
      current_period_start: data.currentPeriodStart,
      current_period_end: data.currentPeriodEnd,
    })
    .eq('user_id', metadata.user_id);
}

async function handleSubscriptionCanceled(data) {
  const { metadata } = data;
  
  if (!metadata?.user_id) return;

  // Downgrade to free plan
  await supabase
    .from('user_subscriptions')
    .update({
      plan: 'free',
      generations_limit: 0,
      subscription_status: 'canceled',
      polar_subscription_id: null,
    })
    .eq('user_id', metadata.user_id);
}
