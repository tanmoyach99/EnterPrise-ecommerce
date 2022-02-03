import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdminProducts from "../../../Components/Cards/AdminProducts";
import AdminNav from "../../../Components/Navbar/AdminNav";
import {
  deleteProduct,
  getProductsByCount,
} from "../../../helperFunctions/productCRUD";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    getProductsByCount(100)
      .then((result) => {
        // console.log("nothing", result);
        setProducts(result.data);
      })
      .catch((err) => console.log(err));
  };

  const handleRemove = (slug) => {
    console.log("clicked");
    if (window.confirm("delete?")) {
      deleteProduct(slug, user.token)
        .then((res) => {
          loadProducts();
          toast.error("product deleted");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="container-fluid">
      <div className="row d-flex ">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {products.length > 0 && (
            <div className="row container">
              {products.map((pd) => (
                <AdminProducts
                  key={pd._id}
                  pd={pd}
                  handleRemove={handleRemove}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
