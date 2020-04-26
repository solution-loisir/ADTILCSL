module.exports = ({cardClass, svg, svgText, title, text, link}) => {
    return `
<section class="card ${cardClass}">
<object type="image/svg+xml" data="${svg}" class="card-svg">${svgText}</object>
<h1>${title}</h1>
<p>${text}</p>
<a href="${link}">En savoir plus!</a>
</section>`;
}