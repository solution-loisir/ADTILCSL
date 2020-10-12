const sharp = require('sharp');
const generateRandomNumber = require("number-generator/lib/aleaRNGFactory");
const { uInt32 } = generateRandomNumber(10);
const { join } = require('path');
const { pipeline } = require('stream');
const { createReadStream } = require('fs');
const generateImagePath = require('./image-path');
const render = require('./image-render');

module.exports = ({ input, width, alt, lazy }) => {
    const randomNumber = uInt32();
    const image = generateImagePath(input, randomNumber);
    const readStream = createReadStream(join('./', input));
    const sharpTransform = sharp();
    const outputDir = './docs';
    const resizeClone = () => sharpTransform.clone().resize(width);
    const writeCloneToFile = outputPath => resizeClone().toFile(join(outputDir, outputPath));

    pipeline(readStream, sharpTransform, error => {
        if(error) return console.error(error);
    });

    if(lazy) {
        return Promise.all([
            writeCloneToFile(image.fallbackPath),
            writeCloneToFile(image.webpPath),

            resizeClone()
            .jpeg({quality: 1})
            .toFile(join(outputDir, image.fallbackPlaceholder)),

            resizeClone()
            .webp({quality: 1})
            .toFile(join(outputDir, image.webpPlaceholder))
        ])
        .then(info => render.lazyImage({
            paths: image, 
            alt: alt, 
            width: info[0].width, 
            height: info[0].height
        }))
        .catch(error => console.error(error));

    } else {
        return Promise.all([
            writeCloneToFile(image.fallbackPath),
            writeCloneToFile(image.webpPath)
        ])
        .then(info => render.eagerImage({
            paths: image, 
            alt: alt, 
            width: info[0].width, 
            height: info[0].height
        }))
        .catch(error => console.error(error));
    }
}