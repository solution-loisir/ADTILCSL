const sass = require('sass');
const fs = require('fs');
const scssFile = './style/index.scss';
const cssFile =  './docs/style/index.css';
const missingDir = './docs/style';
const assets = [
    'images',
    'fonts',
    'js'
]

module.exports = config => {
    //Passing assets as is to docs directory
    assets.forEach(asset => config.addPassthroughCopy(asset));
    
    fs.watch('./style', () => {
        //Returning css from scssFile
        const result = sass.renderSync({file: scssFile});
        //Then writing result to cssFile
        fs.writeFile(cssFile, result.css.toString(), err => {
            if(err) {
                //Creates ./docs/style if it's missing
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
            output: 'docs',
            pathPrefix: 'ADTILCSL'
        },
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        templateFormats: ['njk', 'html', 'md', 'haml']
    }
}