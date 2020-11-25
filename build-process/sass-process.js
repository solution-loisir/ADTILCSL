const { writeFile, watch } = require('fs-extra');
const { dirname } = require('path');
const sassRender = require('./sass-render');
const mkdirIfNotExist = require('./mkdir-if-not-exist');

module.exports = function(scssPath, cssPath) {
    Promise.all([ mkdirIfNotExist(cssPath), sassRender(scssPath, cssPath) ])
    .then(result => writeFile(cssPath, result[1].css.toString()))
    .catch(error => console.error(error.stack));

    if(process.argv.includes('--serve')) {
        watch(dirname(scssPath), () => sassRender(scssPath, cssPath)
            .then(result => writeFile(cssPath, result.css.toString()))
            .catch(error => console.error(error.stack))
        );
    }
}