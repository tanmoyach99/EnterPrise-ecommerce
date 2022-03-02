import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ImageUpload from "../../../Components/Forms/ImageUpload";
import CategoryForm from "../../../Components/Forms/CategoryForm";
import LocalSearch from "../../../Components/Forms/LocalSearch";
import AdminNav from "../../../Components/Navbar/AdminNav";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../helperFunctions/categoryCRUD";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  const [keywords, setKeywords] = useState("");

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    createCategory({ name, images: value }, user.token)
      .then((res) => {
        toast.success(`${res.data.name} is created`);
        console.log(res);
        setLoading(false);
        loadCategories();
        setName("");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Are you sure you want to remove")) {
      removeCategory(slug, user.token)
        .then((res) => {
          console.log(res);
          loadCategories();
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
          <h4> Create CATEGORY</h4>
          <ImageUpload values={value} setValues={setValue} />
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <LocalSearch keywords={keywords} setKeywords={setKeywords} />

          <div className="mt-5">
            {categories.filter(searched(keywords)).map((c) => (
              <div className="alert alert-warning " key={c._id}>
                {c.name}{" "}
                <span
                  className="btn ps-1 float-end"
                  onClick={() => handleRemove(c.slug)}
                >
                  <DeleteOutlined />
                </span>{" "}
                <Link to={`/admin/update/${c.slug}`}>
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

export default CategoryCreate;
