import axios from "axios";

export const createProduct = async (product, authtoken) => {
  return await axios.post(
    `http://localhost:8000/api/product`,
    product,

    { headers: { authtoken } }
  );
};

export const getProductsByCount = async (count) => {
  return await axios.get(`http://localhost:8000/api/products/${count}`);
};

export const deleteProduct = async (slug, authtoken) => {
  return await axios.delete(
    `http://localhost:8000/api/product/${slug}`,

    { headers: { authtoken } }
  );
};

export const getProductsForUpdate = async (slug) => {
  return await axios.get(`http://localhost:8000/api/products/update/${slug}`);
};

export const updateProducts = async (slug, product, authtoken) => {
  return await axios.put(`http://localhost:8000/api/product/${slug}`, product, {
    headers: { authtoken },
  });
};

export const getProducts = async (sort, order, page) => {
  return await axios.post(`http://localhost:8000/api/products`, {
    sort,
    order,
    page,
  });
};

export const productCount = async () => {
  return await axios.get(`http://localhost:8000/api/products/total`);
};

export const ratingProducts = async (productId, star, authtoken) => {
  return await axios.put(
    `http://localhost:8000/api/product/star/${productId}`,
    { star },
    {
      headers: { authtoken },
    }
  );
};

export const getRelated = async (productId) => {
  return await axios.get(
    `http://localhost:8000/api/products/related/${productId}`
  );
};

export const getProductsByQuery = async (arg) => {
  return await axios.post(`http://localhost:8000/api/search/filters`, arg);
};
