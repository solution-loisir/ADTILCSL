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

    //Shortcodes
    config.addNunjucksShortcode('hero', hero => 
        `<section class="grid-12 hero">
            <section class="hero__text">
                <h1 class="hero__heading">${hero.h1}</h1>
                <p class="hero__p">${hero.p}</p>
            </section>
            <img src="${hero.imgSrc}" alt="${hero.imgAlt}" class="hero__img" width="320" />
        </section>`
    );
    config.addNunjucksShortcode('card', card =>
        `<section class="card ${card.class}">
            <object type="image/svg+xml" data="${card.svg}" class="card-svg">${card.svgText}</object>
            <h1>${card.title}</h1>
            <p>${card.text}</p>
            <a href="${card.link}">En savoir plus!</a>
        </section>`
    );
    
    //Watching for modificaions in style directory
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
            output: 'docs'
        },
        pathPrefix: '/ADTILCSL/',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        templateFormats: ['njk', 'html', 'md', 'liquid']
    }
}