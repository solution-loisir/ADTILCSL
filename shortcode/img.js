const sharp = require('sharp');
const { join, dirname, basename, extname } = require('path');
const { pipeline } = require('stream');
const { createReadStream } = require('fs');

module.exports = ({input, width, alt, lazy}) => {
    //Create readable stream from source image
    const readable = createReadStream(join('./', input));
    //webp image path
    const webpPath = join(dirname(input), basename(input, extname(input)) + '.webp');
    //Sharp constructor
    const sharpStream = sharp();
    //Piping readable through sharp transform stream
    pipeline(readable, sharpStream, error => {
        if(error) return console.error(error);
    });
    //These 2 promises will be fulfilled when the pipeline ends
    return Promise.all([
        //Cloning the stream
        sharpStream.clone()
        .resize(width)
        //Writing to output directory
        .toFile(join('./docs', input)),
        sharpStream.clone()
        .resize(width)
        .toFile(join('./docs', webpPath))
    ])
    /**
     * The array of info objects can be consumed
     * by the returned template literal.
     */
    .then(info => {
        const imgHeight = info[0].height;
        const imgWidth = info[0].width;
        //Aspect ratio of the image
        const ratio = imgHeight / imgWidth * 100;
        if(lazy) {
            return `
<figure class="lazy" style="width: 100%; height: 0; padding-bottom: ${ratio}%;">
<picture>
<source type="image/webp" data-srcset="${webpPath}" />
<img data-src="${input}" alt="${alt}" width="${imgWidth}" height="${imgHeight}" />
</picture>
</figure>
<noscript>
<picture>
<source type="image/webp" srcset="${webpPath}" />
<img src="${input}" alt="${alt}" width="${imgWidth}" height="${imgHeight}" />
</picture>
</noscript>
`;
        } else {
            return `
<picture>
<source type="image/webp" srcset="${webpPath}" />
<img src="${input}" alt="${alt}" width="${imgWidth}" height="${imgHeight}" />
</picture>
`;
        }
    })
    .catch(error => console.error(error));
}