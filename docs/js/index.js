'use strict';

if(document.getElementById('header-btn')) {
    const mainNav = document.getElementById('main-nav');
    const toggleMainNav = () =>  mainNav.classList.toggle('display-main-nav');
    const headerBtn = document.getElementById('header-btn');
    headerBtn.addEventListener('click', toggleMainNav);
}