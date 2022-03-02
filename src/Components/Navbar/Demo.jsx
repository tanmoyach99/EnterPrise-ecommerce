import React, { useState, useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getCategories } from "../../helperFunctions/categoryCRUD";
import { getSubs } from "../../helperFunctions/subCRUD";
import "./demo.css";

const Demo = () => {
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
    getSubs().then((res) => setSubs(res.data));
  }, []);
  const categoryWithSubs = categories.map((item) => {
    const children = subs.filter((sc) => sc.parent === item._id);
    return { ...item, children };
  });

  console.log(categoryWithSubs);

  return (
    <div>
      <div className="header-mega">
        <nav>
          <ul className="menu-items">
            <li>
              <Link href="" className="menu-item">
                Home
              </Link>
            </li>
            <li className="dropdown">
              <a href="" className="menu-item">
                Dropdown
              </a>

              <div className="dropdown-menu-mega">
                <li>
                  <Link className="menu-item">Item-1</Link>
                </li>
                <li>
                  <Link className="menu-item">Item-1</Link>
                </li>
                <li>
                  <Link className="menu-item">Item-1</Link>
                </li>
                <li>
                  <Link className="menu-item">Item-1</Link>
                </li>
              </div>
            </li>
            <li className="master-mega">
              <Link href="" className="menu-item">
                Mega
              </Link>
              <div className="mega-menu">
                <div className="content">
                  {categoryWithSubs.map((c) => {
                    return (
                      <div className="col">
                        <section>
                          <h2>{c.name}</h2>
                          <ul className="mega-links">
                            {c.children.map((child) => {
                              return (
                                <li>
                                  {" "}
                                  <Link to={"/sub/" + child.slug}>
                                    {" "}
                                    {child.name}
                                  </Link>{" "}
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
            </li>{" "}
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

export default Demo;
