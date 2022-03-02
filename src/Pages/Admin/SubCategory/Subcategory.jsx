import React, { useState, useEffect } from "react";

import AdminNav from "../../../Components/Navbar/AdminNav";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryForm from "../../../Components/Forms/CategoryForm";
import LocalSearch from "../../../Components/Forms/LocalSearch";

import { getCategories } from "../../../helperFunctions/categoryCRUD";
import {
  createSub,
  getSub,
  removeSub,
  getSubs,
} from "../../../helperFunctions/subCRUD";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Subcategory = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [category, setCategory] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  const [keywords, setKeywords] = useState("");

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () => getSubs().then((c) => setSubs(c.data));

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(e.target.value, e);
    console.log(category);

    createSub({ name, parent: category }, user.token)
      .then((res) => {
        toast.success(`${res.data.name} is created`);
        console.log(res);

        setLoading(false);

        setName("");
        loadSubs();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Are you sure you want to remove")) {
      removeSub(slug, user.token)
        .then((res) => {
          loadSubs();

          toast.success("successfully deleted");
        })
        .catch((err) => console.log(err));
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Please select a category</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}{" "}
                  </option>
                ))}
            </select>
          </div>
          {/* {JSON.stringify(category)} */}
          <h4> Create sub CATEGORY</h4>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <LocalSearch keywords={keywords} setKeywords={setKeywords} />

          <div className="mt-5">
            {subs.filter(searched(keywords)).map((s) => (
              <div className="alert alert-warning " key={s._id}>
                {s.name}{" "}
                <span
                  className="btn ps-1 float-end"
                  onClick={() => handleRemove(s.slug)}
                >
                  <DeleteOutlined />
                </span>{" "}
                <Link to={`/admin/subUpdate/${s.slug}`}>
                  <span className="btn ps-1 float-end">
                    {" "}
                    <EditOutlined />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subcategory;
