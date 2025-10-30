const packCanvas = document.getElementById('packCanvas');
const sliceCanvas = document.getElementById('sliceCanvas');
const packCtx = packCanvas.getContext('2d');
const sliceCtx = sliceCanvas.getContext('2d');
const cardsRevealed = document.getElementById('cardsRevealed');
const instruction = document.getElementById('instruction');
const resetBtn = document.getElementById('resetBtn');
const packWrapper = document.getElementById('packWrapper');

let isSlicing = false;
let sliceProgress = 0;
let slicePath = [];

function drawPack() {
    // Draw pack background
    const gradient1 = packCtx.createLinearGradient(0, 0, 400, 600);
    gradient1.addColorStop(0, '#6b46c1');
    gradient1.addColorStop(0.3, '#ec4899');
    gradient1.addColorStop(0.7, '#ec4899');
    gradient1.addColorStop(1, '#3b82f6');
    packCtx.fillStyle = gradient1;
    packCtx.fillRect(0, 0, 400, 600);

    // Draw swirls
    packCtx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
    packCtx.lineWidth = 20;
    packCtx.beginPath();
    packCtx.arc(200, 350, 150, 0, Math.PI * 2);
    packCtx.stroke();

    packCtx.strokeStyle = 'rgba(167, 139, 250, 0.2)';
    packCtx.lineWidth = 30;
    packCtx.beginPath();
    packCtx.arc(200, 350, 180, 0, Math.PI * 2);
    packCtx.stroke();

    // Draw Pokeball
    packCtx.save();
    packCtx.translate(200, 350);

    // Top half (red)
    const gradient2 = packCtx.createLinearGradient(0, -80, 0, 0);
    gradient2.addColorStop(0, '#ff6b6b');
    gradient2.addColorStop(1, '#ee5a5a');
    packCtx.fillStyle = gradient2;
    packCtx.beginPath();
    packCtx.arc(0, 0, 80, Math.PI, Math.PI * 2);
    packCtx.fill();

    // Bottom half (white)
    const gradient3 = packCtx.createLinearGradient(0, 0, 0, 80);
    gradient3.addColorStop(0, '#ffffff');
    gradient3.addColorStop(1, '#e0e0e0');
    packCtx.fillStyle = gradient3;
    packCtx.beginPath();
    packCtx.arc(0, 0, 80, 0, Math.PI);
    packCtx.fill();

    // Black band
    packCtx.fillStyle = '#2d3748';
    packCtx.fillRect(-80, -8, 160, 16);

    // Center circle outer
    packCtx.fillStyle = '#2d3748';
    packCtx.beginPath();
    packCtx.arc(0, 0, 25, 0, Math.PI * 2);
    packCtx.fill();

    // Center circle inner
    packCtx.fillStyle = '#e2e8f0';
    packCtx.beginPath();
    packCtx.arc(0, 0, 18, 0, Math.PI * 2);
    packCtx.fill();

    // Shine
    packCtx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    packCtx.beginPath();
    packCtx.arc(-8, -8, 10, 0, Math.PI * 2);
    packCtx.fill();

    packCtx.restore();

    // Draw Pokemon logo
    packCtx.fillStyle = '#fbbf24';
    packCtx.strokeStyle = '#1e40af';
    packCtx.lineWidth = 3;
    packCtx.font = 'bold 60px Arial';
    packCtx.strokeText('POKéMON', 50, 80);
    packCtx.fillText('POKéMON', 50, 80);

    // Add stars
    packCtx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (let i = 0; i < 30; i++) {
        const x = Math.random() * 400;
        const y = Math.random() * 200;
        const size = Math.random() * 3;
        packCtx.beginPath();
        packCtx.arc(x, y, size, 0, Math.PI * 2);
        packCtx.fill();
    }
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px');
    sparkle.style.setProperty('--ty', (Math.random() - 0.5) * 100 + 'px');
    packWrapper.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
}

function handleSlice(e) {
    if (!isSlicing) return;

    const rect = sliceCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    slicePath.push({ x, y });

    if (slicePath.length > 1) {
        const prev = slicePath[slicePath.length - 2];
        
        sliceCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        sliceCtx.lineWidth = 8;
        sliceCtx.lineCap = 'round';
        sliceCtx.beginPath();
        sliceCtx.moveTo(prev.x, prev.y);
        sliceCtx.lineTo(x, y);
        sliceCtx.stroke();

        // Add glow effect
        sliceCtx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
        sliceCtx.lineWidth = 15;
        sliceCtx.beginPath();
        sliceCtx.moveTo(prev.x, prev.y);
        sliceCtx.lineTo(x, y);
        sliceCtx.stroke();

        sliceProgress += Math.hypot(x - prev.x, y - prev.y);

        if (Math.random() > 0.7) {
            createSparkle(e.clientX - rect.left, e.clientY - rect.top);
        }

        if (sliceProgress > 800) {
            openPack();
        }
    }
}

function openPack() {
    isSlicing = false;
    packWrapper.style.cursor = 'default';
    
    // Fade out pack
    packCanvas.style.transition = 'opacity 0.5s';
    packCanvas.style.opacity = '0';
    sliceCanvas.style.transition = 'opacity 0.5s';
    sliceCanvas.style.opacity = '0';

    setTimeout(() => {
        cardsRevealed.classList.add('show');
        instruction.style.display = 'none';
        resetBtn.style.display = 'inline-block';
        
        
        packWrapper.classList.add('hidden');
        packWrapper.style.display = 'none';
    }, 500);
}

function reset() {
    sliceProgress = 0;
    slicePath = [];
    sliceCtx.clearRect(0, 0, 400, 600);
    packCanvas.style.opacity = '1';
    sliceCanvas.style.opacity = '1';
    packCanvas.style.transition = 'none';
    sliceCanvas.style.transition = 'none';
    cardsRevealed.classList.remove('show');
    instruction.style.display = 'block';
    resetBtn.style.display = 'none';
    packWrapper.style.cursor = 'crosshair';
    packWrapper.classList.remove('hidden');
}

sliceCanvas.addEventListener('mousedown', (e) => {
    if (cardsRevealed.classList.contains('show')) return;
    isSlicing = true;
    slicePath = [];
    const rect = sliceCanvas.getBoundingClientRect();
    slicePath.push({ x: e.clientX - rect.left, y: e.clientY - rect.top });
});

sliceCanvas.addEventListener('mousemove', handleSlice);

sliceCanvas.addEventListener('mouseup', () => {
    isSlicing = false;
});

sliceCanvas.addEventListener('mouseleave', () => {
    isSlicing = false;
});

// Touch support
sliceCanvas.addEventListener('touchstart', (e) => {
    if (cardsRevealed.classList.contains('show')) return;
    e.preventDefault();
    isSlicing = true;
    slicePath = [];
    const rect = sliceCanvas.getBoundingClientRect();
    const touch = e.touches[0];
    slicePath.push({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
});

sliceCanvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (!isSlicing) return;
    const touch = e.touches[0];
    handleSlice({ clientX: touch.clientX, clientY: touch.clientY });
});

sliceCanvas.addEventListener('touchend', () => {
    isSlicing = false;
});

resetBtn.addEventListener('click', reset);

// Initialize
drawPack();




function drawPack() {
    // Đảm bảo không vẽ nền màu solid hoặc màu nào khác
    packCtx.clearRect(0, 0, packCanvas.width, packCanvas.height); // Xóa canvas

    // Tiếp tục vẽ các hình ảnh khác mà bạn muốn (không vẽ nền nếu không muốn nó có màu)

    // Ví dụ vẽ các chi tiết khác mà không cần màu nền
    const gradient1 = packCtx.createLinearGradient(0, 0, 400, 600);
    gradient1.addColorStop(0, '#6b46c1');
    gradient1.addColorStop(0.3, '#ec4899');
    gradient1.addColorStop(0.7, '#ec4899');
    gradient1.addColorStop(1, '#3b82f6');
    packCtx.fillStyle = gradient1;
    packCtx.fillRect(0, 0, 400, 600); // Vẽ một màu nền nhưng vẫn có thể thấy nền trong suốt của canvas
}




// Assuming the assets folder is in the same directory as your HTML file
const assetFolder = 'assets/cards/';
const cardAssets = [
    'SV08_EN_42-2x.png',  // ⚡
    'SV08_EN_76-2x.png',      // 🔥
    'SV08_EN_220-2x.png',     // 💧
    'SV08_EN_238-2x.png',     // 🌿
    'SV08_EN_239-2x.png',    // ✨
    'SV08_EN_247-2x.png',
];

// Function to add images dynamically
function addCards() {
    const cardsContainer = document.getElementById('cardsRevealed');
    
    // Loop through the array of asset images and create img elements
    cardAssets.forEach(asset => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');


        const cardImg = document.createElement('div');
        cardImg.classList.add('card-img');
        cardImg.id = 'front';
        
        
        const img = document.createElement('img');
        img.src = assetFolder + asset; // Construct the image path
        img.alt = asset.split('.')[0]; // Set alt text based on the image file name
        
        cardImg.appendChild(img);
        cardDiv.appendChild(cardImg); // Append image to the card div
        cardsContainer.appendChild(cardDiv); // Append card to the container
    });
}

// Run the function to add cards when the page loads
window.onload = addCards;
