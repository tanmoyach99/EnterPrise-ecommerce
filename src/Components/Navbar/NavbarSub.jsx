import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { getSubs } from "../../helperFunctions/subCRUD";

const { SubMenu } = Menu;

const NavbarSub = ({ id }) => {
  const [subs, setSubs] = useState([]);
  console.log(id);

  useEffect(() => {
    getSubs().then((res) => setSubs(res.data));
  }, []);
  const filteredSub = subs.filter((s) => s.parent === id);
  console.log(filteredSub);

  const [current, setCurrent] = useState("");
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div>
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        className="bg-secondary"
      >
        {filteredSub.length >= 1 &&
          filteredSub.map((c) => {
            return (
              <Link to={`/sub/${c.slug}`}>
                <SubMenu
                  className="text-white"
                  key={c._id}
                  //   icon={<SettingOutlined />}
                  title={c.name}
                ></SubMenu>
              </Link>
            );
          })}
      </Menu>
    </div>
  );
};

export default NavbarSub;
