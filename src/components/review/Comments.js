import React, { useRef, useState } from 'react';

function Comments({ comment, handleCommentChange, placeholderText, sendCta }) {
    const [hasComment, setHasComment] = useState(false);
    const [displaySend, setDisplaySend] = useState(false);
    const [hasFocus, setHasFocus] = useState(false);

    const textArea = useRef(null);

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
                <>
                    <input disabled={!hasComment} type="submit" value={sendCta} />
                </>
            )}
        </fieldset>
    );
}

export default Comments;
