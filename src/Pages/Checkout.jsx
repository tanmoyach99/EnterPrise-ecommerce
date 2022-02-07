import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  emptyUserCart,
  getUserCart,
  userAddress,
} from "../helperFunctions/user";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [savedAddress, setSavedAddress] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log(res.data);
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const saveAddress = () => {
    console.log(address);
    userAddress(user.token, address).then((res) => {
      setSavedAddress(true);
      alert("address saved");
      console.log(res);
    });
  };
  const emptyCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: [],
    });
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      alert("cart is empty");
    });
  };

  return (
    <div className="row">
      <div className="col-md-5 offset-md-1">
        <h4>Delivery Address</h4>
        <br />
        <br />
        <br />
        <ReactQuill theme="snow" value={address} onChange={setAddress} />
        <button className="btn btn-success mt-2" onClick={saveAddress}>
          Save
        </button>
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        coupon input
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products -{products.length}</p>
        <hr />
        {products?.map((p, i) => {
          return (
            <div key={i}>
              <p>
                {p.product.title} ({p.color}) X {p.count}=
                {p.product.price * p.count}{" "}
              </p>
            </div>
          );
        })}

        <hr />
        <p>Cart Total : {total} </p>
        <div className="row">
          <div className="col-md-6">
            <button disabled={!savedAddress} className="btn btn-danger">
              Place Order
            </button>
          </div>
          <div className="col-md-6">
            <button
              disabled={!products.length}
              className="btn btn-dark"
              onClick={emptyCart}
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
