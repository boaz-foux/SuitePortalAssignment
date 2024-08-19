const crypto = require('crypto');

export const getHash = (text: string) => {
    const shasum = crypto.createHash('sha1');
    shasum.update(text);
    return shasum.digest('hex');
}