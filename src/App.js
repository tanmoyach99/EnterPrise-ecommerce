import { useDispatch } from "react-redux";
import { getAuth, getIdTokenResult, onAuthStateChanged } from "firebase/auth";
import { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { currentUser } from "./helperFunctions/createOrUpdate";
import "./App.css";
import { firebaseConfig } from "./firebase";
import { initializeApp } from "firebase/app";
const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Auth/Login"));
const Register = lazy(() => import("./Pages/Auth/Register"));
const RegisterComplete = lazy(() => import("./Pages/Auth/RegisterComplete"));

const ForgotPassword = lazy(() => import("./Pages/Auth/ForgotPassword"));

const UserHistory = lazy(() => import("./Pages/User/UserHistory"));
const UserRoutes = lazy(() => import("./Components/Routes/UserRoutes"));
const Password = lazy(() => import("./Pages/User/Password"));
const Wishlist = lazy(() => import("./Pages/User/Wishlist"));
const AdminRoutes = lazy(() => import("./Components/Routes/AdminRoutes"));
const Dashboard = lazy(() => import("./Pages/Admin/Dashboard"));
const CategoryCreate = lazy(() =>
  import("./Pages/Admin/Category/CategoryCreate")
);
const CategoryUpdate = lazy(() =>
  import("./Pages/Admin/Category/CategoryUpdate")
);
const Subcategory = lazy(() => import("./Pages/Admin/SubCategory/Subcategory"));
const SubUpdate = lazy(() => import("./Pages/Admin/SubCategory/SubUpdate"));
const ProductCreate = lazy(() => import("./Pages/Admin/Product/ProductCreate"));
const AllProducts = lazy(() => import("./Pages/Admin/Product/AllProducts"));
const ProductUpdate = lazy(() => import("./Pages/Admin/Product/ProductUpdate"));
const Product = lazy(() => import("./Pages/Product"));
const Category = lazy(() => import("./Pages/Category"));
const SubCategory = lazy(() => import("./Pages/SubCategory"));
const Shop = lazy(() => import("./Pages/Shop"));
const Cart = lazy(() => import("./Pages/Cart"));
const SideDrawer = lazy(() => import("./Components/Drawer/SideDrawer"));
const Checkout = lazy(() => import("./Pages/Checkout"));
const CreateCoupon = lazy(() => import("./Pages/Admin/Coupons/CreateCoupon"));
const Payment = lazy(() => import("./Pages/Payment"));
const HomeNavbar = lazy(() => import("./Components/Navbar/HomeNavbar"));
const Footer = lazy(() => import("./Components/Home/Footer"));

function App() {
  const dispatch = useDispatch();
 

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
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
    <Suspense
      fallback={
        <div>
          <p>Loading</p>
        </div>
      }
    >
      <HomeNavbar />
      <SideDrawer />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/shop">
          <Shop />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/complete">
          <RegisterComplete />
        </Route>
        <Route exact path="/forgotPassword">
          <ForgotPassword />
        </Route>
        <Route exact path="/product/:slug">
          <Product />
        </Route>

        <Route exact path="/:slug" render={() => <Category />} />

        <Route exact path="/sub/:slug">
          <SubCategory />
        </Route>

        <UserRoutes exact path="/user/history">
          <UserHistory />
        </UserRoutes>

        <UserRoutes path="/user/payment">
          <Payment />
        </UserRoutes>
        <UserRoutes path="/user/checkout">
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
      <Footer />
    </Suspense>
  );
}

export default App;
