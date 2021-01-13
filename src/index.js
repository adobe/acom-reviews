import * as React from 'react';
import { render } from 'react-dom';
import Review from './components/Review';

const selectedRating = document.getElementById('selectedRating');

const onRatingSet = (rating, comment) => {
    selectedRating.innerText = `
        Rating: ${rating}
        Comment: ${comment}
    `;
};
render(<Review averageRating="4.5" onRatingSet={onRatingSet} />, document.getElementById('root'));
