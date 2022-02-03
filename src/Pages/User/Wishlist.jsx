import React from "react";
import UserDashboardNav from "../../Components/Navbar/UserDashboardNav";

const Wishlist = () => {
  return (
    <div className="container-fluid">
      <div className="row d-flex ">
        <div className="col-md-2">
          <UserDashboardNav />
        </div>

        <div className="col-md-10">this is user wishlist</div>
      </div>
    </div>
  );
};

export default Wishlist;
