console.log('index.js executing');

import('./responsive-nav.js')
.then(module => {
    const headerBtn = document.getElementById('header-btn');    
    headerBtn.addEventListener('click', function(event) {
        event.preventDefault();
        module.toggleMainNav();
    });
})
.catch(error => console.error(`responsive-nav failed with : ${error}`));