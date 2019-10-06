console.log('index.js executing');

if(document.getElementById('header-btn')) {
    const mainNav = document.getElementById('main-nav');
    const toggleMainNav = () =>  mainNav.classList.toggle('display-main-nav');
    const hBtn = document.getElementById('header-btn');
    hBtn.addEventListener('click', toggleMainNav);
}