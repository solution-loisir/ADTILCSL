const sass = require('sass');
const fs = require('fs-extra');
const path = require('path');

module.exports = (scssPath, cssPath) => {
    fs.watch(path.dirname(scssPath), () => {
        console.log(`Watching ${path.dirname(scssPath)}...`);

        const result = sass.renderSync({file: scssPath});

        if(!fs.existsSync(path.dirname(cssPath))) {
            fs.mkdir(path.dirname(cssPath))
            .catch(error => console.error(error))
        } 
        fs.writeFile(cssPath, result.css.toString())
        .catch(error => console.error(error))      
    });
}    