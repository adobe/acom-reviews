import React, { useEffect } from 'react';
import useHover from '../utils/useHover';

const RatingInput = ({ className, index, onClick, onHover }) => {
    const [hoverRef, isHovered] = useHover();

    useEffect(() => {
        if (onHover) onHover(index, isHovered);
    }, [isHovered]);

    const ratingIndex = `rating-${index}`;
    return (
        <>
            <input
                type="radio"
                id={ratingIndex}
                className={className}
                name="rating"
                value={index}
                ref={hoverRef}
                onClick={onClick && (() => onClick(index))}
            />
            <label htmlFor={ratingIndex}>{index}</label>
        </>
    );
};

export default RatingInput;
