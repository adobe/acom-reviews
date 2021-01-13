import React from 'react';
import Review from '../review/Review';

const selectedRating = document.getElementById('selectedRating');
const onRatingSet = (rating, comment) => {
    selectedRating.innerText = `
        Rating: ${rating}
        Comment: ${comment}
    `;
};

const HelixReview = () => {
    return <Review averageRating="4.5" onRatingSet={onRatingSet} />;
};

export default HelixReview;
