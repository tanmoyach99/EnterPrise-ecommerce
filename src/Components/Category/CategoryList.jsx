import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../helperFunctions/categoryCRUD";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.data);
    });
  }, []);
  console.log(categories);

  const styleChange = (e, name) => {
    e.target.style.transform = "translateY(-5px)";
  };

  const styleChangeLeave = (e) => {
    e.target.style.transform = "translateY(5px)";
  };
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  const sorted = shuffle(categories);
  console.log(sorted);

  return (
    <div>
      <div className="row  d-flex  align-items-center justify-content-center ">
        {categories?.length > 0 &&
          categories.slice(0, 3).map((c) => (
            <div
              key={c._id}
              className="col-md-3 category-content m-1 p-1 bg-white"
              style={{ borderRadius: "5px" }}
            >
              {" "}
              <Link to={`/category/${c.slug}`}>
                <h5>
                  <span className="text-warning mb-1 p-1">{c.name}</span>
                </h5>
                <img
                  onMouseOver={(e) => styleChange(e, c.name)}
                  onMouseLeave={styleChangeLeave}
                  src={c.images[0].images[0].url}
                  alt=""
                  className="cat-img img-fluid"
                />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryList;
