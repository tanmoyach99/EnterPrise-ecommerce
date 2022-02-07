import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../Components/Cards/ProductCard";
import {
  getProductsByCount,
  getProductsByQuery,
} from "../helperFunctions/productCRUD";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import {
  getCategories,
  getCategorySubs,
} from "../helperFunctions/categoryCRUD";
import Star from "../Components/Forms/Star";
import { getSubs } from "../helperFunctions/subCRUD";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [subs, setSubs] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [sub, setSub] = useState("");
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [star, setStar] = useState("");
  const [color, setColor] = useState([
    "Black",
    "Brown",
    "Silver",
    "White",
    "Blue",
  ]);
  const [brand, setBrand] = useState(["Apple", "HP", "Lenovo", "Acer", "ASUS"]);
  const [shipping, setShipping] = useState(["Yes", "No"]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedShipping, setSelectedShipping] = useState("");

  let { search } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const { text } = search;
  const { SubMenu, ItemGroup } = Menu;

  const fetchProducts = (arg) => {
    getProductsByQuery(arg).then((res) => {
      // console.log(res.data);
      setProducts(res.data);
    });
  };
  //load products based on price query

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryId([]);
    setPrice(value);
    setSub("");
    setStar("");
    setSelectedColor("");
    setSelectedBrand("");
    setSelectedShipping("");
    setTimeout(() => {
      setOk(!ok);
    }, 1000);
  };

  useEffect(() => {
    fetchProducts({ price });

    return () => {
      console.log("price category has set");
    };
  }, [ok]);

  //load default products
  useEffect(() => {
    getProductsByCount(10).then((res) => {
      setProducts(res.data);
    });
    getCategories().then((res) => {
      setCategory(res.data);
    });
    getSubs().then((res) => setSubs(res.data));
  }, []);

  //load products based on search query

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);

    return () => clearTimeout(delayed);
  }, [text]);

  //load product based om category and
  const showCategory = () =>
    category.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="p-3 mt-1"
          value={c._id}
          name="category"
          checked={categoryId.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  //handleCheck for categories
  const handleCheck = (e) => {
    e.preventDefault();
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    setPrice([0, 0]);
    setSub("");
    setStar("");
    setSelectedColor("");
    setSelectedBrand("");
    setSelectedShipping("");
    let inTheState = [...categoryId];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }
    setCategoryId(inTheState);
    fetchProducts({ category: inTheState });
  };

  //load star
  const showStars = () => (
    <div className=" pb-1 pr-4 pl-4">
      <Star numberOfStars={5} starClick={handleStarClick} /> <br />
      <Star numberOfStars={4} starClick={handleStarClick} /> <br />
      <Star numberOfStars={3} starClick={handleStarClick} />
      <br />
      <Star numberOfStars={2} starClick={handleStarClick} /> <br />
      <Star numberOfStars={1} starClick={handleStarClick} />
    </div>
  );

  //handle star filtr and rating filter

  const handleStarClick = (num) => {
    console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    setPrice([0, 0]);
    setSub("");
    setCategoryId([]);
    setStar(num);
    setSelectedColor("");
    setSelectedBrand("");
    setSelectedShipping("");
    fetchProducts({ stars: num });
  };

  const handleSub = (s) => {
    setSub(s);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    setPrice([0, 0]);
    setCategoryId([]);
    setStar("");
    setSelectedColor("");
    setSelectedBrand("");
    setSelectedShipping("");
    fetchProducts({ sub: s });
  };

  const handleColor = (c) => {
    setSelectedColor(c);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    setPrice([0, 0]);
    setCategoryId([]);
    setStar("");
    setSub("");
    setSelectedShipping("");
    setSelectedBrand("");
    fetchProducts({ color: c });
  };

  const handleBrand = (e) => {
    setSelectedBrand(e.target.value);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    setPrice([0, 0]);
    setCategoryId([]);
    setStar("");
    setSub("");
    setSelectedColor("");

    setSelectedShipping("");
    fetchProducts({ brand: e.target.value });
  };

  const handleShipping = (s) => {
    setSelectedShipping(s);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    setPrice([0, 0]);
    setCategoryId([]);
    setStar("");
    setSub("");
    setSelectedColor("");

    setSelectedBrand("");
    fetchProducts({ shipping: s });
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-3">
          <h4 className="alert alert-success">Search & Filters</h4>
          <Menu defaultOpenKeys={["1", "2", "3", "4"]} mode="inline">
            <SubMenu
              key="1"
              title={
                <span className="h3">
                  <DollarOutlined /> Price{" "}
                </span>
              }
            >
              <div>
                <Slider
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  className="mt-1 p-1 text-secondary"
                  max="5999"
                />
              </div>
            </SubMenu>
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div>{showCategory()}</div>
              <br />
            </SubMenu>

            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div>{showStars()}</div>
              <br />
            </SubMenu>

            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Sub Categories
                </span>
              }
            >
              <div>
                {subs.map((s) => (
                  <div
                    key={s?._id}
                    onClick={() => handleSub(s)}
                    className="p-1 m-1  btn btn-success"
                    style={{ cursor: "pointer" }}
                  >
                    {s?.name}
                  </div>
                ))}
              </div>
              <br />
            </SubMenu>
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Color
                </span>
              }
            >
              <div>
                {color.map((c) => (
                  <div
                    key={c}
                    onClick={() => handleColor(c)}
                    className="p-1 m-1  btn btn-danger"
                    style={{ cursor: "pointer" }}
                  >
                    {c}
                  </div>
                ))}
              </div>
              <br />
            </SubMenu>
            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Brand
                </span>
              }
            >
              <div>
                {brand.map((b) => (
                  <Radio
                    key={b}
                    name={b}
                    value={b}
                    onChange={(e) => handleBrand(e)}
                    className="p-1 m-1"
                    checked={b === selectedBrand}
                  >
                    {b}
                  </Radio>
                ))}
              </div>
              <br />
            </SubMenu>
            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Shipping
                </span>
              }
            >
              <div>
                {shipping.map((s) => (
                  <div
                    key={s}
                    onClick={() => handleShipping(s)}
                    className="p-1 m-1  btn btn-dark"
                    style={{ cursor: "pointer" }}
                  >
                    {s}
                  </div>
                ))}
              </div>
              <br />
            </SubMenu>
          </Menu>
        </div>
        <div className=" col-md-9">
          {products.length > 0 && (
            <div className="p-2 mt-1 mb-1 alert alert-success">
              {products.length} product found
            </div>
          )}
          <div className="row mt-2 container-fluid">
            {products.length > 0
              ? products?.map((p) => <ProductCard product={p} key={p._id} />)
              : " 0 product found"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
