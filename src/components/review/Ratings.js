import React from 'react';
import RatingInput from './RatingInput';

function Ratings({
    ariaProductLabel,
    count,
    rating,
    onClick,
    onHover,
    starString,
    starStringPlural,
}) {
    const ratings = [];
    for (let i = 1; i < count + 1; i += 1) {
        const className = i <= rating ? 'is-Active' : '';
        ratings.push(
            <RatingInput
                key={`rating-${i}`}
                className={className}
                index={i}
                onClick={onClick}
                onHover={onHover}
                starString={starString}
                starStringPlural={starStringPlural}
            />
        );
    }
    return (
        <fieldset aria-label={ariaProductLabel} className="hlx-Review-ratingFields">
            {ratings}
        </fieldset>
    );
}

export default Ratings;
