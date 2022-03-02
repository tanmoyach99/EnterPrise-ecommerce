import React, { useEffect, useState } from "react";
import { getProducts, productCount } from "../../helperFunctions/productCRUD";
// import Jumbotron from "../Cards/Jumbotron";
import LoadingCard from "../Cards/LoadingCard";
import ProductCard from "../Cards/ProductCard";
import { Pagination } from "antd";
import banner from "../../images/pexels-photo-3697717.jpeg";

const NewArrivals = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getProducts("createdAt", "desc", page)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    productCount().then((res) => {
      setCount(res.data);
    });
  }, []);

  return (
    <div className="p-5">
      {loading ? (
        <LoadingCard count={product.length} />
      ) : (
        <div className="row mb-5">
          {product.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      )}
      <Pagination
        current={page}
        total={Math.ceil((count / 3) * 10)}
        onChange={(value) => setPage(value)}
      />
    </div>
  );
};

export default NewArrivals;
