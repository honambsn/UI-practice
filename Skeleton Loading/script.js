const allLoadings = document.querySelectorAll('.loading');
const toggler = document.getElementById('toggle');

function toggleDarkMode(){
    document.body.classList.toggle('dark-mode');

    const isDarkModeEnabled = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkmode', isDarkModeEnabled);
}

toggler.addEventListener('click', toggleDarkMode);
 
window.addEventListener('load', ()=>{
    const isDarkModeEnabled = localStorage.getItem('darkmode');
    if (isDarkModeEnabled){
        document.body.classList.add('dark-mode');
    }
    else{
        document.body.classList.remove('dark-mode');
    }

    setInterval(()=>{
        allLoadings.forEach(item => {
            item.classList.remove('loading')
        })
    },2000);
});

