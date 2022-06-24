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

import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import {
  createOrUpdateUser,
  currentUser,
} from "../../helperFunctions/createOrUpdate";
import { getUser, getWishList, getUserCart } from "../../helperFunctions/user";

initializeApp(firebaseConfig);

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [users, setUsers] = useState([]);

  const { user, wishlist } = useSelector((state) => ({ ...state }));
  const [email, setEmail] = useState("");
  const [wish, setWish] = useState([]);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [u, setU] = useState({});

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
        history.push("/");
      } else {
        history.push("/");
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
          getWishList(idTokenResult?.token).then((res) => {
            console.log(res.data);
            setWish(res.data.wishlist);
            dispatch({
              type: "GET_WISHLIST",
              payload: res.data.wishlist,
            });
            localStorage.setItem("user", JSON.stringify(res.data));
          });
          // getUserCart(idTokenResult?.token).then((res) => {
          //   console.log(res.data);
          //   dispatch({
          //     type: "GET_CART",
          //     payload: res.data,
          //   });
          //   localStorage.setItem("cart", JSON.stringify(res.data));
          // });

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
            getWishList(idTokenResult?.token).then((res) => {
              console.log(res.data);
              setWish(res.data.wishlist);
              dispatch({
                type: "GET_WISHLIST",
                payload: res.data.wishlist,
              });
              localStorage.setItem("user", JSON.stringify(res.data));
            });

            // getUserCart(idTokenResult?.token).then((res) => {
            //   console.log(res.data);
            //   dispatch({
            //     type: "GET_CART",
            //     payload: res.data,
            //   });
            //   localStorage.setItem("cart", JSON.stringify(res.data));
            // });
            // localStorage.setItem("user", JSON.stringify(wish));

            // window.localStorage.setItem("id", res.data._id);
            // roleBasedRedirect(res);
          })
          .catch((err) => console.log(err, "err happened"));
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
