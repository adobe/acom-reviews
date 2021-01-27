import React from 'react';

const KEY_ENTER = 13;
const KEY_SPACE = 32;

const RatingInput = ({
    index,
    hasKeyboardFocus,
    isActive,
    isHovering,
    isInteractive,
    onClick,
    starString,
    starStringPlural,
    tooltip,
}) => {
    const handleClick = (ev, isKeyboardSelection = false) => {
        if (onClick) onClick(index, ev, { isKeyboardSelection });
    };

    const handleKeyPress = (ev) => {
        if (ev.which === KEY_ENTER || ev.which === KEY_SPACE) {
            ev.preventDefault();
            handleClick(ev, { isKeyboardSelection: true });
        }
    };

    const label = index === 1 ? `1 ${starString}` : `${index} ${starStringPlural}`;
    return (
        <input
            data-tooltip={tooltip}
            name="rating"
            aria-label={label}
            type="radio"
            className={`${isInteractive && tooltip ? 'tooltip ' : ''}${
                isHovering ? 'is-hovering' : ''
            }${isActive ? ' is-Active' : ''}${
                hasKeyboardFocus ? ' has-keyboard-focus' : ''
            }`}
            onClick={handleClick}
            onKeyPress={handleKeyPress}
            value={index}
        />
    );
};
export default RatingInput;
