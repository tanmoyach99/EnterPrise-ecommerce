import React from "react";
import Jumbotron from "../Components/Cards/Jumbotron";
import CategoryList from "../Components/Category/CategoryList";
import BestSellers from "../Components/Home/BestSellers";
import NewArrivals from "../Components/Home/NewArrivals";
import SubCategoryList from "../Components/SUbCategory/SubcategoryList";

const Home = () => {
  return (
    <div className="container">
      <div className="alert alert-warning p-5 mt-1 text-danger h1 font-weight-bold text-center">
        <Jumbotron text={["New Arrivals", "Best Sellers", "Latest Products"]} />
      </div>
      <div className="text-center p-3 mt-5 mb-5 display-3 alert alert-danger">
        New Arrivals
      </div>
      <NewArrivals />
      <br />
      <br />
      <div className="text-center p-3 mt-5 mb-5 display-3 alert alert-primary">
        Best Sellers
      </div>
      <BestSellers />
      <br />
      <div className="text-center p-3 mt-5 mb-5 display-3 alert alert-primary">
        Categories
      </div>
      <CategoryList />
      <div className="text-center p-3 mt-5 mb-5 display-3 alert alert-warning">
        Sub Categories
      </div>
      <SubCategoryList />
    </div>
  );
};

export default Home;
