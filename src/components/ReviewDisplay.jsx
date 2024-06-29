import { useGlobalState } from "../store"
import { ReviewRating } from "./Reviews";
import { ReviewAndRating } from "../services/blockchain";

const ReviewDisplay = async () => {
    const [reviews] = useGlobalState("reviews");

    return(
      <div>
        <ReviewAndRating />
        <ReviewRating reviews={reviews} />
      </div>
    )
}

export default ReviewDisplay;