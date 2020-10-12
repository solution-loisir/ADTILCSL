const sharpProcess = require('../build-process/image-process');

module.exports = (input, width, alt, lazy, cb) => {
    return sharpProcess({ input, width, alt, lazy })
    .then(string => cb(null, string))
    .catch(error => console.error(error));
}