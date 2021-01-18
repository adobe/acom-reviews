import React from 'react';

function Comments({ comment, handleCommentChange, placeholderText, sendCta }) {
    return (
        <fieldset className="hlx-Review-commentFields is-Visible">
            <label htmlFor="rating-comments" />
            <textarea
                id="rating-comments"
                maxLength="1000"
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
