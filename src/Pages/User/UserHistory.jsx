import React from "react";
import UserDashboardNav from "../../Components/Navbar/UserDashboardNav";

const UserHistory = () => {
  return (
    <div className="container-fluid">
      <div className="row d-flex ">
        <div className="col-md-2">
          <UserDashboardNav />
        </div>

        <div className="col-md-10">this is user history</div>
      </div>
    </div>
  );
};

export default UserHistory;
