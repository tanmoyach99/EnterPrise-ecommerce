import axios from "axios";

export const createOrUpdateUser = async (authToken) => {
  return await axios.post(
    "https://stormy-eyrie-52203.herokuapp.com/api/create-or-update-user",
    {},
    { headers: { authToken } }
  );
};

export const currentUser = async (authToken) => {
  return await axios.post(
    "https://stormy-eyrie-52203.herokuapp.com/api/current-user",
    {},
    { headers: { authToken } }
  );
};

export const currentAdmin = async (authToken) => {
  return await axios.post(
    "https://stormy-eyrie-52203.herokuapp.com/api/current-admin",
    {},
    { headers: { authToken } }
  );
};
