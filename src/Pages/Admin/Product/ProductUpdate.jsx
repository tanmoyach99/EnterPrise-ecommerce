// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createProduct,
  getProductsForUpdate,
  updateProducts,
} from "../../../helperFunctions/productCRUD";
import AdminNav from "../../../Components/Navbar/AdminNav";
import ProductCreateForm from "../../../Components/Forms/ProductCreateForm";
import {
  getCategories,
  getCategorySubs,
} from "../../../helperFunctions/categoryCRUD";
import ImageUpload from "../../../Components/Forms/ImageUpload";
import ProductUpdateForm from "../../../Components/Forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  //   categories: [],
  category: "",
  shipping: "",
  subs: [],
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "HP", "Lenovo", "Acer", "ASUS"],
  color: "",
  brand: "",
};

const ProductUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = useParams();
  const [values, setValues] = useState(initialState);
  const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
  const [subOpt, setSubOpt] = useState("");
  //   const [showSub, setShowSub] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const history = useHistory();

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = () => {
    getProductsForUpdate(slug)
      .then((res) => {
        setValues({ ...values, ...res.data });
        // console.log(values);
        getCategorySubs(res.data.category._id).then((subs) => {
          //   console.log(subs.data);
          setSubOpt(subs.data);
        });
        // console.log(subOpt);
        let arr = [];
        // eslint-disable-next-line array-callback-return
        res.data.subs.map((s) => {
          arr.push(s._id);
        });
        // console.log("arr", arr);
        setArrayOfSubIds(arr); //require fro antd select work
      })
      .catch((err) => console.log(err));
  };

  const loadCategories = () =>
    getCategories().then((c) => {
      setCategories(c.data);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    values.subs = arrayOfSubIds;
    values.category = selectedCategory ? selectedCategory : values.category;
    updateProducts(slug, values, user.token)
      .then((res) => {
        console.log(res);
        window.alert("product update done");
        history.push("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        window.alert("product update failed");
      });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [] });
    setSelectedCategory(e.target.value);
    getCategorySubs(e.target.value).then((res) => {
      setSubOpt(res.data);
    });
    //if user clicks back its original category
    if (values.category._id === e.target.value) {
      loadProducts();
    }
    setArrayOfSubIds([]);
  };
  //   console.log(showSub);
  //   console.log(subOpt);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4> product update</h4>

          <br />
          <div className="p-3">
            <ImageUpload values={values} setValues={setValues} />
          </div>

          <ProductUpdateForm
            values={values}
            setValues={setValues}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            subOpt={subOpt}
            arrayOfSubIds={arrayOfSubIds}
            setArrayOfSubIds={setArrayOfSubIds}
            categories={categories}
            setCategories={setCategories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
