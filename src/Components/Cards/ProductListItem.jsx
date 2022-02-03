import React from "react";
import { Link } from "react-router-dom";

const ProductListItem = ({ product }) => {
  const {
    brand,
    category,
    price,
    images,
    description,
    title,
    quantity,
    sold,
    color,
    shipping,
    slug,
    subs,
  } = product;

  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Price
          <span className="text-secondary"> $ {price} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Category
          <Link to={`/category/${category?.slug}`} className="text-secondary">
            {" "}
            {category?.name}{" "}
          </Link>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          SubCategory
          {subs?.map((s) => (
            <Link to={`/sub/${s.slug}`} key={s._id} className="text-secondary">
              {" "}
              {s.name}{" "}
            </Link>
          ))}
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Shipping
          <span className="text-secondary"> {shipping} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Color
          <span className="text-secondary"> {color} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Brand
          <span className="text-secondary"> {brand} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Available
          <span className="text-secondary"> {quantity - sold} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Sold
          <span className="text-secondary"> {sold} </span>
        </li>
      </ul>
    </div>
  );
};

export default ProductListItem;
