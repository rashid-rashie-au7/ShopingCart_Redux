import { ADD_TO_CART, REMOVE_TO_CART } from "../types";

export const addToCart = (product) => (dispatch,getState) =>{
    console.log("cart Action==", product)
    const cartItems = getState().cart.cartItems.slice();
    console.log("cart Action 2==", cartItems)
  let alreadyExists = false;
  cartItems.forEach((x) => {
    if (x._id === product._id) {
      alreadyExists = true;
      x.count++;
    }
  });
  if (!alreadyExists) {
    console.log("if in cartaction")
    cartItems.push({ ...product, count: 1 });
    console.log("cart Action if==", cartItems)
  }
  dispatch(  
    {
    type: ADD_TO_CART,
    payload: {cartItems},
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart =(product) => (dispatch,getState) => {
    const cartItems = getState()
    .cart.cartItems.slice()
    .filter((x) => x._id !== product._id);
  dispatch({ type: REMOVE_TO_CART, payload: { cartItems } });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};