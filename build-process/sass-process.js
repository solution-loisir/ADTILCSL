const { writeFile, watch } = require('fs-extra');
const { dirname } = require('path');
const sassRender = require('./sass-render');
const mkdirIfNotExist = require('./mkdir-if-not-exist');
require('dotenv').config();

module.exports = (scssPath, cssPath) => {
    Promise.all([mkdirIfNotExist(cssPath), sassRender(scssPath, cssPath)])
    .then(result => writeFile(cssPath, result[1].css.toString()))
    .catch(error => console.error(error.stack));

    if(process.env.ELEVENTY_ENV === 'dev') {
        watch(dirname(scssPath), () => {
            sassRender(scssPath, cssPath)
            .then(result => writeFile(cssPath, result.css.toString()))
            .catch(error => console.error(error.stack));
        });
    }
}