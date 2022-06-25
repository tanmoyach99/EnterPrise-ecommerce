import React, { useEffect, useState } from "react";
import { getProductsByCount } from "../../helperFunctions/productCRUD";
import { showAverage } from "../../helperFunctions//ratings";
import { Link, useHistory } from "react-router-dom";

const FeaturedProduct = () => {
  const [products, setProducts] = useState([]);
  // const history = useHistory();

  useEffect(() => {
    getProductsByCount(4).then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="p-5 d-flex row">
      {products.map((p) => {
        return (
          <div key={p._id} className="card col-md-6  p-3">
            <div className="row">
              <div className="col-md-8">
                <img
                  src={p.images[0].url}
                  alt=""
                  className="img-fluid featured-img"
                />
              </div>
              <div className="col-md-4">
                <span>
                  {p.ratings && p.ratings.length > 0 ? (
                    showAverage(p)
                  ) : (
                    <div className="text-center pt-1 mb-1"> No rating yet</div>
                  )}
                </span>
                <h6 className="text-center">
                  {" "}
                  <span>{p.title}</span>{" "}
                </h6>
                <h6 className="text-warning text-center">
                  <span> $ {p.price}</span>
                </h6>
               <Link to={`/product/${p.slug}`}>
                <button
                  className="btn btn-warning btn-featured"
                
                >
                  Explore
                </button>
               
               </Link>
                  
                 
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedProduct;
