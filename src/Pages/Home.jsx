import { useHistory } from "react-router-dom";
import Jumbotron from "../Components/Cards/Jumbotron";
import BestSellers from "../Components/Home/BestSellers";
import FeaturedProduct from "../Components/Home/FeaturedProduct";
import HeaderBanner from "../Components/Home/HeaderBanner";
import NewArrivals from "../Components/Home/NewArrivals";
import NavbarCategory from "../Components/Navbar/NavbarCategory";
import banner from "../images/banner-home.jpg";
import SliderProductCard from "../Components/Cards/SliderProductCard";
import CategoryListBanner from "../Components/Home/CategoryListBanner";
import Footer from "../Components/Home/Footer";

const Home = () => {
  const history = useHistory();
  return (
    <div>
      <div className="header" style={{ width: "100%", overflow: "hidden" }}>
        <div className="header-banner">
          <HeaderBanner />
        </div>
      </div>
      <CategoryListBanner />
      <SliderProductCard />
      <div className="alert alert-warning fs-2 container text-center p-5">
        You are in thee Right place. Get 100% authentic products
      </div>
      <div className="row d-flex mt-2">
        <div>
          <div></div>
          <div className="d-flex featured-product m-1 p-2">
            <div className="col-md-3 ms-2 pb-2">
              <div className="featured d-flex align-items-center justify-content-center">
                <div>
                  <h2 className="text-warning">
                    {" "}
                    Enjoy up to <br /> 50% OFF In Laptop{" "}
                  </h2>
                  <button
                    className="btn btn-warning"
                    onClick={() => history.push("/shop")}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-8  p-5 bg-light">
              <div className="mt-5 mb-5">
                <hr />
                <h6>Featured Products</h6>

                <h2 className="fw-bolder"> VENOMS COLLECTION</h2>
                <hr />
              </div>
              <FeaturedProduct />
            </div>
          </div>
          <div className=" p-3 mt-5 mb-5  container">
            <img
              src={banner}
              alt=""
              style={{ width: "100%" }}
              className="img-fluid rounded"
            />
            <div className="bg bg-light p-5">
              <div>
                <hr />
                <h1>Best Seller</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fugiat, facilis.
                </p>
                <hr />
                <hr />
              </div>
              <BestSellers />
            </div>
            >
          </div>

          <div className="d-flex new-arrivals m-1 p-2">
            <div className="col-md-3 ms-2 pb-2 ">
              <div className=" text-banner d-flex align-items-center justify-content-center">
                <div>
                  <h2 className="text-white text-center fw-bold">
                    {" "}
                    Best Services Possible
                  </h2>
                  <h4 className="text-white text-center"> Top Deal </h4>
                  <span className="d-flex align-items-center justify-content-center mt-5">
                    <button className="btn btn-light">Shop now</button>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-8  bg-light ">
              <div className="p-3 mt-3">
                <h1>
                  <hr />
                  New Arrivals
                </h1>
                <p className="text-secondary">
                  This campaign is limited to stocks, the last day is July 10th.
                </p>
                <hr />
              </div>

              <NewArrivals />
            </div>
          </div>
        </div>
        <div className="jumbotron">
          <div className=" p-5 mt-5   text-white h1 font-weight-bold text-center">
            <Jumbotron
              text={[
                "New Arrivals",
                "Best Sellers",
                "Latest Products",
                "Fast Delivery",
              ]}
            />
          </div>
          <div className="text-center p-3 m-3">
            <button className="btn btn-danger h6"> Shop Now </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
