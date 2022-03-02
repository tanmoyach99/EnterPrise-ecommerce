import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getCategories } from "../../helperFunctions/categoryCRUD";
import CategoryNav from "./CategoryNav";

const NavbarMain = () => {
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));

  const logOut = () => {
    const auth = getAuth();
    signOut(auth);
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.data);
    });
  }, []);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="outline-dark"
      className=" navbar"
    >
      <Container>
        <Navbar.Brand href="/">Venom</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="navbar-2">
            <Nav.Link>
              <Link to="/">
                {" "}
                <AppstoreOutlined /> Home{" "}
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/shop"> Shop </Link>
            </Nav.Link>
          </Nav>
          <Nav className="navbar-2">
            {!user && (
              <Nav.Link>
                <Link className="text-secondary" to="/register">
                  <UserAddOutlined />
                  Register
                </Link>
              </Nav.Link>
            )}
            {!user && (
              <Nav.Link>
                <Link className="text-secondary" to="/login">
                  login
                </Link>
              </Nav.Link>
            )}
            {user && (
              <NavDropdown
                title={user.email && user.email.split("@")[0]}
                id="collasible-nav-dropdown"
              >
                {user && user.role === "subscriber" && (
                  <NavDropdown.Item>
                    <Link to="/user/history">
                      {" "}
                      <UserAddOutlined /> Dashboard{" "}
                    </Link>
                  </NavDropdown.Item>
                )}
                {user && user.role === "admin" && (
                  <NavDropdown.Item>
                    <Link to="/admin/dashboard"> Dashboard </Link>
                  </NavDropdown.Item>
                )}

                <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarMain;
