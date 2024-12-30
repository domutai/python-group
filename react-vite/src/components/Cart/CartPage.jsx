import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { thunkGetCart } from "../../redux/cart";

function CartPage() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart.cart);
  // const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(thunkGetCart());
  }, [dispatch]);

  if (!sessionUser) {
    return <Navigate to="/login" />;
  }

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
