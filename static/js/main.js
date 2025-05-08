// DOM Elements for Dark Mode
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Check saved mode from localStorage
const savedMode = localStorage.getItem('theme');

if (savedMode === 'light') {
    body.classList.remove('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // show moon icon for light mode
} else {
    body.classList.add('dark-mode'); // default to dark mode
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // sun icon for dark mode
}

// Toggle dark mode and save preference
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    const isDarkMode = body.classList.contains('dark-mode');

    // Save to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    // Update icon
    darkModeToggle.innerHTML = isDarkMode
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
});

//Toggle sidebar


document.getElementById("sidebar-toggle").addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("collapsed");
});


