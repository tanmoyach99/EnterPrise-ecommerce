import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {ShoppingCartOutlined,HeartOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { Badge } from "antd";

const SearchInput = () => {
  let dispatch = useDispatch();
  let { search, cart, user } = useSelector((state) => ({ ...state }));
 
  
  const history = useHistory();
  let { text } = search;

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
    <div className=" d-flex justify-content-center align-items-center">
      <div
        className="text-center d-flex justify-content-center align-items-center"
        style={{ borderRadius: "5px" }}
      >
        <input
          style={{
            width: "30vw",
            height: "6vh",
            border: "none",
            margin: "0",
            // padding: "2px",
          }}
          placeholder="   Search Your Desired Products "
          onChange={handleChange}
          className=" bg-light"
        />
        <button className="btn btn-info p-2" onClick={handleSubmit}>
          {" "}
          Search
        </button>
      </div>
      <div className="ms-5">
        <Link to="/cart">
          <Badge
            className="text-success"
            count={user && cart?.length}
            offset={[9, 0]}
          >
            <ShoppingCartOutlined className=" fs-2" />
          </Badge>
        </Link>
{user &&
        <Link to="/user/wishlist">
          <Badge
            className="text-success m-4 fs-2"
            offset={[9, 0]}
          
          >
            <HeartOutlined />
          </Badge>
        </Link>}
      </div>
    </div>
  );
};

export default SearchInput;
