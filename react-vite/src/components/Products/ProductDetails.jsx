import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { loadAllProducts } from "../../redux/product";
import { thunkAddToCart } from "../../redux/cart";
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
  const sessionUser = useSelector(state => state.session.user);
  const state = useSelector((state) => state);
  console.log('sessionuser', sessionUser)
  console.log('state', state)
  console.log('reviews', reviews)
  console.log('product', product)

  const numOfReviews = () => {
    if(reviews?.length === 1) {
      return (`${reviews.length} Review`)
    }
    if(reviews?.length > 1) {
      return (`${reviews.length} Reviews`)
    }
  }

  const showReviewButton = () => {
    if(sessionUser && product.owner_id?.id !== sessionUser.id) {
      return !reviews || reviews?.every((review) => review.userID !== sessionUser.id)
    }
    return false
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
            <img src={product.previewImage} alt={product.name} />
          </div>
          <div>
            <p>{product.description}</p>
            <p>$ {product.price}</p>
            <button>Add to Cart</button>
          </div>
          <div>
            Reviews
            <div >
              {reviews?.length > 0 ? (
              <>
                <ImStarFull />
                {` ${Number(reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length).toFixed(2)}`}
                &nbsp;
                &middot;
                &nbsp;
              </>
              ) : (
              <div>
                <ImStarFull style={{ fontSize: 20 }} /> <span style={{ fontSize: 20 }}>New</span>
              </div> 
              )}                
            </div>
          </div>
          <div>
            <span className='review-stars'>
              {reviews?.length > 0 ? (
              <>
                <ImStarFull />
                  {` ${Number(reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length).toFixed(2)}`}
                    &nbsp;
                    &middot;
                    &nbsp;
                  <span className='num-reviews'>{numOfReviews()}</span>
              </>
              ) : (
              <>
                <ImStarFull style={{ fontSize: 28 }} /> <span style={{ fontSize: 24 }}>New</span>
              </>
              )}
            </span>
            <>
            {showReviewButton() ? (
              <>
                <OpenModalButton
                className='review-button-text'
                buttonText='Post Your Review'
                modalComponent={<ReviewFormModal id={id}/>}
                />
              </>
            ) : (
            <>
            
            </>
            )}
            </>
          </div>
          <div>
            <Reviews reviews={reviews} id={id} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
