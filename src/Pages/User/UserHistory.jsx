import React, { useState, useEffect } from "react";
import UserDashboardNav from "../../Components/Navbar/UserDashboardNav";
import { useSelector } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { getUserOrders } from "../../helperFunctions/user";
import ShowPaymentInfo from "../../Components/Cards/ShowPaymentInfo";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   PDFDownloadLink,
//   PDFViewer,
// } from "@react-pdf/renderer";

const UserHistory = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  console.log(user, user.token);

  useEffect(() => {
    getUserOrders(user.token).then((res) => {
      console.log(res.data);
      setOrders(res.data);
    });
  }, [user]);
  console.log(orders);

  const showOrderInTable = (order) => {
    return (
      <table className="table table-striped">
        <thead className="thead-light">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">Count</th>
            <th scope="col">Shipping</th>
          </tr>
        </thead>
        <tbody>
          {order?.products.map((p, i) => {
            return (
              <tr key={i}>
                <td>
                  {" "}
                  <b>{p?.product?.title}</b>{" "}
                </td>
                <td>{p?.product?.price}</td>
                <td>{p?.product?.brand}</td>
                <td>{p?.color}</td>
                <td>{p?.count}</td>
                <td>
                  {p?.product?.shipping === "Yes" ? (
                    <CheckCircleOutlined className="text-success" />
                  ) : (
                    <CloseCircleOutlined className="text-danger" />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  // const showDownloadLink = () => {
  //   <PDFViewer>
  //     <Document>
  //       <Page size="A4">
  //         <View>
  //           <Text>Section 1</Text>
  //           <Text>Section 2</Text>
  //         </View>
  //       </Page>
  //     </Document>
  //   </PDFViewer>;
  // };

  const showEachOrders = () => {
    return (
      orders.length > 0 &&
      orders?.map((order, i) => {
        return (
          <div key={i} className="m-5 p-3 card">
            <ShowPaymentInfo order={order} />
            {showOrderInTable(order)}
            <div className="row">
              {/* <div className="col">{showDownloadLink()}</div> */}
            </div>
          </div>
        );
      })
    );
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex ">
        <div className="col-md-2">
          <UserDashboardNav />
        </div>

        <div className="col-md-10">
          {orders?.length ? (
            <h4 className="text-center"> User Purchase Orders</h4>
          ) : (
            <h4 className="text-center"> No Purchase Orders</h4>
          )}
          <br />
          <hr />
          {orders?.length > 0
            ? showEachOrders()
            : " there is no orders yet from you"}
        </div>
      </div>
    </div>
  );
};

export default UserHistory;
