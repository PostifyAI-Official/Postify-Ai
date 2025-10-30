import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
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
  
  const { customer, subscription, product } = data;
  
  // Get user_id from customer.external_id (this is what we set in checkout!)
  const userId = customer?.external_id;
  
  if (!userId) {
    console.error('❌ No external_id found on customer');
    console.error('Customer:', JSON.stringify(customer, null, 2));
    return;
  }
  
  console.log('✅ Found user_id from external_id:', userId);
  
  // Determine plan from product name or metadata
  let plan = customer?.metadata?.plan || 'pro';
  if (!customer?.metadata?.plan && product?.name) {
    const productName = product.name.toLowerCase();
    if (productName.includes('business')) {
      plan = 'business';
    } else if (productName.includes('pro')) {
      plan = 'pro';
    }
  }
  
  console.log('📦 Plan:', plan);

  const generationsLimit = plan === 'pro' ? 30 : 100;
  
  console.log(`📝 Updating user ${userId} to ${plan} plan (${generationsLimit} generations)`);

  // Update user subscription directly
  const { data: updatedData, error } = await supabase
    .from('user_subscriptions')
    .update({
      plan: plan,
      generations_limit: generationsLimit,
      generations_used: 0,
      subscription_status: 'active',
      polar_customer_id: customer.id,
      polar_subscription_id: subscription?.id || null,
      current_period_start: subscription?.current_period_start || null,
      current_period_end: subscription?.current_period_end || null,
    })
    .eq('user_id', userId)
    .select();

  if (error) {
    console.error('❌ Error updating subscription:', error);
  } else {
    console.log('✅✅✅ Subscription updated successfully!');
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
  console.log('=== SUBSCRIPTION CREATED EVENT ===');
  
  const { customer, product } = data;
  
  const customerEmail = customer?.email;
  
  if (!customerEmail) {
    console.error('❌ No customer email found');
    return;
  }
  
  // Find user by email
  const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
  
  if (authError) {
    console.error('❌ Error fetching users:', authError);
    return;
  }
  
  const user = authData.users.find(u => u.email === customerEmail);
  
  if (!user) {
    console.error('❌ No user found with email:', customerEmail);
    return;
  }
  
  // Determine plan from product name
  let plan = 'pro';
  if (product?.name) {
    const productName = product.name.toLowerCase();
    if (productName.includes('business')) {
      plan = 'business';
    } else if (productName.includes('pro')) {
      plan = 'pro';
    }
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
    .eq('user_id', user.id);
    
  console.log('✅ Subscription created for user:', user.id, 'Plan:', plan);
}

async function handleSubscriptionUpdated(data) {
  console.log('=== SUBSCRIPTION UPDATED EVENT ===');
  console.log('Subscription data:', JSON.stringify(data, null, 2));
  
  const { customer, product } = data;
  
  // Try to get user_id from external_id first, then metadata
  const userId = customer?.external_id || customer?.metadata?.user_id;
  
  if (!userId) {
    console.error('❌ No user_id found in external_id or metadata');
    return;
  }

  console.log('✅ Found user_id:', userId);

  // Check if product changed (plan change)
  if (product) {
    let plan = 'pro';
    const productName = product.name?.toLowerCase() || '';
    
    if (productName.includes('business')) {
      plan = 'business';
    } else if (productName.includes('pro')) {
      plan = 'pro';
    }
    
    const generationsLimit = plan === 'pro' ? 30 : 100;
    
    console.log(`📦 Plan changed to: ${plan} (${generationsLimit} generations)`);
    
    // Update with new plan and limits
    const { error } = await supabase
      .from('user_subscriptions')
      .update({
        plan: plan,
        generations_limit: generationsLimit,
        subscription_status: data.status,
        current_period_start: data.current_period_start,
        current_period_end: data.current_period_end,
        // Reset generations count on plan change
        generations_used: 0,
      })
      .eq('user_id', userId);
      
    if (error) {
      console.error('❌ Error updating subscription:', error);
    } else {
      console.log('✅ Subscription updated with new plan');
    }
  } else {
    // Just update status/period without changing plan
    await supabase
      .from('user_subscriptions')
      .update({
        subscription_status: data.status,
        current_period_start: data.current_period_start,
        current_period_end: data.current_period_end,
      })
      .eq('user_id', userId);
  }
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
