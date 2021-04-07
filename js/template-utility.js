const renderTemplate = (templateId, container) => {
    const template = document.querySelector(templateId);
    const clone = template.content.cloneNode(true);
    container.innerHTML = "";
    container.appendChild(clone);
}
const manageTagState = (target, title) => {
    document.querySelectorAll(".tags").forEach(tag => tag.classList.remove("active"));
    target.classList.add("active");
    document.querySelector("title").textContent = title;
}
const updateHeading = (heading, text) => heading.textContent = text; 

export { 
    renderTemplate, 
    manageTagState,
    updateHeading
}