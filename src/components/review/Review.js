import React, { useEffect, useState } from 'react';
import { addToAverage } from '../../utils/utils';
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
    hideTitleOnReload,
    initialRating,
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
    const [beforeUnload, setBeforeUnload] = useState(null);
    const [displayComments, setDisplayComments] = useState(false);
    const [displayThankYou, setDisplayThankYou] = useState(false);
    const [displayTitle, setDisplayTitle] = useState(true);
    const [totalHasBeenUpdated, setTotalHasBeenUpdated] = useState(false);
    const [isInteractive, setIsInteractive] = useState(true);
    const [rating, setRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);
    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => {
        if (staticRating) {
            setRating(staticRating);
            setIsInteractive(false);
            if (hideTitleOnReload) setDisplayTitle(false);
        }
    }, [staticRating]);

    useEffect(() => {
        if (initialRating) {
            setRating(initialRating);
        }
    }, [initialRating]);

    const handleCommentChange = (commentText) => {
        setComment(commentText);
    };

    const handleClickAboveCommentThreshold = (newRating, updatedTotalReviews) => {
        setRating(newRating);

        const sendSetRating = () => {
            onRatingSet(newRating, comment, updatedTotalReviews);
            setDisplayThankYou(true);
        };

        const wrappedSendSetRating = () => sendSetRating;
        setBeforeUnload(wrappedSendSetRating);
        window.addEventListener('beforeunload', sendSetRating);

        // wait 5 seconds before submitting in case user changes their mind
        setTimeoutId(
            window.setTimeout(() => {
                sendSetRating();
                window.removeEventListener('beforeunload', beforeUnload);
                setBeforeUnload(null);
            }, 5000)
        );
    };

    const clearCallbacks = () => {
        if (timeoutId !== null) {
            window.clearTimeout(timeoutId);
            setTimeoutId(null);
        }

        if (beforeUnload !== null) {
            window.removeEventListener('beforeunload', beforeUnload);
            setBeforeUnload(null);
        }
    };

    const handleRatingClick = (newRating, ev, { isKeyboardSelection = false } = {}) => {
        if (!isInteractive) return;

        clearCallbacks();

        let updatedTotalReviews = totalReviews;

        if (!totalHasBeenUpdated) {
            setTotalHasBeenUpdated(true);
            updatedTotalReviews += 1;
            setTotalReviews(updatedTotalReviews);
        }

        setAverageRating(addToAverage(newRating, averageRating, updatedTotalReviews));

        if (!isKeyboardSelection && newRating > commentThreshold && !displayComments) {
            handleClickAboveCommentThreshold(newRating, updatedTotalReviews);
            return;
        }

        // No star has been selected yet
        if (selectedRating === 0) {
            setDisplayComments(newRating <= commentThreshold);
        }

        setSelectedRating(newRating);
        setRating(newRating);

        if (isKeyboardSelection && newRating > commentThreshold && !displayComments) {
            onRatingSet(newRating, comment, updatedTotalReviews);
            setDisplayThankYou(true);
        }
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
                    {displayTitle && (
                        <h3 className="hlx-reviewTitle" aria-label={strings.reviewTitle}>
                            {strings.reviewTitle}
                        </h3>
                    )}
                    <form className="hlx-Review" onSubmit={handleSubmit}>
                        <Ratings
                            ariaProductLabel={strings.ariaProductLabel}
                            count={5}
                            isInteractive={isInteractive}
                            label={strings.reviewTitle}
                            onClick={handleRatingClick}
                            onRatingHover={onRatingHover}
                            rating={rating}
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
