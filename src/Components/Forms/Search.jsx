import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { Badge, Input } from "antd";

const SearchInput = () => {
  const { Search } = Input;
  let dispatch = useDispatch();
  let { search, cart } = useSelector((state) => ({ ...state }));
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
    <div className=" d-flex justify-content-center align-items-center">
      <div className="text-center">
        <Search
          style={{ width: "30vw" }}
          placeholder="input search "
          onChange={handleChange}
          className=" bg-light"
          enterButton={
            <SearchOutlined
              onClick={handleSubmit}
              className=" p-2 fs-6"
              style={{ cursor: "pointer" }}
            />
          }
        />
      </div>
      <div className="ms-5">
        <Link to="/cart">
          <Badge className="text-success" count={cart.length} offset={[9, 0]}>
            <ShoppingCartOutlined className="text-info fs-2" />
          </Badge>
        </Link>
      </div>
    </div>
  );
};

export default SearchInput;
