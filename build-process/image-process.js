const sharp = require('sharp'); 
const { join } = require('path');
const generatePathName = require('./image-path');
const render = require('./image-render');

module.exports = ({ input, width, alt, lazy }) => {
    const sharpBaseClone = sharp(join('./', input));
    const outputDir = './docs';
    const pathNames = generatePathName(input);
    const {
        fallbackPath,
        fallbackPlaceholder,
        webpPath,
        webpPlaceholder
    } = pathNames;
    const { lazyImage, eagerImage } = render(pathNames, alt);
    function writeResizeCloneToFile({ outputPath, qualityLevel }) {
        return sharpBaseClone
        .clone()
        .resize(width)
        .jpeg({ quality: qualityLevel })
        .toFile(join(outputDir, outputPath))
        .catch(error => console.error('Error in writeResizeCloneToFile function:', error));
    }
    const cloneArray = [
        writeResizeCloneToFile({ outputPath: fallbackPath }),
        writeResizeCloneToFile({ outputPath: webpPath })
    ]
    if(lazy) {
        return Promise.all([
            ...cloneArray,
            writeResizeCloneToFile({
                outputPath: fallbackPlaceholder,
                qualityLevel: 1
            }),
            writeResizeCloneToFile({
                outputPath: webpPlaceholder,
                qualityLevel: 1
            })
        ])
        .then(info => lazyImage(info[0].width, info[0].height))
        .catch(error => console.error('Error in lazy image:', error));
    } else {
        return Promise.all(cloneArray)
        .then(info => eagerImage(info[0].width, info[0].height))
        .catch(error => console.error('Error in eager image:', error));
    }
}