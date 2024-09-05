let cards = document.querySelectorAll('.card').forEach(card =>{
    card.addEventListener('mousemove', (e) =>{
        let x = e.offsetX;
        let y = e.offsetY;
        let CardWidth = card.clientWidth;
        let CardHeight = card.clientHeight;
        let transX = (x - CardWidth/2);
        let transY = (y - CardHeight/2);
        card.style.transform = `translateX(${transX}px)translateY(${transY}px)`;
        card.style.backgroundPositionX = -x/2 + 'px';
        card.style.backgroundPositionY = -y/2 + 'px';
    })
    card.addEventListener('mouseout', (e)=>{
        card.style.transform = ``;

        card.style.backgroundPositionX = '';
        card.style.backgroundPositionY = '';
    })
})