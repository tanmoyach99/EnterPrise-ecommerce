import React, { useState, useEffect } from "react";
import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import {
  getCategories,
  getCategorySubs,
} from "../../helperFunctions/categoryCRUD";
import { getSubs } from "../../helperFunctions/subCRUD";
import { Link } from "react-router-dom";
const CategoryNav = () => {
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [showSub, setShowSub] = useState(false);

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.data);
    });
    getSubs().then((res) => {
      setSubs(res.data);
    });
  }, []);

  const categoryWithSubs = categories.map((item) => {
    const children = subs.filter((sc) => sc.parent === item._id);
    return { ...item, children };
  });
  console.log(categoryWithSubs);

  return (
    <Navbar collapseOnSelect bg="light">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="navbar-2">
            {categoryWithSubs.map((cat) => {
              return (
                <NavDropdown title={cat.name} id="collasible-nav-dropdown">
                  {cat.children.map((children) => {
                    return (
                      <>
                        <NavDropdown.Item href={`/sub/${children.slug}`}>
                          {children.name}
                        </NavDropdown.Item>
                      </>
                    );
                  })}
                  <NavDropdown.Item>See More</NavDropdown.Item>
                </NavDropdown>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CategoryNav;
