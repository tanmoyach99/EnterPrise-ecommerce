import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import ProductCheckout from "../Components/Cards/ProductCheckout";
import { userCart } from "../helperFunctions/user";

const Cart = () => {
  const history = useHistory();
  const { cart, user } = useSelector((state) => ({ ...state }));
  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const saveOrderInbDb = () => {
    alert("save order to db");
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART REQ RES", res);
        if (res.data.ok) history.push("/checkout");
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
        {cart.map((p) => (
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
        <div className="col-md-8">
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
        <div className="col-md-4">
          <h4>Order summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
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
            <button
              onClick={saveOrderInbDb}
              className="btn btn-dark mt-2"
              disabled={!cart.length}
            >
              {" "}
              Proceed to checkout
            </button>
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