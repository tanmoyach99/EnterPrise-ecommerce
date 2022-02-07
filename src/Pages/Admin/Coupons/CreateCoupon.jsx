import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AdminNav from "../../../Components/Navbar/AdminNav";
import {
  createCoupon,
  getCoupons,
  removeCoupons,
} from "../../../helperFunctions/coupon";
import { useEffect } from "react";

const CreateCoupon = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState([]);

  useEffect(() => {
    getCoupons().then((res) => {
      setCoupon(res.data);
    });
  }, []);

  const handleRemove = (couponId) => {
    if (window.confirm("delete?")) {
      setLoading(true);
      removeCoupons(couponId, user.token).then((res) => {
        getCoupons().then((res) => {
          setCoupon(res.data);
          setLoading(false);
          alert("coupon deleted");
        });
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        setDiscount("");
        setExpiry("");
        alert("coupon is created");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Coupon</h4>
          <form action="" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="" className="text-muted">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
                placeholder="Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="" className="text-muted">
                Discount
              </label>
              <input
                type="text"
                name="discount"
                id="discount"
                value={discount}
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                required
                placeholder="Discount"
              />
            </div>
            <div className="form-group">
              <label htmlFor="" className="text-muted">
                Expiry Date
              </label>
              <br />
              <DatePicker
                className="form-control"
                selected={expiry}
                onChange={(date) => setExpiry(date)}
                value={expiry}
                required
              />
            </div>
            <br />
            <button className="btn btn-dark">Save</button>
          </form>
          <br />
          <div>
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Expiry</th>
                  <th scope="col">Discount</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {coupon.map((c) => {
                  return (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td> {new Date(c.expiry).toLocaleString()} </td>
                      <td>{c.discount} </td>
                      <td>
                        <DeleteOutlined
                          onClick={() => handleRemove(c._id)}
                          className="me-1 btn text-danger"
                        />

                        <EditOutlined className="me-1 btn text-danger" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
