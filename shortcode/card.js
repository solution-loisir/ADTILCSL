module.exports = ({cardClass, svg, svgText, title, time, text, link, linkText = 'En savoir plus!'} = {}) => {
    return `
<div class="card ${cardClass}">
${svg ? `<object type="image/svg+xml" data="${svg}" class="card-svg">${svgText}</object>` : ''}
<h2>${title}</h2>
${time ? `<p><small>${time}</small></p>` : ''}
<p>${text}</p>
<a href="${link}">${linkText}</a>
</div>`;
}