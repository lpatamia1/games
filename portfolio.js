// Get a reference to the search bar and all the project items
const searchBar = document.getElementById('search-bar');
const projectItems = document.querySelectorAll('.project-item');

// Add an event listener that fires every time the user types
searchBar.addEventListener('input', (e) => {
    const searchQuery = e.target.value.toLowerCase();

    projectItems.forEach(item => {
        const projectName = item.textContent.toLowerCase();

        if (projectName.includes(searchQuery)) {
            item.style.display = 'block'; // Use 'block' for li elements
        } else {
            item.style.display = 'none';
        }
    });
});

// Add an event listener for the "Enter" key
searchBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const visibleItems = Array.from(projectItems).filter(item => item.style.display !== 'none');

        if (visibleItems.length === 1) {
            e.preventDefault();
            // Since the 'a' tag is the first child of the 'li', we can find it
            const link = visibleItems[0].querySelector('a');
            if (link) {
                window.location.href = link.href;
            }
        }
    }
});