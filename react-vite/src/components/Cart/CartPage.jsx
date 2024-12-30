import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkGetCart } from "../../redux/cart";

function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart.cart);
  console.log("session user:", sessionUser);
  const [errors, setErrors] = useState({});

  if (!sessionUser) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    dispatch(thunkGetCart());
  }, [dispatch]);

  return (
    <>
      <h1>Shopping Cart</h1>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </>
  );
}

export default CartPage;
