let keyboardContainer = document.querySelector('.keyboard');
let keys = "1234567890qwertyuiopasdfghjklzxcvbnm".split("");

keys.forEach((key, index) => {
    let keyDiv = document.createElement("div");
    keyDiv.classList.add("key");

    let keyElement = document.createElement("i");
    keyElement.setAttribute("data-key", key);
    keyElement.innerText = key.toLocaleUpperCase();
    keyDiv.appendChild(keyElement);
    keyboardContainer.appendChild(keyDiv);

    //add line break for every 10 keys
    if ((index + 1) % 10 === 0) {
        let br = document.createElement("div");
        br.classList.add('break');
        keyboardContainer.appendChild(br);

    }

    //add active class while key pressed
    document.addEventListener("keydown", (e) => {
        let keyElement = document.querySelector(`.key i[data-key="${e.key.toLocaleLowerCase()}"]`);
    
        if (keyElement)
            keyElement.parentElement.classList.add("active");

    });

    //remove active class from key when key is released
    document.addEventListener("keyup", (e) => {
        let keyElement = document.querySelector(`.key i[data-key="${e.key.toLocaleLowerCase()}"]`);
    
        if (keyElement)
            keyElement.parentElement.classList.remove("active");

    });
})