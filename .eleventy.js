const sass = require('./config/sass-process');
//Shortcodes
const card = require('./shortcode/card');
const contentHeader = require('./shortcode/content-header');
//Filters
const timeFormat = require('./filters/readable-time');
//External
const htmlmin = require('html-minifier');

module.exports = config => {
    //Watching for modificaions in style directory
    sass('./style/index.scss', './docs/style/index.css');
    //Passing assets as is to docs directory
    const assets = [
        'images',
        'fonts',
        'js'
    ]
    assets.forEach(asset => config.addPassthroughCopy(asset));
    //Shortcodes
    config.addShortcode('card', card);
    config.addShortcode('contentHeader', contentHeader);
    //Filters
    config.addFilter('timeFormat', timeFormat);
    //Custom collections
    config.addCollection('posts', collection => collection.getFilteredByGlob('_src/posts/*.md'));
    //Set libraries
    config.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_separator: '---excerpt---'
    });
    //html-minifier
    config.addTransform('htmlmin', (content, output) => {
        if(process.env.ELEVENTY_ENV === 'prod' && output.endsWith('.html')) {
            return htmlmin.minify(content, {
                useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true
            });
        }
        return content
    });
    //Layout alias
    config.addLayoutAlias('base-layout', 'layouts/base-layout.njk');
    config.addLayoutAlias('post-layout', 'layouts/post-layout.njk');
    config.addLayoutAlias('sejour-layout', 'layouts/sejour-layout.njk');
    config.addLayoutAlias('construction', 'layouts/construction.njk');
    config.addLayoutAlias('blog-layout', 'layouts/blog-layout.njk');
    //Return config object
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