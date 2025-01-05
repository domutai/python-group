import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaStar } from "react-icons/fa";
import { addToFavorites, removeFromFavorites } from "../../redux/favorites";
import { thunkAddToCart } from "../../redux/cart"; 
import "./ProductCard.css";

const PLACEHOLDER_IMAGE = "https://placehold.co/300x200/png?text=No+Image";

const ProductCard = ({
  product = {},
  isFavorited = false,
  favoriteId = null,
}) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false); 

  const existingFavorite = favorites.find(
    (fav) => fav.productId === product.id
  );
  const isProductFavorited = isFavorited || Boolean(existingFavorite);
  const currentFavoriteId = favoriteId || existingFavorite?.id;

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return; // Prevent multiple clicks while processing

    setIsLoading(true);
    try {
      if (isProductFavorited && currentFavoriteId) {
        await dispatch(removeFromFavorites(currentFavoriteId));
      } else {
        await dispatch(addToFavorites(product.id));
      }
    } catch (error) {
      console.error("Error handling favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add to Cart functionality
  const handleAddToCart = async () => {
    if (isAddingToCart) return; 
    setIsAddingToCart(true);
    try {
      await dispatch(thunkAddToCart(product.id, 1)); 
      alert(`${product.name} has been added to your cart!`);
    } catch (error) {
      console.error("Failed to add item to cart:", error.message);
      alert("Failed to add item to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (!product) return null;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <FaHeart
          className={`fa-heart ${isProductFavorited ? "favorited" : ""} ${
            isLoading ? "loading" : ""
          }`}
          onClick={handleFavoriteClick}
        />
        <img
          src={product?.previewImage || PLACEHOLDER_IMAGE}
          alt={product?.name || "Product Image"}
          className="product-image"
          onError={(e) => {
            e.target.src = PLACEHOLDER_IMAGE;
          }}
        />
      </div>
      <div className="product-card-content">
        <div className="product-card-header">
          <h3>{product?.name || "Unnamed Product"}</h3>
          <div className="product-rating">
            <span>
              {product.rating ? Number(product.rating).toFixed(1) : 0}
            </span>
            <FaStar style={{ color: "gold", marginLeft: "5px" }} />
          </div>
        </div>
        <p>Seller: {product?.seller_name || "Unknown"}</p>
        <p>Price: ${product?.price || "N/A"}</p>
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className={isAddingToCart ? "disabled-button" : ""}
        >
          {isAddingToCart ? "Adding..." : "+ ADD TO CART"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
