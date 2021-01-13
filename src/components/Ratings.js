import React from 'react';

function Ratings({ count, rating, onChange }) {
    const ratings = [];
    for (let i = 1; i < count + 1; i += 1) {
        const className = i <= rating ? 'is-Active' : '';
        ratings.push(
            <React.Fragment key={i}>
                <input
                    type="radio"
                    id={`rating-${i}`}
                    className={className}
                    name="rating"
                    value={i}
                    onClick={() => onChange(i)}
                />
                <label htmlFor={`rating-${i}`}>{i}</label>
            </React.Fragment>
        );
    }
    return <fieldset className="hlx-Review-ratingFields">{ratings}</fieldset>;
}

export default Ratings;
