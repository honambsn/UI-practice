const packCanvas = document.getElementById('packCanvas');
//const sliceCanvas = document.getElementById('sliceCanvas');
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
        // cardContainer.addEventListener('mouseenter', () => {
        //     if (index === currentCardIndex) {
        //         card.style.transform = 'translateY(-20px) scale(1.05)';
        //     }
        // });
        
        // cardContainer.addEventListener('mouseleave', () => {
        //     if (index === currentCardIndex) {
        //         card.style.transform = 'translateY(0) scale(1)';
        //     }
        // });
        
        // Click để rút thẻ
        cardContainer.addEventListener('click', (e) => {
            if (isCardAnimating){
                console.log('drawing');
                return;
            }
            if (index === currentCardIndex) {
                drawCard(cardContainer, card, img.src, imageName, index);
            }
        });
        
        cardsRevealed.appendChild(cardContainer);
    });
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
        // cardFront.appendChild(backPattern);
        
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

        const backSide = document.createElement('div');
        backSide.id = "backImg";
        const backSideImg = document.createElement('img');
        backSideImg.src = `assets/cards/backside.png`;
        backSideImg.onerror = function() {
            // Nếu ảnh không load được, hiển thị placeholder
            console.log('load fail')
        };
        backSide.appendChild(backSideImg);
        cardFront.appendChild(backSide);
        
        
        // Thêm sự kiện click để lật thẻ
        cardContainer.addEventListener('click', () => {
            cardContainer.classList.toggle('flipped');
        });
        
        cardsRevealed.appendChild(cardContainer);
    });
}

let isCardAnimating = false;
function drawCard(cardContainer, card, imgSrc, imageName, index) {
    if (isCardAnimating) return;

    isCardAnimating = true;
    // Lật thẻ
    //card.style.transition = 'transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)';
    card.style.transform = 'translateY(-20px) scale(1.05)';
    card.style.transform = 'rotateY(180deg)';
    
    
    setTimeout(() => {
        // Animation rút thẻ ra
        cardContainer.style.animation = 'cardDrawOut 0.8s ease-in-out forwards';
        
        // Lưu data thẻ đã rút
        revealedCardData.push({ imgSrc, imageName });
        
        // Thêm thẻ nhỏ vào danh sách đã rút
        const miniCardsContainer = document.getElementById('miniCardsContainer');
        const miniCard = document.createElement('div');
        miniCard.id = 'miniCard';
        miniCard.classList.add('miniCard');
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
    }, 700);

    const container = document.getElementById('miniCardsContainer');
    container.addEventListener('mouseenter', () => {
        container.classList.add('hovered');
    });

    container.addEventListener('mouseleave', () => {
        container.classList.remove('hovered');
    });



    card.addEventListener('animationend', () => {
        // Kiểm tra nếu đã hoàn thành toàn bộ animation
        if (!card.classList.contains('animating')) {
            isCardAnimating = false; // Đặt lại trạng thái để cho phép click lại
            card.classList.remove('animating'); // Loại bỏ lớp animation (nếu có)
        }
    })
    cardContainer.addEventListener('animationend', (e) => {
        // Nếu animation của `cardDrawOut` kết thúc, kiểm tra các animation liên quan
        if (e.animationName === 'cardDrawOut') {
            isCardAnimating = false;
            // Bạn có thể làm thêm các hành động nếu cần
        }
    });
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
        
        // setTimeout(() => {
        //     cardContainer.classList.add = 'flipped';

        //     setTimeout(() => {
        //         cardContainer.classList.remove('flipped');
        //     }, 2000);
        // }, 200);

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
        else{
            console.log("not enough")
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
        //createCards();
        createCardStack();


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
//drawPack();

getRandomCards(3).then(cards => console.log('Done:', cards));



// getIDFromName('marill').then(ids => {
//     console.log('Marill card IDs:', ids);
// }).catch(error => {
//     console.error('Error:', error);
// });

//20s per a Response