import React from "react";

const CategoryForm = ({ handleSubmit, name, setName }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
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
        <br />
        <button className="btn btn-primary">Save</button>
      </div>
    </form>
  );
};

export default CategoryForm;
