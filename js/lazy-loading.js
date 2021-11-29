const overrideSrcAndSrcset = target => {
  if(target.dataset.src) target.src = target.dataset.src;
  if(target.dataset.srcset) target.srcset = target.dataset.srcset;
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
        const target = entry.target;
        if(entry.isIntersecting) {
          overrideSrcAndSrcset(target);
          target.parentNode.dataset.lazyState = "seen";
          observer.unobserve(target);
        }
      }), options
    });
    
  [...targetList].forEach(image => Observer.observe(image));

  } else {

    [...targetList].forEach(image => overrideSrcAndSrcset(image));

  }
}