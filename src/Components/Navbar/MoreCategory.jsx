import React from "react";
import { Link } from "react-router-dom";

const MoreCategory = ({ c }) => {
  console.log(c);
  //   const [name, slug, children] = c;

  return (
    <div>
      <div className="bg-light row d-flex">
        <div className="col-md-2 m-2 p-2">
          <h6>{c?.name}</h6>
          
          {/* {c?.children?.map((cat) => {
            return (
              <div key={cat._id}>
                <span className="text-secondary">
                  {" "}
                  <Link to={`/${cat.slug}`}> {cat.name} </Link>{" "}
                </span>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default MoreCategory;
