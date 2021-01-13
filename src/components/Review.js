import React, { useState } from 'react';
import Comments from './Comments';
import Ratings from './Ratings';
import RatingSummary from './RatingSummary';

function Review({
    commentThreshold = 3,
    displayRatingSummary = true,
    maxRating = 5,
    averageRating,
    totalReviews,
    onRatingSet = () => {},
    reviewString = 'vote',
    reviewStringPlural = 'votes',
    thankYouString = 'Thank you for your feedback!',
    placeholderText,
    sendCtaText,
}) {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);
    const [displayComments, setDisplayComments] = useState(false);
    const [displayThankYou, setDisplayThankYou] = useState(false);

    const handleCommentChange = (commentText) => {
        setComment(commentText);
    };

    const handleHoverChange = (hoverIndex, isHovered) => {
        if (!isHovered) {
            setRating(selectedRating);
        } else {
            setRating(hoverIndex);
        }
    };

    const handleRatingClick = (newRating) => {
        if (newRating > commentThreshold && !displayComments) {
            onRatingSet(newRating, comment);
            setDisplayThankYou(true);
            return;
        }

        if (selectedRating === 0) {
            setDisplayComments(newRating <= commentThreshold);
        }

        setSelectedRating(newRating);
        setRating(newRating);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onRatingSet(rating, comment);
        setDisplayThankYou(true);
    };

    return (
        <div>
            {!displayThankYou && (
                <>
                    <form className="hlx-Review" onSubmit={handleSubmit}>
                        <Ratings
                            count={5}
                            rating={rating}
                            onClick={handleRatingClick}
                            onHover={handleHoverChange}
                        />
                        {displayComments && (
                            <Comments
                                feedback={comment}
                                handleCommentChange={handleCommentChange}
                                placeholderText={placeholderText}
                                sendCtaText={sendCtaText}
                            />
                        )}
                    </form>
                    {displayRatingSummary && (
                        <RatingSummary
                            averageRating={averageRating}
                            maxRating={maxRating}
                            totalReviews={totalReviews}
                            reviewString={reviewString}
                            reviewStringPlural={reviewStringPlural}
                        />
                    )}
                </>
            )}
            {displayThankYou && <div>{thankYouString}</div>}
        </div>
    );
}

export default Review;
