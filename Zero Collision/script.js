const container = document.getElementById('container');
const numberOfSquares = 5; // Specify how many squares you want

for (let i = 0; i < numberOfSquares; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    
    for (let j = 0; j < 4; j++) {
        const span = document.createElement('span');
        span.style.setProperty('--i', j);
        square.appendChild(span);
    }

    container.appendChild(square);
}