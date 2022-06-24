import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const SideDrawer = ({ children }) => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));
  console.log(cart);
  return (
    <Drawer
      className="text-center"
      title={`CART/ ${cart.length} products`}
      placement="right"
      closable={true}
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      visible={drawer}
    >
      {cart?.map((c) => (
        <div className="row" key={c._id}>
          <div className="col">
            {c.images ? (
              <>
                <img
                  src={c.images[0].url}
                  alt=""
                  style={{ width: "40%", height: "50px", objectFit: "cover" }}
                />
                <p className="text-center bg-secondary text-white border-rounded">
                  {c.title.substring(0, 10)} X {c.count}{" "}
                </p>
              </>
            ) : (
              "no images"
            )}
          </div>
        </div>
      ))}
      <Link to="/cart">
        {" "}
        <button
          onClick={() =>
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            })
          }
          className="btn btn-success btn-sm  btn-block"
        >
          {" "}
          Go To Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
