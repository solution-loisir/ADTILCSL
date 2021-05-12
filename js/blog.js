import { renderTemplate, cloneTemplate, manageTagState, updateTitle } from "./template-utility.js";
import { contentSection, tagContainer } from "./elements.js";

if("content" in document.createElement("template")) {
    tagContainer.addEventListener("click", event => {
        event.preventDefault();
        const target = event.target;
        if(target.classList.contains("tags")) {
            const title = target.dataset.title;
            const templateId = target.dataset.id;
            history.pushState({ id: templateId, title: title }, title, target.href);
            manageTagState(target);
            updateTitle(title);
            renderTemplate(cloneTemplate(templateId), contentSection);
        }
    });
    window.addEventListener("popstate", event => {
        if(!event.state) return history.go();
        const title = event.state.title;
        const target = document.querySelector(`[data-title="${title}"]`);
        manageTagState(target);
        updateTitle(title);
        renderTemplate(cloneTemplate(event.state.id), contentSection);
    });
}