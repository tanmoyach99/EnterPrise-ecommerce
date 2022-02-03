import React from "react";
import { Link } from "react-router-dom";

const UserDashboardNav = () => {
  return (
    <div>
      <nav>
        <ul className="nav flex-column ">
          <li className="nav-item">
            <Link to="/user/history" className="nav-link">
              {" "}
              History
            </Link>
          </li>
          <br />
          <li className="nav-item">
            <Link to="/user/password" className="nav-link">
              {" "}
              Password
            </Link>
          </li>
          <br />
          <li className="nav-item">
            <Link to="/user/wishlist" className="nav-link">
              {" "}
              Wishlist
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

export default UserDashboardNav;
