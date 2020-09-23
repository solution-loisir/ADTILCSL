//Utility
const htmlmin = require('html-minifier');
const sass = require('./config/sass-process');
//Shortcodes
const card = require('./shortcode/card');
const contentHeader = require('./shortcode/content-header');
const img = require('./shortcode/img');
//Filters
const timeFormat = require('./filters/readable-time');
const textFormat = require('./filters/text-format');

module.exports = config => {
    //Pre-processing Sass and watching for changes in dev env only.
    sass('./style/index.scss', './docs/style/index.css');
    //Passing assets as is to docs directory.
    const assets = [
        'images',
        'fonts',
        'js',
        'politiques'
    ]
    assets.forEach(asset => config.addPassthroughCopy(asset));
    //Shortcodes
    config.addShortcode('card', card);
    config.addShortcode('contentHeader', contentHeader);
    config.addNunjucksAsyncShortcode('img', img);
    //Filters
    config.addFilter('timeFormat', timeFormat);
    config.addFilter('textFormat', textFormat);
    //Custom collections
    config.addCollection('posts', collection => collection.getFilteredByGlob('_src/posts/*.md'));
    config.addCollection('postsTags', collection => {
       const posts = collection.getFilteredByGlob('_src/posts/*.md');
       let tagSet = new Set();
       posts.forEach(temp => {
           if('tags' in temp.data) {
            for(const tag of temp.data.tags) {
                tagSet.add(tag);
            }
           }
       });
       return [...tagSet];
    });
    config.addCollection('allTags', collection => {
        const allCollections = collection.getAllSorted();
        let tagSet = new Set();
        allCollections.forEach(temp => {
            if('tags' in temp.data) {
                for(const tag of temp.data.tags) {
                    tagSet.add(tag);
                }
            }
        });
        return [...tagSet];
    });
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
    config.addLayoutAlias('formations-layout', 'layouts/formations-layout.njk');
    config.addLayoutAlias('videos-layout', 'layouts/videos-layout.njk');
    config.addLayoutAlias('conduite-layout', 'layouts/conduite-layout.njk');
    //Config object
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