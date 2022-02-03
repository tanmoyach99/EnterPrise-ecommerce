import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../helperFunctions/categoryCRUD";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  //   const showCategories = () => {};

  return (
    <div className="container">
      <div className="row">
        {categories?.length > 0 &&
          categories.map((c) => (
            <div key={c._id} className="col-md-2">
              <Link to={`/category/${c.slug}`}>
                <button className="btn btn-success m-1 text-white">
                  {c.name}
                </button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryList;
