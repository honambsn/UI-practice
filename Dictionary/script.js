const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById('result');
const sound = document.getElementById('sound');
const btn = document.getElementById('search-btn');

btn.addEventListener('click', async()=>{
    const inpWord = document.getElementById('inp-word').value;
    try{
        const response = await fetch(`${apiUrl}${inpWord}`);
        const data = await response.json();
        if (data.length === 0){
            result.innerHTML = `<h3 class="error">Couldn't find  the word</h3>`;
            sound.removeAttribute('src');
            return;
        }
        result.innerHTML = `
        <div class="word">
        <h3>${inpWord}</h3>
        <button onclick="playSound()">
            <i class="fas fa-volume-up"></i>
        </button>
    </div>
    
    <div class="details">
        <p>${data[0].meanings[0].partOfSpeech}</p>
        <p>${data[0].meanings[1].partOfSpeech || ""}</p>
        <p>/${data[0].phonetics[0].text}</p>
    </div>
    
    <p class="word-meaning">
    ${data[0].meanings[0].definitions[0].definition}
    </p>
    
    <p class="word-example">
        ${data[0].meanings[0].definitions[0].example || "None example"}
        
    </p>`
    if(data[0].phonetics[0]?.audio){
        sound.setAttribute('src', data[0].phonetics[0].audio);
    }
    else if(data[0].phonetics[0].audio === ""){
        alert("Cant find sound");
    }
    else {
        sound.removeAttribute('src');
    }
    } catch (error) {
        result.innerHTML = `<h3 class="error"> An Error Occurred</h3>`
        sound.removeAttribute('src');
    }

});

function playSound(){
    sound.play();
}