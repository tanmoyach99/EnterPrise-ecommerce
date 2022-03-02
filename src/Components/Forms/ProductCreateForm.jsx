import React from "react";
import { Select } from "antd";

const ProductCreateForm = ({
  handleChange,
  handleSubmit,
  values,
  handleCategoryChange,
  showSub,
  subOpt,
  setValues,
}) => {
  const { Option } = Select;

  const children = [];
  for (let i = 10; i < subOpt.length; i++) {
    children.push(
      <Option key={i.toString(subOpt.length) + i}>
        {i.toString(subOpt.length) + i}
      </Option>
    );
  }

  // const handleSelectChange = (value) => {
  //   console.log(`selected ${value}`);
  // };
  const {
    title,
    description,
    price,
    categories,
    category,
    shipping,
    subs,
    quantity,
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
          className="form-control"
          onChange={handleChange}
        >
          <option>Select</option>
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
          id=""
          className="form-control"
          onChange={handleChange}
        >
          <option>Select</option>
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
          id=""
          className="form-control"
          onChange={handleCategoryChange}
        >
          <option>Select</option>
          {categories.length > 0 &&
            categories.map((cat) => (
              <option value={cat._id} key={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
      </div>

      {showSub && (
        <div className="form-group">
          <label htmlFor=""> subs</label>
          <Select
            mode="multiple"
            // disabled
            style={{ width: "100%" }}
            placeholder="Please select"
            value={subs}
            // defaultValue={subOpt}
            onChange={(value) => setValues({ ...values, subs: value })}
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
      )}

      <br />
      <button className="btn btn-warning">Save</button>
    </form>
  );
};

export default ProductCreateForm;
