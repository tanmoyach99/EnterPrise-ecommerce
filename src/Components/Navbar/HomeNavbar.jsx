import React from "react";
import TextScroller from "../Cards/TextScroller";
import NavbarMain from "./NavbarMain";
import TopNav from "./TopNav";
import venom from "../../images/Venom_prev_ui.png";
import SearchInput from "../Forms/Search";

import CategoryNav from "./CategoryNav";
import Demo from "./Demo";

const HomeNavbar = () => {
  return (
    <>
      <Demo />
      <div className="bg bg-warning text-center">
        <span className=" text-secondary">
          Grab Your Best Deals Now. For{" "}
          <span className="fw-bolder">covid 19 </span> delivery may delay.{" "}
        </span>
      </div>

      <div className="d-flex ">
        <div className="col-md-2">
          <img src={venom} alt="" className="img-fluid nav-img" />
        </div>
        <div className="col-md-10">
          <TopNav />
          <SearchInput />
          <NavbarMain />
          <TextScroller
            className="m-2"
            text={`50% Off in ${new Date(
              Date.now()
            ).toDateString()}. Hurry up.Grab your Deal Now.***`}
          />
        </div>
      </div>
      <CategoryNav />
    </>
  );
};

export default HomeNavbar;
