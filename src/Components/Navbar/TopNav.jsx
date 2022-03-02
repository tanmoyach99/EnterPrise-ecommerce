import { PhoneOutlined } from "@ant-design/icons";
import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const TopNav = () => {
  return (
    <>
      <Navbar className="d-flex justify-content-around ">
        <div className="d-flex top-nav">
          <span className="ms-5 me-3 border-end-0">
            {" "}
            <Link to="/login"> My Account</Link>{" "}
          </span>
          <span className="me-3">
            {" "}
            <Link to="/seller">Become a seller </Link>{" "}
          </span>
          <span className="me-3">
            {" "}
            <Link to="/wishlist"> Wishlist</Link>{" "}
          </span>
          <span className="me-3">
            {" "}
            <Link to="/user/dashboard">Order Tracking</Link>{" "}
          </span>
        </div>
        <div>
          <span className="text-Secondary">
            <PhoneOutlined className="text-info me-1 fw-bolder fs-4" />
            Need help call us{" "}
            <span className="text-info"> +990-010-001-01</span>
          </span>
        </div>
      </Navbar>
    </>
  );
};

export default TopNav;
