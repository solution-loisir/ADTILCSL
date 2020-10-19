const { join, dirname, basename, extname } = require('path');
const generateRandomNumber = require("number-generator/lib/aleaRNGFactory");
const { uInt32 } = generateRandomNumber(10);

module.exports = inputPath => {
    const randomNumber = uInt32();
    return (ext, { isPlaceholder } = {}) => join(
            dirname(inputPath),
            basename(inputPath, extname(inputPath))
            + `${isPlaceholder ? '.placeholder.' : '.'}${randomNumber}`
            + ext
    );
}