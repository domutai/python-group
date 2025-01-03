import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadAllReviews } from "../../redux/review";
// import { getAllUsers } from "../../redux/session";


function Reviews({ id }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews)
  const user = useSelector((state) => state)
  console.log('user', user)
  

  useEffect(() => {
      dispatch(loadAllReviews(id));
    }, [dispatch, id])
    
  return (
    <div>
      <div>
        {reviews?.slice().reverse().map((review) => (
          <div key={review.id}>
            <p>{review.stars}</p>
            <p>{review.reviewText}</p>
            <p>{review.userID}</p>  
          </div>
           ))}
      </div>
    </div>
)
}

export default Reviews;