module.exports = ({img, title, detail, text}) => `
<div class="card">
<img src="${img}" alt="${title}" />
<h2>${title}</h2>
<p><small>${detail}</small></p>
<p>${text}</p>
</div>  
`;