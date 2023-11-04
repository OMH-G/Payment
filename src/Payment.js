import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
// import dotenv from 'dotenv'
import Stripe from "stripe";
// dotenv.config({path:'../.env.local'})
const stripe = Stripe('sk_test_51O7dcfSJ4p7jRQbxT8ukbyE9r0Kh0FWyCDfFPlyHj4IegkNaY4cEuVo0soJCLDKqVipO2KWFcnw5HYOe0XNnYnG000zgl2Amae', {
  apiVersion: "2022-08-01",
});
function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
      const  publishableKey ='pk_test_51O7dcfSJ4p7jRQbx7eMuYPN9mWnx5iEKKrhBbHH7OvsqZo9QIX9gwAEXvvlsBcx51uNRljrXimrJhT8dEYaS0HiP009JjktQT7'
      setStripePromise(loadStripe(publishableKey));

  }, []);
  async function paymentSecret(){

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: 1999,
      automatic_payment_methods: { enabled: true },
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
