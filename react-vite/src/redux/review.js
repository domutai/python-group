
const LOAD_REVIEWS = 'reviews/loadReviews';
const ADD_REVIEW = 'reviews/addReview';
const UPDATE_REVIEW = 'reviews/updateReview';
const DELETE_REVIEW = 'reviews/deleteReview';

const loadReviews = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    reviews
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
    dispatch(loadReviews(data))
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
      return { ...state, reviews: action.reviews };
    }
    case ADD_REVIEW: {
      const newState = { ...state };
      // let reviews = newState[action.review.productId].slice();
      let reviews = newState[action.review.productId] || [];
        // reviews = reviews || [];
        reviews.push(action.review);
        newState[action.review.productId] = reviews
      return newState;
    }
    case DELETE_REVIEW: {
      const newState = { ...state }
      if(newState[action.review.productId]) {
        const newReviews = newState[action.review.productId].filter(r => r.id !== action.review.id)
        newState[action.review.productId] = newReviews
      }
        return newState
    }
    default:
      return state
  }
}

export default reviewsReducer;