module.exports = ({cardClass, defaultClass = 'card', svg, img, alt, title, detail, text, link, linkText = 'En savoir plus!'} = {}) => {
    return ` 
<div class="${defaultClass}${cardClass ? ` ${cardClass}` : ''}">
${link ? `<a class="${defaultClass}" href="${link}">` : ''}
${img ? `<img src="${img}" alt="${alt}" />` : ''}
${svg ? `<object type="image/svg+xml" data="${svg}">${alt}</object>` : ''}
<h2>${title}</h2>
${detail ? `<p><small>${detail}</small></p>` : ''}
<p>${text}</p>
${link ? `</a>` : ''}
${link ? `<a class="card-anchor" href="${link}">${linkText}</a>` : ''}
</div>`;
}