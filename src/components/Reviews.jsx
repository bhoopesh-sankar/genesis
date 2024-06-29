import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { truncate, daysRemaining } from '../store'

const ReviewRating = ({ reviews }) => {
  const [end, setEnd] = useState(4)
  const [count] = useState(4)
  const [collection, setCollection] = useState([])

  const getCollection = () => reviews.slice(0, end)

  useEffect(() => {
    setCollection(getCollection())
  }, [reviews, end])

  return (
    <div className="flex flex-col px-6 mb-7">
      <div className="flex justify-center items-center flex-wrap">
        {collection.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>

      {reviews.length > collection.length ? (
        <div className="flex justify-center items-center my-5">
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-green-600
          text-white font-medium text-xs leading-tight uppercase
          rounded-full shadow-md hover:bg-green-700"
            onClick={() => setEnd(end + count)}
          >
            Load more
          </button>
        </div>
      ) : null}
    </div>
  )
}

const ReviewCard = ({ review }) => {

  return (
    <div id="projects" className="rounded-lg shadow-lg bg-white w-64 m-4" >

        <div className="p-4">
          <h5 style={{ fontWeight: 'bold', }}>Review: {truncate(review.review, 25, 0, 28)}</h5>
          <div
            className="flex justify-between items-center 
        font-bold mt-1 mb-2 text-gray-700"
          >
            <small className="flex justify-start items-center">
              <span> <h5 style={{ fontWeight: 'bold', }}>Rating: {review.rating} /5</h5></span>
            </small>
          </div>
          
    </div>
    </div>
  )
}

export{
  ReviewRating,
  ReviewCard,
} 
