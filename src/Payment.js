import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
// import dotenv from 'dotenv'
import Stripe from "stripe";
// dotenv.config({path:'../.env.local'})
const stripe = Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});
function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
      const  publishableKey =process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
      setStripePromise(loadStripe(publishableKey));

  }, []);
  async function paymentSecret(){

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "INR",
      amount: 1999,
      description: "Description for export transaction",
      automatic_payment_methods: { enabled: true },
      
      // billing_details: {
      //   name: "Omkar", // Replace with actual customer name
      //   address: {
      //     line1: "123 Main Street",
      //     city: "Pune",
      //     postal_code: "411023",
      //     state: "Maharashtra",
      //     country: "India",
      //   },
      // },
    });
    setClientSecret(paymentIntent.client_secret);
  }
  useEffect(() => {
    paymentSecret();
    
  }, []);

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
