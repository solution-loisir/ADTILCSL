const sharp = require('sharp'); 
const { join } = require('path');
const generatePathName = require('./image-path');
const render = require('./image-render');

module.exports = ({ input, width, alt, lazy }) => {
    const sharpStream = sharp(join('./', input));
    const outputDir = './docs';
    const pathNames = generatePathName(input);
    const {
        fallbackPath,
        fallbackPlaceholder,
        webpPath,
        webpPlaceholder
    } = pathNames;
    const { lazyImage, eagerImage } = render(pathNames, alt);
    function resizeFallbackClone({ outputPath, qualityLevel = 70 }) {
        return sharpStream
        .clone()
        .resize(width)
        .jpeg({ quality: qualityLevel })
        .toFile(join(outputDir, outputPath))
        .catch(error => console.error('Error in resizeFallbackClone function:', error));
    }
    function resizeWebpClone({ outputPath, qualityLevel = 50 }) {
        return sharpStream
        .clone()
        .resize(width)
        .webp({ quality: qualityLevel })
        .toFile(join(outputDir, outputPath))
        .catch(error => console.error('Error in resizeWebpClone function:', error));
    }
    const cloneArray = [
        resizeFallbackClone({ outputPath: fallbackPath }),
        resizeWebpClone({ outputPath: webpPath })
    ]
    if(lazy) {
        return Promise.all([
            ...cloneArray,
            resizeFallbackClone({
                outputPath: fallbackPlaceholder,
                qualityLevel: 1
            }),
            resizeWebpClone({
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