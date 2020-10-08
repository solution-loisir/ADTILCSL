const sharp = require('sharp');
const random = require("number-generator/lib/aleaRNGFactory");
const { uInt32 } = random(10);
const { join, dirname, basename, extname } = require('path');
const { pipeline } = require('stream');
const { createReadStream } = require('fs');

module.exports = ({input, width, alt, lazy}) => {
    //Generate a different random number with each execution
    const randomNumber = uInt32();
    //Create readable stream from source image
    const readable = createReadStream(join('./', input));
    //Original clone image path
    const originalPath = join(dirname(input), basename(input, extname(input)) + `.${randomNumber}` + extname(input));
    //webp clone image path
    const webpPath = join(dirname(input), basename(input, extname(input)) + `.${randomNumber}` + '.webp');
    const cloneStream = () => sharpStream.clone().resize(width);
    const processedOutput = output => cloneStream().toFile(join('./docs', output));
    //Sharp constructor
    const sharpStream = sharp();
    //Piping readable through sharp transform stream
    pipeline(readable, sharpStream, error => {
        if(error) return console.error(error);
    });
    if(lazy) {
        //Placeholder image for input
        const originalPlaceholder = join(dirname(input), basename(input, extname(input)) + `.placeholder.${randomNumber}` + extname(input));
        //Placeholder image for webp
        const webpPlaceholder = join(dirname(input), basename(input, extname(input)) + `.placeholder.${randomNumber}` + '.webp');
        //These 2 promises will be fulfilled when the pipeline ends
        return Promise.all([
            processedOutput(originalPath),
            processedOutput(webpPath),

            cloneStream()
            .jpeg({quality: 1})
            .toFile(join('./docs', originalPlaceholder)),

            cloneStream()
            .webp({quality: 1})
            .toFile(join('./docs', webpPlaceholder))
        ])
        .then(info => {
            const imgHeight = info[0].height;
            const imgWidth = info[0].width;
            return `
<picture class="lazy">
<source type="image/webp" srcset="${webpPlaceholder}" data-srcset="${webpPath}" />
<img src="${originalPlaceholder}" data-src="${originalPath}" alt="${alt}" width="${imgWidth}" height="${imgHeight}" />
</picture>
<noscript>
<picture>
<source type="image/webp" srcset="${webpPath}" />
<img src="${originalPath}" alt="${alt}" width="${imgWidth}" height="${imgHeight}" />
</picture>
</noscript>
`;
        })
        .catch(error => console.error(error));
    } else {
        return Promise.all([
            processedOutput(originalPath),
            processedOutput(webpPath)
        ])
        .then(info => {
            return `
<picture>
<source type="image/webp" srcset="${webpPath}" />
<img src="${originalPath}" alt="${alt}" width="${info[0].width}" height="${info[0].height}" />
</picture>
`;
        })
        .catch(error => console.error(error));
    }
}