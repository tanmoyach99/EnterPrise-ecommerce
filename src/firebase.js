import { initializeApp } from "firebase/app";
// import * as firebase from "firebase";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyCYzlB2ItnyHSibhTjVXEJWW6plo96KeBI",
  authDomain: "ecommerce-solution-ccb9e.firebaseapp.com",
  projectId: "ecommerce-solution-ccb9e",
  storageBucket: "ecommerce-solution-ccb9e.appspot.com",
  messagingSenderId: "351353551980",
  appId: "1:351353551980:web:8b07f89eea7ace9790ac49",
};

initializeApp(firebaseConfig);

//

// export const googleAuthProvider = new getAuth.googleAuthProvider();

// const Home = lazy(() => import("./Pages/Home"));
// const Login = lazy(() => import("./Pages/Auth/Login"));
// const Register = lazy(() => import("./Pages/Auth/Register"));
// const RegisterComplete = lazy(() => import("./Pages/Auth/RegisterComplete"));

// const ForgotPassword = lazy(() => import("./Pages/Auth/ForgotPassword"));

// const UserHistory = lazy(() => import("./Pages/User/UserHistory"));
// const UserRoutes = lazy(() => import("./Components/Routes/UserRoutes"));
// const Password = lazy(() => import("./Pages/User/Password"));
// const Wishlist = lazy(() => import("./Pages/User/Wishlist"));
// const AdminRoutes = lazy(() => import("./Components/Routes/AdminRoutes"));
// const Dashboard = lazy(() => import("./Pages/Admin/Dashboard"));
// const CategoryCreate = lazy(() =>
//   import("./Pages/Admin/Category/CategoryCreate")
// );
// const CategoryUpdate = lazy(() =>
//   import("./Pages/Admin/Category/CategoryUpdate")
// );
// const Subcategory = lazy(() => import("./Pages/Admin/SubCategory/Subcategory"));
// const SubUpdate = lazy(() => import("./Pages/Admin/SubCategory/SubUpdate"));
// const ProductCreate = lazy(() => import("./Pages/Admin/Product/ProductCreate"));
// const AllProducts = lazy(() => import("./Pages/Admin/Product/AllProducts"));
// const ProductUpdate = lazy(() => import("./Pages/Admin/Product/ProductUpdate"));
// const Product = lazy(() => import("./Pages/Product"));
// const Category = lazy(() => import("./Pages/Category"));
// const SubCategory = lazy(() => import("./Pages/SubCategory"));
// const Shop = lazy(() => import("./Pages/Shop"));
// const Cart = lazy(() => import("./Pages/Cart"));
// const SideDrawer = lazy(() => import("./Components/Drawer/SideDrawer"));
// const Checkout = lazy(() => import("./Pages/Checkout"));
// const CreateCoupon = lazy(() => import("./Pages/Admin/Coupons/CreateCoupon"));
// const Payment = lazy(() => import("./Pages/Payment"));
// const HomeNavbar = lazy(() => import("./Components/Navbar/HomeNavbar"));
// const Footer = lazy(() => import("./Components/Home/Footer"));
