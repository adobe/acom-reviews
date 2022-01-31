# Adobe.com React Review Component
A collection of components used to populate product review information on adobe.com.

## Main Pieces
There are two main parts to this project:

1. `Review` - A component used to display review data.
2. `HelixReview` - Used to wrap `Review` and handle GET and POST requests of Helix-based data.

## Releases
2.0.3 - Helix 3 compatiblity - gracefully handle string to number conversions
2.0.0 - Fixed vulnerabilities, changed `reviewCount` to `ratingCount`, fixed styling issues on mobile
1.7.2 - Ability to set initialValue, comments are now sanitized
1.6.2 - IE11 Bug Fixes


## Using
### Install
`npm install acom-review-component`

### Helix Review Method
This assumes you are using Helix to retrieve and store your data.

``` js
import React from 'react';
import { render } from 'react-dom';
import { HelixReview } from 'acom-review-component';

render(
    <HelixReview
        // How long to wait before submitting rating above commentThreshold (in ms)
        clickTimeout = 5000
        // Ratings above this number will not require a comment
        commentThreshold = 3
        // Once a rating has been selected, should the title be displayed on reload
        hideTitleOnReload = true
        // How long before tooltips should display on hover (in ms)
        tooltipDelay="300"
        lang = "en_US"
        maxRating = 5 // maximum number of ratings (stars)
        onRatingHover = {({ rating }) => {
            // current rating user is hovering over
            console.log('onRatingHover rating:', rating);
        }}
        onRatingSet={({ rating, comment }) => {
            // callback when user has selected a rating
            console.log('onRatingSet rating:', rating, 'comment:', comment);
        }}
        onReviewLoad={({ hasRated, rating }) => {
            // callback when rating loads.  Rating only set if the user has already selected a rating
            console.log('onReviewLoad hasRated:', hasRated, ' rating:', rating);
        }}
        postAuth="" // only used for dev endpoint
        postUrl=""
        productJson={{}}
        reviewDomain=""
        reviewPath=""
        sheet="" // only used for dev endpoint
        strings={{}} // see below
        visitorId=""
    />,
    document.getElementById('root');
);

const strings = {
    commentLabel: 'Review Feedback',
    placeholder: 'Please give us your feedback',
    review: 'vote',
    reviewPlural: 'votes',
    reviewTitle: 'Rate Your Experience',
    sendCta: 'Send',
    star: 'star',
    starPlural: 'stars',
    starsLegend: 'Choose a star rating',
    tooltips: ['Horrible', 'Poor', 'Ok', 'Good', 'Great'],
    thankYou: 'Thank you for your feedback!',
};
```

### Review Method
This assumes you are providing your own data store and json.

``` js
import React from 'react';
import { render } from 'react-dom';
import { Review } from 'acom-review-component';

render(
    <Review
        averageRating
        clickTimeout
        commentThreshold
        displayRatingSummary
        hideTitleOnReload
        initialRating
        maxRating
        onRatingSet
        onRatingHover
        setAverageRating
        setTotalReviews
        strings
        staticRating
        totalReviews
    />,
    document.getElementById('root');
);
```

## Development
1. Using Parcel
   1. Clone this repo.
   2. Type `npm install` to install npm dependencies.
   3. Type `npm run dev` to run a Parcel dev server.
2. Using Helix
   1. Clone this repo.
   2. Install the Helix CLI if you haven't already: `npm i -g @adobe/helix-cli`
   2. Type `npm install` to install npm dependencies.
   3. Type `npm run hlx` to run a Helix dev server.

### Test validation on commit

To have the build and tests automatically verified on commit, run the following command to enable the pre-commit hook:

`git config core.hooksPath .githooks`

Note that if you already have hooks setup in your `.git/hooks` directory those will need to be moved to `./githooks`
