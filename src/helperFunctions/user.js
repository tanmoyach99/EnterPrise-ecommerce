import axios from "axios";

export const userCart = async (cart, authtoken) =>
  await axios.post(
    "https://stormy-eyrie-52203.herokuapp.com/api/user/cart ",
    { cart },
    {
      headers: { authtoken },
    }
  );

export const getUserCart = async (authtoken) =>
  await axios.get(
    "https://stormy-eyrie-52203.herokuapp.com/api/user/cart",

    {
      headers: { authtoken },
    }
  );

export const getUser = async (authtoken) =>
  await axios.get(
    "https://stormy-eyrie-52203.herokuapp.com/api/user/user",

    {
      headers: { authtoken },
    }
  );

export const emptyUserCart = async (authtoken) =>
  await axios.delete(
    "https://stormy-eyrie-52203.herokuapp.com/api/user/cart",

    {
      headers: { authtoken },
    }
  );

export const userAddress = async (authtoken, address) =>
  await axios.post(
    "https://stormy-eyrie-52203.herokuapp.com/api/user/address ",
    { address },
    {
      headers: { authtoken },
    }
  );

export const applyCoupon = async (authtoken, coupon) =>
  await axios.post(
    "https://stormy-eyrie-52203.herokuapp.com/api/user/cart/coupon ",
    { coupon },
    {
      headers: { authtoken },
    }
  );

export const createOrder = async (authtoken, stripeResponse) =>
  await axios.post(
    "https://stormy-eyrie-52203.herokuapp.com/api/user/order ",
    { stripeResponse },
    {
      headers: { authtoken },
    }
  );

export const createOrderWithCash = async (authtoken, COD, coupon) =>
  await axios.post(
    "https://stormy-eyrie-52203.herokuapp.com/api/user/cash/order ",
    { COD, couponApplied: coupon },
    {
      headers: { authtoken },
    }
  );

export const getUserOrders = async (authtoken) =>
  await axios.get(
    "https://stormy-eyrie-52203.herokuapp.com/api/user/orders",

    {
      headers: { authtoken },
    }
  );

export const addToWishList = async (productId, authtoken) =>
  await axios.post(
    "https://stormy-eyrie-52203.herokuapp.com/api/user/wishlist",
    { productId },
    {
      headers: { authtoken },
    }
  );

export const getWishList = async (authtoken) =>
  await axios.get(
    "https://stormy-eyrie-52203.herokuapp.com/api/user/wishlist",
    {
      headers: { authtoken },
    }
  );

export const updateWishlist = async (productId, authtoken) =>
  await axios.put(
    `https://stormy-eyrie-52203.herokuapp.com/api/user/wishlist/${productId}`,
    {},
    {
      headers: { authtoken },
    }
  );
