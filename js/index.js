'use strict';

(function activateResponsiveMainNav() {
    if(
        !document.getElementById('header-btn')
        &&
        !document.querySelector('main')
        &&
        !document.getElementById('main-nav')
    ) return 'Undefined headerBtn, main and mainNav elements.';

    const main = document.querySelector('main');
    const headerBtn = document.getElementById('header-btn');
    const mainNav = document.getElementById('main-nav');

    const toggleMainNavId = () =>  mainNav.classList.toggle('display-main-nav');
    const removeDisplayMainNavClass = () => mainNav.classList.remove('display-main-nav');

    headerBtn.addEventListener('click', toggleMainNavId);
    main.addEventListener('click', removeDisplayMainNavClass);

    if(!document.querySelector('.hero')) return 'Undefined hero element.';

    const hero = document.querySelector('.hero');
    hero.addEventListener('click', removeDisplayMainNavClass);
    
})();

(function loadingLazyImages() {
    const dataSrcAndDataSrcsetElements = document.querySelectorAll('[data-src], [data-srcset]');

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
})();