import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  applyCoupon,
  createOrderWithCash,
  emptyUserCart,
  getUserCart,
  userAddress,
} from "../helperFunctions/user";
import { useHistory } from "react-router-dom";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [savedAddress, setSavedAddress] = useState(false);
  const [coupons, setCoupons] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const dispatch = useDispatch();
  const { user, coupon, COD } = useSelector((state) => ({ ...state }));
  const history = useHistory();

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
      setTotalAfterDiscount(0);
    });
  };

  const showAddress = () => {
    return (
      <>
        <ReactQuill theme="snow" value={address} onChange={setAddress} />
        <button className="btn btn-success mt-2" onClick={saveAddress}>
          Save
        </button>
      </>
    );
  };

  const showProductSummary = () => {
    return products?.map((p, i) => {
      return (
        <div key={i}>
          <p>
            {p.product.title} ({p.color}) X {p.count}=
            {p.product.price * p.count}{" "}
          </p>
        </div>
      );
    });
  };

  const applyDiscountCoupon = () => {
    applyCoupon(user.token, coupons).then((res) => {
      console.log(res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
        //push in the redux
      }
      if (res.data.err) {
        setDiscountError(res.data.err);
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        //push in the redux
      }
    });
  };

  const showApplyCoupon = () => {
    return (
      <>
        <input
          onChange={(e) => {
            setCoupons(e.target.value);
            setDiscountError("");
          }}
          type="text"
          className="form-control"
        />
        <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
          {" "}
          Apply{" "}
        </button>
      </>
    );
  };

  const createCashOnDelivery = () => {
    createOrderWithCash(user.token, COD, coupon).then((res) => {
      console.log("user cash order created", res);
      if (res.data.ok) {
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        dispatch({
          type: "COD",
          payload: false,
        });
      }
      emptyUserCart(user.token);
      setTimeout(() => {
        history.push("/user/history");
      }, 1000);
    });
  };

  return (
    <div className="row">
      <div className="col-md-5 offset-md-1">
        <h4>Delivery Address</h4>
        <br />
        <br />
        <br />
        {showAddress()}
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        {showApplyCoupon()}
        <br />
        {discountError && <p className="text-danger p-1"> {discountError} </p>}
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products -{products.length}</p>
        <hr />
        {showProductSummary()}

        <hr />
        <p>Cart Total : {total} </p>

        {totalAfterDiscount > 0 && (
          <div className="alert alert-success">
            Discount applied. Total payable price: $ {totalAfterDiscount}
          </div>
        )}
        <div className="row">
          <div className="col-md-6">
            {COD ? (
              <button
                disabled={!savedAddress || !products.length}
                onClick={createCashOnDelivery}
                className="btn btn-danger"
              >
                Place Order
              </button>
            ) : (
              <button
                disabled={!savedAddress || !products.length}
                onClick={() => history.push("/user/payment")}
                className="btn btn-danger"
              >
                Place Order
              </button>
            )}
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
