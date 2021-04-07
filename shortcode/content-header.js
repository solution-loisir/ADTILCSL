module.exports = ({heading, description}) => {
    return `
<header class="content-header">
<h1 id="header-title">${heading}</h1>
<p>${description}</p>
<hr />
</header>`;
}