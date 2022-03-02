import React from "react";
import {
  GooglePlusOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  PhoneOutlined,
  MailOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import logo from "../../images/Venom_prev_ui.png";

const Footer = () => {
  return (
    <>
      <div className="bg bg-light mt-5 p-5 footer ">
        <div className="newsletter d-flex container offset-md-1 align-items-center justify-content-center bg-secondary p-5 rounded">
          <div className="col-md-5">
            <h2 className="fw-normal">Subscribe Now !</h2>

            <span className="text-warning">Signing up to our Newsletter</span>
          </div>
          <div
            className="d-flex align-content-inline col-md-5"
            style={{ width: "40rem", height: "3.2rem" }}
          >
            <input type="text" name="" id="" className="form-control" />{" "}
            <button className="btn btn-warning">SUBSCRIBE</button>
          </div>
        </div>
        <div className="footer-menu container d-flex align-items-center mt-5 justify-content-center">
          <div className="img-w-desc col-md-3 footer-menu-1 m-2 p-2">
            <img
              src={logo}
              alt=""
              className="img-fluid"
              style={{ width: "80%" }}
            />
            <p className="text-wrap text-secondary">
              Lorem ipsum dolor sit amet consectetur, adipisicing espant.
              Asperiores pariatur minus quas dolore voluptatibus aspanas, magnam
              nostrum repudiandae vitae, ipsum culpa exercitationem impedit
            </p>
            <div className="icons d-flex">
              <span>
                <GooglePlusOutlined className="fs-4 fw-normal p-1 m-1" />
              </span>
              <span>
                <FacebookOutlined className="fs-4 fw-normal p-1 m-1" />
              </span>
              <span>
                <InstagramOutlined className="fs-4 fw-normal p-1 m-1" />
              </span>
              <span>
                <TwitterOutlined className="fs-4 fw-normal p-1 m-1" />
              </span>
            </div>
          </div>
          <div className=" offset-md-2 col-md-2 m-2 ms-4 p-2 footer-menu-2 text-center footer-col">
            <h6>Customer Service</h6>

            <span className="text-secondary span-text">Help Center</span>
            <br />
            <span className="text-secondary span-text">Returns</span>
            <br />
            <span className="text-secondary span-text">Product Recalls</span>
            <br />
            <span className="text-secondary span-text">Accessibility</span>
            <br />
            <span className="text-secondary span-text">Contact Us</span>
          </div>
          <div className="col-md-2 m-2 p-2 text-center footer-menu-3 footer-col">
            <h6>Quick Links</h6>

            <span className="text-secondary span-text">Return Policy</span>
            <br />
            <span className="text-secondary span-text">Terms of Use</span>
            <br />
            <span className="text-secondary span-text">Security</span>
            <br />
            <span className="text-secondary span-text">About Us</span>
            <br />
            <span className="text-secondary span-text">Store Pickup</span>
          </div>
          <div className="col-md-2 m-2 p-2 footer-menu-4 text-center footer-call">
            <h6>Contact Us</h6>

            <span className="text-secondary span-text">
              W898 RTower Stat, Suite 56
            </span>
            <br />
            <span className="text-secondary span-text">
              <PhoneOutlined className="m-1 p-1 text--dark" />
              458-965-3224
            </span>
            <br />
            <span className="text-secondary span-text">
              <MailOutlined className="m-1 p-1 text--dark" />
              Support@info.Com
            </span>
            <br />
            <span className="text-secondary span-text">
              <MobileOutlined className="m-1 p-1 text--dark" />
              458-965-3224
            </span>
          </div>
        </div>
      </div>
      <div className="bg-dark text-center p-5 rounded">
        <span className="text-white">
          Copyright © 2022 - Venom All Rights Reserved.
        </span>
      </div>
    </>
  );
};

export default Footer;
