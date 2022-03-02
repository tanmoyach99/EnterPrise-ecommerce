import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../Components/Cards/ProductCard";
import NavbarSub from "../Components/Navbar/NavbarSub";
import { getCategory } from "../helperFunctions/categoryCRUD";

const Category = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      setCategory(res.data.category);
      setProducts(res.data.categoryProduct);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <NavbarSub id={category?._id} />
      <div className="row m-1 p-1">
        {loading ? (
          <h4 className="text-alert text-center p-5">Loading.......</h4>
        ) : (
          <div>
            <h4 className="alert alert-success mt-2 p-2">
              {products?.length} Products Found in {category?.name} Category
            </h4>
            <div className="row">
              {products?.map((p) => (
                <ProductCard key={p?._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
