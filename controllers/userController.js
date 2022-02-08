const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");

exports.userCart = async (req, res) => {
  const { cart } = req.body;
  //   console.log(cart);

  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  //check if cart with logged in user id already exist

  let cartExistByThisUser = await Cart.findOne({ orderedBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log("remove old carts");
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};
    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;
    //get price for getting total price
    let { price } = await Product.findById(cart[i]._id).select("price").exec();
    object.price = price;

    products.push(object);
  }

  // console.log('products',products);

  let cartTotal = 0;

  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }
  // console.log("cartTotal",cartTotal)
  let newCart = await new Cart({
    products,
    cartTotal,
    orderedBy: user._id,
  }).save();

  res.json({ ok: true });
};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();
  console.log(cart);

  if (cart !== null) {
    const { products, cartTotal, totalAfterDiscount } = cart;
    res.json({ products, cartTotal, totalAfterDiscount });
  }
};

exports.emptyCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();
  res.json(cart);
};

exports.userAddress = async (req, res) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();

  res.json({ ok: true });
};

exports.applyCoupon = async (req, res) => {
  const { coupon } = req.body;
  //   console.log(coupon);
  const validCoupon = await Coupon.findOne({ name: coupon }).exec();
  if (validCoupon === null) {
    return res.json({
      err: "invalid Coupon",
    });
  }

  //   console.log("valid coupon", validCoupon);

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products, cartTotal } = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product", "_id title price")
    .exec();

  //    .populate("products.product", "_id title price")
  //   2nd argument is for the field you chose to populate

  //total after applying coupon to
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);

  await Cart.findOneAndUpdate(
    { orderedBy: user._id },
    { totalAfterDiscount },
    { new: true }
  );
  res.json(totalAfterDiscount);
};
