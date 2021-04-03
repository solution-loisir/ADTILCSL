"use strict";

const listingSection = document.querySelector(".listing-section");
const tagContainer = document.querySelector(".tags-container");

const clean = element => element.innerHTML = "";

function renderTemplate(event, element) {
    const target = event.target;
    if(target.classList.contains("tags")) {
        document.querySelectorAll(".tags").forEach(tag => tag.classList.remove("active"));
        target.classList.add("active");
        const templateId = target.dataset.id;
        const template = document.querySelector(`#${templateId}`);
        const title = target.dataset.title;
        document.querySelector("title").textContent = `ADTILCSL | ${title}`;
        const url = target.href;
        history.pushState(templateId, title, url);
        const clone = template.content.cloneNode(true);
        clean(element);
        element.appendChild(clone);
    }
}

tagContainer.addEventListener("click", event => {
    event.preventDefault();
    renderTemplate(event, listingSection);
});