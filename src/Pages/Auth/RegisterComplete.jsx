import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  getIdTokenResult,
  updatePassword,
  signInWithEmailLink,
} from "firebase/auth";

import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import { firebaseConfig } from "../../firebase";
import { useHistory } from "react-router-dom";
import { createOrUpdateUser } from "../../helperFunctions/createOrUpdate";
initializeApp(firebaseConfig);

const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForReg"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailLink(auth, email, window.location.href).then((result) => {
      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForReg");
        let user = auth.currentUser;
        updatePassword(user, password);
        getIdTokenResult(user).then((userIdTokenResult) => {
          createOrUpdateUser(userIdTokenResult.token)
            .then((res) => {
              dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                  name: res.data.name,
                  email: res.data.email,
                  token: userIdTokenResult.token,
                  role: res.data.role,
                  _id: res.data._id,
                },
              });
            })
            .catch((err) => console.log(err, "err happened"));
        });

        history.push("/");
      }
    });
  };

  const completeRegisterForm = () => (
    <form action="" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        id="email"
        className="form-control"
        value={email}
        disabled
      />
      <br />
      <input
        type="password"
        name="password"
        id="password"
        className="form-control"
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />
      <br />

      <button type="submit" className="btn btn-primary mt-1">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4> Register Complete</h4>
          <ToastContainer />
          {completeRegisterForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
