let box = document.querySelector('.box');
function moveNext(){
    let items = document.querySelectorAll('.item');
    box.appendChild(items[0]);
}

function movePrev(){
    let items = document.querySelectorAll('.item');
    box.prepend([items[items.length - 1]]);
}

window.addEventListener('wheel', function(event){
    if (event.deltaY > 0){
        moveNext();
    }else{
        movePrev();
    }
})