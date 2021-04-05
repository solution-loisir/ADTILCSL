"use strict";

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

if("content" in document.createElement("template")) {
    const listingSection = document.querySelector(".listing-section");
    const tagContainer = document.querySelector(".tags-container");

    tagContainer.addEventListener("click", event => {
        event.preventDefault();
        const target = event.target;
        if(target.classList.contains("tags")) {
            const title = target.dataset.title;
            const templateId = target.dataset.id;
            manageTagState(target, title);
            history.pushState({ id: templateId, title: title }, title, target.href);
            renderTemplate(templateId, listingSection);
        }
    });
    window.addEventListener("popstate", event => {
        if(!event.state) return window.location = "/blog/";
        const target = document.querySelector(`[data-title="${event.state.title}"]`);
        manageTagState(target, event.state.title);
        renderTemplate(event.state.id, listingSection);
    });
}