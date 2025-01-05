import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaStar } from "react-icons/fa";
import { addToFavorites, removeFromFavorites } from "../../redux/favorites";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const handleFavoriteClick = () => {
    setIsFavorited((prev) => !prev);
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
        <button>+ ADD TO CART</button>
      </div>
    </div>
  );
};

export default ProductCard;
