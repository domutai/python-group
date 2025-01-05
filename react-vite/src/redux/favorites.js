const LOAD_FAVORITES = "favorites/LOAD_FAVORITES";
const ADD_FAVORITE = "favorites/ADD_FAVORITE";
const REMOVE_FAVORITE = "favorites/REMOVE_FAVORITE";

const loadFavorites = (favorites) => ({
  type: LOAD_FAVORITES,
  favorites,
});

const addFavorite = (favorite) => ({
  type: ADD_FAVORITE,
  favorite: {
    ...favorite,
    productId: favorite.productId || favorite.id,
  },
});
const removeFavorite = (favoriteId) => ({
  type: REMOVE_FAVORITE,
  favoriteId,
});

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

      const favoriteData = {
        ...data,
        productId: productId,
      };
      dispatch(addFavorite(favoriteData));
      return favoriteData;
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
    } else {
      const error = await response.json();
      throw new Error(error.message || "Failed to remove favorite");
    }
  } catch (error) {
    console.error("Error removing favorite:", error);
  }
};

const initialState = {
  favorites: [],
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FAVORITES:
      return {
        ...state,
        favorites: action.favorites,
      };
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.favorite],
      };
    case REMOVE_FAVORITE: {
      const updatedFavorites = state.favorites.filter(
        (favorite) => favorite.id !== action.favoriteId
      );
      return {
        ...state,
        favorites: updatedFavorites,
      };
    }
    default:
      return state;
  }
};

export default favoritesReducer;
