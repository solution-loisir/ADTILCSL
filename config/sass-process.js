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
            if(error) {
                reject(error);
            }
            resolve(result);
            console.log(`Writing ${dest} from ${result.stats.entry} in ${result.stats.duration}ms.`);
        });
    });
}
module.exports = (scssPath, cssPath) => {
    //If cssPath directory doesn't exist or ELEVENTY_ENV environment variabe is set to prod...
    if(!fs.existsSync(path.dirname(cssPath)) || process.env.ELEVENTY_ENV === 'prod') {
        //Create cssPath directory recursively
        fs.mkdir(path.dirname(cssPath), {recursive: true})
        //The .then method will return a promise with the result 
        .then(() => processSass(scssPath, cssPath))
        //Then write result css string to cssPath file
        .then(result => fs.writeFile(cssPath, result.css.toString()))
        .catch(error => console.error(error));
    }
    //In development environment (default)
    if(process.env.ELEVENTY_ENV === 'dev') {
        //Watch for changes to scssPath directory...
        fs.watch(path.dirname(scssPath), () => {
            //Return css as buffer from scssPath file...
            processSass(scssPath, cssPath)
            //Then turn css buffer to string and write result to cssPath file
            .then(result => fs.writeFile(cssPath, result.css.toString()))
            .catch(error => console.error(error));
        });
    }
}