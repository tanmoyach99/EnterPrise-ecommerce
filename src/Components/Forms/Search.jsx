import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const Search = () => {
  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  let { text } = search;

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  return (
    <form
      className="form-inline d-flex input-group-text"
      onSubmit={handleSubmit}
    >
      <input
        type="search"
        onChange={handleChange}
        value={text}
        className="form-control mr-2m-2"
        placeholder="Search"
      />
      <span>
        <SearchOutlined
          onClick={handleSubmit}
          className="mt-1 p-2"
          style={{ cursor: "pointer" }}
        />
      </span>
    </form>
  );
};

export default Search;
