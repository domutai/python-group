
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
}

export const createReview = (id, payload) => async (dispatch) => {
  const response = await fetch(`api/products/${id}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  })
  const review = await response.json();
  dispatch(addReview(review))
  return review
}

export const deleteReviewThunk = (id, productId) => async (dispatch) => {
  const response = await fetch(`/reviews/${id}`, {
    method: 'DELETE'
  })

  if(response.ok) {
    dispatch(deleteReview(id, productId))
  }
}

const initialState = {}

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default reviewsReducer;