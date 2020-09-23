const sharp = require('sharp');
const { join, dirname, basename, extname } = require('path');
const { pipeline } = require('stream');
const { createReadStream } = require('fs');

module.exports = async ({input, width, alt}) => {
    const readable = createReadStream(`./${input}`);
    const webpPath = join(dirname(input), basename(input, extname(input)) + '.webp');
    const sharpStream = sharp();
    const clones = [
        sharpStream.clone()
        .resize(width)
        .toFile(join('./docs', input)),
        sharpStream.clone()
        .resize(width)
        .toFile(join('./docs', dirname(input), basename(input, extname(input)) + '.webp'))
    ];
    pipeline(readable, sharpStream, error => {
        if(error) return console.error(error);
    });
    return Promise.all(clones)
    .then(infoArray => `
<picture>
<source type="image/webp" srcset="${webpPath}" />
<img src="${input}" alt="${alt}" width="${width}" height="${infoArray[0].height}" />
</picture>
`
    )
    .catch(error => console.error(error));
}