import React, { useState } from "react";
import { Badge, Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import Search from "../Forms/Search";
const { SubMenu } = Menu;

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));

  const [current, setCurrent] = useState("home");
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logOut = () => {
    const auth = getAuth();
    signOut(auth);
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <div>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="shop" icon={<ShoppingOutlined />}>
          <Link to="/shop">Shop</Link>
        </Menu.Item>

        <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
          <Link to="/cart">
            <Badge count={cart.length} offset={[9, 0]}>
              {" "}
              Cart
            </Badge>
          </Link>
        </Menu.Item>
        {!user && (
          <Menu.Item key="register" icon={<UserOutlined />}>
            <Link to="/register">Register</Link>
          </Menu.Item>
        )}
        {!user && (
          <Menu.Item key="login" icon={<UserAddOutlined />}>
            <Link to="/login">login</Link>
          </Menu.Item>
        )}
        {user && (
          <SubMenu
            key="settings"
            icon={<SettingOutlined />}
            title={user.email && user.email.split("@")[0]}
          >
            <Menu.ItemGroup title="Item 1">
              {user && user.role === "subscriber" && (
                <Menu.Item>
                  <Link to="/user/history"> Dashboard </Link>
                </Menu.Item>
              )}
              {user && user.role === "admin" && (
                <Menu.Item>
                  <Link to="/admin/dashboard"> Dashboard </Link>
                </Menu.Item>
              )}

              <Menu.Item
                key="setting:3"
                onClick={logOut}
                icon={<LogoutOutlined />}
              >
                LogOut
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
        )}
        <Menu.Item key="search">
          <Search />
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
