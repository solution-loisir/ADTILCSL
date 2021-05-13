import { renderTemplate, manageTagState, updateHeading, updateTitle } from "./template-utility.js";
import { contentSection, tagContainer, headerTitle, images } from "./elements.js";
import loadingLazyImages from "./lazy-loading.js";

if("content" in document.createElement("template")) {
    tagContainer.addEventListener("click", event => {
        event.preventDefault();
        const target = event.target;
        if(target.classList.contains("tags")) {
            const title = target.dataset.title;
            const templateId = target.dataset.id;
            const heading = target.dataset.heading;
            history.pushState({ 
                id: templateId, 
                title: title, 
                heading: heading }, title, target.href);
            updateHeading(headerTitle, heading);
            manageTagState(target);
            updateTitle(title);
            renderTemplate(templateId, contentSection);
            loadingLazyImages(images);
        }
    });
    window.addEventListener("popstate", event => {
        if(!event.state) return history.go();
        const title = event.state.title;
        const target = document.querySelector(`[data-title="${title}"]`);
        updateHeading(headerTitle, event.state.heading);
        manageTagState(target);
        updateTitle(title);
        renderTemplate(event.state.id, contentSection);
        loadingLazyImages(images);
    });
}