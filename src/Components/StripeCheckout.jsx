import React, { useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { createPaymentIntent } from "../helperFunctions/stripe";
import { Card } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";
import { createOrder, emptyUserCart } from "../helperFunctions/user";

const StripeCheckout = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, coupon, cart } = useSelector((state) => ({ ...state }));

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token, coupon).then((res) => {
      console.log(res.data);
      setClientSecret(res.data.clientSecret);
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });
    if (payload.error) {
      setError(`payment failed ${payload.error.message} `);

      setProcessing(false);
      history.push("/");
    } else {
      createOrder(user.token, payload).then((res) => {
        if (res.data.ok) {
          if (typeof window !== "undefined") localStorage.removeItem("cart");
          dispatch({
            type: "REMOVE_FROM_CART",
            payload: [],
          });
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
          emptyUserCart(user.token);
          history.push("/user/history");
        }
      });
      setError(null);
      setProcessing(false);
      setSuccess(true);
    }
  };
  const handleChange = async (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <div>
      <p className={success ? "result-success" : "result-success hidden"}>
        {" "}
        Payment Successful{" "}
        <Link to="/user/history"> See It in Your purchase history</Link>{" "}
      </p>
      <div className="text-center pb-5">
        <Card
          actions={[
            <>
              <DollarOutlined className="text-primary" /> <br />
              Total: $ {cartTotal}
            </>,
            <>
              <CheckOutlined className="text-primary" /> <br />
              Total After Discount: $ {totalAfterDiscount}
            </>,
          ]}
        />
      </div>
      <form
        action=""
        id="payment-form"
        className="stripe-form"
        onSubmit={handleSubmit}
      >
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || processing}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "pay"}
          </span>
        </button>
        <br />
        {error && <div className="card-error">{error}</div>}
      </form>
    </div>
  );
};

export default StripeCheckout;
