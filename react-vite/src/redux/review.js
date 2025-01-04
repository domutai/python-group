
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

const deleteReview = (id, productId) => {
  return {
    type: DELETE_REVIEW,
    review: {id, productId}
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

export const deleteReviewThunk = (id, productId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${id}`, {
    method: 'DELETE'
  })

  if(response.ok) {
    dispatch(deleteReview(id, productId))
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
      let reviews = newState[action.review.productId]?.slice();
        reviews = reviews || [];
        reviews.push(action.review);
        newState[action.review.productId] = reviews
      return newState;
    }
    case UPDATE_REVIEW: {
      const newState = { ...state }
      const newReviews = newState[action.review.productId].map(r => {
        if(r.id === action.review.id) {
          return action.review
        }
        return r
      })
      newState[action.review.productId] = newReviews
      return newState
    }
    case DELETE_REVIEW: {
      const newState = { ...state }
      if(newState[action.review.productId]) {
        newState[action.review.productId] = newState[action.review.productId].filter(review => review.id !== action.review.id)
      }
        return newState
    }
    default:
      return state
  }
}

export default reviewsReducer;