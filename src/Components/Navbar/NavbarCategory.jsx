import React, { useState, useEffect } from "react";
import { getCategories } from "../../helperFunctions/categoryCRUD";
import { Dropdown } from "react-bootstrap";

const NavbarCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.data);
    });
  }, []);

  return (
    <>
      <Dropdown show>
        <Dropdown.Toggle
          className="dropdown-category btn btn-warning"
          id="dropdown-basic"
        >
          Categories
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {categories.map((c) => {
            return (
              <Dropdown.Item className="d-flex" key={c._id} href={`/${c.slug}`}>
                <img
                  src={c.images[0]?.images[0].url}
                  alt=""
                  className="img-fluid"
                  style={{
                    width: "2rem",
                    height: "2rem",
                    marginRight: "0.5rem",
                  }}
                />{" "}
                {c.name}
              </Dropdown.Item>
            );
          })}

          <Dropdown.Item href="#/action-2">Best Seller</Dropdown.Item>
          <Dropdown.Item href="#/action-3">New Products</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default NavbarCategory;
