'use strict';

// Showing and hiding main-nav on small screen
(() => {
    if(!document.getElementById('header-btn')) return;

    const main = document.querySelector('main');
    const headerBtn = document.getElementById('header-btn');
    const mainNav = document.getElementById('main-nav');

    const toggleMainNavId = () =>  mainNav.classList.toggle('display-main-nav');
    const removeDisplayMainNavClass = () => mainNav.classList.remove('display-main-nav');

    headerBtn.addEventListener('click', toggleMainNavId);
    main.addEventListener('click', removeDisplayMainNavClass);

    if(!document.querySelector('.hero')) return;

    const hero = document.querySelector('.hero');
    hero.addEventListener('click', removeDisplayMainNavClass);
    
})();

// Lazy loading images with the IntersectionObserver API.
(() => {
    const dataSrcAndDataSrcsetElements = document.querySelectorAll('[data-src], [data-srcset]');

    const setSrcFromDataSrc = target => {
        if(target.dataset.src) target.src = target.dataset.src;
    }
    const setSrcsetFromDataSrcset = target => {
        if(target.dataset.srcset) target.srcset = target.dataset.srcset;
    }
    if(!'IntersectionObserver' in window) {
        return dataSrcAndDataSrcsetElements.forEach(image => {
            setSrcsetFromDataSrcset(image);
            setSrcFromDataSrc(image);
        });
    }
    const options = {
        root: null,
        rootMargin: '0px 0px 300px 0px',
        threshold: 0
    }
    const observeImages = entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const target = entry.target;
                setSrcsetFromDataSrcset(target);
                setSrcFromDataSrc(target);
                Observer.unobserve(target);
            }
        });
    }
    const Observer = new IntersectionObserver(observeImages, options);

    dataSrcAndDataSrcsetElements.forEach(image => Observer.observe(image));
})();