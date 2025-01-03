import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { loadAllProducts } from "../../redux/product";
import { thunkAddToCart } from "../../redux/cart";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product[id]);
  console.log(product);

  useEffect(() => {
    dispatch(loadAllProducts());
  }, [dispatch]);

  return (
    <div>
      {product && (
        <div>
          <h1>{product.name}</h1>
          <div>
            <img src={product.previewImage} alt={product.name} />
          </div>
          <div>
            <p>{product.description}</p>
            <p>$ {product.price}</p>
            <button>Add to Cart</button>
          </div>
          <div>Reviews</div>
          <div>
            <p></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
