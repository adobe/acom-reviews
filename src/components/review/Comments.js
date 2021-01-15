import React from 'react';

function Comments({
    comment,
    handleCommentChange,
    placeholderText = 'Please give us your feedback',
    sendCta = 'Send',
}) {
    return (
        <fieldset className="hlx-Review-commentFields is-Visible">
            <label htmlFor="rating-comments" />
            <textarea
                id="rating-comments"
                maxLength="5"
                name="rating-comments"
                placeholder={placeholderText}
                onChange={
                    handleCommentChange && ((e) => handleCommentChange(e.target.value))
                }
                value={comment}
            />
            <input type="submit" value={sendCta} />
        </fieldset>
    );
}

export default Comments;
