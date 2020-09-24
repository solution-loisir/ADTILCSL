const sharp = require('sharp');
const { join, dirname, basename, extname } = require('path');
const { pipeline } = require('stream');
const { createReadStream } = require('fs');

module.exports = ({input, width, alt}) => {
    const readable = createReadStream(`./${input}`);
    const webpPath = join(dirname(input), basename(input, extname(input)) + '.webp');
    const sharpStream = sharp();
    pipeline(readable, sharpStream, error => {
        if(error) return console.error(error);
    });
    return Promise.all([
        sharpStream.clone()
        .resize(width)
        .toFile(join('./docs', input)),
        sharpStream.clone()
        .resize(width)
        .toFile(join('./docs', dirname(input), basename(input, extname(input)) + '.webp'))
    ])
    .then(infoArray => `
<picture>
<source type="image/webp" srcset="${webpPath}" />
<img src="${input}" alt="${alt}" width="${infoArray[0].width}" height="${infoArray[0].height}" />
</picture>
`
    )
    .catch(error => console.error(error));
}