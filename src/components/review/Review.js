import React, { useEffect, useRef, useState } from 'react';
import { addToAverage } from '../../utils/utils';
import sanitizeComment from '../../utils/sanitizeComment';
import Comments from './Comments';
import Ratings from './Ratings';
import RatingSummary from './RatingSummary';

const BEFORE_UNLOAD_EVENT = 'beforeunload';

const noop = () => {};

const defaultStrings = {
    commentLabel: 'Review Feedback',
    placeholder: 'Please give us your feedback',
    review: 'vote',
    reviewPlural: 'votes',
    reviewTitle: 'Rate Your Experience',
    sendCta: 'Send',
    star: 'star',
    starPlural: 'stars',
    starsLegend: 'Choose a star rating',
    tooltips: ['This sucks', 'Meh', "It's OK", 'I like it', 'Best thing ever'],
    thankYou: 'Thank you for your feedback!',
};

function Review({
    averageRating,
    clickTimeout = 5000,
    commentThreshold = 3,
    displayRatingSummary = true,
    hideTitleOnReload,
    tooltipDelay = 300,
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
    const [displayComments, setDisplayComments] = useState(false);
    const [displayThankYou, setDisplayThankYou] = useState(false);
    const [displayTitle, setDisplayTitle] = useState(true);
    const [totalHasBeenUpdated, setTotalHasBeenUpdated] = useState(false);
    const [isInteractive, setIsInteractive] = useState(true);
    const [rating, setRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);
    const [timeoutId, setTimeoutId] = useState(null);

    const beforeUnloadCallback = useRef(null);

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
            onRatingSet({
                rating: newRating,
                comment,
                totalReviews: updatedTotalReviews,
            });
            setDisplayThankYou(true);
        };

        beforeUnloadCallback.current = sendSetRating;
        window.addEventListener(BEFORE_UNLOAD_EVENT, sendSetRating);

        // wait 5 seconds before submitting in case user changes their mind
        setTimeoutId(
            window.setTimeout(() => {
                window.removeEventListener(
                    BEFORE_UNLOAD_EVENT,
                    beforeUnloadCallback.current
                );
                beforeUnloadCallback.current = null;
                sendSetRating();
            }, parseInt(clickTimeout, 10))
        );
    };

    const clearCallbacks = () => {
        if (timeoutId !== null) {
            window.clearTimeout(timeoutId);
            setTimeoutId(null);
        }

        if (beforeUnloadCallback.current !== null) {
            window.removeEventListener(BEFORE_UNLOAD_EVENT, beforeUnloadCallback.current);
            beforeUnloadCallback.current = null;
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

        setAverageRating(
            addToAverage(newRating, Number(averageRating), updatedTotalReviews)
        );

        if (!isKeyboardSelection && newRating > commentThreshold && !displayComments) {
            handleClickAboveCommentThreshold(newRating, updatedTotalReviews);
            return;
        }

        // No star has been selected yet
        if (selectedRating === 0) setDisplayComments(newRating <= commentThreshold);

        setSelectedRating(newRating);
        setRating(newRating);

        if (isKeyboardSelection && newRating > commentThreshold && !displayComments) {
            onRatingSet({
                rating: newRating,
                comment,
                totalReviews: updatedTotalReviews,
            });
            setDisplayThankYou(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onRatingSet({ rating, comment: sanitizeComment(comment), totalReviews });
        setDisplayThankYou(true);
    };

    return (
        <div className="hlx-ReviewWrapper">
            {!displayThankYou && (
                <>
                    {displayTitle && (
                        <h3 className="hlx-reviewTitle">{strings.reviewTitle}</h3>
                    )}
                    <form className="hlx-Review" onSubmit={handleSubmit}>
                        <Ratings
                            count={5}
                            isInteractive={isInteractive}
                            onClick={handleRatingClick}
                            onRatingHover={onRatingHover}
                            rating={rating}
                            starsLegend={strings.starsLegend || strings.reviewTitle}
                            starString={strings.star}
                            starStringPlural={strings.starPlural}
                            tooltips={strings.tooltips}
                            tooltipDelay={tooltipDelay}
                        />
                        {displayComments && (
                            <Comments
                                label={strings.commentLabel}
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
