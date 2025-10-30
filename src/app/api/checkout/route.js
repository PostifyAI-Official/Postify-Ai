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

    // Get the product ID based on the plan
    const productId = plan === 'pro' 
      ? process.env.NEXT_PUBLIC_POLAR_PRO_MONTHLY_ID 
      : process.env.NEXT_PUBLIC_POLAR_BUSINESS_MONTHLY_ID;

    // Create checkout session with external_customer_id
    // This will be available as customer.external_id in webhooks
    const checkout = await polar.checkouts.create({
      products: [productId],
      customerEmail: user.email,
      externalCustomerId: user.id, // THIS is the key! Polar will return this in webhooks
      customerMetadata: {
        plan: plan, // Also keep plan in metadata
      },
      successUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?checkout=success`,
    });

    return NextResponse.json({ url: checkout.url });
  } catch (error) {
    console.error('Checkout creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
