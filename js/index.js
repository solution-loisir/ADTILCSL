import loadingLazyImages from "./lazy-loading.js";
import activateResponsiveMainNav from "./responsive-nav.js";
import showSearch from "./search.js";
import { images } from "./elements.js";

loadingLazyImages(images);
activateResponsiveMainNav();
showSearch();