import { renderTemplate, manageTagState, updateHeading, updateTitle } from "./template-utility.js";
import { contentSection, tagContainer, headerTitle, images } from "./elements.js";
import loadingLazyImages from "./lazy-loading.js";

if("content" in document.createElement("template")) {
    tagContainer.addEventListener("click", event => {
        event.preventDefault();
        const target = event.target;
        if(target.classList.contains("tags")) {
            const state = {...target.dataset};
            history.pushState(state, state.title, target.href);
            headerTitle && updateHeading(headerTitle, state.heading);
            manageTagState(target);
            updateTitle(state.title);
            renderTemplate(state.id, contentSection);
            images && loadingLazyImages(images);
        }
    });
    window.addEventListener("popstate", event => {
        const state = event.state;
        if(!state) return history.go();
        const target = document.querySelector(`[data-title="${state.title}"]`);
        headerTitle && updateHeading(headerTitle, state.heading);
        manageTagState(target);
        updateTitle(state.title);
        renderTemplate(state.id, contentSection);
        images && loadingLazyImages(images);
    });
}