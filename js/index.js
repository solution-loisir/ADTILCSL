'use strict';

if(document.getElementById('header-btn')) {
    //Toggle display-main-nav class when menu header-btn is clicked
    const mainNav = document.getElementById('main-nav');
    const toggleMainNav = () =>  mainNav.classList.toggle('display-main-nav');
    const headerBtn = document.getElementById('header-btn');
    headerBtn.addEventListener('click', toggleMainNav);
    //If click on main or .hero, remove display-main-nav class from main-nav
    const main = document.querySelector('main');
    const removeDisplayMainNavClass = () => mainNav.classList.remove('display-main-nav');
    main.addEventListener('click', removeDisplayMainNavClass);
    if(document.querySelector('.hero')) {
        const hero = document.querySelector('.hero');
        hero.addEventListener('click', removeDisplayMainNavClass);
    }
}
//lazy load all images with data-src attribute
(() => {
    const images = document.querySelectorAll('[data-src]');
    const setSrc = target => target.src = target.dataset.src;
    //Detecting IntersectionObserver
    if('IntersectionObserver' in window) {
        const options = {
        root: null,
        rootMargin: undefined,
        threshold: 0
        }
        //Callback function of IntersectionObserver
        const showImage = entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const target = entry.target;
                    setSrc(target);
                    Observer.unobserve(target);
                }
            });
        }
        //IntersectioObserver constructor
        const Observer = new IntersectionObserver(showImage, options);
        //Using the Observer constructor to load images
        images.forEach(image => {
            Observer.observe(image);
        });
    } else {
        //Calling setSrc to load images eagerly as a fallback
        images.forEach(image => {
            setSrc(image);  
        });
    } 
})();