import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { loadAllProducts } from '../../redux/product';
import { loadAllReviews } from '../../redux/review';
import { ImStarFull } from 'react-icons/im';
import Reviews from '../Reviews/Reviews';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ReviewFormModal from '../Reviews/ReviewFormModal';

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product[id])
  const reviews = useSelector((state) => state.reviews[id])

  const numOfReviews = () => {
    if(reviews?.length === 1) {
      return (`${reviews.length} Review`)
    }
    if(reviews?.length > 1) {
      return (`${reviews.length} Reviews`)
    }
  }

  useEffect(() => {
    dispatch(loadAllProducts());
    dispatch(loadAllReviews(id))
  }, [dispatch, id])

  return (
    <div>
      {product && (
        <div> 
          <h1>{product.name}</h1>
          <div>
            <img src={product.previewImage} alt={product.name}/>
          </div>
          <div>
            <p>{product.description}</p>
            <p>$ {product.price}</p>
            <button>Add to Cart</button>
          </div>
          <div>
            Reviews
            <br/>
            {numOfReviews()} 
            {reviews && `${Number(reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length).toFixed(2)}`}
            <ImStarFull />
          </div>
          <div>
            <OpenModalButton
            buttonText='Post Your Review'
            modalComponent={<ReviewFormModal id={id} />}
            />
          </div>
          <div>
            <Reviews reviews={reviews} id={id} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetails;