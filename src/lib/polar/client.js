import { Polar } from '@polar-sh/sdk';

export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: 'sandbox', // Use sandbox for testing, change to 'production' when ready
});

export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    generations: 0,
    features: ['Limited access', 'Basic features'],
  },
  pro: {
    name: 'Pro',
    price: 5,
    generations: 30,
    productId: process.env.NEXT_PUBLIC_POLAR_PRO_MONTHLY_ID,
    features: ['30 generations per month', 'Priority support', 'All AI models'],
  },
  business: {
    name: 'Business',
    price: 30,
    generations: 100,
    productId: process.env.NEXT_PUBLIC_POLAR_BUSINESS_MONTHLY_ID,
    features: ['100 generations per month', 'Premium support', 'All AI models', 'API access'],
  },
};
