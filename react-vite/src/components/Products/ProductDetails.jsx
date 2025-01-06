import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { loadAllProducts, getProductImages } from "../../redux/product";
import { thunkAddToCart } from "../../redux/cart";
import { loadAllReviews } from '../../redux/review';
import { ImStarFull } from 'react-icons/im';
import Reviews from '../Reviews/Reviews';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ReviewFormModal from '../Reviews/ReviewFormModal';
import './ProductDetails.css';`z`

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product[id])
  const reviews = useSelector((state) => state.reviews[id])
  const sessionUser = useSelector(state => state.session.user);
  const productImages = useSelector((state) => state.product[id]?.images);

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

  const handleClick = async () => {
    dispatch(thunkAddToCart(product.id, 1))
  }

  useEffect(() => {
    dispatch(loadAllProducts());
    dispatch(loadAllReviews(id));
    dispatch(getProductImages(id));
  }, [dispatch, id])

  return (
    <div className="product-details-container">
      {product && (
        <div className="product-info">
          <h1>{product.name}</h1>
            {/* <div className="product-details-image"> */}
              {/* <img src={product.previewImage} alt={product.name} /> */}
              {/* {productImages && productImages.map((image, index) => (
              <img key={index} src={image.imageURL} alt={product.name} />
            ))}
            </div> */}
            <div className="product-details-image">
            {/* Render the previewImage first */}
              {product.previewImage && (
               <img
                src={product.previewImage}
                alt={`${product.name} preview`}
                className="preview-image"
              />
            )}
            {/* Render additional product images */}
            {productImages &&
              productImages.map((image, index) => (
                <img
                  key={index}
                  src={image.imageURL}
                  alt={`${product.name} additional ${index + 1}`}
                />
              ))}
            </div>
          <div className="description-price-button-container">
            <div className="product-description">
              <p>{product.description}</p>
            </div>
            <div className="price-button-container">
              <p>${product.price}</p>
              <button onClick={handleClick}>Add to Cart</button>
            </div>
          </div>
          <div>
            <div>
              {reviews?.length > 0 ? (
              <>
                <span style={{ fontSize: 20 }}>{numOfReviews()}</span>
                &nbsp;
                &nbsp;
                <ImStarFull style={{ fontSize: 20 }}/>
                <span style={{ fontSize: 20 }}>
                  {` ${Number(reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length).toFixed(2)}`}
                </span>
              </>
              ) : (
              <div>
                <ImStarFull style={{ fontSize: 20 }} /> <span style={{ fontSize: 20 }}>New</span>
              </div> 
              )}                
            </div>
          </div>
          <div>
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
