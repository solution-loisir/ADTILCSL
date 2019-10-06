const sass = require('./config/sass-process');
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
    sass('./style/index.scss', './docs/style/index.css');

    return {
        dir: {
            input: '_src',
            output: 'docs'
        },
        pathPrefix: '/ADTILCSL/',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        templateFormats: ['njk', 'html', 'md', 'liquid']
    }
}