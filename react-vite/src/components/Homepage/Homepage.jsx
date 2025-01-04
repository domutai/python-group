import { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./Homepage.css"; 

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="product-grid">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            rating={product.rating} 
          />
        ))
      ) : (
        <div>No products available</div>
      )}
    </div>
  );
};

export default Homepage;
