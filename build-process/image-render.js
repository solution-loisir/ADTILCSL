module.exports = (paths, alt) => {
    const {
        fallbackPath,
        fallbackPlaceholder,
        webpPath,
        webpPlaceholder
    } = paths;
    return {
        lazyImage: (width, height) => `
<picture class="lazy">
<source type="image/webp" srcset="${webpPlaceholder}" data-srcset="${webpPath}" />
<img src="${fallbackPlaceholder}" data-src="${fallbackPath}" alt="${alt}" width="${width}" height="${height}" />
</picture>
<noscript>
<picture>
<source type="image/webp" srcset="${webpPath}" />
<img src="${fallbackPath}" alt="${alt}" width="${width}" height="${height}" />
</picture>
</noscript>`,
        eagerImage: (width, height) => `
<picture>
<source type="image/webp" srcset="${webpPath}" />
<img src="${fallbackPath}" alt="${alt}" width="${width}" height="${height}" />
</picture>`
    }
}