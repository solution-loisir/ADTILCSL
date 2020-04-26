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
<div class="hero-container">
<div class="grid-12 hero">
<div class="hero__text">
<h1 class="hero__heading">${h1}</h1>
<p class="hero__p">${p}</p>
</div>
<div class="hero__img-container">
<img src="${imgSrc}" alt="${imgAlt}" class="hero__img shadow" />
</div>
</div>
<svg xmlns="images/wave.svg" viewBox="0 0 1440 320"><path fill="#7ed3ed85" fill-opacity="1" d="M0,224L48,213.3C96,203,192,181,288,165.3C384,149,480,139,576,144C672,149,768,171,864,181.3C960,192,1056,192,1152,181.3C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
</svg>
</div>
`;
    }
}