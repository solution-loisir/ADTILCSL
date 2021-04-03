"use strict";

const listingSection = document.querySelector(".listing-section");
const tagContainer = document.querySelector(".tags-container");

const clean = element => element.innerHTML = "";

function renderTemplate(event, container) {
    const target = event.target;
    if(target.classList.contains("tags")) {
        document.querySelectorAll(".tags").forEach(tag => tag.classList.remove("active"));
        target.classList.add("active");

        const title = target.dataset.title;
        document.querySelector("title").textContent = title;

        const templateId = target.dataset.id;
        const template = document.querySelector(`#${templateId}`);
        const clone = template.content.cloneNode(true);

        history.pushState(templateId, title, target.href);

        clean(container);
        container.appendChild(clone);
    }
}

tagContainer.addEventListener("click", event => {
    event.preventDefault();
    renderTemplate(event, listingSection);
});