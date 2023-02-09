import { loadStripe } from "@stripe/stripe-js";
import { Stripe } from "@stripe/stripe-js/types/stripe-js";

let stripePromise: Stripe | null;

const getStripe = async (): Promise<Stripe | null> => {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );
  }

  return stripePromise;
};

export default getStripe;
