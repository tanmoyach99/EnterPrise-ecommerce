import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../Components/Cards/ProductCard";

import { getSub } from "../helperFunctions/subCRUD";

const SubCategory = () => {
  const { slug } = useParams();
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSub(slug).then((res) => {
      console.log(res.data);
      setSub(res.data.subCategory);
      setProducts(res.data.subsProduct);
      setLoading(false);
    });
  }, [slug]);

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-alert text-center p-5">Loading.......</h4>
        ) : (
          <div>
            <h4 className="alert alert-success mt-2 p-2">
              {products.length} Products Found in {sub.name} Sub Category
            </h4>
            <div className="row">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubCategory;
