const sass = require('sass');
const fs = require('fs');
const missingDir = './docs/style';
const scssFile = './style/index.scss';
const cssFile =  './docs/style/index.css';
const assets = [
    'images',
    'fonts',
    'js'
]

module.exports = config => {
    assets.forEach(asset => config.addPassthroughCopy(asset));

    fs.watch('./style', () => {
        const result = sass.renderSync({file: scssFile});
        fs.writeFile(cssFile, result.css.toString(), err => {
            if(err) {
                if(err.code === 'ENOENT') {
                    fs.mkdir(missingDir, err => {
                     console.error(`mkdir failed with : ${err}`);
                    })
                }
                console.error(`writeFile failed with : ${err}`);
            }
        })
    });
    return {
        dir: {
            output: 'docs'
        }
    }
}