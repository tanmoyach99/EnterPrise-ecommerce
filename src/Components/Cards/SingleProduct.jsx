import React, { useState, useEffect } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import laptop from "../../images/laptop";
import ProductListItem from "./ProductListItem";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../helperFunctions/ratings";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { addToWishList, getWishList } from "../../helperFunctions/user";

const SingleProduct = ({ product, onStarClick, star }) => {
  const { TabPane } = Tabs;
  const [toolTip, setToolTip] = useState("click to add");
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    getWishList(user.token).then((res) => {
      console.log(res.data);
      setWishlist(res.data.wishlist);
    });
  }, []);
  console.log(wishlist);

  const { _id, images, description, title } = product;

  const handleAddToWishList = (pd) => {
    let list = wishlist;
    addToWishList(pd._id, user.token).then((res) => {
      list.push(...wishlist, pd);
      let unique = _.uniqWith(list, _.isEqual);

      dispatch({
        type: "ADD_TO_WISHLIST",
        payload: unique,
      });
      setWishlist(unique);
    });
  };

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
    <>
      <div className="col md-7">
        {images && images.length ? (
          <Carousel
            className="text-center"
            showArrows={true}
            autoPlay
            infiniteLoop
          >
            {images &&
              images.map((i) => (
                <img
                  src={i.url}
                  key={i.url}
                  alt=""
                  className="img-fluid slider-img"
                />
              ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                src={laptop}
                alt=""
                style={{
                  width: "25vw",
                  height: "50vh",
                  objectFit: "cover",
                }}
                className="p-1 text-center mb-3"
              />
            }
          ></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description}
          </TabPane>
          <TabPane tab="Contact" key="2">
            Call us on xxxxxxxxxxxxxxxxxxxxxxxxxx to know more...
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <div className="bg bg-light p-3 rounded">
          {" "}
          <h1 className="text-secondary text-center">{title} </h1>{" "}
          {/* <div>ratings</div> */}
        </div>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 mb-1"> No rating yet</div>
        )}

        <Card
          actions={[
            <Tooltip title={toolTip}>
              <span onClick={handelAddToCart}>
                <ShoppingCartOutlined
                  // onClick={() => handleRemove(slug)}
                  className="text-warning"
                />{" "}
                Add To Cart
              </span>
            </Tooltip>,

            <span onClick={() => handleAddToWishList(product)}>
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </span>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItem product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
