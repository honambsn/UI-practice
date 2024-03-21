const shortBtn = document.getElementById('short-btn');
const reloadBtn = document.getElementById('reload-btn');

shortBtn.addEventListener('click', shortenURL);

function shortenURL() {
    var originalURL = document.getElementById("originalURL").value;
    var apiURL="https://tinyurl.com/api-create.php?url=" + encodeURIComponent(originalURL);
    shortenedURLTextarea = document.getElementById('shortenedURL');
    
    fetch(apiURL).then(response => response.text()).then(data=>{
        shortenedURLTextarea.value = data;
    }).catch(error=>{
        shortenedURLTextarea.value = "Error: Unable to shorten URL";
    });
}

reloadBtn.addEventListener('click',()=>{
    location.reload();
})