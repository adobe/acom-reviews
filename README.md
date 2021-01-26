# Adobe.com React Review Component
A collection of components used to populate product review information on adobe.com.

## Main Pieces
There are two main parts to this project:

1. `Review` - A component used to display review data.
2. `HelixReview` - Used to wrap `Review` and handle GET and POST requests of Helix-based data.

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
        productLabel="Convert PDF Review"
        commentThreshold={COMMENT_THRESHOLD}
        lang="en-US"
        postAuth={POST_AUTH}
        reviewLocation={REVIEW_LOCATION}
        reviewTitle="Rate your experience"
        sheet={SHEET}
        postUrl={TEST_URL}
    />,
    document.getElementById('root')
);
```

### Review Method
This assumes you are providing your own data store and json.

``` js
import React from 'react';
import { render } from 'react-dom';
import { Review } from 'acom-review-component';

render(
    <Review
        averageRating={avgRating}
        commentThreshold={commentThreshold}
        initialRating={rating}
        maxRating={maxRating}
        onRatingSet={onRatingSet}
        setAverageRating={setAvgRating}
        setTotalReviews={setTotalReviews}
        staticRating={rating}
        strings={strings}
        totalReviews={totalReviews}
    />,
    document.getElementById('root')
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
