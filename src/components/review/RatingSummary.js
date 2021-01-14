import React from 'react';

function RatingSummary({
    averageRating = 0,
    maxRating,
    totalReviews,
    reviewString,
    reviewStringPlural,
}) {
    // placeholder
    return (
        <div className="hlx-ReviewStats is-Visible">
            <span className="hlx-ReviewStats-average">{averageRating.toFixed(1)}</span>
            <span className="hlx-ReviewStats-separator">/</span>
            <span className="hlx-ReviewStats-outOf">{maxRating}</span>
            <span className="hlx-ReviewStats-separator">-</span>
            <span className="hlx-ReviewStats-total">{totalReviews}</span>
            <span className="hlx-ReviewStats-vote">
                {totalReviews === 1 ? reviewString : reviewStringPlural}
            </span>
        </div>
    );
}

export default RatingSummary;
