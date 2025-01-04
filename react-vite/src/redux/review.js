
const LOAD_REVIEWS = 'reviews/loadReviews';
const ADD_REVIEW = 'reviews/addReview';
const UPDATE_REVIEW = 'reviews/updateReview';
const DELETE_REVIEW = 'reviews/deleteReview';

const loadReviews = (payload) => {
  return {
    type: LOAD_REVIEWS,
    reviews: payload.reviews,
    productId: payload.productId
  }
}

const addReview = (review) => {
  return {
    type: ADD_REVIEW,
    review
  }
}

const updateReview = (review) => {
  return {
    type: UPDATE_REVIEW,
    review
  } 
}

const deleteReview = (id) => {
  return {
    type: DELETE_REVIEW,
    id
  }
}

export const loadAllReviews = (id) => async (dispatch) => {
  const response = await fetch(`/api/products/${id}/reviews`);

  if(response.ok) {
    const data = await response.json()
    dispatch(loadReviews({ reviews: data, productId: id}))
    return data
  }
  else {
    return {'message': 'Not working'}
  }
}

export const createReview = (id, payload) => async (dispatch) => {
  try {
    const response = await fetch(`/api/products/${id}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    })
  if(!response.ok) {
    throw new Error(response.statusText)
  }
    const review = await response.json();
    dispatch(addReview(review))
    return review
  }
  catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

export const updateReviewThunk = (id, payload) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  })
  if(response.ok) {
    const reviewDetails = await response.json()
    dispatch(updateReview(reviewDetails))
    return reviewDetails
  }
}

export const deleteReviewThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${id}`, {
    method: 'DELETE'
  })

  if(response.ok) {
    dispatch(deleteReview(id))
  }
}

const initialState = {}

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      const newState = { ...state }
      newState[action.productId] = action.reviews
      return newState
    }
    case ADD_REVIEW: {
      const newState = { ...state };
      const newReview = action.review;
      if(!newState[newReview.productid]) {
        newState[newReview.productid] = []
      }
      newState[newReview.productid] = [...newState[newReview.productid], newReview];
      return newState
    }
    case UPDATE_REVIEW: {
      const newState = { ...state }
      const newReviews = newState[action.review.productid].map(r => {
        if(r.id === action.review.id) {
          return action.review
        }
        return r
      })
      newState[action.review.productid] = newReviews
      return newState
    }
    case DELETE_REVIEW: {
      const newState = { ...state }
      // newState[action.id] = newState[action.id].filter(review => review.id !== action.id)
      const productId = Object.keys(newState).find((id) => newState[id].some((review) => review.id === action.id))
      newState[productId] = newState[productId].filter((review) => review.id !== action.id)
      return newState
    }
    default:
      return state
  }
}

export default reviewsReducer;