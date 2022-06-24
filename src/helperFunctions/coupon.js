import axios from "axios";

export const createCoupon = async (coupon, authtoken) => {
  return await axios.post(
    `https://stormy-eyrie-52203.herokuapp.com/api/coupon `,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getCoupons = async () => {
  return await axios.get(
    "https://stormy-eyrie-52203.herokuapp.com/api/coupons "
  );
};

export const removeCoupons = async (couponId, authtoken) => {
  return await axios.delete(
    `https://stormy-eyrie-52203.herokuapp.com/api/coupons/${couponId} `,
    {
      headers: {
        authtoken,
      },
    }
  );
};
