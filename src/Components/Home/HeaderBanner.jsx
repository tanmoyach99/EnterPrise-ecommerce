import React from "react";
import { Carousel } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "react-slick";
import banner1 from "../../images/banner-01.jpg";
import banner2 from "../../images/banner-02.jpg";
import banner3 from "../../images/banner-03.jpg";
import banner4 from "../../images/banner-04.jpg";
import banner5 from "../../images/banner-05.jpg";
import NavbarCategory from "../Navbar/NavbarCategory";

const banners = [
  {
    title1: "Best Technology With Metal Body",
    title2: "Grab Your Best Deals This March",
    title3: "",
    btnTitle: "Shop Now",
    img: banner1,
  },
  {
    title1: "Trendy Fashion things are for grab ",
    title2: "Choice Between 1000 products",
    title3: "",
    btnTitle: "Explore",
    img: banner2,
  },

  {
    title1: "Black Edition",
    title2: "Dual Stereo Speaker",
    title3: "",
    btnTitle: "Buy this",
    img: banner3,
  },
  {
    title1: "Best Technology With Metal Body",
    title2: "Grab Your Best Deals This March",
    title3: "",
    btnTitle: "Shop Now",
    img: banner1,
  },
  {
    title1: "Best Technology With Metal Body",
    title2: "Grab Your Best Deals This March",
    title3: "",
    btnTitle: "Shop Now",
    img: banner1,
  },
];

const HeaderBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    autoplay: true,

    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="header">
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={banner1} alt="First slide" />
          <Carousel.Caption className="slider-1">
            <h1 className="text-white">Best Technology.</h1>
            <h3 className="text-white"> Metal Body</h3>
            <button className="btn btn-light"> Shop Now</button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={banner2} alt="Second slide" />

          <Carousel.Caption className="slider-2 slider-1">
            <h1 className="text-white"> Trendy Fashion </h1>
            <h3 className="text-white"> Go With The Flow </h3>
            <button className="btn btn-light">Explore</button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={banner3} alt="Third slide" />

          <Carousel.Caption className="slider-3">
            <h2 className="text-white"> Black Edition </h2>
            <h1 className="text-white">Dual Stereo Speaker</h1>

            <button className="btn btn-light"> Buy This </button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={banner4} alt="Third slide" />

          <Carousel.Caption className="slider-4">
            <h1 className="text-white"> Modern Technology</h1>
            <h3 className="text-white"> Biggest Storage</h3>
            <button className="btn btn-light"> Shop Now</button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={banner5} alt="Third slide" />

          <Carousel.Caption className="slider-5">
            <h3> Gaming Processor </h3>
            <h1> 160 Hz Screen. </h1>

            <button className="btn btn-dark"> Hurry Up!</button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HeaderBanner;
