import axios from "axios";

export const userCart = async (cart, authtoken) =>
  await axios.post(
    "http://localhost:8000/api/user/cart ",
    { cart },
    {
      headers: { authtoken },
    }
  );

export const getUserCart = async (authtoken) =>
  await axios.get(
    "http://localhost:8000/api/user/cart",

    {
      headers: { authtoken },
    }
  );

export const emptyUserCart = async (authtoken) =>
  await axios.delete(
    "http://localhost:8000/api/user/cart",

    {
      headers: { authtoken },
    }
  );

export const userAddress = async (authtoken, address) =>
  await axios.post(
    "http://localhost:8000/api/user/address ",
    { address },
    {
      headers: { authtoken },
    }
  );

export const applyCoupon = async (authtoken, coupon) =>
  await axios.post(
    "http://localhost:8000/api/user/cart/coupon ",
    { coupon },
    {
      headers: { authtoken },
    }
  );

export const createOrder = async (authtoken, stripeResponse) =>
  await axios.post(
    "http://localhost:8000/api/user/order ",
    { stripeResponse },
    {
      headers: { authtoken },
    }
  );

export const createOrderWithCash = async (authtoken, COD) =>
  await axios.post(
    "http://localhost:8000/api/user/cash/order ",
    { COD },
    {
      headers: { authtoken },
    }
  );

export const getUserOrders = async (authtoken) =>
  await axios.get(
    "http://localhost:8000/api/user/orders",

    {
      headers: { authtoken },
    }
  );

export const addToWishList = async (productId, authtoken) =>
  await axios.post(
    "http://localhost:8000/api/user/wishlist",
    { productId },

    {
      headers: { authtoken },
    }
  );

export const getWishList = async (authtoken) =>
  await axios.get(
    "http://localhost:8000/api/user/wishlist",

    {
      headers: { authtoken },
    }
  );

export const updateWishlist = async (productId, authtoken) =>
  await axios.put(
    `http://localhost:8000/api/user/wishlist/${productId}`,
    {},

    {
      headers: { authtoken },
    }
  );
