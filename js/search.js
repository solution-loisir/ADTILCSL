export default function showSearch() {
    const navSearchBtn = document.getElementById('search-btn');
    const searchForm = document.getElementById('search-shown-with-js');
    const closeBtn = document.getElementById('search-close-btn');
    const searchInput = document.getElementById('search-string');
    function toggleHideSearchForm(event) {
        event.preventDefault();
        searchForm.classList.toggle('hide');
        !searchInput.classList.contains('hide') && searchInput.focus();
    }
    navSearchBtn.addEventListener('click', toggleHideSearchForm);
    closeBtn.addEventListener('click', toggleHideSearchForm);
}