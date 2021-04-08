export default function activateResponsiveMainNav() {
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
    
}