// Action Types
const LOAD_FAVORITES = "favorites/LOAD_FAVORITES";
const ADD_FAVORITE = "favorites/ADD_FAVORITE";
const REMOVE_FAVORITE = "favorites/REMOVE_FAVORITE";
const CLEAR_FAVORITES = "favorites/CLEAR_FAVORITES";

// Action Creators
const loadFavorites = (favorites) => ({
  type: LOAD_FAVORITES,
  favorites,
});

const addFavorite = (favorite) => ({
  type: ADD_FAVORITE,
  favorite,
});

const removeFavorite = (favoriteId) => ({
  type: REMOVE_FAVORITE,
  favoriteId,
});

export const clearFavorites = () => ({
  type: CLEAR_FAVORITES,
});

// Thunks
export const getFavorites = () => async (dispatch) => {
  try {
    const response = await fetch("/api/favorites/");
    if (response.ok) {
      const data = await response.json();
      dispatch(loadFavorites(data.favorites));
      return data.favorites;
    }
  } catch (error) {
    console.error("Error fetching favorites:", error);
  }
};

export const addToFavorites = (productId) => async (dispatch) => {
  try {
    const response = await fetch("/api/favorites/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    if (response.ok) {
      const data = await response.json();
      // Make sure we dispatch with all necessary data
      dispatch(
        addFavorite({
          id: data.id,
          productId: parseInt(productId, 10), // Ensure productId is a number
          userId: data.userId,
        })
      );
      return data;
    }
  } catch (error) {
    console.error("Error adding favorite:", error);
  }
};

export const removeFromFavorites = (favoriteId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/favorites/${favoriteId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(removeFavorite(favoriteId));
      return favoriteId;
    }
  } catch (error) {
    console.error("Error removing favorite:", error);
  }
};

// Initial State
const initialState = {
  favorites: [],
};

// Reducer
const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FAVORITES:
      return {
        ...state,
        favorites: action.favorites,
      };
    case ADD_FAVORITE: {
      // Check if the favorite already exists
      const exists = state.favorites.some(
        (fav) => fav.id === action.favorite.id
      );
      if (exists) return state;

      return {
        ...state,
        favorites: [...state.favorites, action.favorite],
      };
    }
    case REMOVE_FAVORITE: {
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite.id !== action.favoriteId
        ),
      };
    }
    case CLEAR_FAVORITES:
      return {
        ...state,
        favorites: [],
      };
    default:
      return state;
  }
};

export default favoritesReducer;
