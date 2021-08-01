import loadingLazyImages from "./lazy-loading.js";
import activateResponsiveMainNav from "./responsive-nav.js";
import showSearch from "./search.js";

const images = document.getElementsByClassName("lazy");

loadingLazyImages(images);
activateResponsiveMainNav();
showSearch();