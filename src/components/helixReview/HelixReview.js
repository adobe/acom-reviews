import React, { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorageUtils';
import sendHelixData from '../../utils/sendHelixData';
import setJsonLdProductInfo from '../../utils/setJsonLdProductInfo';
import Review from '../review/Review';

const HelixReview = ({
    commentThreshold = 3,
    hideTitleOnReload,
    lang,
    maxRating = 5,
    onRatingSet: onRatingSetCallback,
    onRatingHover,
    postAuth,
    productJson,
    reviewDomain,
    reviewPath,
    sheet,
    strings,
    postUrl,
    visitorId,
}) => {
    const [rating, setRating] = useState();
    const [initialRating, setInitialRating] = useState();
    const [avgRating, setAvgRating] = useState(5);
    const [totalReviews, setTotalReviews] = useState(0);
    const [displayRatingSummary, setDisplayRatingSummary] = useState(false);
    const [displayReviewComp, setDisplayReviewComp] = useState(false);

    useEffect(() => {
        // init
        const localData = getLocalStorage(reviewPath);
        let localDataTotalReviews = 0;
        if (localData) {
            setRating(localData.rating);
            setTotalReviews(localData.totalReviews);
            localDataTotalReviews = localData.totalReviews;
        }
        // eslint-disable-next-line no-use-before-define
        getHelixData(localDataTotalReviews, !!localData);
    }, []);

    const getHelixData = (localDataTotalReviews = 0, hasLocalData = false) => {
        try {
            if (!reviewDomain || !reviewPath) {
                setDisplayReviewComp(true);
                return;
            }

            const resPromise = fetch(`${reviewDomain}/${reviewPath}.json`);
            resPromise
                .then((res) => {
                    if (res.ok) {
                        res.json().then((reviewRes) => {
                            const { average, total } = reviewRes.data[0];

                            setAvgRating(average);
                            if (total > localDataTotalReviews) setTotalReviews(total);
                            setDisplayRatingSummary(true);
                            setDisplayReviewComp(true);
                            if (!hasLocalData) setInitialRating(Math.round(average));

                            if (productJson) {
                                setJsonLdProductInfo(productJson, average, total);
                            }
                        });
                    } else {
                        setDisplayReviewComp(true);
                    }
                })
                .catch(() => setDisplayReviewComp(true));
        } catch (e) {
            /* eslint-disable-next-line no-console */
            console.log('The review response was not proper JSON.');
            setDisplayReviewComp(true);
        }
    };

    const onRatingSet = (newRating, comment, updatedTotalReviews) => {
        // When onRatingSet is called, totalReviews hasn't updated yet as it's async
        setLocalStorage(reviewPath, {
            rating: newRating,
            totalReviews: updatedTotalReviews,
        });

        sendHelixData({
            comment,
            lang,
            postAuth,
            rating: newRating,
            sheet,
            postUrl,
            visitorId,
        });

        if (onRatingSetCallback)
            onRatingSetCallback(newRating, comment, updatedTotalReviews);
    };

    return (
        <>
            {displayReviewComp && (
                <Review
                    averageRating={avgRating}
                    commentThreshold={commentThreshold}
                    hideTitleOnReload={hideTitleOnReload}
                    initialRating={initialRating}
                    maxRating={maxRating}
                    onRatingHover={onRatingHover}
                    onRatingSet={onRatingSet}
                    setAverageRating={setAvgRating}
                    setTotalReviews={setTotalReviews}
                    displayRatingSummary={displayRatingSummary}
                    staticRating={rating}
                    strings={strings}
                    totalReviews={totalReviews}
                />
            )}
        </>
    );
};

export default HelixReview;
