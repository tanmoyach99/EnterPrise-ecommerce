const express = require("express");
const userRouter = express.Router();

const { authCheck } = require("../middlewares/authMiddle");

const {
  userCart,
  getUserCart,
  emptyCart,
  userAddress,
  applyCoupon,
  createOrder,
  orders,
  addToWishList,
  wishlist,
  wishlistUpdate,
  createCashOrder,
} = require("../controllers/userController");

userRouter.post("/user/cart", authCheck, userCart);
userRouter.post("/user/address", authCheck, userAddress);
userRouter.post("/user/cart/coupon", authCheck, applyCoupon);
userRouter.get("/user/cart", authCheck, getUserCart);
userRouter.delete("/user/cart", authCheck, emptyCart);
userRouter.get("/user/orders", authCheck, orders);

//
userRouter.post("/user/order", authCheck, createOrder);
userRouter.post("/user/cash/order", authCheck, createCashOrder);

//wishlist
userRouter.post("/user/wishlist", authCheck, addToWishList);
userRouter.get("/user/wishlist", authCheck, wishlist);
userRouter.put("/user/wishlist/:productId", authCheck, wishlistUpdate);

module.exports = userRouter;
