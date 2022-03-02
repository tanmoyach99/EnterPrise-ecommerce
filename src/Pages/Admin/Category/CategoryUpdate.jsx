import React, { useState } from "react";
import AdminNav from "../../../Components/Navbar/AdminNav";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getCategory,
  updateCategory,
} from "../../../helperFunctions/categoryCRUD";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryForm from "../../../Components/Forms/CategoryForm";
import ImageUpload from "../../../Components/Forms/ImageUpload";

const CategoryUpdate = ({ match }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = useParams();
  const loadCategory = () =>
    getCategory(slug).then((c) => setName(c.data.name));

  const history = useHistory();

  useEffect(() => {
    loadCategory();
    // console.log(match);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateCategory(slug, { name, images: value }, user.token)
      .then((res) => {
        toast.success(`${res.data.name} is updated`);

        console.log(res);
        setLoading(false);

        setName("");
        history.push("/admin/category");
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
          <h4> Update CATEGORY</h4>
          <ImageUpload values={value} setValues={setValue} />
          <hr />
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

export default CategoryUpdate;
