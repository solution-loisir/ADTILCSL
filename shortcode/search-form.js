module.exports = ({className, id, closeBtn}) => `
<form action="https://www.google.ca/search" method="get" class="${className}" ${id ? `id="${id}"` : ''} name="search">
${closeBtn ? '<button class="search-close-btn" id="search-close-btn" title="Fermez la recherche">X</button>' : ''}
<input type="hidden" name="query" value="site:https://loisir.netlify.app" />
<label for="search-string">
<h2>
Effectuez une recherche
</h2>
<p>Le résultat s'affichera dans Google.</p>
</label>
<p>
<input type="text" name="query" id="search-string" autofocus />
</p>
<button type="submit" class="submit-search">Recherchez ADTILCSL</button>
</form>`;