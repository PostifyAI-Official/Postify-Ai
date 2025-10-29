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
    console.log('Full payload:', JSON.stringify(payload, null, 2));

    switch (event) {
      case 'order.paid':
      case 'subscription.active':
        // Handle successful payment
        await handleOrderPaid(payload.data);
        break;
      
      case 'checkout.created':
      case 'checkout.updated':
      case 'order.created':
        // These are just informational, don't update subscription yet
        console.log('Informational event, waiting for payment confirmation');
        break;
      
      case 'subscription.created':
        await handleSubscriptionCreated(payload.data);
        break;
      
      case 'subscription.updated':
        await handleSubscriptionUpdated(payload.data);
        break;
      
      case 'subscription.canceled':
      case 'subscription.revoked':
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

async function handleOrderPaid(data) {
  console.log('=== ORDER PAID EVENT ===');
  console.log('Order data:', JSON.stringify(data, null, 2));
  
  const { customer, subscription } = data;
  
  // Get user_id and plan from customer.metadata
  const userId = customer?.metadata?.user_id;
  const plan = customer?.metadata?.plan;
  
  console.log('Customer metadata:', customer?.metadata);
  console.log('User ID:', userId, 'Plan:', plan);
  
  if (!userId || !plan) {
    console.error('Missing user_id or plan in customer.metadata');
    console.error('Full customer object:', JSON.stringify(customer, null, 2));
    return;
  }

  const generationsLimit = plan === 'pro' ? 30 : 100;

  // Update user subscription
  const { data: updatedData, error } = await supabase
    .from('user_subscriptions')
    .update({
      plan: plan,
      generations_limit: generationsLimit,
      generations_used: 0,
      polar_customer_id: customer.id,
      polar_subscription_id: subscription?.id || null,
      subscription_status: 'active',
      current_period_start: subscription?.current_period_start || null,
      current_period_end: subscription?.current_period_end || null,
    })
    .eq('user_id', userId)
    .select();

  if (error) {
    console.error('Error updating subscription:', error);
  } else {
    console.log('✅ Subscription updated successfully!');
    console.log('Updated data:', updatedData);
  }
}

async function handleCheckoutCompleted(data) {
  const { customer, subscription } = data;
  
  // Get user_id and plan from customer.metadata
  const userId = customer?.metadata?.user_id;
  const plan = customer?.metadata?.plan;
  
  console.log('Customer metadata:', customer?.metadata);
  
  if (!userId || !plan) {
    console.error('Missing user_id or plan in customer.metadata');
    return;
  }

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
      current_period_start: subscription?.current_period_start || null,
      current_period_end: subscription?.current_period_end || null,
    })
    .eq('user_id', userId);

  if (error) {
    console.error('Error updating subscription:', error);
  } else {
    console.log('Subscription updated successfully for user:', userId);
  }
}

async function handleSubscriptionCreated(data) {
  const { customer } = data;
  
  const userId = customer?.metadata?.user_id;
  const plan = customer?.metadata?.plan;
  
  if (!userId || !plan) {
    console.error('Missing user_id or plan in customer.metadata');
    return;
  }

  const generationsLimit = plan === 'pro' ? 30 : 100;

  await supabase
    .from('user_subscriptions')
    .update({
      plan: plan,
      generations_limit: generationsLimit,
      polar_subscription_id: data.id,
      subscription_status: 'active',
      current_period_start: data.current_period_start,
      current_period_end: data.current_period_end,
    })
    .eq('user_id', userId);
}

async function handleSubscriptionUpdated(data) {
  const { customer } = data;
  
  const userId = customer?.metadata?.user_id;
  
  if (!userId) {
    console.error('Missing user_id in customer.metadata');
    return;
  }

  await supabase
    .from('user_subscriptions')
    .update({
      subscription_status: data.status,
      current_period_start: data.current_period_start,
      current_period_end: data.current_period_end,
    })
    .eq('user_id', userId);
}

async function handleSubscriptionCanceled(data) {
  const { customer } = data;
  
  const userId = customer?.metadata?.user_id;
  
  if (!userId) {
    console.error('Missing user_id in customer.metadata');
    return;
  }

  // Downgrade to free plan
  await supabase
    .from('user_subscriptions')
    .update({
      plan: 'free',
      generations_limit: 0,
      subscription_status: 'canceled',
      polar_subscription_id: null,
    })
    .eq('user_id', userId);
}
