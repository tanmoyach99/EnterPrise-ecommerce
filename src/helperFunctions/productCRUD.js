import axios from "axios";

export const createProduct = async (product, authtoken) => {
  return await axios.post(
    `https://stormy-eyrie-52203.herokuapp.com/api/product`,
    product,

    { headers: { authtoken } }
  );
};

export const getProductsByCount = async (count) => {
  return await axios.get(
    `https://stormy-eyrie-52203.herokuapp.com/api/products/${count}`
  );
};

export const deleteProduct = async (slug, authtoken) => {
  return await axios.delete(
    `https://stormy-eyrie-52203.herokuapp.com/api/product/${slug}`,

    { headers: { authtoken } }
  );
};

export const getProductsForUpdate = async (slug) => {
  return await axios.get(
    `https://stormy-eyrie-52203.herokuapp.com/api/products/update/${slug}`
  );
};

export const updateProducts = async (slug, product, authtoken) => {
  return await axios.put(
    `https://stormy-eyrie-52203.herokuapp.com/api/product/${slug}`,
    product,
    {
      headers: { authtoken },
    }
  );
};

export const getProducts = async (sort, order, page) => {
  return await axios.post(
    `https://stormy-eyrie-52203.herokuapp.com/api/products`,
    {
      sort,
      order,
      page,
    }
  );
};

export const productCount = async () => {
  return await axios.get(
    `https://stormy-eyrie-52203.herokuapp.com/api/products/total`
  );
};

export const ratingProducts = async (productId, star, authtoken) => {
  return await axios.put(
    `https://stormy-eyrie-52203.herokuapp.com/api/product/star/${productId}`,
    { star },
    {
      headers: { authtoken },
    }
  );
};

export const getRelated = async (productId) => {
  return await axios.get(
    `https://stormy-eyrie-52203.herokuapp.com/api/products/related/${productId}`
  );
};

export const getProductsByQuery = async (arg) => {
  return await axios.post(
    `https://stormy-eyrie-52203.herokuapp.com/api/search/filters`,
    arg
  );
};
