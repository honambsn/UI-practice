const images = [
    './assets/img1.jpg',
    './assets/img2.jpg',
    './assets/img3.jpg',
    './assets/img4.jpg',
    './assets/img5.jpg',
    './assets/img6.jpg',
    './assets/img7.jpg',
    './assets/img8.jpg',
    './assets/img9.jpg',
    './assets/img10.jpg',
    './assets/img11.jpg',
    './assets/img12.jpg',
];

const box =  document.getElementById('box');


function genImage(){
    for (let i = 1; i <=8;i++){
        const span = document.createElement('span');
        span.style.setProperty('--i', i);

        const img = document.createElement('img');

        img.src = images[i % images.length];
        
        span.appendChild(img);
        box.appendChild(span);
    }
}


genImage();

window.onmousemove = function(e){
    let x = e.clientX/3;
    box.style.transform = 'perspective(1000px) rotateY(' + x + 'deg)';
}