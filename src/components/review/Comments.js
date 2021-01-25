import React, { useEffect, useRef, useState } from 'react';

function Comments({ label, comment, handleCommentChange, placeholderText, sendCtaText }) {
    const [hasComment, setHasComment] = useState(false);
    const [displaySend, setDisplaySend] = useState(false);
    const [hasFocus, setHasFocus] = useState(false);

    const textArea = useRef(null);

    useEffect(() => {
        if (textArea && textArea.current) textArea.current.focus();
    }, [textArea]);

    const commentChange = (e) => {
        const { value } = e.target;
        setHasComment(!!value);
        if (handleCommentChange) handleCommentChange(value);
    };

    const onBlur = (e) => {
        setDisplaySend(!!e.target.value);
        setHasFocus(false);
    };

    const onFocus = () => {
        setDisplaySend(true);
        setHasFocus(true);
    };

    // Focus the comment area when whitespace to the left of send is clicked
    const onCtaCoverClick = () => textArea.current && textArea.current.focus();

    return (
        <fieldset
            className={`hlx-Review-commentFields is-Visible ${
                hasFocus ? 'has-focus' : ''
            }`}
        >
            <label htmlFor="rating-comments" />
            <textarea
                id="rating-comments"
                ref={textArea}
                cols="40"
                maxLength="4000"
                name="rating-comments"
                aria-label={label}
                placeholder={placeholderText}
                onBlur={onBlur}
                onChange={commentChange}
                onFocus={onFocus}
                value={comment}
            />
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div id="ctaCover" onClick={onCtaCoverClick}>
                &nbsp;
            </div>
            {displaySend && (
                <input disabled={!hasComment} type="submit" value={sendCtaText} />
            )}
        </fieldset>
    );
}

export default Comments;
