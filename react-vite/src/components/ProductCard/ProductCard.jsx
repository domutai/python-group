import { useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  console.log("HEEEEEY", product);
  const handleFavoriteClick = () => {
    setIsFavorited((prev) => !prev);
  };

  return (
    <div className="product-card">
      {/* Image container */}
      <div className="product-image-container">
        <FaHeart
          className={`fa-heart ${isFavorited ? "favorited" : ""}`}
          onClick={handleFavoriteClick}
        />
        <img
          src={product.previewImage || "/placeholder.png"}
          alt={product.name || "Product Image"}
          className="product-image"
        />
      </div>

      {/* Product Content */}
      <div className="product-card-content">
        <div className="product-card-header">
          <h3>{product.name || "Unnamed Product"}</h3>
          <div className="product-rating">
            <span>{product.rating ? product.rating.toFixed(1) : 0}</span>
            <FaStar style={{ color: "gold", marginLeft: "5px" }} />
          </div>
        </div>
        <p>Seller: {product.seller_name || "Unknown"}</p>
        <p>Price: ${product.price || "N/A"}</p>
        <button>+ ADD TO CART</button>
      </div>
    </div>
  );
};

export default ProductCard;
