// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { createProduct } from "../../../helperFunctions/productCRUD";
import AdminNav from "../../../Components/Navbar/AdminNav";
import ProductCreateForm from "../../../Components/Forms/ProductCreateForm";
import {
  getCategories,
  getCategorySubs,
} from "../../../helperFunctions/categoryCRUD";
import ImageUpload from "../../../Components/Forms/ImageUpload";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: [
    "Black",
    "Brown",
    "Silver",
    "White",
    "Blue",
    "Unknown",
    "Not mentioned",
  ],
  brands: ["Apple", "HP", "Lenovo", "Acer", "ASUS", "Unknown"],
  color: "",
  brand: "",
};

const ProductCreate = () => {
  // const history = useHistory();
  const [values, setValues] = useState(initialState);
  const [subOpt, setSubOpt] = useState("");
  const [showSub, setShowSub] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        // console.log(res);
        alert("product create done");
        toast.success("product create done");
        window.location.reload();
        // history.push("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    // console.log("clicked category", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      // console.log(res);
      setSubOpt(res.data);
    });
    setShowSub(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4> create product</h4>
          <br />
          <div className="p-3">
            <ImageUpload values={values} setValues={setValues} />
          </div>

          <ProductCreateForm
            values={values}
            setValues={setValues}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            handleSubmit={handleSubmit}
            subOpt={subOpt}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
