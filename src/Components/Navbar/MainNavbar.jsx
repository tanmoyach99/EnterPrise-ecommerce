import React, { useState, useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getCategories } from "../../helperFunctions/categoryCRUD";
import { getSubs } from "../../helperFunctions/subCRUD";
import { getAuth, signOut } from "firebase/auth";
import "./demo.css";

const MainNavbar = () => {
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, cart, wishlist } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
    getSubs().then((res) => setSubs(res.data));
  }, []);
  const categoryWithSubs = categories.map((item) => {
    const children = subs.filter((sc) => sc.parent === item._id);
    return { ...item, children };
  });

  const logOut = () => {
    const auth = getAuth();
    signOut(auth);
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    localStorage.setItem("user", JSON.stringify([]));
    // localStorage.setItem("cart", JSON.stringify([]));

    history.push("/login");
  };

  return (
    <div>
      <div className={`header-mega   ${categoryWithSubs[0]?.name}`}>
        <div className="menu-btn" >
          <div className="menu-btn__lines">

          </div>
        </div>
        <nav>
          <ul className="menu-items">
            <li>
              <Link to="/" className="menu-item">
                Home
              </Link>
            </li>
            <li className="dropdown">
              User
              <div className="dropdown-menu-mega">
                <li>
                  <Link className="menu-item">About</Link>
                </li>
                <li>
                  <Link className="menu-item">Contact</Link>
                </li>
                {!user && (
                  <li>
                    <Link className="menu-item" to="/register">
                      Register
                    </Link>
                  </li>
                )}
                {!user && (
                  <li>
                    <Link className="menu-item" to="/login">
                      Login
                    </Link>
                  </li>
                )}
                {user && (
                  <NavDropdown
                    title={
                      user.email && user.role === "subscriber"
                        ? user.email.split("@")[0]
                        : "Admin"
                    }
                    id="collasible-nav-dropdown"
                  >
                    {user && user.role === "subscriber" && (
                      <NavDropdown.Item>
                        <Link to="/user/history"> Dashboard </Link>
                      </NavDropdown.Item>
                    )}
                    {user && user.role === "admin" && (
                      <NavDropdown.Item>
                        <Link to="/admin/dashboard"> Dashboard </Link>
                      </NavDropdown.Item>
                    )}

                    <NavDropdown.Item onClick={logOut}>
                      Log Out
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </div>
            </li>
            <li className="master-mega">
              <Link href="" className="menu-item">
                Mega Shop
              </Link>
              <div className="mega-menu">
                <div className="content">
                  {categoryWithSubs.map((c) => {
                    return (
                      <div key={c._id} className="col">
                        <section>
                          <h2 className=" text-center">{c.name}</h2>
                          <ul className="mega-links">
                            {c.children.map((child) => {
                              return (
                                <li>
                                  <Link to={"/sub/" + child.slug}>
                                    {child.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </section>
                      </div>
                    );
                  })}
                </div>
              </div>
            </li>
            <li>
              <Link href="" className="menu-item">
                Blog
              </Link>
            </li>
            <li>
              <Link href="" className="menu-item">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MainNavbar;
