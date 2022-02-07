import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <div>
      <nav>
        <ul className="nav flex-column ">
          <li className="nav-item">
            <Link to="/admin/dashboard" className="nav-link">
              {" "}
              Dashboard
            </Link>
          </li>
          <br />
          <li className="nav-item">
            <Link to="/admin/product" className="nav-link">
              {" "}
              Product
            </Link>
          </li>
          <br />
          <li className="nav-item">
            <Link to="/admin/products" className="nav-link">
              {" "}
              Products
            </Link>
          </li>
          <br />
          <li className="nav-item">
            <Link to="/admin/category" className="nav-link">
              {" "}
              Category
            </Link>
          </li>
          <br />
          <li className="nav-item">
            <Link to="/admin/sub" className="nav-link">
              {" "}
              Sub Category
            </Link>
          </li>
          <br />
          <li className="nav-item">
            <Link to="/admin/coupons" className="nav-link">
              {" "}
              Coupon
            </Link>
          </li>
          <br />
          <li className="nav-item">
            <Link to="/user/password" className="nav-link">
              {" "}
              Password
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminNav;
