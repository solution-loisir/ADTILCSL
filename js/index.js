'use strict';

//Showing and hiding main-nav on small screen
(() => {
    if(!document.getElementById('header-btn')) return;
    //Toggle display-main-nav class when menu header-btn is clicked
    const mainNav = document.getElementById('main-nav');
    const toggleMainNav = () =>  mainNav.classList.toggle('display-main-nav');
    const headerBtn = document.getElementById('header-btn');
    headerBtn.addEventListener('click', toggleMainNav);
    //If click on main or .hero, remove display-main-nav class from main-nav
    const main = document.querySelector('main');
    const removeDisplayMainNavClass = () => mainNav.classList.remove('display-main-nav');
    main.addEventListener('click', removeDisplayMainNavClass);
    if(!document.querySelector('.hero')) return;
    const hero = document.querySelector('.hero');
    hero.addEventListener('click', removeDisplayMainNavClass);
    
})();
//lazy load every elements that contain a data-src or a data-srcset attribute
(() => {
    /**
     * @type {NodeList}
     * @description
     * All data-src and data-srcset elements.
     */
    const images = document.querySelectorAll('[data-src], [data-srcset]');
    /**
     * @function setSrc 
     * @param {HTMLElement} target The intersecting entry
     * @description Utility function. 
     * Assigns a value to src and to srcset attributes.
     * Used in showImage callback function.
     */
    const setSrc = target => {
        if(target.dataset.srcset) target.srcset = target.dataset.srcset;
        if(target.dataset.src) target.src = target.dataset.src;
    }
    //Detecting IntersectionObserver and calling setSrc to load images eagerly as a fallback.
    if(!'IntersectionObserver' in window) {
        return images.forEach(image => setSrc(image));
    }
    /**
     * @type {IntersectionObserverInit} Object
     * @description
     * Options object to be passed as second parameter
     * in IntersectionObserver constructor.
     */
    const options = {
        root: null,
        rootMargin: '0px 0px 300px 0px',
        threshold: 0
    }
    /**
     * @callback showImage
     * @type {IntersectionObserverCallback}
     * @param {IntersectionObserverEntry} entries List of objects
     */
    const showImage = entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const target = entry.target;
                setSrc(target);
                Observer.unobserve(target);
            }
        });
    }
    /**
     * @constructor IntersectionObserver
     * @argument {IntersectionObserverCallback} showImage 
     * @argument {IntersectionObserverInit} options
     * @returns {IntersectionObserver} IntersectionObserver interface
     */
    const Observer = new IntersectionObserver(showImage, options);
    //Using Observer to load images
    images.forEach(image => Observer.observe(image));
})();