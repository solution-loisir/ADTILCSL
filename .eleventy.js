// Utilities
const htmlmin = require('html-minifier');
const sass = require('./build-process/sass-process');
const imageProcess = require('./build-process/image-process');
// Shortcodes
const card = require('./shortcode/card');
const contentHeader = require('./shortcode/content-header');
const searchForm = require('./shortcode/search-form');
// Filters
const timeFormat = require('./filters/readable-time');
const textFormat = require('./filters/text-format');
const imgFilter = require('./filters/imgFilter');
// Markdown
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItTocDoneRight = require('markdown-it-toc-done-right');
const markdownItClass = require('@toycode/markdown-it-class');

module.exports = function(config) {
    // Sass pre-processing
    sass('./style/index.scss', './docs/style/index.css');
    // Passthrough copy
    const assets = [
        'images',
        'fonts',
        'js',
        'politiques',
        './favicon.ico',
        './manifest.json'
    ]
    assets.forEach(asset => config.addPassthroughCopy(asset));
    // Shortcodes
    config.addShortcode('card', card);
    config.addShortcode('contentHeader', contentHeader);
    config.addShortcode('searchForm', searchForm);
    config.addNunjucksAsyncShortcode('img', imageProcess);
    // Filters
    config.addFilter('timeFormat', timeFormat);
    config.addFilter('textFormat', textFormat);
    config.addNunjucksAsyncFilter('img', imgFilter);
    // Collections
    config.addCollection('posts', collection => collection.getFilteredByGlob('_src/posts/*.md'));
    config.addCollection('postsTags', collection => {
       const posts = collection.getFilteredByTag('articles');
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
    // Libraries
    config.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_separator: '---excerpt---'
    });
    //Markdown settings with plugins
    const uslugify = s => require('uslug')(s);
    config.setLibrary('md', markdownIt ({
        html: true,
        breaks: true,
        linkify: true
    }).use(markdownItAnchor, {
        slugify: uslugify,
        permalink: true,
        permalinkClass: 'title-link',
        permalinkSymbol: '#',
        level: [1, 2]
    }).use(markdownItTocDoneRight, {
        slugify: uslugify,
        listType: 'ul',
        level: [1, 2],
        containerClass: 'auto-toc'
    }).use(markdownItClass, {
        h1: 'anchors',
        h2: 'anchors'   
    }));
    // Transform
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
    // Aliases
    config.addLayoutAlias('base-layout', 'layouts/base-layout.njk');
    config.addLayoutAlias('post-layout', 'layouts/post-layout.njk');
    config.addLayoutAlias('sejour-layout', 'layouts/sejour-layout.njk');
    config.addLayoutAlias('construction', 'layouts/construction.njk');
    config.addLayoutAlias('blog-layout', 'layouts/blog-layout.njk');
    config.addLayoutAlias('formations-layout', 'layouts/formations-layout.njk');
    config.addLayoutAlias('videos-layout', 'layouts/videos-layout.njk');
    config.addLayoutAlias('conduite-layout', 'layouts/conduite-layout.njk');
    // Configuration
    return {
        dir: {
            input: '_src',
            output: 'docs'
        },
        pathPrefix: '/',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        templateFormats: ['njk', 'html', 'md', '11ty.js']
    }
}