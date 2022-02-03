import React from "react";

const LocalSearch = ({ keywords, setKeywords }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeywords(e.target.value.toLowerCase());
  };
  return (
    <div className="mt-5">
      <input
        type="search"
        name="search"
        id=""
        value={keywords}
        onChange={handleSearchChange}
        className="form-control mb-4"
      />
    </div>
  );
};

export default LocalSearch;
