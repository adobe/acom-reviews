import React, { useEffect, useState } from 'react';
import RatingInput from './RatingInput';
import useHover from '../../utils/useHover';
import { isKeyboardNavigation } from '../../utils/utils';

const Ratings = ({
    ariaProductLabel,
    count,
    isInteractive,
    onClick,
    onRatingHover,
    rating,
    starString,
    starStringPlural,
}) => {
    const [currentRating, setCurrentRating] = useState(rating);
    const [keyboardFocusIndex, setKeyboardFocusIndex] = useState(0);
    const [fieldSetRef, fieldSetMouseOut] = useHover();
    const [, fieldSetMouseLeave] = useHover({
        refToAttachTo: fieldSetRef,
        useMouseLeave: true,
    });

    useEffect(() => {
        if (!isInteractive) return;

        if (fieldSetMouseOut.hovering) {
            // only the inputs have value
            if (fieldSetMouseOut.event.target.value) {
                const hoveredRating = parseInt(fieldSetMouseOut.event.target.value, 10);
                setCurrentRating(hoveredRating);
                if (onRatingHover) onRatingHover(hoveredRating);
            }
        }

        if (!fieldSetMouseLeave.hovering && rating !== currentRating) {
            setCurrentRating(rating);
        }
    }, [fieldSetMouseOut.hovering, fieldSetMouseLeave.hovering]);

    useEffect(() => {
        setCurrentRating(rating);
    }, [rating]);

    const handleClick = (index, ev) => {
        if (isKeyboardNavigation(ev)) {
            setCurrentRating(index);
            return;
        }
        setKeyboardFocusIndex(null);
        onClick(index, ev, { isKeyboardSelection: ev.type === 'keypress' });
    };

    const onFocus = (ev) => {
        setCurrentRating(ev.target.value);
        ev.persist();
        // delay setting the focus index so if it's a mouse click focus will not be shown
        setTimeout(() => {
            setKeyboardFocusIndex(parseInt(ev.target.value, 10));
        }, 1);
    };

    const onBlur = (ev) => {
        if (ev.relatedTarget === null || ev.relatedTarget.nodeName !== 'INPUT') {
            // Focus has left the rating fields
            setCurrentRating(rating);
            setKeyboardFocusIndex(null);
        }
    };

    const ratings = [];
    for (let i = 1; i < count + 1; i += 1) {
        ratings.push(
            <RatingInput
                key={`rating-${i}`}
                isActive={i <= currentRating}
                index={i}
                onClick={handleClick}
                hasKeyboardFocus={keyboardFocusIndex === i}
                starString={starString}
                starStringPlural={starStringPlural}
            />
        );
    }

    return (
        <fieldset
            ref={fieldSetRef}
            aria-label={ariaProductLabel}
            className="hlx-Review-ratingFields"
            onFocus={onFocus}
            onBlur={onBlur}
        >
            {ratings}
        </fieldset>
    );
};

export default Ratings;
