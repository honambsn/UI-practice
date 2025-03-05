const shuffleBtn = document.getElementById('shuffle-btn');

shuffleBtn.addEventListener('mousedown', () => {
    // Thêm class để áp dụng trạng thái 'active'
    shuffleBtn.classList.add('is-active');
});

shuffleBtn.addEventListener('mouseup', () => {
    // Xóa class sau một khoảng thời gian ngắn, để chuyển tiếp có thể hoàn thành
    setTimeout(() => {
        shuffleBtn.classList.remove('active');
    }, 1000); // Thời gian này khớp với độ dài chuyển tiếp
});



let TileSize = 100;
let tilesArray = Array.from({ length: 15 }, (_, i) => i + 1).concat();
let emptyIndex = 15;

function renderTile(){
    let container = document.getElementById("puzzle-container");
    container.innerHTML = "";
    tilesArray.forEach((value, index) => {
        let tile = document.createElement("div");
        tile.className = value === 0 ? 'tile empty' : 'tile';
        tile.textContent = value || '';

        let row = Math.floor(index / 4);
        let col = index % 4;
        tile.style.top = `${row * TileSize}px`;
        tile.style.left = `${col * TileSize}px`;

        container.appendChild(tile);
    })
}

function shuffleTiles(){
    let currentEmpty = emptyIndex;
    for (let i = 0; i < 1000; i++) {
        let possibleMoves = [];
        let row = Math.floor(currentEmpty / 4);
        let col = currentEmpty % 4;

        if (row > 0)
            possibleMoves.push(currentEmpty - 4);
        if (row < 3)
            possibleMoves.push(currentEmpty + 4);
        if (col > 0)
            possibleMoves.push(currentEmpty - 1);
        if (col < 3)
            possibleMoves.push(currentEmpty + 1);

        let move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

        tilesArray[currentEmpty] = tilesArray[move];
        tilesArray[move] = 0;
        currentEmpty = move;
    }

    emptyIndex = currentEmpty;
    renderTile();
}

document.getElementById("shuffle-btn").addEventListener("click", shuffleTiles);
shuffleTiles();


//EJdHcmQ_vic