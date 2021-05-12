const renderTemplate = (clone, container) => {
    container.innerHTML = "";
    container.appendChild(clone);
}
const cloneTemplate = templateId => {
    const template = document.querySelector(templateId);
    const clone = template.content.cloneNode(true);
    return clone;
}
const manageTagState = target => {
    document.querySelectorAll(".tags").forEach(tag => tag.classList.remove("active"));
    target.classList.add("active");
}
const updateTitle = title => document.querySelector("title").textContent = title;
const updateHeading = (heading, text) => heading.textContent = text;

export { 
    renderTemplate,
    cloneTemplate, 
    manageTagState,
    updateHeading,
    updateTitle
}