import axios from "axios";

export const getSubs = async () => {
  return await axios.get("http://localhost:8000/api/subCategories ");
};

export const getSub = async (slug) => {
  return await axios.get(`http://localhost:8000/api/subCategory/${slug}`);
};

export const removeSub = async (slug, authtoken) => {
  return await axios.delete(
    `http://localhost:8000/api/subCategory/${slug}`,

    { headers: { authtoken } }
  );
};

export const updateSub = async (slug, subCategory, authtoken) => {
  return await axios.put(
    `http://localhost:8000/api/subCategory/${slug}`,
    subCategory,

    { headers: { authtoken } }
  );
};

export const createSub = async (subCategory, authtoken) => {
  return await axios.post(
    `http://localhost:8000/api/subCategory`,
    subCategory,

    { headers: { authtoken } }
  );
};
