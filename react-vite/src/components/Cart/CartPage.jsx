import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { thunkGetCart } from "../../redux/cart";
import "./CartPage.css";

function CartPage() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session?.user);
  const cart = useSelector((state) => state.cart?.cart?.cart);
  // const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(thunkGetCart());
  }, [dispatch]);

  if (!sessionUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      {cart?.length > 0 ? (
        <>
          <p>
            {cart?.length} {cart?.length > 1 ? "items" : "item"} in your cart
          </p>
          {cart?.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-left">
                <h4 className="seller-name">Seller Name</h4>
                <img
                  src="https://via.placeholder.com/80" // Placeholder image for now
                  alt={`Product ${item.productId}`}
                  className="product-image"
                />
              </div>
              <div className="cart-item-middle">
                <h4 className="product-name">Product Name</h4>
                <p className="product-tag">✔ Color: Black</p>
                <p className="product-tag">✔ Size: Medium</p>
                <div className="cart-item-actions">
                  <input
                    type="number"
                    placeholder={`${item.quantity} ${
                      item.quantity > 1 ? "Items" : "Item"
                    }`}
                  />
                  <Link to={`/edit/${item.id}`} className="edit-link">
                    Edit
                  </Link>
                  <Link to={`/remove/${item.id}`} className="remove-link">
                    Remove
                  </Link>
                </div>
              </div>
              <div className="price">
                <h3>$5.99</h3>
                <p>($5.99 each)</p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default CartPage;
