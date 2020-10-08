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
    const resizeImageClone = () => sharpTransform.clone().resize(width);
    const writeImageCloneToFile = outputPath => resizeImageClone().toFile(join(outputDirectory, outputPath));
    pipeline(readableImageInput, sharpTransform, error => {
        if(error) return console.error(error);
    });
    /**
     * The lazy loading implementation is enclosed in an if statement
     * in order to write placeholder images to output directory
     * only when lazy loading images are wanted.
     * This is triggered with the boolean value of a "lazy" argument.
     */
    if(lazy) {
        const fallbackPlaceholder = composeImagePath(extension.ofInput, true);
        const webpPlaceholder = composeImagePath(extension.webp, true);
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
        .then(info => {
            const imgHeight = info[0].height;
            const imgWidth = info[0].width;
            return `
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
        })
        .catch(error => console.error(error));
    }
    // Eager loading image implementation. This is the default returned value.
    return Promise.all([
        writeImageCloneToFile(fallbackImagePath),
        writeImageCloneToFile(webpImagePath)
    ])
    .then(info => {
        return `
<picture>
<source type="image/webp" srcset="${webpImagePath}" />
<img src="${fallbackImagePath}" alt="${alt}" width="${info[0].width}" height="${info[0].height}" />
</picture>
`;
    })
    .catch(error => console.error(error));
}