'use strict';

if(document.getElementById('header-btn')) {
    //Toggle display-main-nav class when menu header-btn is clicked
    const mainNav = document.getElementById('main-nav');
    const toggleMainNav = () =>  mainNav.classList.toggle('display-main-nav');
    const headerBtn = document.getElementById('header-btn');
    headerBtn.addEventListener('click', toggleMainNav);
    //If click on main or .hero, remove display-main-nav class from main-nav
    const main = document.querySelector('main');
    const hero = document.querySelector('.hero');
    const removeDisplayMainNavClass = () => mainNav.classList.remove('display-main-nav');
    main.addEventListener('click', removeDisplayMainNavClass);
    hero.addEventListener('click', removeDisplayMainNavClass);
}