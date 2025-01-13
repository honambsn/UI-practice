// document.addEventListener("DOMContentLoaded", function () {
//     const wheel = document.querySelector('.wheel');
//     let spinInterval;

//     function spinWheel() {
//         const rotation = Math.floor(Math.random() * 5000) + 2000; // Random spin duration between 2 to 7 seconds
//         const rotationDegree = Math.floor(Math.random() * 360); // Random rotation degree

//         wheel.style.transition = `transform ${rotation / 1000}s ease-in-out`;
//         wheel.style.transform = `rotate(${rotationDegree + 360 * 5}deg)`; // Spin multiple times

//         // Reset after spin
//         setTimeout(() => {
//             wheel.style.transition = 'none';
//             wheel.style.transform = `rotate(${rotationDegree}deg)`;
//         }, rotation);
//     }

//     // Start auto-spin every 3 seconds (adjust the interval time as needed)
//     setInterval(spinWheel, 3000);
// });




let wheel = document.querySelector('.wheel');
let inner = document.querySelector('.inner');
let spinBtn = document.querySelector('.spinBtn');

let value1 = Math.ceil(Math.random() * -3600);
let value2 = Math.ceil(Math.random() * 3600);

spinBtn.onclick = function () {
    wheel.style.transform = `rotate(${value1}deg)`;
    inner.style.transform = `rotate(${value2}deg)`;
    value1 += Math.ceil(Math.random() * -3600);
    value2 += Math.ceil(Math.random() * 3600);
}
