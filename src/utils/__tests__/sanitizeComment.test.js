import sanitizeComment from '../sanitizeComment';

test('basic cases', () => {
    expect(sanitizeComment()).toBe('');
    expect(sanitizeComment('')).toBe('');
    expect(sanitizeComment('hello world.')).toBe('hello world.');
    expect(sanitizeComment('昨夜のコンサー トは最高でし')).toBe(
        '昨夜のコンサー トは最高でし'
    );
});

test('should remove disallowed characters', () => {
    expect(sanitizeComment('~!@#$%^&*()_+={}[]|\\:;"\'<>?/')).toBe('');
    expect(sanitizeComment('Hello ~!@#$夜の%^&*()_+={}world.[]|\\:;"\'<>?/')).toBe(
        'Hello 夜のworld.'
    );
});

test('should preserve urls and remove disallowed characters', () => {
    expect(
        sanitizeComment(
            'Go to http://adobe.com or www.adobe.com/creativecloud/plans.html?query=param then remove these $%^&* chars'
        )
    ).toBe(
        'Go to http://adobe.com or www.adobe.com/creativecloud/plans.html?query=param then remove these  chars'
    );

    expect(
        sanitizeComment('bad url: www.hack.com/?attack="><script>alert(1)</script> here')
    ).toBe('bad url www.hack.comattackscriptalert1script here');
});
