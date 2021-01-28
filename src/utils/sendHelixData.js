const getDate = () => new Date().toISOString().replace(/[TZ]/g, ' ').split('.')[0].trim();

const sendHelixData = ({
    comment,
    lang,
    postAuth,
    rating,
    sheet,
    postUrl,
    reviewPath,
    visitorId,
} = {}) => {
    const isDev = !!(postAuth && sheet);

    const data = [
        { name: 'Timestamp', value: getDate() },
        { name: 'Rating', value: rating },
    ];

    if (comment) {
        data.push({ name: 'Comment', value: comment });
    }

    if (lang) {
        data.push({ name: 'Locale', value: lang });
    }

    if (visitorId) {
        data.push({ name: 'VisitorId', value: visitorId });
    }

    const body = { data };
    if (isDev) body.sheet = sheet;

    const url = isDev ? postUrl : `${postUrl}/${reviewPath}`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(isDev && { Authorization: postAuth }),
        },
        body: JSON.stringify(body),
    });
};

export default sendHelixData;
