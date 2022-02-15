import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Orders from "../../Components/Cards/Orders";

import AdminNav from "../../Components/Navbar/AdminNav";
import { changeStatus, getOrders } from "../../helperFunctions/admin";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    return getOrders(user.token).then((res) => {
      setOrders(res.data);
      console.log(res.data);
    });
  };
  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      alert("status Updated");
      loadOrders();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex ">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4> Admin Dashboard</h4>
          <div className="row">
            <Orders orders={orders} handleStatusChange={handleStatusChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
