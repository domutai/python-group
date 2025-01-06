import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../../redux/favorites";
import ProductCard from "../ProductCard/ProductCard";
import "./FavoritesPage.css";

const FavoritesPage = () => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites.favorites);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                await dispatch(getFavorites());
            } catch (error) {
                console.error("Error loading favorites:", error);
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, [dispatch]);

    console.log("Favorites data:", favorites);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="favorites-container">
            <h2 className="favorites-title">Your Favorites</h2>
            <div className="product-grid">
                {favorites && favorites.length > 0 ? (
                    favorites.map((favorite) => {
                        console.log("Individual favorite:", favorite);
                        const productData = favorite.product || favorite;
                        return (
                            <ProductCard
                                key={favorite.id}
                                product={productData}
                                isFavorited={true}
                                favoriteId={favorite.id}
                            />
                        );
                    })
                ) : (
                    <div className="no-favorites">
                        <p>You haven&apos;t added any favorites yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;