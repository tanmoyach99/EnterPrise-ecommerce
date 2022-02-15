import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => {
  console.log(order);
  return (
    <div>
      <p>
        <span> Order Id: {order.paymentIntent.id}</span>
        <br />
        <span>
          {" "}
          Order Amount:{" "}
          {(order.paymentIntent.amount / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
        <br />
        <span>
          Order Currency: {order.paymentIntent.currency.toUpperCase()}
        </span>
        <br />
        <span>Order Method: {order.paymentIntent.payment_method_types[0]}</span>
        <br />
        <span> Payment: {order.paymentIntent.status.toUpperCase()}</span>
        <br />
        <span>
          Order Date:{" "}
          {new Date(order.paymentIntent.created * 1000).toLocaleString()}
        </span>
        <br />
        {showStatus && (
          <span className="text-success bg bg-success text-white p-1">
            Order status: {order.orderStatus}
          </span>
        )}
        <br />
      </p>
    </div>
  );
};

export default ShowPaymentInfo;
