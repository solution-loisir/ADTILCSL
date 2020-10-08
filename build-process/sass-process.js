const sass = require('sass');
const fs = require('fs-extra');
const path = require('path');
const fibers = require('fibers');
require('dotenv').config();

const processSass = (src, dest) => {
    return new Promise((resolve, reject) => {
        sass.render({
            file: src,
            fiber: fibers
        }, (error, result) => {
            if(error) reject(error);
            resolve(result);
            console.log(`Writing ${dest} from ${result.stats.entry} in ${result.stats.duration}ms.`);
        });
    });
}
module.exports = (scssPath, cssPath) => {
    if(!fs.existsSync(path.dirname(cssPath)) || process.env.ELEVENTY_ENV === 'prod') {
        Promise.all([fs.mkdir(path.dirname(cssPath), {recursive: true}), processSass(scssPath, cssPath)])
        .then(result => fs.writeFile(cssPath, result[1].css.toString()))
        .catch(error => console.error(error.stack));
    }
    if(process.env.ELEVENTY_ENV === 'dev') {
        fs.watch(path.dirname(scssPath), () => {
            processSass(scssPath, cssPath)
            .then(result => fs.writeFile(cssPath, result.css.toString()))
            .catch(error => console.error(error.stack));
        });
    }
}