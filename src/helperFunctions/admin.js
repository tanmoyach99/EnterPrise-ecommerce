import axios from "axios";

export const getOrders = async (authtoken) =>
  await axios.get("https://stormy-eyrie-52203.herokuapp.com/api/admin/orders", {
    headers: { authtoken },
  });

export const changeStatus = async (orderId, orderStatus, authtoken) => {
  return await axios.put(
    "https://stormy-eyrie-52203.herokuapp.com/api/admin/orderStatus",
    { orderId, orderStatus },
    {
      headers: { authtoken },
    }
  );
};
