let initialState = [];

if (typeof window !== undefined) {
  if (localStorage.getItem("cart")) {
    initialState = JSON.parse(localStorage.getItem("cart"));
    // initialState = userCart.cart || [];
  } else {
    initialState = [];
  }
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload;
    case "REMOVE_FROM_CART":
      return action.payload;
    // case "GET_CART":
    //   return action.payload;
    default:
      return state;
  }
};
