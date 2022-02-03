import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firebaseConfig } from "../../firebase";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
initializeApp(firebaseConfig);

// import { auth } from "../../firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      url: "http://localhost:3000/complete",
      handleCodeInApp: true,
    };

    const auth = getAuth();
    sendSignInLinkToEmail(auth, email, config);
    toast.success(
      `Email is sent to ${email}.Click the link to complete your registration`
    );
    window.localStorage.setItem("emailForReg", email);
    // history.push("/register/complete");
    setEmail("");
  };

  const registerForm = () => (
    <form action="" onSubmit={handleSubmit}>
      <input
        type="email"
        name=""
        id=""
        className="form-control"
        placeholder="Your Email"
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <br />

      <button type="submit" className="btn btn-primary mt-1">
        Register
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4> Register</h4>
          <ToastContainer />
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
