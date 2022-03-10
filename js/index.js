import loadingLazyImages from "./lazy-loading.js";
import activateResponsiveMainNav from "./responsive-nav.js";
import showSearch from "./search.js";

const images = document.getElementsByClassName("lazy");

loadingLazyImages(images);
activateResponsiveMainNav();
showSearch();

if(document.querySelector('[data-title]')) {
    import("./tagRender.js")
    .then(module => module.default())
    .catch(error => console.error(error.message));
}

if(window.location.pathname === "/sejour-plein-air/") {
    import("./what-to-bring-todo-list.js")
    .then(module => module)
    .catch(error => console.error(error));
}