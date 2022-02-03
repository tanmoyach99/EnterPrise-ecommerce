import React from "react";
import { Select } from "antd";

const ProductUpdateForm = ({
  handleChange,
  handleSubmit,
  values,
  setValues,
  handleCategoryChange,
  arrayOfSubIds,
  setArrayOfSubIds,
  categories,
  setCategories,
  selectedCategory,
  setSelectedCategory,
  subOpt,
}) => {
  const { Option } = Select;

  const {
    title,
    description,
    price,
    category,
    subs,
    quantity,
    shipping,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor=""> Title</label>
        <input
          type="text"
          name="title"
          placeholder="Name"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor=""> Description</label>
        <input
          type="text"
          name="description"
          placeholder="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor=""> Price</label>
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor=""> Shipping</label>
        <select
          name="shipping"
          id=""
          value={shipping === "Yes" ? "Yes" : "No"}
          className="form-control"
          onChange={handleChange}
        >
          <option value="">Select one</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor=""> Quantity</label>
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor=""> Color</label>
        <select
          name="color"
          id=""
          value={color}
          className="form-control"
          onChange={handleChange}
        >
          {colors.map((c) => (
            <option value={c} key={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor=""> Brand</label>
        <select
          name="brand"
          value={brand}
          id=""
          className="form-control"
          onChange={handleChange}
        >
          {brands.map((b) => (
            <option value={b} key={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor=""> Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
          value={selectedCategory ? selectedCategory : category._id}
        >
          {categories.length > 0 &&
            categories.map((cat) => (
              <option value={cat._id} key={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor=""> subs</label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select"
          value={arrayOfSubIds}
          onChange={(value) => setArrayOfSubIds(value)}
        >
          {subOpt.length &&
            subOpt.map((s) => (
              <Option value={s._id} key={s._id}>
                {" "}
                {s.name}{" "}
              </Option>
            ))}
        </Select>
      </div>

      <br />
      <button className="btn btn-warning">Save</button>
    </form>
  );
};

export default ProductUpdateForm;
