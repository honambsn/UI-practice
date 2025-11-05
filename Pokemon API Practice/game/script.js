const packCanvas = document.getElementById('packCanvas');
const sliceCanvas = document.getElementById('sliceCanvas');
const packCtx = packCanvas.getContext('2d');
const sliceCtx = sliceCanvas.getContext('2d');
const cardsRevealed = document.getElementById('cardsRevealed');
const instruction = document.getElementById('instruction');
const flipInstruction = document.getElementById('flipInstruction');
const resetBtn = document.getElementById('resetBtn');
const packWrapper = document.getElementById('packWrapper');
const gameArea = document.getElementById('game-area');

let isSlicing = false;
let sliceProgress = 0;
let slicePath = [];

// Danh sách thẻ Pokemon (có thể thay đổi)
const cardImages = [
    'SV08_EN_42-2x.png',
    'SV08_EN_76-2x.png',
    'SV08_EN_220-2x.png',
    'SV08_EN_238-2x.png',
    'SV08_EN_239-2x.png',
    'SV08_EN_247-2x.png'
];

function drawPack() {
    // Vẽ nền gói thẻ
    const gradient1 = packCtx.createLinearGradient(0, 0, 400, 600);
    gradient1.addColorStop(0, '#6b46c1');
    gradient1.addColorStop(0.3, '#ec4899');
    gradient1.addColorStop(0.7, '#ec4899');
    gradient1.addColorStop(1, '#3b82f6');
    packCtx.fillStyle = gradient1;
    packCtx.fillRect(0, 0, 400, 600);

    // Vẽ vòng xoáy
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

    // Vẽ Pokeball
    packCtx.save();
    packCtx.translate(200, 350);

    // Nửa trên (đỏ)
    const gradient2 = packCtx.createLinearGradient(0, -80, 0, 0);
    gradient2.addColorStop(0, '#ff6b6b');
    gradient2.addColorStop(1, '#ee5a5a');
    packCtx.fillStyle = gradient2;
    packCtx.beginPath();
    packCtx.arc(0, 0, 80, Math.PI, Math.PI * 2);
    packCtx.fill();

    // Nửa dưới (trắng)
    const gradient3 = packCtx.createLinearGradient(0, 0, 0, 80);
    gradient3.addColorStop(0, '#ffffff');
    gradient3.addColorStop(1, '#e0e0e0');
    packCtx.fillStyle = gradient3;
    packCtx.beginPath();
    packCtx.arc(0, 0, 80, 0, Math.PI);
    packCtx.fill();

    // Dải đen
    packCtx.fillStyle = '#2d3748';
    packCtx.fillRect(-80, -8, 160, 16);

    // Vòng tròn giữa ngoài
    packCtx.fillStyle = '#2d3748';
    packCtx.beginPath();
    packCtx.arc(0, 0, 25, 0, Math.PI * 2);
    packCtx.fill();

    // Vòng tròn giữa trong
    packCtx.fillStyle = '#e2e8f0';
    packCtx.beginPath();
    packCtx.arc(0, 0, 18, 0, Math.PI * 2);
    packCtx.fill();

    // Ánh sáng
    packCtx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    packCtx.beginPath();
    packCtx.arc(-8, -8, 10, 0, Math.PI * 2);
    packCtx.fill();

    packCtx.restore();

    // Vẽ logo Pokemon
    packCtx.fillStyle = '#fbbf24';
    packCtx.strokeStyle = '#1e40af';
    packCtx.lineWidth = 3;
    packCtx.font = 'bold 60px Arial';
    packCtx.strokeText('POKéMON', 50, 80);
    packCtx.fillText('POKéMON', 50, 80);

    // Thêm sao
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

function drawPokeballBack(canvas) {
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.35;

    // Nửa trên (đỏ)
    const gradient1 = ctx.createLinearGradient(0, centerY - radius, 0, centerY);
    gradient1.addColorStop(0, '#ff4444');
    gradient1.addColorStop(1, '#cc0000');
    ctx.fillStyle = gradient1;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, Math.PI * 2);
    ctx.fill();

    // Nửa dưới (trắng)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI);
    ctx.fill();

    // Dải đen
    ctx.fillStyle = '#000000';
    ctx.fillRect(centerX - radius, centerY - radius * 0.1, radius * 2, radius * 0.2);

    // Vòng tròn giữa ngoài
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Vòng tròn giữa trong
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.22, 0, Math.PI * 2);
    ctx.fill();
}

function createCards() {
    cardsRevealed.innerHTML = '';
    
    cardImages.forEach((imageName, index) => {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';
        
        const card = document.createElement('div');
        card.className = 'card';
        
        // Mặt trước (back of card - mặt úp)
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        
        const backPattern = document.createElement('div');
        backPattern.className = 'card-back-pattern';
        
        const pokeballCanvas = document.createElement('canvas');
        pokeballCanvas.width = 200;
        pokeballCanvas.height = 280;
        pokeballCanvas.className = 'pokeball-back';
        drawPokeballBack(pokeballCanvas);
        
        backPattern.appendChild(pokeballCanvas);
        cardFront.appendChild(backPattern);
        
        // Mặt sau (front of card - mặt hình Pokemon)
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        
        const cardImg = document.createElement('div');
        cardImg.className = 'card-img';
        
        const img = document.createElement('img');
        img.src = `assets/cards/${imageName}`;
        img.alt = imageName;
        img.onerror = function() {
            // Nếu ảnh không load được, hiển thị placeholder
            cardBack.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
            cardImg.innerHTML = '<div style="font-size: 3em;">🎴</div>';
        };
        
        cardImg.appendChild(img);
        cardBack.appendChild(cardImg);
        
        card.appendChild(cardFront);
        card.appendChild(cardBack);
        cardContainer.appendChild(card);
        
        // Thêm sự kiện click để lật thẻ
        cardContainer.addEventListener('click', () => {
            cardContainer.classList.toggle('flipped');
        });
        
        cardsRevealed.appendChild(cardContainer);
    });
}

// function handleSlice(e) {
//     if (!isSlicing) return;

//     const rect = sliceCanvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     slicePath.push({ x, y });

//     if (slicePath.length > 1) {
//         const prev = slicePath[slicePath.length - 2];
        
//         sliceCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
//         sliceCtx.lineWidth = 8;
//         sliceCtx.lineCap = 'round';
//         sliceCtx.beginPath();
//         sliceCtx.moveTo(prev.x, prev.y);
//         sliceCtx.lineTo(x, y);
//         sliceCtx.stroke();

//         // Hiệu ứng phát sáng
//         sliceCtx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
//         sliceCtx.lineWidth = 15;
//         sliceCtx.beginPath();
//         sliceCtx.moveTo(prev.x, prev.y);
//         sliceCtx.lineTo(x, y);
//         sliceCtx.stroke();

//         sliceProgress += Math.hypot(x - prev.x, y - prev.y);

//         if (Math.random() > 0.7) {
//             createSparkle(e.clientX - rect.left, e.clientY - rect.top);
//         }

//         if (sliceProgress > 800) {
//             openPack();
//         }
//     }
// }

function handleSlice(e) {
    if (!isSlicing) return;

    // Lấy tọa độ của canvas
    const rect = sliceCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Định nghĩa khu vực cắt (slice area)
    const sliceAreaX = 0; // Tọa độ X của góc trên bên trái khu vực cắt
    const sliceAreaY = 0; // Tọa độ Y của góc trên bên trái khu vực cắt
    const sliceAreaWidth = 600; // Chiều rộng của khu vực cắt
    const sliceAreaHeight = 80; // Chiều cao của khu vực cắt

    // Giới hạn tọa độ x và y trong khu vực cắt
    const constrainedX = Math.max(sliceAreaX, Math.min(x, sliceAreaX + sliceAreaWidth));
    const constrainedY = Math.max(sliceAreaY, Math.min(y, sliceAreaY + sliceAreaHeight));

    // Kiểm tra xem tọa độ có nằm ngoài khu vực cắt hay không
    const isOutsideArea = x < sliceAreaX || x > sliceAreaX + sliceAreaWidth || y < sliceAreaY || y > sliceAreaY + sliceAreaHeight;

    // Thêm tọa độ đã được giới hạn vào mảng slicePath
    slicePath.push({ x: constrainedX, y: constrainedY });

    if (slicePath.length > 1) {
        const prev = slicePath[slicePath.length - 2];

        // Vẽ đường cắt chính (màu trắng)
        sliceCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        sliceCtx.lineWidth = 8;
        sliceCtx.lineCap = 'round';
        sliceCtx.beginPath();
        sliceCtx.moveTo(prev.x, prev.y);
        sliceCtx.lineTo(constrainedX, constrainedY);
        sliceCtx.stroke();

        // Nếu vẽ ngoài khu vực cắt, thay đổi màu sắc đường vẽ
        if (isOutsideArea) {
            sliceCtx.strokeStyle = 'rgba(255, 0, 0, 0.5)'; // Màu đỏ khi ra ngoài vùng
            sliceCtx.lineWidth = 2;
            sliceCtx.beginPath();
            sliceCtx.moveTo(prev.x, prev.y);
            sliceCtx.lineTo(constrainedX, constrainedY);
            sliceCtx.stroke();
        } else {
            // Hiệu ứng phát sáng (màu xanh dương) nếu trong khu vực cắt
            sliceCtx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
            sliceCtx.lineWidth = 15;
            sliceCtx.beginPath();
            sliceCtx.moveTo(prev.x, prev.y);
            sliceCtx.lineTo(constrainedX, constrainedY);
            sliceCtx.stroke();
        }

        // Cập nhật tiến trình cắt
        sliceProgress += Math.hypot(constrainedX - prev.x, constrainedY - prev.y);

        // Hiệu ứng ánh sao ngẫu nhiên
        if (Math.random() > 0.7) {
            createSparkle(e.clientX - rect.left, e.clientY - rect.top);
        }
        console.log(sliceProgress)
        // Kiểm tra nếu tiến trình cắt vượt qua ngưỡng, mở phần quà
        if (sliceProgress > 350) {
            openPack();
        }
    }
}



function openPack() {
    isSlicing = false;
    packWrapper.style.cursor = 'default';
    
    // Làm mờ gói thẻ
    packCanvas.style.transition = 'opacity 0.5s';
    packCanvas.style.opacity = '0';
    sliceCanvas.style.transition = 'opacity 0.5s';
    sliceCanvas.style.opacity = '0';

    setTimeout(() => {
        createCards();
        cardsRevealed.classList.add('show');
        instruction.style.display = 'none';
        flipInstruction.style.display = 'block';
        
        packWrapper.style.visibility = 'hidden';  
        packWrapper.style.pointerEvents = 'none';

        gameArea.style.width = '800px';
        gameArea.style.height = '800px';
        cardsRevealed.style.gap = '8%';
        resetBtn.style.display = 'inline-block';
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
    cardsRevealed.innerHTML = '';
    instruction.style.display = 'block';
    flipInstruction.style.display = 'none';
    resetBtn.style.display = 'none';
    packWrapper.style.cursor = 'crosshair';

    setTimeout(() => {
        packWrapper.style.visibility = 'visible';
        packWrapper.style.pointerEvents = 'all';



        gameArea.style.width = '400px';
        gameArea.style.height = '600px';
    }, 10);
    
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

// Hỗ trợ cảm ứng
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

// Khởi tạo
drawPack();