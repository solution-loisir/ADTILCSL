module.exports = ({cardClass, svg = '', svgText = '', title, text, link, linkText = 'En savoir plus!'} = {}) => {
    return `
<section class="card ${cardClass}">
<object type="image/svg+xml" data="${svg}" class="card-svg">${svgText}</object>
<h2>${title}</h2>
<p>${text}</p>
<a href="${link}">${linkText}</a>
</section>`;
}