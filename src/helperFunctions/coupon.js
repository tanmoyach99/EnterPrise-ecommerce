import axios from "axios";

export const createCoupon = async (coupon, authtoken) => {
  return await axios.post(
    `http://localhost:8000/api/coupon `,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getCoupons = async () => {
  return await axios.get("http://localhost:8000/api/coupons ");
};

export const removeCoupons = async (couponId, authtoken) => {
  return await axios.delete(`http://localhost:8000/api/coupons/${couponId} `, {
    headers: {
      authtoken,
    },
  });
};
