module.exports = ({cardClass, svg, alt, title, time, text, link, linkText = 'En savoir plus!'} = {}) => {
    return ` 
<div class="card ${cardClass}">
${svg && link ? `<a class="card-full-anchor" href="${link}">` : ''}
${svg ? `<object type="image/svg+xml" data="${svg}" class="card-svg">${alt}</object>` : ''}
<h2>${title}</h2>
${time ? `<p><small>${time}</small></p>` : ''}
<p>${text}</p>
${svg && link ? `</a>` : ''}
<a class="card-anchor" href="${link}">${linkText}</a>
</div>`;
}