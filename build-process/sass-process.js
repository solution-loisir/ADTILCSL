const { writeFile } = require('fs-extra');
const { dirname } = require('path');
const processSass = require('./sass-render');
const mkdirIfNotExist = require('./mkdir-if-not-exist');
require('dotenv').config();

module.exports = (scssPath, cssPath) => {
    Promise.all([mkdirIfNotExist(cssPath), processSass(scssPath, cssPath)])
    .then(result => writeFile(cssPath, result[1].css.toString()))
    .catch(error => console.error(error.stack));

    if(process.env.ELEVENTY_ENV === 'dev') {
        fs.watch(dirname(scssPath), () => {
            processSass(scssPath, cssPath)
            .then(result => writeFile(cssPath, result.css.toString()))
            .catch(error => console.error(error.stack));
        });
    }
}