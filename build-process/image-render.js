module.exports = (alt, { fallbackPath, fallbackPlaceholder, webpPath, webpPlaceholder }) => ({
        lazyImage(width, height) {
            return `
<picture class="lazy">
<source type="image/webp" srcset="${webpPlaceholder}" data-srcset="${webpPath}" />
<img src="${fallbackPlaceholder}" data-src="${fallbackPath}" alt="${alt}" width="${width}" height="${height}" />
</picture>
<noscript>
<picture>
<source type="image/webp" srcset="${webpPath}" />
<img src="${fallbackPath}" alt="${alt}" width="${width}" height="${height}" />
</picture>
</noscript>`;
        },
        eagerImage(width, height) {
            return `
<picture>
<source type="image/webp" srcset="${webpPath}" />
<img src="${fallbackPath}" alt="${alt}" width="${width}" height="${height}" />
</picture>`;
        }
});