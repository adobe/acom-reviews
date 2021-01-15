import React, { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorageUtils';
import sendHelixData from '../../utils/sendHelixData';
import Review from '../review/Review';

const HelixReview = ({
    ariaProductLabel,
    commentThreshold = 3,
    lang,
    maxRating = 5,
    placeholderText,
    postAuth,
    reviewLocation,
    reviewString = 'vote',
    reviewStringPlural = 'votes',
    sendCtaText,
    sheet,
    starString = 'star',
    starStringPlural = 'stars',
    testUrl,
    thankYouString = 'Thank you for your feedback!',
}) => {
    const [rating, setRating] = useState();
    const [avgRating, setAvgRating] = useState(5);
    const [totalReviews, setTotalReviews] = useState(0);

    useEffect(() => {
        // init
        const localData = getLocalStorage(reviewLocation);
        let localDataTotalReviews = 0;
        if (localData) {
            setRating(localData.rating);
            setTotalReviews(localData.totalReviews);
            localDataTotalReviews = localData.totalReviews;
        }
        // eslint-disable-next-line no-use-before-define
        getHelixData(localDataTotalReviews);
    }, []);

    const getHelixData = (localDataTotalReviews = 0) => {
        try {
            // TODO - update fetch location
            const resPromise = fetch(
                `https://acom-reviews--adobe.hlx.page/${reviewLocation}.json`
            );
            resPromise.then((res) => {
                if (res.ok) {
                    res.json().then((reviewRes) => {
                        const { average, total } = reviewRes.data[0];

                        setAvgRating(average);
                        if (total > localDataTotalReviews) setTotalReviews(total);
                    });
                }
            });
        } catch (e) {
            console.log('The review response was not proper JSON.');
        }
    };

    const onRatingSet = (newRating, comment, updatedTotalReviews) => {
        // When onRatingSet is called, totalReviews hasn't updated yet as it's async
        setLocalStorage(reviewLocation, {
            rating: newRating,
            totalReviews: updatedTotalReviews,
        });

        sendHelixData({
            comment,
            lang,
            postAuth,
            rating: newRating,
            sheet,
            testUrl,
        });
    };

    return (
        <Review
            ariaProductLabel={ariaProductLabel}
            averageRating={avgRating}
            commentThreshold={commentThreshold}
            initialRating={rating}
            maxRating={maxRating}
            onRatingSet={onRatingSet}
            placeholderText={placeholderText}
            reviewString={reviewString}
            reviewStringPlural={reviewStringPlural}
            sendCtaText={sendCtaText}
            setAverageRating={setAvgRating}
            setTotalReviews={setTotalReviews}
            starString={starString}
            starStringPlural={starStringPlural}
            staticRating={rating}
            thankYouString={thankYouString}
            totalReviews={totalReviews}
        />
    );
};

export default HelixReview;
