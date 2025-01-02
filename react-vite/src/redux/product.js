

const LOAD_PRODUCTS ='products/loadProducts';
// const PRODUCT_DETAILS = 'products/productDetails';
const ADD_PRODUCT = 'products/addProduct';
const UPDATE_PRODUCT = 'products/updateProduct';
const DELETE_PRODUCT = 'products/deleteProduct';

const loadProducts = (products) => {
  return {
    type: LOAD_PRODUCTS,
    products
  }
}

// const productDetails = (product) => {
//   return {
//     type: PRODUCT_DETAILS,
//     product
//   }
// }

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

export const createProduct = (payload) => async (dispatch) => {
  const response = await fetch(`/api/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  if(response.ok) {
    const productData = await response.json();
    dispatch(addProduct(productData))
    return productData
  }
}

export const updateProductThunk = (id, payload) => async (dispatch) => {
  const response = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  if(response.ok) {
    const productDetails = await response.json();
    dispatch(updateProduct(productDetails));
    return productDetails
  }
}

export const deleteProductThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/products/${id}`, {
    method: 'DELETE'
  })

  if(response.ok) {
    dispatch(deleteProduct(id))
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
    case ADD_PRODUCT: {
      const newState = { ...state, [action.product.id]: action.product };
      return newState;
    }
    case UPDATE_PRODUCT: {
      const newState = { ...state }
      newState[action.product.id] = action.product
      return newState;
    }
    case DELETE_PRODUCT: {
      const newState = { ...state }
      delete newState[action.id]
      return newState
    }
    default:
      return state
  }
}

export default productReducer;