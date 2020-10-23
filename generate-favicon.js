const sharp = require('sharp');
const data = require('./_src/_data/site')();
const promises = [];
const icoFile = require('png-to-ico');
const { writeFile } = require('fs').promises;
const sharpStream = sharp(data.favicon);
const { format } = require('path');
const output = base => format({
    dir: 'images/favicon/',
    base: base
});

const manifest = ({
    shortName = data.shortName,
    longName = data.longName,
    description =  data.description,
    url = data.url,
    color = data.color,
    display = data.display
} = {}) => JSON.stringify({
    short_name: shortName,
    name: longName,
    description: description,
    icons: [
      {
        src: output('favicon_192.png'),
        type: "image/png",
        sizes: "192x192"
      },
      {
        src: output('favicon_512.png'),
        type: "image/png",
        sizes: "512x512"
      }
    ],
    start_url: url,
    background_color: color,
    display: display,
    scope: url,
    theme_color: color
});
promises.push(
    sharpStream
    .clone()
    .resize(256)
    .toFile(output('favicon_256.png'))
);
promises.push(
    sharpStream
    .clone()
    .resize(192)
    .toFile(output('favicon_192.png'))
);
promises.push(
    sharpStream
    .clone()
    .resize(512)
    .toFile(output('favicon_512.png'))
);
Promise.all(promises)
.then(() => icoFile(output('favicon_256.png')))
.then(buffer => writeFile('favicon.ico', buffer))
.then(writeFile("manifest.json", manifest()))
.catch(error => console.error(error.stack));