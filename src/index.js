import * as React from 'react';
import { render } from 'react-dom';
import HelixReview from './components/helixReview/HelixReview';

const POST_AUTH =
    'SharedAccessSignature sr=https%3A%2F%2Fccgrowth.servicebus.windows.net%2Fformsink%2Fmessages&sig=RFndMU%2FyHZrlchNBfHlIdulld4URAgUAQdAlqVLf1Bw%3D&se=1634259041&skn=send';
const TEST_URL =
    'https://adobeioruntime.net/api/v1/web/helix-clients/ccgrowth/forms-handler@v1';
const COMMENT_THRESHOLD = 3;
const SHEET =
    'https://adobe.sharepoint.com/:x:/r/sites/dexter/_layouts/15/guestaccess.aspx?email=cpeyer%40adobe.com&e=4%3AkKlO86&at=9&wdLOR=cC7B42C77-6E8E-9A43-8886-3D4BE3D2D924&share=EQbXsR9mwiBGsrkxam9M5O0B0sGc3UeRSHbVqXi5d9lpTQ';
const REVIEW_LOCATION = 'dc/dev/convert-pdf';

render(
    <HelixReview
        ariaProductLabel="Convert PDF Review"
        commentThreshold={COMMENT_THRESHOLD}
        lang="en-US"
        postAuth={POST_AUTH}
        reviewLocation={REVIEW_LOCATION}
        sheet={SHEET}
        testUrl={TEST_URL}
    />,
    document.getElementById('root')
);
