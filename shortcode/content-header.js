module.exports = ({heading, description}) => {
    return `
<header class="content-header">
<h1>${heading}</h1>
<p>${description}</p>
<hr />
</header>`;
}