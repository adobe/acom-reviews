const getDate = () => new Date().toISOString().replace(/[TZ]/g, ' ').split('.')[0].trim();

const sendHelixData = ({ comment, lang, postAuth, rating, sheet, testUrl } = {}) => {
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

    const body = { sheet, data };

    fetch(testUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: postAuth,
        },
        body: JSON.stringify(body),
    });
};

export default sendHelixData;
