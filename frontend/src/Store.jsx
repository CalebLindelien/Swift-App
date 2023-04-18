import { createContext, useReducer } from 'react';

// Create a new context called "Store".
export const Store = createContext();

// Retrieve the user information from localStorage, if it exists.
const userInfoFromStorage = localStorage.getItem('userInfo');
let userInfo = null;
if (userInfoFromStorage) {
  try {
    userInfo = JSON.parse(userInfoFromStorage);
  } catch (error) {
    console.error('Error parsing userInfo from localStorage:', error);
  }
}

// Retrieve the shipping address from localStorage, if it exists.
const shippingAddressFromStorage = localStorage.getItem('shippingAddress');
let shippingAddress = {};
if (shippingAddressFromStorage) {
  try {
    shippingAddress = JSON.parse(shippingAddressFromStorage);
  } catch (error) {
    console.error('Error parsing shippingAddress from localStorage:', error);
  }
}

// Retrieve the payment method from localStorage, if it exists.
const paymentMethodFromStorage = localStorage.getItem('paymentMethod');
let paymentMethod = '';
if (paymentMethodFromStorage) {
  paymentMethod = paymentMethodFromStorage;
}

// Retrieve the cart items from localStorage, if they exist.
const cartItemsFromStorage = localStorage.getItem('cartItems');
let cartItems = [];
if (cartItemsFromStorage) {
  try {
    cartItems = JSON.parse(cartItemsFromStorage);
  } catch (error) {
    console.error('Error parsing cartItems from localStorage:', error);
  }
}

// Define the initial state of the application.
const initialState = {
  userInfo, // user information retrieved from localStorage
  cart: {
    shippingAddress, // shipping address retrieved from localStorage
    paymentMethod, // payment method retrieved from localStorage
    cartItems, // cart items retrieved from localStorage
  },
};

// Define the reducer function that will modify the state of the application.
function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      // Add a new item to the cart.
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case 'CART_REMOVE_ITEM': {
      // Remove an item from the cart.
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_CLEAR':
      // Clear all items from the cart.
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    case 'USER_SIGNIN':
      // Sign in the user and update their information in the state.
      return { ...state, userInfo: action.payload };
    case 'USER_SIGNOUT':
      // Sign out the user and reset the cart and their information in the state.
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: '',
        },
      };
    case 'SAVE_SHIPPING_ADDRESS':
      // Save the shipping address to the cart in the state.
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    case 'SAVE_PAYMENT_METHOD':
      // Save the payment method to the cart in the state.
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    default:
      return state;
  }
}

// Create a new component called "StoreProvider" that will wrap the entire application.
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  // Return the Store provider component, which wraps the rest of the application with the provided context and its children
  // The value prop is set to value object above, containing the state and dispatch functions
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
