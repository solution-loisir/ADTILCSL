module.exports = ({h1, p, imgSrc, imgAlt}, lazy) => {
    if(lazy) {
        return `
<div class="grid-12 hero">
<div class="hero__text">
<h1 class="hero__heading">${h1}</h1>
<p class="hero__p">${p}</p>
</div>
<div class="hero__img-container">
<img data-src="${imgSrc}" alt="${imgAlt}" class="hero__img shadow" />
</div>
</div>
`;
    } else {
        return `
<div class="grid-12 hero">
<div class="hero__text">
<h1 class="hero__heading">${h1}</h1>
<p class="hero__p">${p}</p>
</div>
<div class="hero__img-container">
<img src="${imgSrc}" alt="${imgAlt}" class="hero__img shadow" />
</div>
</div>
`;
    }
}