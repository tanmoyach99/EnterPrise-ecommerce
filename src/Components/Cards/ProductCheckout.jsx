import React, { useState, useEffect } from "react";
import ModalImage from "react-modal-image";
import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import { getUserCart } from "../../helperFunctions/user";

const ProductCheckout = ({ product }) => {
  const { title, _id, images, brand, color, count, shipping, price, quantity } =
    product;
  const colors = ["Black", "Silver", "White", "Blue", "Brown"];

  const dispatch = useDispatch();

  const handleColorChange = (e) => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((p, i) => {
        if (p._id === _id) {
          cart[i].color = e.target.value;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleQuantity = (e) => {
    let counts = e.target.value < 1 ? 1 : e.target.value;
    if (counts > quantity) {
      alert(`only ${quantity} items in stock`);
      return;
    }
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((p, i) => {
        if (p._id === _id) {
          cart[i].count = counts;
        }
      });
      console.log("cart update color", cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    console.log(_id);
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((p, i) => {
        if (p._id === _id) {
          cart.splice(i, 1);
        }
      });
      console.log("cart update color", cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: cart,
      });
    }
    console.log(cart);
  };
  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", objectFit: "cover" }}>
            {images?.length ? (
              <ModalImage small={images[0].url} large={images[0].url} />
            ) : (
              "images"
            )}
          </div>
        </td>
        <td>{title?.substring(0, 15)}</td> <td>{price}</td>
        <td> {brand} </td>
        <td className="text-center">
          <select
            className="form-control"
            name="color"
            id="color"
            onChange={handleColorChange}
          >
            {color ? <option>{color}</option> : <option>Select</option>}
            {colors
              .filter((c) => c !== color)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td className="text-center">
          <input
            type="number"
            value={count}
            className="form-control"
            onChange={handleQuantity}
          />
        </td>
        <td>{shipping}</td>
        <td>
          <CloseOutlined
            onClick={handleRemove}
            className="text-danger pointer"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCheckout;
