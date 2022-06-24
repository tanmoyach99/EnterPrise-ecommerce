import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../Components/StripeCheckout";
import "../stripe.css";

const promise = loadStripe(
  "pk_test_51Iu0RzDVuG4dQji9ReyfG4EDP7X25Gcle68AKSOjVj8KHr9z4sxuNS4vbQ5I8X0745t34rNaiFaRz4faPlSm5oT500LkCQckJe"
);
// pk_test_51Iu0RzDVuG4dQji9ReyfG4EDP7X25Gcle68AKSOjVj8KHr9z4sxuNS4vbQ5I8X0745t34rNaiFaRz4faPlSm5oT500LkCQckJe

const Payment = () => {
  return (
    <div className="container p-5 text-center">
      <h4>Complete your purchase</h4>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
