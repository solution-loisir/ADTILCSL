import loadingLazyImages from "./lazy-loading.js";

const DOM = {
    contentSection: document.querySelector(".content-section"),
    tagContainer: document.querySelector(".tags-container"),
    headerTitle: document.querySelector("#header-title"),
    images: document.getElementsByClassName("lazy")
}

const renderTemplate = (templateId, container) => {
    const template = document.querySelector(templateId);
    const clone = template.content.cloneNode(true);
    container.innerHTML = "";
    container.appendChild(clone);
}
const manageTagState = target => {
    document.querySelectorAll(".tags").forEach(tag => tag.classList.remove("active"));
    target.classList.add("active");
}
const updateTitle = title => document.querySelector("title").textContent = title;
const updateHeading = (heading, text) => heading.textContent = text;

if("content" in document.createElement("template")) {
    DOM.tagContainer.addEventListener("click", event => {
        event.preventDefault();
        const target = event.target;
        if(target.classList.contains("tags")) {
            const state = {...target.dataset};
            history.pushState(state, state.title, target.href);
            window.dispatchEvent(new CustomEvent("click:tag", {
                detail: state
            }));
        }
    });
    window.addEventListener("click:tag", event => {
        const state = event.detail;
        const target = document.querySelector(`[data-title="${state.title}"]`);
        DOM.headerTitle && updateHeading(DOM.headerTitle, state.heading);
        manageTagState(target);
        updateTitle(state.title);
        renderTemplate(state.id, DOM.contentSection);
        DOM.images && loadingLazyImages(DOM.images);
    });
    window.addEventListener("popstate", event => {
        const state = event.state;
        if(!state) return history.go();
        window.dispatchEvent(new CustomEvent("click:tag", {
            detail: state
        }));
    });
}