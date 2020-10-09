const sharpProcess = require('../build-process/sharp-img-process');

module.exports = ({ input, width, alt, lazy }) => {
    return sharpProcess({ input, width, alt, lazy })
    .catch(error => console.error(error));
}