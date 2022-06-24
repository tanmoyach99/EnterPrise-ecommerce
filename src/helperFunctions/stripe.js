import axios from "axios";

export const createPaymentIntent = (authtoken, coupon) => {
  return axios.post(
    "https://stormy-eyrie-52203.herokuapp.com/api/create-payment-intent ",
    { couponApplied: coupon },
    {
      headers: { authtoken },
    }
  );
};
