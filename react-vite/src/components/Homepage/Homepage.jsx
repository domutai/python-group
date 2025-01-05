import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import { getFavorites } from "../../redux/favorites";
import "./Homepage.css"; 

const Homepage = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse] = await Promise.all([
          fetch("/api/products"),
          dispatch(getFavorites())
        ]);

        if (productsResponse.ok) {
          const data = await productsResponse.json();
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

    fetchData();
  }, [dispatch]);

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