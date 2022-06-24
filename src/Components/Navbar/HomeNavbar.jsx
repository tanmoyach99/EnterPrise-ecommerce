import React from "react";
import TextScroller from "../Cards/TextScroller";
import TopNav from "./TopNav";
import venom from "../../images/Venom_prev_ui.png";
import SearchInput from "../Forms/Search";
import MainNavbar from "./MainNavbar";

const HomeNavbar = () => {
  return (
    <>
      <TextScroller
        className="m-1"
        text={`50% Off in ${new Date(
          Date.now()
        ).toDateString()}. Hurry up.Grab your Deal Now.***`}
      />
      <div className="bg bg-dark text-center">
        <span className=" text-white">
          Grab Your Best Deals Now. For{" "}
          <span className="fw-bolder">covid 19 </span> delivery may delay.{" "}
        </span>
      </div>

      <div className=" bg-warning ">
        <div className="row">
          <div className="col-md-3 col-sm-12 col-lg-2 col-xs-12">
            <img src={venom} alt="" className="img-fluid nav-img" />
          </div>
          <div className="col-md-9 col-sm-12 col-xs-12">
            <TopNav />
            <SearchInput />
            <MainNavbar />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeNavbar;
