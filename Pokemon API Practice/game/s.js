// script.js - Updated version
const packCanvas = document.getElementById('packCanvas');
const sliceCanvas = document.getElementById('cutAreaCanvas');
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
let currentCardIndex = 0;
let totalCards = 6;
let revealedCardData = [];
let isStackMode = true; // Chế độ rút thẻ từ chồng

// Danh sách thẻ Pokemon
const cardImages = [
    'SV08_EN_42-2x.png',
    'SV08_EN_76-2x.png',
    'SV08_EN_220-2x.png',
    'SV08_EN_238-2x.png',
    'SV08_EN_239-2x.png',
    'SV08_EN_247-2x.png'
];

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

    const gradient1 = ctx.createLinearGradient(0, centerY - radius, 0, centerY);
    gradient1.addColorStop(0, '#ff4444');
    gradient1.addColorStop(1, '#cc0000');
    ctx.fillStyle = gradient1;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI);
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.fillRect(centerX - radius, centerY - radius * 0.1, radius * 2, radius * 0.2);

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.22, 0, Math.PI * 2);
    ctx.fill();
}

// Tạo chồng thẻ để rút tuần tự
function createCardStack() {
    cardsRevealed.innerHTML = '';
    cardsRevealed.style.gap = '0';
    cardsRevealed.style.justifyContent = 'center';
    cardsRevealed.style.alignItems = 'center';
    
    // Tạo container cho counter
    const counterDiv = document.createElement('div');
    counterDiv.id = 'cardCounter';
    counterDiv.style.cssText = `
        position: absolute;
        top: -60px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        font-size: 1.8em;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        background: rgba(0,0,0,0.3);
        padding: 10px 25px;
        border-radius: 25px;
    `;
    cardsRevealed.appendChild(counterDiv);
    
    // Tạo container cho thẻ nhỏ đã rút
    const miniCardsContainer = document.createElement('div');
    miniCardsContainer.id = 'miniCardsContainer';
    miniCardsContainer.style.cssText = `
        position: absolute;
        bottom: -140px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        justify-content: center;
        width: 600px;
    `;
    cardsRevealed.appendChild(miniCardsContainer);
    
    updateCounter();
    
    // Tạo chồng thẻ xếp chồng lên nhau
    cardImages.forEach((imageName, index) => {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container card-stack-item';
        cardContainer.style.cssText = `
            position: absolute;
            width: 280px;
            aspect-ratio: 5/7;
            top: ${index * 3}px;
            left: 50%;
            transform: translateX(-50%);
            z-index: ${cardImages.length - index};
            cursor: pointer;
            perspective: 1000px;
            transition: all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
        `;
        
        const card = document.createElement('div');
        card.className = 'card';
        card.style.cssText = `
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1);
        `;
        
        // Mặt trước (mặt úp)
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        
        const backSide = document.createElement('div');
        backSide.id = "backImg";
        const backSideImg = document.createElement('img');
        backSideImg.src = `assets/cards/backside.png`;
        backSideImg.onerror = function() {
            const backPattern = document.createElement('div');
            backPattern.className = 'card-back-pattern';
            const pokeballCanvas = document.createElement('canvas');
            pokeballCanvas.width = 200;
            pokeballCanvas.height = 280;
            drawPokeballBack(pokeballCanvas);
            backPattern.appendChild(pokeballCanvas);
            cardFront.innerHTML = '';
            cardFront.appendChild(backPattern);
        };
        backSide.appendChild(backSideImg);
        cardFront.appendChild(backSide);
        
        // Mặt sau (mặt Pokemon)
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.cssText = `
            width: 100%;
            height: 100%;
            position: absolute;
            backface-visibility: hidden;
            transform: rotateY(180deg);
            border-radius: 15px;
            overflow: hidden;
            background: white;
        `;
        
        const cardImg = document.createElement('div');
        cardImg.className = 'card-img';
        
        const img = document.createElement('img');
        img.src = `assets/cards/${imageName}`;
        img.alt = imageName;
        img.onerror = function() {
            cardBack.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
            cardImg.innerHTML = '<div style="font-size: 3em;">🎴</div>';
        };
        
        cardImg.appendChild(img);
        cardBack.appendChild(cardImg);
        
        card.appendChild(cardFront);
        card.appendChild(cardBack);
        cardContainer.appendChild(card);
        
        // Hover effect chỉ cho thẻ trên cùng
        cardContainer.addEventListener('mouseenter', () => {
            if (index === currentCardIndex) {
                card.style.transform = 'translateY(-20px) scale(1.05)';
            }
        });
        
        cardContainer.addEventListener('mouseleave', () => {
            if (index === currentCardIndex) {
                card.style.transform = 'translateY(0) scale(1)';
            }
        });
        
        // Click để rút thẻ
        cardContainer.addEventListener('click', () => {
            if (index === currentCardIndex) {
                drawCard(cardContainer, card, img.src, imageName, index);
            }
        });
        
        cardsRevealed.appendChild(cardContainer);
    });
}

function drawCard(cardContainer, card, imgSrc, imageName, index) {
    // Lật thẻ
    card.style.transform = 'rotateY(180deg)';
    
    setTimeout(() => {
        // Animation rút thẻ ra
        //cardContainer.style.animation = 'cardDrawOut 0.8s ease-out forwards';
        cardContainer.style.animation = 'cardDrawOut 1.5s cubic-bezier(0.25, 0.8, 0.25, 1) forwards';
        
        // Lưu data thẻ đã rút
        revealedCardData.push({ imgSrc, imageName });
        
        // Thêm thẻ nhỏ vào danh sách đã rút
        const miniCardsContainer = document.getElementById('miniCardsContainer');
        const miniCard = document.createElement('div');
        miniCard.style.cssText = `
            width: 80px;
            height: 115px;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            border: 3px solid gold;
            animation: miniCardAppear 0.5s ease-out;
        `;
        
        const miniImg = document.createElement('img');
        miniImg.src = imgSrc;
        miniImg.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';
        miniImg.onerror = function() {
            miniCard.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
            miniCard.innerHTML = '<div style="font-size: 2em; display: flex; align-items: center; justify-content: center; height: 100%;">🎴</div>';
        };
        miniCard.appendChild(miniImg);
        miniCardsContainer.appendChild(miniCard);
        
        currentCardIndex++;
        updateCounter();
        
        // Kiểm tra nếu rút hết thẻ
        if (currentCardIndex >= totalCards) {
            setTimeout(() => {
                showFinalReveal();
            }, 1000);
        }
    }, 800);
}

function updateCounter() {
    const counter = document.getElementById('cardCounter');
    if (counter) {
        const remaining = totalCards - currentCardIndex;
        counter.textContent = `${remaining}/${totalCards}`;
    }
}

function showFinalReveal() {
    // Ẩn chồng thẻ
    const stackItems = document.querySelectorAll('.card-stack-item');
    stackItems.forEach(item => {
        item.style.display = 'none';
    });
    
    const counter = document.getElementById('cardCounter');
    const miniContainer = document.getElementById('miniCardsContainer');
    if (counter) counter.style.display = 'none';
    if (miniContainer) miniContainer.style.display = 'none';
    
    // Reset layout cho hiển thị lưới
    cardsRevealed.style.gap = '8%';
    cardsRevealed.style.justifyContent = 'center';
    cardsRevealed.style.alignItems = 'center';
    
    gameArea.style.width = '800px';
    gameArea.style.height = '800px';
    
    // Tạo display cuối cùng với tất cả thẻ
    revealedCardData.forEach((cardData, index) => {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container final-card';
        cardContainer.style.cssText = `
            width: 28%;
            aspect-ratio: 5/7;
            perspective: 1000px;
            cursor: pointer;
            animation: finalCardReveal 0.6s ease-out forwards;
            opacity: 0;
            animation-delay: ${index * 0.1}s;
            position: relative;
        `;
        
        const card = document.createElement('div');
        card.className = 'card';
        card.style.cssText = `
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1);
        `;
        
        // Mặt trước (mặt úp)
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        
        const backSide = document.createElement('div');
        backSide.id = "backImg";
        const backSideImg = document.createElement('img');
        backSideImg.src = `assets/cards/backside.png`;
        backSideImg.onerror = function() {
            const backPattern = document.createElement('div');
            backPattern.className = 'card-back-pattern';
            const pokeballCanvas = document.createElement('canvas');
            pokeballCanvas.width = 200;
            pokeballCanvas.height = 280;
            drawPokeballBack(pokeballCanvas);
            backPattern.appendChild(pokeballCanvas);
            cardFront.innerHTML = '';
            cardFront.appendChild(backPattern);
        };
        backSide.appendChild(backSideImg);
        cardFront.appendChild(backSide);
        
        // Mặt sau (mặt Pokemon)
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.cssText = `
            width: 100%;
            height: 100%;
            position: absolute;
            backface-visibility: hidden;
            transform: rotateY(180deg);
            border-radius: 15px;
            overflow: hidden;
            background: white;
        `;
        
        const cardImg = document.createElement('div');
        cardImg.className = 'card-img';
        
        const img = document.createElement('img');
        img.src = cardData.imgSrc;
        img.alt = cardData.imageName;
        img.onerror = function() {
            cardBack.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
            cardImg.innerHTML = '<div style="font-size: 3em;">🎴</div>';
        };
        
        cardImg.appendChild(img);
        cardBack.appendChild(cardImg);
        
        card.appendChild(cardFront);
        card.appendChild(cardBack);
        cardContainer.appendChild(card);
        
        // Click để lật
        cardContainer.addEventListener('click', () => {
            cardContainer.classList.toggle('flipped');
        });
        
        cardsRevealed.appendChild(cardContainer);
    });
    
    flipInstruction.textContent = 'Nhấn vào thẻ để lật!';
    resetBtn.style.display = 'inline-block';
    isStackMode = false;
}

function handleSlice(e) {
    if (!isSlicing) return;

    const rect = sliceCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const sliceAreaX = 0;
    const sliceAreaY = 0;
    const sliceAreaWidth = 600;
    const sliceAreaHeight = 80;

    const constrainedX = Math.max(sliceAreaX, Math.min(x, sliceAreaX + sliceAreaWidth));
    const constrainedY = Math.max(sliceAreaY, Math.min(y, sliceAreaY + sliceAreaHeight));

    const isOutsideArea = x < sliceAreaX || x > sliceAreaX + sliceAreaWidth || y < sliceAreaY || y > sliceAreaY + sliceAreaHeight;

    slicePath.push({ x: constrainedX, y: constrainedY });

    if (slicePath.length > 1) {
        const prev = slicePath[slicePath.length - 2];

        sliceCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        sliceCtx.lineWidth = 8;
        sliceCtx.lineCap = 'round';
        sliceCtx.beginPath();
        sliceCtx.moveTo(prev.x, prev.y);
        sliceCtx.lineTo(constrainedX, constrainedY);
        sliceCtx.stroke();

        if (isOutsideArea) {
            sliceCtx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
            sliceCtx.lineWidth = 2;
            sliceCtx.beginPath();
            sliceCtx.moveTo(prev.x, prev.y);
            sliceCtx.lineTo(constrainedX, constrainedY);
            sliceCtx.stroke();
        } else {
            sliceCtx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
            sliceCtx.lineWidth = 15;
            sliceCtx.beginPath();
            sliceCtx.moveTo(prev.x, prev.y);
            sliceCtx.lineTo(constrainedX, constrainedY);
            sliceCtx.stroke();
        }

        sliceProgress += Math.hypot(constrainedX - prev.x, constrainedY - prev.y);

        if (Math.random() > 0.7) {
            createSparkle(e.clientX - rect.left, e.clientY - rect.top);
        }

        if (sliceProgress > 350) {
            openPack();
        }
    }
}

function openPack() {
    isSlicing = false;
    packWrapper.style.cursor = 'default';
    
    packCanvas.style.transition = 'opacity 0.5s';
    packCanvas.style.opacity = '0';
    sliceCanvas.style.transition = 'opacity 0.5s';
    sliceCanvas.style.opacity = '0';

    setTimeout(() => {
        createCardStack();
        cardsRevealed.classList.add('show');
        instruction.style.display = 'none';
        flipInstruction.style.display = 'block';
        flipInstruction.textContent = 'Nhấn vào thẻ để rút!';
        
        packWrapper.style.visibility = 'hidden';  
        packWrapper.style.pointerEvents = 'none';
    }, 500);
}

function reset() {
    sliceProgress = 0;
    slicePath = [];
    currentCardIndex = 0;
    revealedCardData = [];
    isStackMode = true;
    
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
sliceCanvas.addEventListener('mouseup', () => { isSlicing = false; });
sliceCanvas.addEventListener('mouseleave', () => { isSlicing = false; });

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

sliceCanvas.addEventListener('touchend', () => { isSlicing = false; });

resetBtn.addEventListener('click', reset);