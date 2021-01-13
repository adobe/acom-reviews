import React, { useState } from 'react';
import Ratings from './Ratings'

function Review({ commentThreshold = 2 }) {
    const [rating, setRating] = useState(0);
    const [displayComments, setDisplayComments] = useState(false);

    const handleRatingChange = (newRating) => {
        setDisplayComments(newRating <= commentThreshold);

        setRating(newRating);
    };

    return (
        <div>
            <form className="hlx-Review">
                <Ratings count={5} rating={rating} onChange={handleRatingChange} />
                {displayComments && (
                    <fieldset className="hlx-Review-commentFields">
                        <label htmlFor="rating-comments" />
                        <textarea id="rating-comments" name="rating-comments" />
                        <input type="submit" value="Send" />
                    </fieldset>
                )}
            </form>
        </div>
    );
}

export default Review;
