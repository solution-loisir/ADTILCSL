const sharp = require('sharp');
const randomNumber = require("number-generator/lib/aleaRNGFactory");
const { uInt32 } = randomNumber(10);
const { join, dirname, basename, extname } = require('path');
const { pipeline } = require('stream');
const { createReadStream } = require('fs');

module.exports = ({ input, width, alt, lazy }) => {
    const sharpTransform = sharp();
    const generateRandomNumber = uInt32();
    const readableImageInput = createReadStream(join('./', input));
    const outputDirectory = './docs';
    const extension = {
        ofInput: extname(input),
        webp: '.webp'
    }
    const composeImagePath = (ext, isPlaceholder) => {
        return join(
            dirname(input),
            basename(input, extname(input))
            + `${isPlaceholder ? '.placeholder.' : '.'}${generateRandomNumber}`
            + ext
        );
    }
    const fallbackImagePath = composeImagePath(extension.ofInput);
    const webpImagePath = composeImagePath(extension.webp);
    const fallbackPlaceholder = composeImagePath(extension.ofInput, true);
    const webpPlaceholder = composeImagePath(extension.webp, true);
    const resizeImageClone = () => sharpTransform.clone().resize(width);
    const writeImageCloneToFile = outputPath => resizeImageClone().toFile(join(outputDirectory, outputPath));
    const renderLazyImage = (imgWidth, imgHeight) => `
<picture class="lazy">
<source type="image/webp" srcset="${webpPlaceholder}" data-srcset="${webpImagePath}" />
<img src="${fallbackPlaceholder}" data-src="${fallbackImagePath}" alt="${alt}" width="${imgWidth}" height="${imgHeight}" />
</picture>
<noscript>
<picture>
<source type="image/webp" srcset="${webpImagePath}" />
<img src="${fallbackImagePath}" alt="${alt}" width="${imgWidth}" height="${imgHeight}" />
</picture>
</noscript>
`;
    const renderEagerImage = (imgWidth, imgHeight) => `
<picture>
<source type="image/webp" srcset="${webpImagePath}" />
<img src="${fallbackImagePath}" alt="${alt}" width="${imgWidth}" height="${imgHeight}" />
</picture>
`;
    pipeline(readableImageInput, sharpTransform, error => {
        if(error) return console.error(error);
    });
    // Lazy loading image implementation.
    if(lazy) {
        return Promise.all([
            writeImageCloneToFile(fallbackImagePath),
            writeImageCloneToFile(webpImagePath),

            resizeImageClone()
            .jpeg({quality: 1})
            .toFile(join(outputDirectory, fallbackPlaceholder)),

            resizeImageClone()
            .webp({quality: 1})
            .toFile(join(outputDirectory, webpPlaceholder))
        ])
        .then(info => renderLazyImage(info[0].width, info[0].height))
        .catch(error => console.error(error));
    }
    // Eager loading image implementation. This is the default returned value.
    return Promise.all([
        writeImageCloneToFile(fallbackImagePath),
        writeImageCloneToFile(webpImagePath)
    ])
    .then(info => renderEagerImage(info[0].width, info[0].height))
    .catch(error => console.error(error));
}