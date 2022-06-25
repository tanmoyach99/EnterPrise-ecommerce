import React, { useState, useEffect } from "react";
import { getCategories } from "../../helperFunctions/categoryCRUD";

const CategoryListBanner = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);
  return (
    <div className="mt-5 container row d-flex align-items-center justify-content-center offset-md-1">
      {categories.slice(0, 3).map((c) => {
        return (
          <div key={c._id} className="bg-light d-flex col-md-3 p-4 m-1 rounded">
            <div className="details">
              <h2 className="fw-normal">{c.name}</h2>
              <p className="text-secondary fw-bolder">
                Starting from <span className="text-danger fw-bold">$200</span>
              </p>
            </div>
            <div className="p-1">
              <img
                src={c.images[0]?.images[0].url}
                alt=""
                className="img-fluid"
                style={{ width: "40vw", height: "20vh", objectFit: "cover" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryListBanner;
