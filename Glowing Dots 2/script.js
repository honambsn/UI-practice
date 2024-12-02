const section = document.getElementById('section-id');

function getSection(num){
    for (let i=1;i<= num;i++){
        let element = document.createElement('span');
        element.classList.add('span', `span${i}`);
        section.appendChild(element);
    }
}

getSection(1000);