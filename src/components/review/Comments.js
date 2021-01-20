import React, { useState } from 'react';

function Comments({ comment, handleCommentChange, placeholderText, sendCta }) {
    const [hasComment, setHasComment] = useState(false);
    const [displaySend, setDisplaySend] = useState(false);

    const commentChange = (e) => {
        const { value } = e.target;
        if (value) {
            setHasComment(true);
        } else {
            setHasComment(false);
        }

        if (handleCommentChange) handleCommentChange(value);
    };

    const onBlur = (e) => setDisplaySend(!!e.target.value);

    const onFocus = () => setDisplaySend(true);

    return (
        <fieldset className="hlx-Review-commentFields is-Visible">
            <label htmlFor="rating-comments" />
            <textarea
                id="rating-comments"
                maxLength="4000"
                name="rating-comments"
                placeholder={placeholderText}
                onBlur={onBlur}
                onChange={commentChange}
                onFocus={onFocus}
                value={comment}
            />
            {displaySend && (
                <input disabled={!hasComment} type="submit" value={sendCta} />
            )}
        </fieldset>
    );
}

export default Comments;
