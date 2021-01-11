import React, { useState } from 'react';

function Ratings({ count, rating, onChange }) {
    let ratings = [];
    for (let i = 1; i < count + 1; i++) {
        const className = i <= rating ? 'is-Active' : '';
        ratings.push(
        <React.Fragment key={i}>
            <input
                type="radio"
                id={i}
                className={className}
                name="rating"
                value={i}
                onClick={() => onChange(i)} />
            <label htmlFor={`rating-${i}`}>{i}</label>
        </React.Fragment>);
    };
    return <fieldset className="hlx-Review-ratingFields">{ratings}</fieldset>;
};

function Review({ commentThreshold = 2 }) {
  // Declare a new state variable, which we'll call "count"
  const [rating, setRating] = useState(0);
  const [displayComments, setDisplayComments] = useState(false);

  const handleRatingChange = (newRating) => {
      setDisplayComments(newRating <= commentThreshold);
      setRating(newRating);
  };

  return (
    <div>
      <form className="hlx-Review">
        <Ratings
            count={5}
            rating={rating}
            onChange={handleRatingChange} />
        {displayComments &&
            <fieldset className="hlx-Review-commentFields">
                <label htmlFor="rating-comments"></label>
                <textarea id="rating-comments" name="rating-comments"></textarea>
                <input type="submit" value="Send" />
            </fieldset>
        }
        </form>
    </div>
  );
}

export default Review;
