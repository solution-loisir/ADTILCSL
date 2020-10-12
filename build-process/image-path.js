const { join, dirname, basename, extname } = require('path');

module.exports = (input, id) => {
    const extension = {
        ofInput: extname(input),
        webp: '.webp'
    }
    const composePath = (extension, isPlaceholder) => {
        return join(
            dirname(input),
            basename(input, extname(input))
            + `${isPlaceholder ? '.placeholder.' : '.'}${id}`
            + extension
        );
    }
    return {
        fallbackPath: composePath(extension.ofInput),
        webpPath: composePath(extension.webp),
        fallbackPlaceholder: composePath(extension.ofInput, true),
        webpPlaceholder: composePath(extension.webp, true)
    }
}
