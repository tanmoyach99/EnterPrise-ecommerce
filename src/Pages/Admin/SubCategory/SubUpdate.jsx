import React, { useState, useEffect } from "react";

import AdminNav from "../../../Components/Navbar/AdminNav";

import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryForm from "../../../Components/Forms/CategoryForm";
import LocalSearch from "../../../Components/Forms/LocalSearch";

import { getCategories } from "../../../helperFunctions/categoryCRUD";
import {
  createSub,
  getSub,
  removeSub,
  getSubs,
  updateSub,
} from "../../../helperFunctions/subCRUD";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const SubUpdate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = useParams();
  const history = useHistory();

  console.log(slug);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () =>
    getSub(slug).then((s) => {
      console.log(s.dat);
      setName(s.data.name);
      setParent(s.data.parent);
    });

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSub(slug, { name, parent }, user.token)
      .then((res) => {
        toast.success(`${res.data.name} is created`);
        console.log(res);
        setLoading(false);
        setName("");
        history.push("/admin/sub");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <div className="form-group">
            <label htmlFor="">Parent Category</label>
            <select
              name="category"
              className="form-control"
              id="category"
              onChange={(e) => setParent(e.target.value)}
            >
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent}>
                    {c.name}{" "}
                  </option>
                ))}
            </select>
          </div>
          <h4> Update sub CATEGORY</h4>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
