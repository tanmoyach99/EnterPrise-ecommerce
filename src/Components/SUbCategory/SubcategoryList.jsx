import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../helperFunctions/categoryCRUD";
import { getSubs } from "../../helperFunctions/subCRUD";

const SubCategoryList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSubs().then((res) => setSubs(res.data));
  }, []);

  //   const showCategories = () => {};

  return (
    <div className="container">
      <div className="row">
        {subs?.length > 0 &&
          subs.map((s) => (
            <div key={s._id} className="col-md-2">
              <Link to={`/sub/${s.slug}`}>
                <button className="btn btn-success m-1 text-white">
                  {s.name}
                </button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SubCategoryList;
