const GET_CART = "cart/getCart";
const UPDATE_CART = "cart/UPDATE_CART";
const DELETE_CART = "cart/DELETE_CART";
const ADD_TO_CART = "cart/ADD_TO_CART";
const CHECKOUT = "cart/CHECKOUT";

const getCart = (carts) => ({
  type: GET_CART,
  carts,
});

const updateCart = (cartId, quantity) => ({
  type: UPDATE_CART,
  cartId,
  quantity,
});

const deleteCart = (cartId) => ({
  type: DELETE_CART,
  cartId,
});

const addToCart = (productId, quantity) => ({
  type: ADD_TO_CART,
  productId,
  quantity,
});

const checkout = () => ({
  type: CHECKOUT,
});

export const thunkGetCart = () => async (dispatch) => {
  try {
    const response = await fetch("/api/cart/");
    if (response.ok) {
      const data = await response.json();
      dispatch(getCart(data.cart));
    } else {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch cart");
    }
  } catch (error) {
    console.error("Error fetching cart: ", error.message);
    return error.message;
  }
};

export const thunkUpdateCart = (cartId, quantity) => async (dispatch) => {
  try {
    const response = await fetch(`/api/cart/${cartId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(updateCart(cartId, data.item.quantity));
    }
  } catch (error) {
    console.error("Error updating cart: ", error.message);
    return error.message;
  }
};

export const thunkDeleteCart = (cartId) => async (dispatch) => {
  const response = await fetch(`/api/cart/${cartId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteCart(cartId));
  } else {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete cart item");
  }
};

export const thunkAddToCart = (productId, quantity) => async (dispatch) => {
  const response = await fetch("/api/cart/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, quantity }),
  });

  if (response.ok) {
    dispatch(addToCart(productId, quantity));
  } else {
    const error = await response.json();
    throw new Error(error.message || "Failed to add item to cart");
  }
};

export const thunkCheckout = () => async (dispatch) => {
  const response = await fetch("/api/cart/checkout/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    dispatch(checkout());
  } else {
    const error = response.json();
    throw new Error(error.message || "Failed to checkout cart");
  }
};

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART: {
      return { ...state, cart: action.carts || [] };
    }
    case UPDATE_CART: {
      const updatedCart = state.cart.map((item) =>
        item.id === action.cartId
          ? { ...item, quantity: action.quantity }
          : item
      );
      return { ...state, cart: updatedCart };
    }
    case DELETE_CART: {
      const updatedCart = state.cart.filter(
        (item) => item.id !== action.cartId
      );
      return { ...state, cart: updatedCart };
    }
    case ADD_TO_CART: {
      const existingItem = state.cart.find(
        (item) => item.productId === action.productId
      );

      if (existingItem) {
        const updatedCart = state.cart.map((item) =>
          item.productId === action.productId
            ? { ...item, quantity: item.quantity + action.quantity }
            : item
        );
        return { ...state, cart: updatedCart };
      } else {
        const newItem = {
          productId: action.productId,
          quantity: action.quantity,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }
    }
    case CHECKOUT: {
      return { ...state, cart: [] };
    }
    default:
      return state;
  }
};

export default cartReducer;
