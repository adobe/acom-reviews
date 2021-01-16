import React, { useEffect, useState } from 'react';
import RatingInput from './RatingInput';
import useHover from '../../utils/useHover';

const Ratings = React.memo(
    ({
        ariaProductLabel,
        count,
        isInteractive,
        onClick,
        onRatingHover,
        selectedRating,
        starString,
        starStringPlural,
    }) => {
        const [rating, setRating] = useState(selectedRating);
        const [fieldSetRef, fsMouseOut] = useHover();
        const [, fsMouseLeave] = useHover({
            refToAttachTo: fieldSetRef,
            useMouseLeave: true,
        });

        useEffect(() => {
            if (!isInteractive) return;

            if (fsMouseOut.hovering) {
                // only the inputs have value
                if (fsMouseOut.event.target.value) {
                    const hoveredRating = parseInt(fsMouseOut.event.target.value, 10);
                    setRating(hoveredRating);
                    if (onRatingHover) onRatingHover(hoveredRating);
                }
            }

            if (!fsMouseLeave.hovering && selectedRating !== rating) {
                setRating(selectedRating);
            }
        }, [fsMouseOut.hovering, fsMouseLeave.hovering]);

        useEffect(() => {
            if (!isInteractive) setRating(selectedRating);
        }, [selectedRating]);

        const ratings = [];
        for (let i = 1; i < count + 1; i += 1) {
            ratings.push(
                <RatingInput
                    key={`rating-${i}`}
                    isActive={i <= rating}
                    index={i}
                    onClick={onClick}
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
            >
                {ratings}
            </fieldset>
        );
    }
);

export default Ratings;
