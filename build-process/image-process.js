const sharp = require('sharp'); 
const { join, extname } = require('path');
const generatePathName = require('./image-path');
const render = require('./image-render');

module.exports = ({ input, width, alt, lazy }) => {
    const sharpStream = sharp(join('./', input));
    const outputDir = './docs';
    const extension = {
        ofInput: extname(input),
        webp: '.webp'
    }
    const composePath = generatePathName(input);
    const paths = {
        fallbackPath: composePath(extension.ofInput),
        webpPath: composePath(extension.webp),
        fallbackPlaceholder: composePath(extension.ofInput, { isPlaceholder: true }),
        webpPlaceholder: composePath(extension.webp, { isPlaceholder: true })
    }
    const { lazyImage, eagerImage } = render(alt, paths);
    function resizeFallbackClone(outputPath, { qualityLevel = 70 } = {}) {
        return sharpStream
        .clone()
        .resize(width)
        .jpeg({ quality: qualityLevel })
        .toFile(join(outputDir, outputPath))
        .catch(error => console.error('Error in resizeFallbackClone function: ', error));
    }
    function resizeWebpClone(outputPath, { qualityLevel = 50 } ={}) {
        return sharpStream
        .clone()
        .resize(width)
        .webp({ quality: qualityLevel })
        .toFile(join(outputDir, outputPath))
        .catch(error => console.error('Error in resizeWebpClone function: ', error));
    }
    if(lazy) {
        return Promise.all([
            resizeFallbackClone(paths.fallbackPath),
            resizeWebpClone(paths.webpPath),
            resizeFallbackClone(paths.fallbackPlaceholder, { qualityLevel: 1 }),
            resizeWebpClone(paths.webpPlaceholder, { qualityLevel: 1 })
        ])
        .then(info => lazyImage(info[0].width, info[0].height))
        .catch(error => console.error('Error in lazy image: ', error));
    } else {
        return Promise.all([
            resizeFallbackClone(paths.fallbackPath),
            resizeWebpClone(paths.webpPath)
        ])
        .then(info => eagerImage(info[0].width, info[0].height))
        .catch(error => console.error('Error in eager image: ', error));
    }
}