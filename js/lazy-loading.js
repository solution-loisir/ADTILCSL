export default function loadingLazyImages() {
    const dataSrcAndDataSrcsetElements = document.getElementsByClassName("lazy");

    const overrideSrcAndSrcset = target => {
        if(target.dataset.src) target.src = target.dataset.src;
        if(target.dataset.srcset) target.srcset = target.dataset.srcset;
    }
    if((!'IntersectionObserver' in window) || !dataSrcAndDataSrcsetElements) {
        dataSrcAndDataSrcsetElements.forEach(element => {
            overrideSrcAndSrcset(element);
        });
        return 'Undefined IntersectionObserver or dataSrcAndDataSrcsetElements.';
    }
    const options = {
        root: null,
        rootMargin: '300px 0px 300px 0px',
        threshold: 0
    }
    const observeImages = entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const target = entry.target;
                overrideSrcAndSrcset(target);
                Observer.unobserve(target);
            }
        });
    }
    const Observer = new IntersectionObserver(observeImages, options);

    document.addEventListener('DOMContentLoaded', () => {
        dataSrcAndDataSrcsetElements.forEach(element => {
            Observer.observe(element);
        });
    });
}
// querySelectorAll('[data-src], [data-srcset]')