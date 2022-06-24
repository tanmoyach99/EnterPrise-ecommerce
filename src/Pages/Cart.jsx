import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import ProductCheckout from "../Components/Cards/ProductCheckout";
import { userCart } from "../helperFunctions/user";

const Cart = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => ({ ...state }));
  console.log("reducer cart", cart);
  console.log(cart);
  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const saveOrderInDb = () => {
    alert("save order to db");
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART REQ RES", res);
        console.log(res.data);
        if (res.data.ok) history.push("/user/checkout");
      })
      .catch((err) => console.log(err));
  };

  const saveCashInOrderDb = () => {
    dispatch({ type: "COD", payload: true });
    alert("save order to db");
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART REQ RES", res);

        if (res.data.ok) history.push("/user/checkout");
      })
      .catch((err) => console.log(err));
  };

  const showCartItems = () => {
    return (
      <table className="table table-hover">
        <thead className="bg-dark text-white">
          <tr>
            <th scope="col">Images</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">Count</th>
            <th scope="col">Shipping</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        {cart?.map((p) => (
          <ProductCheckout product={p} key={p._id} />
        ))}
      </table>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <h4>Cart -{cart.length} items .</h4>
      </div>
      <div className="row">
        <div style={{ overflow: "hidden" }} className="col-md-6 ">
          {!cart.length ? (
            <h4>
              {" "}
              No Products in the cart .{" "}
              <Link to="/shop"> Continue shopping</Link>{" "}
            </h4>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="offset-md-1 col-md-2 col-sm-8 col-lg-4 col-xl-5">
          <h4>Order summary</h4>
          <hr />
          <p>Products</p>
          {cart?.map((c, i) => (
            <div key={i}>
              <p>
                {" "}
                {c.title} X {c.count}=$ {c.price * c.count}{" "}
              </p>
            </div>
          ))}
          <hr />
          Total- <b> $ {getTotal()} </b>
          <hr />
          {user ? (
            <>
              <button
                onClick={saveOrderInDb}
                className="btn btn-dark mt-2"
                disabled={!cart.length}
              >
                {" "}
                Proceed to checkout
              </button>{" "}
              <br />
              <button
                onClick={saveCashInOrderDb}
                className="btn btn-info text-white mt-2"
                disabled={!cart.length}
              >
                {" "}
                Cash On Delivery
              </button>
            </>
          ) : (
            <button className="btn btn-dark mt-2">
              <Link to={{ pathname: "/login", state: { from: "cart" } }}>
                {" "}
                Login to checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
