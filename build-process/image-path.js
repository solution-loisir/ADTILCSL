const { join, dirname, basename, extname } = require('path');
const generateRandomNumber = require("number-generator/lib/aleaRNGFactory");
const { uInt32 } = generateRandomNumber(10);

module.exports = input => {
    const randomNumber = uInt32();
    const extension = {
        ofInput: extname(input),
        webp: '.webp'
    }
    const composePath = (ext, isPlaceholder) => {
        return join(
            dirname(input),
            basename(input, extname(input))
            + `${isPlaceholder ? '.placeholder.' : '.'}${randomNumber}`
            + ext
        );
    }
    return {
        fallbackPath: composePath(extension.ofInput ),
        webpPath: composePath(extension.webp ),
        fallbackPlaceholder: composePath(extension.ofInput, true ),
        webpPlaceholder: composePath(extension.webp, true)
    }
}
