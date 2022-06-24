import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleProduct from "../Components/Cards/SingleProduct";
import { useSelector } from "react-redux";
import {
  getProductsForUpdate,
  getRelated,
  ratingProducts,
} from "../helperFunctions/productCRUD";
import ProductCard from "../Components/Cards/ProductCard";

const Product = () => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);
  const { slug } = useParams();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadProducts();
  }, [slug]);

  useEffect(() => {
    if (product.ratings) {
      let existingRatingObject = product.ratings.find(
        (el) => el.postedBy.toString() === user?._id.toString()
      );
      existingRatingObject ? setStar(existingRatingObject.star) : setStar(0);
    }
  }, [product.ratings, user?._id]);

  const loadProducts = () => {
    getProductsForUpdate(slug).then((res) => {
      setProduct(res.data);
      getRelated(res.data._id).then((res) => {
        setRelated(res.data);
        console.log(res.data);
      });
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    ratingProducts(name, newRating, user.token).then((res) => {
      loadProducts();
    });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row pt-4">
          <SingleProduct
            product={product}
            onStarClick={onStarClick}
            star={star}
          />
        </div>
      </div>
      <div className="row container-fluid p-5">
        <div className="text-center p-5">
          <hr />
          <h1 className="alert alert-success"> Related Products</h1>
          <div className="mt-1 row container">
            {related.length > 0 ? (
              related.map((r) => <ProductCard key={r._id} product={r} />)
            ) : (
              <div className="mt-1 text-secondary">
                {" "}
                There is no such products{" "}
              </div>
            )}
          </div>
          <hr />
        </div>
      </div>
    </>
  );
};

export default Product;
