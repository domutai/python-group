

const LOAD_PRODUCTS ='products/loadProducts';
const PRODUCT_DETAILS = 'products/productDetails';
const ADD_PRODUCT = 'products/addProduct';
const UPDATE_PRODUCT = 'products/updateProduct';
const DELETE_PRODUCT = 'products/deleteProduct';

const loadProducts = (products) => {
  return {
    type: LOAD_PRODUCTS,
    products
  }
}

const productDetails = (product) => {
  return {
    type: PRODUCT_DETAILS,
    product
  }
}

const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product
  }
}

const updateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}

const deleteProduct = (id) => {
  return {
    type: DELETE_PRODUCT,
    id
  }
}

export const loadAllProducts = () => async (dispatch) => {
  const response = await fetch(`/api/products`);

  if(response.ok) {
    const data = await response.json()
    dispatch(loadProducts(data))
    return data;
  }
}

export const productDetailsThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/products/${id}`);

  if(response.ok) {
    const details = await response.json();
    dispatch(productDetails(details))
    return details;
  }
}


const initialState = {};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      if(!Array.isArray(action.products)) {
        return state;
      }
      const newState = { ...state }
      action.products.forEach((product) => {newState[product.id] = product});
      return newState
    }
    case PRODUCT_DETAILS: {
      const newState = { ...state };
      newState[action.product.id] = action.product;
      return newState;
    }
    default:
      return state
  }
}

export default productReducer;