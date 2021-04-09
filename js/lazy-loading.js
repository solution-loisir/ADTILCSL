import { overrideSrcAndSrcset } from "./template-utility";
import { images } from "./elements";

export default function loadingLazyImages() {

  if('IntersectionObserver' in window) {
    const options = {
      root: null,
      rootMargin: '300px 0px 300px 0px',
      threshold: 0
    }
    const Observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        const target = entry.target;
        if(entry.isIntersecting) {
          overrideSrcAndSrcset(target);
          observer.unobserve(target);
        }
      }), options
    });
    
    [...images].forEach(element => Observer.observe(element));

  } else {

    [...images].forEach(image => overrideSrcAndSrcset(image));

  }
}