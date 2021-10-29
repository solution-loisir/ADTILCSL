module.exports = (alt, className, overflow, { fallbackPath, fallbackPlaceholder, webpPath, webpPlaceholder }) => Object.freeze({
        lazyImage(width, height) {
            return `
${overflow ? `<figure class="overflow-auto${className ? ` ${className}` : ''}"><div style="width: ${width}px;">`: ""}
<picture class="lazy-picture">
<source type="image/webp" srcset="${webpPlaceholder}" data-srcset="${webpPath}" class="lazy" />
<img src="${fallbackPlaceholder}" data-src="${fallbackPath}" alt="${alt}" width="${width}" height="${height}" title="${alt}" class="lazy${className ? ` ${className}` : ''}" />
</picture>
${overflow ? `</div></figure>`: ""}
<noscript>
${overflow ? `<figure class="overflow-auto${className ? ` ${className}` : ''}"><div style="width: ${width}px;">`: ""}
<picture>
<source type="image/webp" srcset="${webpPath}" />
<img src="${fallbackPath}" alt="${alt}" width="${width}" height="${height}" title="${alt}"${className ? ` class="${className}"` : ''} />
</picture>
${overflow ? `</div></figure>`: ""}
</noscript>`;
        },
        eagerImage(width, height) {
            return `
${overflow ? `<figure class="overflow-auto${className ? ` ${className}` : ''}"><div style="width: ${width}px;">`: ""}
<picture>
<source type="image/webp" srcset="${webpPath}" />
<img src="${fallbackPath}" alt="${alt}" width="${width}" height="${height}" title="${alt}"${className ? ` class="${className}"` : ''} />
</picture>
${overflow ? `</div></figure>`: ""}`;
        }
});