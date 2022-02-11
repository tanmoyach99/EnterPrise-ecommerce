import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.jpg";
import { Link, useParams } from "react-router-dom";

import { showAverage } from "../../helperFunctions/ratings";

const ProductCard = ({ product }) => {
  const [toolTip, setToolTip] = useState("click to add");
  const { images, title, slug, description, price } = product;
  const { Meta } = Card;
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handelAddToCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
        ...product,
        count: 1,
      });
      let unique = _.uniqWith(cart, _.isEqual);
      console.log(unique);
      localStorage.setItem("cart", JSON.stringify(unique));
      setToolTip("added");
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  return (
    <div className="col-md-4 mb-1 ">
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 mb-1"> No rating yet</div>
      )}

      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            alt=""
            style={{
              width: "25vw",
              height: "50vh",
              objectFit: "cover",
            }}
            className="p-1 text-center"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-danger" /> <br /> view product
          </Link>,
          <Tooltip title={toolTip}>
            <span onClick={handelAddToCart}>
              <ShoppingCartOutlined
                // onClick={() => handleRemove(slug)}
                className="text-warning"
              />{" "}
              Add To Cart
            </span>
          </Tooltip>,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 40)}....`}
        />
        <h6 className="text-danger mt-1">$ {price} </h6>
      </Card>
    </div>
  );
};

export default ProductCard;
