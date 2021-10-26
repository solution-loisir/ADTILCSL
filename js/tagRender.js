import loadingLazyImages from "./lazy-loading.js";

const DOM = {
    contentSection: document.querySelector(".content-section"),
    tagContainer: document.querySelector(".tags-container"),
    images: document.getElementsByClassName("lazy")
}

HTMLTemplateElement.prototype.cloner = function(deep = true) {
    return this.content.cloneNode(deep);
}

Node.prototype.renderIn = function(container, clear = true) {
    if(clear) container.innerHTML = "";
    container.appendChild(this);
    return this;
}
const manageTagState = target => {
    document.querySelectorAll(".tags").forEach(tag => tag.classList.remove("active"));
    target.classList.add("active");
}
const updateTitle = title => document.querySelector("title").textContent = title;

export default function tagRender() {
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
        const template = document.querySelector(state.id);
        manageTagState(target);
        updateTitle(state.title);
        template.cloner().renderIn(DOM.contentSection);
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