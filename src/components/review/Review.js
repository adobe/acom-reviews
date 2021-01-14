import React, { useEffect, useState } from 'react';
import { addToAverage, isRadioMouseClick } from '../../utils/utils';
import Comments from './Comments';
import Ratings from './Ratings';
import RatingSummary from './RatingSummary';

const noop = () => {};

function Review({
    ariaProductLabel,
    averageRating,
    commentThreshold = 3,
    displayRatingSummary = true,
    maxRating = 5,
    onRatingSet = noop,
    placeholderText,
    reviewString = 'vote',
    reviewStringPlural = 'votes',
    sendCtaText,
    setAverageRating = noop,
    setTotalReviews = noop,
    starString = 'star',
    starStringPlural = 'stars',
    staticRating,
    thankYouString = 'Thank you for your feedback!',
    totalReviews,
}) {
    const [comment, setComment] = useState('');
    const [displayComments, setDisplayComments] = useState(false);
    const [displayThankYou, setDisplayThankYou] = useState(false);
    const [totalHasBeenUpdated, setTotalHasBeenUpdated] = useState(false);
    const [isInteractive, setIsInteractive] = useState(true);
    const [rating, setRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);

    useEffect(() => {
        if (staticRating) {
            setRating(staticRating);
            setIsInteractive(false);
        }
    }, [staticRating]);

    const handleCommentChange = (commentText) => {
        setComment(commentText);
    };

    const handleHoverChange = (hoverIndex, isHovered) => {
        if (!isInteractive) return;
        if (!isHovered) {
            setRating(selectedRating);
        } else {
            setRating(hoverIndex);
        }
    };

    const handleRatingClick = (newRating, e) => {
        if (!isInteractive) return;

        let updatedTotalReviews = totalReviews;

        if (!totalHasBeenUpdated) {
            setTotalHasBeenUpdated(true);
            updatedTotalReviews += 1;
            setTotalReviews(updatedTotalReviews);
        }

        setAverageRating(addToAverage(newRating, averageRating, updatedTotalReviews));

        if (!isRadioMouseClick(e)) {
            if (newRating > commentThreshold) {
                // User entered ratings via keyboard, do not immediately send rating
                setSelectedRating(newRating);
                setRating(newRating);
            } else {
                setDisplayComments(true);
            }
            return;
        }

        if (newRating > commentThreshold && !displayComments) {
            onRatingSet(newRating, comment, updatedTotalReviews);
            setDisplayThankYou(true);
            return;
        }

        // No star has been selected yet
        if (selectedRating === 0) {
            setDisplayComments(newRating <= commentThreshold);
        }

        setSelectedRating(newRating);
        setRating(newRating);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onRatingSet(rating, comment, totalReviews);
        setDisplayThankYou(true);
    };

    return (
        <div>
            {!displayThankYou && (
                <>
                    <form className="hlx-Review" onSubmit={handleSubmit}>
                        <Ratings
                            ariaProductLabel={ariaProductLabel}
                            count={5}
                            rating={rating}
                            onClick={handleRatingClick}
                            onHover={handleHoverChange}
                            starString={starString}
                            starStringPlural={starStringPlural}
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
