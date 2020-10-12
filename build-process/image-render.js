const lazyImage = ({ paths, alt, width, height }) => `
<picture class="lazy">
<source type="image/webp" srcset="${paths.webpPlaceholder}" data-srcset="${paths.webpPath}" />
<img src="${paths.fallbackPlaceholder}" data-src="${paths.fallbackPath}" alt="${alt}" width="${width}" height="${height}" />
</picture>
<noscript>
<picture>
<source type="image/webp" srcset="${paths.webpPath}" />
<img src="${paths.fallbackPath}" alt="${alt}" width="${width}" height="${height}" />
</picture>
</noscript>
`;
const eagerImage = ({ paths, alt, width, height }) => `
<picture>
<source type="image/webp" srcset="${paths.webpPath}" />
<img src="${paths.fallbackPath}" alt="${alt}" width="${width}" height="${height}" />
</picture>
`;

module.exports = { lazyImage, eagerImage }