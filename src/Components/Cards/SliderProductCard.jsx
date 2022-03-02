import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getProductsByCount } from "../../helperFunctions/productCRUD";
import { showAverage } from "../../helperFunctions/ratings";
import {
  EyeOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Tooltip } from "antd";
import _ from "lodash";

const SliderProductCard = () => {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    getProductsByCount(10).then((res) => setProducts(res.data));
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  const handleAddToCart = (p) => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
        ...p,
        count: 1,
      });
      let unique = _.uniqWith(cart, _.isEqual); //lodash method

      localStorage.setItem("cart", JSON.stringify(unique));

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
    <div className="container slider-product">
      <div className="mt-5">
        <hr />
        <h3>Products Of The Week</h3>
        <span className="text-secondary">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo,
          rerum.
        </span>
        <hr />
      </div>
      <Slider {...settings}>
        {products.map((p) => {
          return (
            <div className="card">
              <img
                src={p.images[0].url}
                alt=""
                className="card-img-top img-fluid"
                style={{ width: "20vw", height: "30vh", objectFit: "cover" }}
              />
              <img
                src={p.images[1].url}
                alt=""
                className="card-img-top-hover img-fluid"
                style={{ width: "20vw", height: "30vh", objectFit: "cover" }}
              />
              <div className="card-body">
                {p && p.ratings && p.ratings.length > 0 ? (
                  showAverage(p)
                ) : (
                  <div className="text-center pt-1 mb-1"> No rating yet</div>
                )}
                <h6>{p.title}</h6>
                <span className="text-danger fw-bolder">$ {p.price}</span>
                <br />
                <div className="add-cart-fnc">
                  <div className="d-flex align-items-center justify-content-center container">
                    <HeartOutlined className="m-2 p-2 fs-5" />{" "}
                    <EyeOutlined className="m-2 p-2 fs-5" />
                  </div>

                  <button
                    className="btn btn-dark container"
                    onClick={() => handleAddToCart(p)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SliderProductCard;
