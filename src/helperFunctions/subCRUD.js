import axios from "axios";

export const getSubs = async () => {
  return await axios.get(
    "https://stormy-eyrie-52203.herokuapp.com/api/subCategories "
  );
};

export const getSub = async (slug) => {
  return await axios.get(
    `https://stormy-eyrie-52203.herokuapp.com/api/subCategory/${slug}`
  );
};

export const removeSub = async (slug, authtoken) => {
  return await axios.delete(
    `https://stormy-eyrie-52203.herokuapp.com/api/subCategory/${slug}`,

    { headers: { authtoken } }
  );
};

export const updateSub = async (slug, subCategory, authtoken) => {
  return await axios.put(
    `https://stormy-eyrie-52203.herokuapp.com/api/subCategory/${slug}`,
    subCategory,

    { headers: { authtoken } }
  );
};

export const createSub = async (subCategory, authtoken) => {
  return await axios.post(
    `https://stormy-eyrie-52203.herokuapp.com/api/subCategory`,
    subCategory,

    { headers: { authtoken } }
  );
};
