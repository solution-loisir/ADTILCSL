const sharp = require('sharp');
const { join } = require('path');
const { pipeline } = require('stream');
const { createReadStream } = require('fs');
const generateImagePath = require('./image-path');
const render = require('./image-render');

module.exports = ({ input, width, alt, lazy }) => {
    const imagePaths = generateImagePath(input);
    const { fallbackPath, webpPath, fallbackPlaceholder, webpPlaceholder } = imagePaths;
    const { lazyImage, eagerImage } = render(imagePaths, alt);
    const readStream = createReadStream(join('./', input));
    const sharpTransform = sharp();
    const writeResizeCloneToFile = quality => outputPath => (outputDir = './docs') => {
        return sharpTransform
        .clone()
        .jpeg(quality)
        .resize(width)
        .toFile(join(outputDir, outputPath))
    };
    const writeImageToFile = writeResizeCloneToFile();
    const writePlaceholderToFile = writeResizeCloneToFile({ quality: 1 });

    pipeline(readStream, sharpTransform, error => {
        if(error) return console.error('Error in pipeline.', error);
    });

    if(lazy) {
        return Promise.all([
            writeImageToFile(fallbackPath),
            writeImageToFile(webpPath),
            writePlaceholderToFile(fallbackPlaceholder),
            writePlaceholderToFile(webpPlaceholder)
        ])
        .then(info => lazyImage(info[0].width, info[0].height))
        .catch(error => console.error('Error in lazy image.', error));

    } else {
        return Promise.all([
            writeImageToFile(fallbackPath),
            writeImageToFile(webpPath)
        ])
        .then(info => eagerImage(info[0].width, info[0].height))
        .catch(error => console.error('Error in eager image.', error));
    }
}