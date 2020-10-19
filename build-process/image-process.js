const sharp = require('sharp'); 
const { join, extname } = require('path');
const generatePathFrom = require('./image-path');
const render = require('./image-render');

module.exports = ({ input, width, alt, lazy }) => {
    const sharpStream = sharp(join('./', input));
    const outputDir = './docs';
    const extensions = Object.freeze({
        ofInput: extname(input),
        webp: '.webp'
    });
    const addExtensionToPath = generatePathFrom(input);
    const paths = Object.freeze({
        fallbackPath: addExtensionToPath(extensions.ofInput),
        webpPath: addExtensionToPath(extensions.webp),
        fallbackPlaceholder: addExtensionToPath(extensions.ofInput, { isPlaceholder: true }),
        webpPlaceholder: addExtensionToPath(extensions.webp, { isPlaceholder: true })
    });
    const { lazyImage, eagerImage } = render(alt, paths);
    function processFallbackClone(outputPath, quality = { quality: 70 }) {
        return sharpStream
        .clone()
        .resize(width)
        .jpeg(quality)
        .toFile(join(outputDir, outputPath))
        .catch(error => console.error('Error in processFallbackClone function: ', error));
    }
    function processWebpClone(outputPath, quality = { quality: 50 }) {
        return sharpStream
        .clone()
        .resize(width)
        .webp(quality)
        .toFile(join(outputDir, outputPath))
        .catch(error => console.error('Error in processWebpClone function: ', error));
    }
    if(lazy) {
        return Promise.all([
            processFallbackClone(paths.fallbackPath),
            processWebpClone(paths.webpPath),
            processFallbackClone(paths.fallbackPlaceholder, { quality: 1 }),
            processWebpClone(paths.webpPlaceholder, { quality: 1 })
        ])
        .then(info => lazyImage(info[0].width, info[0].height))
        .catch(error => console.error('Error in lazy image: ', error));
    } else {
        return Promise.all([
            processFallbackClone(paths.fallbackPath),
            processWebpClone(paths.webpPath)
        ])
        .then(info => eagerImage(info[0].width, info[0].height))
        .catch(error => console.error('Error in eager image: ', error));
    }
}