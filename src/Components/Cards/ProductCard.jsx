import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop";
import { Link, useParams } from "react-router-dom";
import { showAverage } from "../../helperFunctions/ratings";

const ProductCard = ({ product }) => {
  const [toolTip, setToolTip] = useState("click to add");
  const { images, title, slug, description, price, quantity } = product;
  const { Meta } = Card;
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
        ...product,
        count: 1,
      });
      let unique = _.uniqWith(cart, _.isEqual); //lodash method

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
    <div className=" product col-md-4 mb-1 single-card ">
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            alt=""
            style={{
              width: "100%",
              height: "30vh",
              objectFit: "cover",
              display: "inline",
            }}
            className="p-1 text-center img-fluid card-img"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-danger" /> <br /> view product
          </Link>,
          <Tooltip title={quantity > 1 ? toolTip : "sorry,out of stock!!"}>
            <span onClick={quantity > 1 && handleAddToCart}>
              <ShoppingCartOutlined
                // onClick={() => handleRemove(slug)}
                className="text-warning"
              />{" "}
              {quantity > 1 ? "Add To Cart" : "Out Of Stock"}
            </span>
          </Tooltip>,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 40)}....`}
        />
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 mb-1"> No rating yet</div>
        )}

        <h6 className="text-danger mt-1">$ {price} </h6>
      </Card>
    </div>
  );
};

export default ProductCard;
