// @flow

export function checkSearchString(hash: string) {
    const validHashLength = 66;

    if (hash && hash.length === validHashLength) {
        return { isValid: true, type: 'hash' };
    } else if (/^\d+$/.test(hash)) {
        return { isValid: true, type: 'number' };
    }

    return { isValid: false };
}
