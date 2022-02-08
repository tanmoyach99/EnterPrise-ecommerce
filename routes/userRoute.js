const express = require("express");
const userRouter = express.Router();

const { authCheck } = require("../middlewares/authMiddle");

const {
  userCart,
  getUserCart,
  emptyCart,
  userAddress,
  applyCoupon,
} = require("../controllers/userController");

userRouter.post("/user/cart", authCheck, userCart);
userRouter.post("/user/address", authCheck, userAddress);
userRouter.post("/user/cart/coupon", authCheck, applyCoupon);
userRouter.get("/user/cart", authCheck, getUserCart);
userRouter.delete("/user/cart", authCheck, emptyCart);

module.exports = userRouter;
