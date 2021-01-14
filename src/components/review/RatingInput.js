import React, { useEffect } from 'react';
import useHover from '../../utils/useHover';

const RatingInput = ({
    className,
    index,
    onClick,
    onHover,
    starString,
    starStringPlural,
}) => {
    const [hoverRef, isHovered] = useHover();

    useEffect(() => {
        if (onHover) onHover(index, isHovered);
    }, [isHovered]);

    const label = index === 1 ? `1 ${starString}` : `${index} ${starStringPlural}`;
    return (
        <input
            name="rating"
            aria-label={label}
            type="radio"
            className={className}
            ref={hoverRef}
            onClick={onClick && ((e) => onClick(index, e))}
        />
    );
};

export default RatingInput;
