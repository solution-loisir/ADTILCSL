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

const overrideSrcAndSrcset = target => {
    if(target.dataset.src) target.src = target.dataset.src;
    if(target.dataset.srcset) target.srcset = target.dataset.srcset;
}

export { 
    renderTemplate, 
    manageTagState,
    updateHeading,
    overrideSrcAndSrcset
}