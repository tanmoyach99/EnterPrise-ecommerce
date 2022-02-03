import React from "react";

import AdminNav from "../../Components/Navbar/AdminNav";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row d-flex ">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4> Admin DashBoard</h4>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
