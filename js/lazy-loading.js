const overrideSrcAndSrcset = target => {
  if(target.dataset.src) target.src = target.dataset.src;
  if(target.dataset.srcset) target.srcset = target.dataset.srcset;
  target.parentNode.dataset.lazyState = "seen";
}

export default function loadingLazyImages(targetList) {

  if('IntersectionObserver' in window) {
    const options = {
      root: null,
      rootMargin: '300px 0px 300px 0px',
      threshold: 0
    }
    const Observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          overrideSrcAndSrcset(entry.target);
          observer.unobserve(entry.target);
        }
      }), options
    });
    
  [...targetList].forEach(image => Observer.observe(image));

  } else {

    [...targetList].forEach(image => overrideSrcAndSrcset(image));

  }
}