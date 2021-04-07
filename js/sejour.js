import { renderTemplate, manageTagState, updateHeading } from "./template-utility";
import { contentSection, tagContainer, headerTitle } from "./elements";

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
            manageTagState(target, title);
            renderTemplate(templateId, contentSection);
        }
    });
    window.addEventListener("popstate", event => {
        if(!event.state) return history.go();
        const title = event.state.title;
        const target = document.querySelector(`[data-title="${title}"]`);
        updateHeading(headerTitle, event.state.heading);
        manageTagState(target, title);
        renderTemplate(event.state.id, contentSection);
    });
}