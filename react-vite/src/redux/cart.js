const GET_CART = "cart/getCart";

const getCart = (carts) => ({
  type: GET_CART,
  carts,
});

export const thunkGetCart = () => async (dispatch) => {
  try {
    const response = await fetch("/api/cart");
    if (response.ok) {
      const data = await response.json();
      dispatch(getCart(data));
    } else {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch cart");
    }
  } catch (error) {
    console.error("Error fetching cart: ", error.message);
    return error.message;
  }
};

const initialState = {
  cart: [],
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART: {
      return { ...state, cart: action.carts };
    }
    default:
      return state;
  }
}

export default cartReducer;
