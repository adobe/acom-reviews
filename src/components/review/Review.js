import React, { useEffect, useState } from 'react';
import { addToAverage, isRadioMouseClick } from '../../utils/utils';
import Comments from './Comments';
import Ratings from './Ratings';
import RatingSummary from './RatingSummary';

const noop = () => {};

const defaultStrings = {
    ariaProductLabel: '',
    sendCta: 'Send',
    star: 'star',
    starPlural: 'stars',
    placeholder: 'Please give us your feedback',
    review: 'vote',
    reviewPlural: 'votes',
    reviewTitle: 'Rate Your Experience',
    thankYou: 'Thank you for your feedback!',
};

function Review({
    averageRating,
    commentThreshold = 3,
    displayRatingSummary = true,
    maxRating = 5,
    onRatingSet = noop,
    onRatingHover = noop,
    setAverageRating = noop,
    setTotalReviews = noop,
    strings = defaultStrings,
    staticRating,
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
        <div className="hlx-ReviewWrapper">
            {!displayThankYou && (
                <>
                    <h3 className="hlx-reviewTitle">{strings.reviewTitle}</h3>
                    <form className="hlx-Review" onSubmit={handleSubmit}>
                        <Ratings
                            ariaProductLabel={strings.ariaProductLabel}
                            count={5}
                            isInteractive={isInteractive}
                            onClick={handleRatingClick}
                            onRatingHover={onRatingHover}
                            selectedRating={rating}
                            starString={strings.star}
                            starStringPlural={strings.starPlural}
                        />
                        {displayComments && (
                            <Comments
                                feedback={comment}
                                handleCommentChange={handleCommentChange}
                                placeholderText={strings.placeholder}
                                sendCtaText={strings.sendCta}
                            />
                        )}
                    </form>
                    {displayRatingSummary && (
                        <RatingSummary
                            averageRating={averageRating}
                            maxRating={maxRating}
                            totalReviews={totalReviews}
                            reviewString={strings.review}
                            reviewStringPlural={strings.reviewPlural}
                        />
                    )}
                </>
            )}
            {displayThankYou && (
                <div className="hlx-submitResponse">{strings.thankYou}</div>
            )}
        </div>
    );
}

export default Review;
