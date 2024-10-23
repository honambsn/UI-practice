document.addEventListener('DOMContentLoaded', function(){
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(function(box){
        let spans = [];
        for (let i = 0;i < 40; i++){
            let span = document.createElement('span');
            spans.push(span);
            box.appendChild(span);
            span.style.top = `${i *1}px`;
            let randomDelay = (Math.random() * 0.25) + 0;
            span.style.transitionDelay = randomDelay + 's';
        }
        box.addEventListener('click', function(){
            box.classList.toggle('active');
        })
    })
})