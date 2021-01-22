import React from 'react';

const KEY_ENTER = 13;
const KEY_SPACE = 32;

const RatingInput = ({
    index,
    hasKeyboardFocus,
    isActive,
    onClick,
    starString,
    starStringPlural,
}) => {
    const handleClick = (ev, isKeyboardSelection = false) => {
        if (onClick) onClick(index, ev, { isKeyboardSelection });
    };

    const handleKeyPress = (ev) => {
        if (ev.which === KEY_ENTER || ev.which === KEY_SPACE) {
            handleClick(ev, { isKeyboardSelection: true });
        }
    };

    const label = index === 1 ? `1 ${starString}` : `${index} ${starStringPlural}`;
    return (
        <input
            name="rating"
            aria-label={label}
            type="radio"
            className={`${isActive ? 'is-Active ' : ''}${
                hasKeyboardFocus ? 'has-keyboard-focus' : ''
            }`}
            onClick={handleClick}
            onKeyPress={handleKeyPress}
            value={index}
        />
    );
};
export default RatingInput;
