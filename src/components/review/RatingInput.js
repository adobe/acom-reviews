import React from 'react';

const RatingInput = ({ index, isActive, onClick, starString, starStringPlural }) => {
    const handleClick = (ev) => {
        if (onClick) onClick(index, ev);
    };

    const label = index === 1 ? `1 ${starString}` : `${index} ${starStringPlural}`;
    return (
        <input
            name="rating"
            aria-label={label}
            type="radio"
            className={isActive ? 'is-Active' : ''}
            onClick={handleClick}
            value={index}
        />
    );
};
export default RatingInput;
