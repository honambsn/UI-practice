function genSpans(num){
    const container = document.getElementById('loading-id');
    for(let i = 1; i <= num; i++){
        const span = document.createElement('span');
        span.style.setProperty('--i', i);
        container.appendChild(span);
    }
}

genSpans(20);

