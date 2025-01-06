import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadAllReviews } from "../../redux/review";
import { ImStarFull } from "react-icons/im";
import UpdateReview from "./UpdateReviewModal";
import DeleteReview from "./DeleteReviewModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import './Reviews.css';


function Reviews({ reviews, id }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const products = useSelector((state) => state.product)
  const users = Object.values(products).map((product) => product.owner);

  const findReviewerName = (userID) => {
    const reviewer = users.find((user) => user.id === userID);
    return `${reviewer.first_name}` 
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  };
  

  useEffect(() => {
      dispatch(loadAllReviews(id));
    }, [dispatch, id])
    
  return (
    <div>
      <div className="reviews-container">
        {reviews?.slice().reverse().map((review) => (
          <div key={review.id}>
            <span className="review-stars">
              {review.stars}
              &nbsp; 
              <ImStarFull />
            </span>
            <p className="review-text">{review.reviewText}</p>
            <p className="reviewer-name">Posted by {findReviewerName(review.userID)} on {formatDate(review.createdAt)}</p>
            {sessionUser && sessionUser.id === review.userID ? (
              <>  
                <OpenModalButton
                className='user-review-modal-button'
                buttonText='Update'
                modalComponent={<UpdateReview currReview={review} />}
                />
                <OpenModalButton
                className='user-review-modal-button'
                buttonText='Delete'          
                modalComponent={<DeleteReview review={review}/>}
                />
              </>
            ) : (
              <></>
            )}  
          </div>
           ))}
      </div>
    </div>
)
}

export default Reviews;