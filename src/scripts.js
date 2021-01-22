import * as React from 'react';
import { render } from 'react-dom';
import HelixReview from './components/helixReview/HelixReview';
import './less/styles.less';

const POST_AUTH =
    'SharedAccessSignature sr=https%3A%2F%2Fccgrowth.servicebus.windows.net%2Fformsink%2Fmessages&sig=RFndMU%2FyHZrlchNBfHlIdulld4URAgUAQdAlqVLf1Bw%3D&se=1634259041&skn=send';
const TEST_URL =
    'https://adobeioruntime.net/api/v1/web/helix-clients/ccgrowth/forms-handler@v1';
const SHEET =
    'https://adobe.sharepoint.com/:x:/r/sites/dexter/_layouts/15/guestaccess.aspx?email=cpeyer%40adobe.com&e=4%3AkKlO86&at=9&wdLOR=cC7B42C77-6E8E-9A43-8886-3D4BE3D2D924&share=EQbXsR9mwiBGsrkxam9M5O0B0sGc3UeRSHbVqXi5d9lpTQ';
const REVIEW_PATH = 'dc/dev/convert-pdf';
const REVIEW_DOMAIN = 'http://localhost:3000';

const COMMENT_THRESHOLD = 3;

const strings = {
    ariaProductLabel: '',
    sendCta: 'Send',
    star: 'star',
    starPlural: 'stars',
    placeholder: 'Please give us your feedback',
    review: 'vote',
    reviewPlural: 'votes',
    reviewTitle: 'Rate Your Experience',
    thankYou: 'Thank you for your feedback!',
};

render(
    <HelixReview
        commentThreshold={COMMENT_THRESHOLD}
        hideTitleOnReload
        lang="en-US"
        postAuth={POST_AUTH}
        reviewDomain={REVIEW_DOMAIN}
        reviewPath={REVIEW_PATH}
        reviewTitle="Rate your experience"
        sheet={SHEET}
        strings={strings}
        postUrl={TEST_URL}
    />,
    document.getElementById('root')
);
