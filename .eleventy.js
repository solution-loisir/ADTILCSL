const sass = require('./config/sass-process');
const card = require('./shortcode/card');
const timeFormat = require('./filters/readable-time');

module.exports = config => {
    const assets = [
        'images',
        'fonts',
        'js'
    ]
    //Passing assets as is to docs directory
    assets.forEach(asset => config.addPassthroughCopy(asset));

    //Shortcodes
    config.addShortcode('card', card);
    //Filters
    config.addFilter('timeFormat', timeFormat);
    //Custom collections
    config.addCollection('posts', collection => collection.getFilteredByGlob('_src/posts/*.md'));
    //Watching for modificaions in style directory
    sass('./style/index.scss', './docs/style/index.css');

    //Layout alias
    config.addLayoutAlias('base-layout', 'layouts/base-layout.njk');
    config.addLayoutAlias('post-layout', 'layouts/post-layout.njk');
    config.addLayoutAlias('sejour-layout', 'layouts/sejour-layout.njk');
    config.addLayoutAlias('construction', 'layouts/construction.njk');

    return {
        dir: {
            input: '_src',
            output: 'docs'
        },
        pathPrefix: '/',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        templateFormats: ['njk', 'html', 'md', 'liquid']
    }
}