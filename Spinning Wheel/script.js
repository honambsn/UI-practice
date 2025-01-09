let wheel = document.querySelector('.wheel');
let spinBtn = document.querySelector('.spinBtn');
let value = Math.ceil(Math.random() * 3600);

spinBtn.onclick = function() {
    wheel.style.transition = 'all 3s ease-in-out';
    wheel.style.transform = `rotate(${value}deg)`;
    wheel.classList.add('blur');
    value += Math.ceil(Math.random() * 3600);
}