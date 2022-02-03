import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  getIdTokenResult,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firebaseConfig } from "../../firebase";
import { Button } from "antd";
import axios from "axios";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { createOrUpdateUser } from "../../helperFunctions/createOrUpdate";

initializeApp(firebaseConfig);

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((state) => ({ ...state }));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) {
        history.push("/");
      }
    }
  }, [user, history]);

  const roleBasedRedirect = (res) => {
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/user/history");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const auth = getAuth();
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user } = result;
      const idTokenResult = await getIdTokenResult(user);
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err, "err happened"));
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
    // console.table(email, password);
  };

  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await getIdTokenResult(user);
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            // console.log(res);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            // window.localStorage.setItem("id", res.data._id);
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err, "err happened"));
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const loginForm = () => (
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
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        className="form-control"
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />
      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
        className="mt-1 mb-1"
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4> Login </h4>
          <ToastContainer />
          {loginForm()}

          <Button
            onClick={handleGoogleLogin}
            type="danger"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
            className="mt-1 mb-1"
          >
            Login with Google
          </Button>
          <Link to="/forgotPassword" className="text-danger">
            Forgot Password?{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
