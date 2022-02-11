import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Navbar from "./Components/Navbar/Navbar";
import RegisterComplete from "./Pages/Auth/RegisterComplete";
import { getAuth, getIdTokenResult, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import { currentUser } from "./helperFunctions/createOrUpdate";
import UserHistory from "./Pages/User/UserHistory";
import UserRoutes from "./Components/Routes/UserRoutes";
import Password from "./Pages/User/Password";
import Wishlist from "./Pages/User/Wishlist";
import AdminRoutes from "./Components/Routes/AdminRoutes";
import Dashboard from "./Pages/Admin/Dashboard";
import CategoryCreate from "./Pages/Admin/Category/CategoryCreate";
import CategoryUpdate from "./Pages/Admin/Category/CategoryUpdate";
import Subcategory from "./Pages/Admin/SubCategory/Subcategory";
import SubUpdate from "./Pages/Admin/SubCategory/SubUpdate";
import ProductCreate from "./Pages/Admin/Product/ProductCreate";
import AllProducts from "./Pages/Admin/Product/AllProducts";
import ProductUpdate from "./Pages/Admin/Product/ProductUpdate";
import Product from "./Pages/Product";
import Category from "./Pages/Category";
import SubCategory from "./Pages/SubCategory";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import SideDrawer from "./Components/Drawer/SideDrawer";
import Checkout from "./Pages/Checkout";
import CreateCoupon from "./Pages/Admin/Coupons/CreateCoupon";
import Payment from "./Pages/Payment";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await getIdTokenResult(user);
        currentUser(idTokenResult.token)
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
          })
          .catch((err) => console.log(err));
      }
    });

    return () => unSubscribe();
  }, []);
  return (
    <>
      <Navbar />
      <SideDrawer />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/shop">
          <Shop />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/complete">
          <RegisterComplete />
        </Route>
        <Route path="/forgotPassword">
          <ForgotPassword />
        </Route>
        <Route path="/product/:slug">
          <Product />
        </Route>

        <Route path="/category/:slug">
          <Category />
        </Route>

        <Route path="/sub/:slug">
          <SubCategory />
        </Route>

        <UserRoutes path="/user/history">
          <UserHistory />
        </UserRoutes>

        <UserRoutes path="/payment">
          <Payment />
        </UserRoutes>
        <UserRoutes path="/checkout">
          <Checkout />
        </UserRoutes>
        <UserRoutes path="/user/password">
          <Password />
        </UserRoutes>
        <UserRoutes path="/user/wishlist">
          <Wishlist />
        </UserRoutes>
        <AdminRoutes path="/admin/dashboard">
          <Dashboard />
        </AdminRoutes>
        <AdminRoutes path="/admin/category">
          <CategoryCreate />
        </AdminRoutes>
        <AdminRoutes path="/admin/sub">
          <Subcategory />
        </AdminRoutes>
        <AdminRoutes exact path="/admin/update/:slug">
          <CategoryUpdate />
        </AdminRoutes>
        <AdminRoutes exact path="/admin/subUpdate/:slug">
          <SubUpdate />
        </AdminRoutes>
        <AdminRoutes exact path="/admin/product">
          <ProductCreate />
        </AdminRoutes>
        <AdminRoutes exact path="/admin/products">
          <AllProducts />
        </AdminRoutes>
        <AdminRoutes exact path="/admin/coupons">
          <CreateCoupon />
        </AdminRoutes>
        <AdminRoutes exact path="/admin/updateProduct/:slug">
          <ProductUpdate />
        </AdminRoutes>
      </Switch>
    </>
  );
}

export default App;
