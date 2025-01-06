import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadAllProducts, getProductImages } from "../../redux/product";
import { thunkAddToCart } from "../../redux/cart";
import { loadAllReviews } from '../../redux/review';
import { ImStarFull } from 'react-icons/im';
import Reviews from '../Reviews/Reviews';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ReviewFormModal from '../Reviews/ReviewFormModal';
import DeleteProductModal from "./DeleteProductModal";
import UpdateProductModal from "./UpdateProductModal";
import './ProductDetails.css';`z`

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product[id])
  const reviews = useSelector((state) => state.reviews[id])
  const sessionUser = useSelector(state => state.session.user);
  const productImages = useSelector((state) => state.product[id]?.images);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageNav = (direction) => {
    if (direction === "prev") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex - 1 < 0 ? productImages.length - 1 : prevIndex - 1
      );
    } else if (direction === "next") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex + 1 >= productImages.length ? 0 : prevIndex + 1
      );
    }
  };

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

  const isProductOwner = () => {
    console.log('owner', product.owner_id)
    return sessionUser && product.owner_id === sessionUser.id;
  }

  const handleClick = async () => {
    dispatch(thunkAddToCart(product.id, 1))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(loadAllProducts());
        await dispatch(loadAllReviews(id));
        await dispatch(getProductImages(id));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dispatch, id]);

  return (
    <div className="product-details-container">
      {product && (
        <div className="product-info">
          <div className="product-name-and-buttons">
          <h1>{product.name}</h1>
          {isProductOwner() && (
            <div className="product-edit-delete-buttons">
              <OpenModalButton
                className='product-edit-delete-button'
                buttonText='Edit'
                modalComponent={<UpdateProductModal product={product} />}
              />
              <OpenModalButton
                className='product-edit-delete-button'
                buttonText='Delete'
                modalComponent={<DeleteProductModal product={product} />}
              />
            </div>
          )}
        </div>
            {/* <div className="product-details-image">
            {productImages && (
              <>
                <button
                  className="image-nav-button"
                  onClick={() => handleImageNav("prev")}
                >
                  &#8592;
                </button>
                <div className="image-container">
                  {productImages.slice(currentImageIndex, currentImageIndex + 1).map((image, index) => (
                    <img key={index} src={image.imageURL} alt={product.name} />
                  ))}
                </div>
                <button
                  className="image-nav-button"
                  onClick={() => handleImageNav("next")}
                >
                  &#8594;
                </button>
              </>
            )}
          </div> */}
          <div className="product-details-image">
              {/* Render the previewImage */}
              {product.previewImage && (
                <div className="preview-image-container">
                  <img
                    src={product.previewImage}
                    alt={`${product.name} preview`}
                    className="preview-image"
                  />
                </div>
              )}

              {/* Render navigable productImages */}
              {productImages && productImages.length > 0 && (
                <>
                  <button
                    className="image-nav-button"
                    onClick={() => handleImageNav("prev")}
                  >
                    &#8592;
                  </button>
                  <div className="image-container">
                    {productImages
                      .slice(currentImageIndex, currentImageIndex + 1)
                      .map((image, index) => (
                        <img key={index} src={image.imageURL} alt={product.name} />
                      ))}
                  </div>
                  <button
                    className="image-nav-button"
                    onClick={() => handleImageNav("next")}
                  >
                    &#8594;
                  </button>
                </>
              )}
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
