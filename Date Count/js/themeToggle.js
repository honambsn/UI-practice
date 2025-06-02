export function toggleDarkMode() {
    const body = document.body;
    const icon = document.querySelector('.toggle i');
    const darkModeSpan = document.querySelector('.calendar-footer .toggle span');

    icon.classList.add('fade-out');
    darkModeSpan.classList.add('fade-in');

    setTimeout(() => {
        body.classList.toggle('dark');
        body.classList.toggle('light');

        if (body.classList.contains('light')) {
            darkModeSpan.textContent = "Dark Mode";
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            darkModeSpan.textContent = "Light Mode";
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }

        icon.classList.remove('fade-out');
        darkModeSpan.classList.remove('fade-in');
    }, 300);
}
