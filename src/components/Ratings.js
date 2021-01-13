import React from 'react';
import RatingInput from './RatingInput';

function Ratings({ count, rating, onClick, onHover }) {
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
            />
        );
    }
    return <fieldset className="hlx-Review-ratingFields">{ratings}</fieldset>;
}

export default Ratings;
