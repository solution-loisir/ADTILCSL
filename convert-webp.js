const sharp = require('sharp');
const fs = require('fs');
const { format, basename, extname } = require('path');

const readdirInput = './images/webp/';

fs.promises.readdir(readdirInput)
.then(files => {
    files.forEach(file => {
        const sharpInput = format({
            dir: 'images/webp',
            base: file
        });
        const output = format({
            dir: './images',
            base: basename(file, extname(file)) + '.jpg'
        })
        sharp(sharpInput)
        .clone()
        .jpeg({ quality: 100 })
        .toFile(output)
        .catch(error => console.error(`Error with ${sharpInput} or ${output} in sharp: `, error));
    });
})
.catch(error => console.error('Error in readdir: ', error));