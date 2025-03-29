// //dark mode
// function toggleDarkMode(){
//     document.body.classList.toggle("dark-mode");

//     const icon = document.querySelector('.toggle i');
//     if(document.body.classList.contains("dark-mode")){
//         icon.classList.remove('fa-sun');
//         icon.classList.add('fa-moon');
//         document.querySelector('body').classList.toggle('dark');
//     }
//     else{
//         icon.classList.remove('fa-moon');
//         icon.classList.add('fa-sun');
//         document.querySelector('body').classList.toggle('light');
//     }
// }

function toggleDarkMode() {
    const body = document.body;
    const icon = document.querySelector('.toggle i');

    // Toggle between dark and light mode by switching classes
    body.classList.toggle('dark');
    body.classList.toggle('light');

    // Change the icon based on the mode
    if (body.classList.contains('dark')) {
        icon.classList.remove('fa-solid', 'fa-moon');
        icon.classList.add('fa-regular', 'fa-sun');
    } else {
        icon.classList.remove('fa-regular', 'fa-sun');
        icon.classList.add('fa-solid', 'fa-moon');
    }
}

// Attach the function to the switch button
document.querySelector('.dark-mode-switch').onclick = toggleDarkMode;
