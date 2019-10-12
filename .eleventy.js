const sass = require('./config/sass-process');
const hero = require('./shortcode/hero');

module.exports = config => {
    const assets = [
        'images',
        'fonts',
        'js'
    ]
    //Passing assets as is to docs directory
    assets.forEach(asset => config.addPassthroughCopy(asset));

    //Shortcodes
    config.addShortcode('hero', hero);
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