import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  thunkCheckout,
  thunkDeleteCart,
  thunkGetCart,
  thunkUpdateCart,
} from "../../redux/cart";
import "./CartPage.css";
import { loadAllProducts } from "../../redux/product";

import ProductCard from "../ProductCard/ProductCard";

function CartPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session?.user);
  const cart = useSelector((state) => state.cart?.cart);
  const products = useSelector((state) => state.product);
  const productsArray = Object.entries(products).map(([key, value]) => {
    return { id: key, ...value };
  });

  //const [errors, setErrors] = useState({});
  const [quantities, setQuantities] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(thunkGetCart()).catch((error) => setErrors(error));
    dispatch(loadAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (cart?.length > 0) {
      const initialQuantities = {};
      cart.forEach((item) => {
        initialQuantities[item.id] = item.quantity;
      });
      setQuantities(initialQuantities);
    }
  }, [cart]);

  if (!sessionUser) {
    return <h1>Sign in to start adding products to your cart.</h1>;
  }

  const shipping = 3.99;
  const taxRate = 0.08;
  const subtotal = cart?.reduce((acc, item) => {
    const product = products[item.productId];
    return acc + (product?.price || 0) * (quantities[item.id] || item.quantity);
  }, 0);

  const tax = subtotal * taxRate;
  const total = subtotal + tax + shipping;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      setQuantities((prev) => ({
        ...prev,
        [itemId]: newQuantity,
      }));
    }
  };

  const handleUpdateCart = (itemId) => {
    const newQuantity = quantities[itemId];
    if (newQuantity > 0) {
      dispatch(thunkUpdateCart(itemId, newQuantity));
    }
  };

  const handleOnClick = () => {
    alert("Feature coming soon...");
    dispatch(thunkCheckout());
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1 className="header">Shopping Cart</h1>
        <p className="items-in-cart">{cart?.length || 0} items in your cart</p>
      </div>
      <div className="items-box">
        {cart.length ? (
          cart?.map((item) => {
            const product = products[item.productId];
            return (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-left">
                  <h4 className="seller-name">
                    {product?.owner?.first_name || "Seller"}
                  </h4>
                  <img
                    src={product?.previewImage}
                    alt={product?.name || "Product"}
                    className="product-image"
                  />
                </div>
                <div className="cart-item-middle">
                  <h4 className="product-name">
                    {product?.name || "Loading..."}
                  </h4>
                  <p className="product-tag">
                    ✔ Quantity: {quantities[item.id]}
                  </p>
                  <div className="cart-item-actions">
                    <input
                      type="number"
                      value={quantities[item.id] || item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.id,
                          parseInt(e.target.value, 10) || 0
                        )
                      }
                      onBlur={() => handleUpdateCart(item.id)}
                    />
                    <Link to={`/products/${item.id}`} className="edit-link">
                      Edit
                    </Link>
                    <div
                      onClick={() => dispatch(thunkDeleteCart(item.id))}
                      className="remove-link"
                    >
                      Remove
                    </div>
                  </div>
                </div>
                <div className="price">
                  <h3>
                    {formatCurrency(
                      (product?.price || 0) *
                        (quantities[item.id] || item.quantity)
                    )}
                  </h3>
                  <p>({formatCurrency(product?.price || 0)} each)</p>
                </div>
              </div>
            );
          })
        ) : (
          <div>No products available</div>
        )}
      </div>
      <div className="order-summary">
        <h4>Order Summary</h4>
        <div className="cost-details">
          <div className="subtotal">
            <p>Subtotal</p>
            <p>{formatCurrency(subtotal)}</p>
          </div>
          <div className="shipping">
            <p>Shipping</p>
            <p>{formatCurrency(shipping)}</p>
          </div>
          <div className="tax">
            <p>Tax</p>
            <p>{formatCurrency(tax)}</p>
          </div>
          <div className="total">
            <p>Total</p>
            <p>{formatCurrency(total)}</p>
          </div>
        </div>
        <button className="payment-button" onClick={handleOnClick}>
          <div className="button-text">
            <p>Continue to payment</p>
            <span className="material-symbols-outlined">arrow_right_alt</span>
          </div>
        </button>
      </div>
      <div className="related-box">
        <h3>Related Products</h3>
        <div className="product-grid">
          {productsArray.length > 0 ? (
            productsArray
              .slice(0, 3)
              .map((product) => (
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
      </div>
    </div>
  );
}

export default CartPage;
