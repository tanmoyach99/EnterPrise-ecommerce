let initialState = [];

if (typeof window !== undefined) {
  if (localStorage.getItem("user")) {
    let user = JSON.parse(localStorage.getItem("user"));
    initialState = user.wishlist || initialState;
  } else {
    initialState = [];
  }
}
console.log(initialState);

export const wishlistReducer = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return action.payload;
    case "REMOVE_FROM_WISHLIST":
      return action.payload;
    case "GET_WISHLIST":
      return action.payload;

    default:
      return state;
  }
};
