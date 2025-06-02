import { resetAll } from './dateRange.js';
import { changeToCountDown } from './utils.js';

export function toggleBody() {
    const body = document.body;
    const header = document.querySelector('.header');
    const h1 = document.querySelector('.toggle-todo');

    if (h1.classList.contains('disabled')) {
        h1.classList.add('vibrate');

        setTimeout(() => {
            h1.classList.remove('vibrate');
            h1.textContent = "Đang chuyển đổi...";
        }, 500);
        return;
    }

    h1.classList.add('disabled');
    h1.classList.add('fade');

    setTimeout(() => {
        body.classList.toggle('date-count');
        body.classList.toggle('count-down');

        if (body.classList.contains('date-count')) {
            h1.textContent = "Date Count";
            resetAll();
        } else {
            h1.textContent = "Count Down";
            changeToCountDown();
        }

        h1.classList.remove('fade');
        h1.classList.add('enable');

        setTimeout(() => {
            h1.classList.remove('disabled');
            h1.classList.remove('enable');
        }, 1500);
    }, 300);

    if (body.classList.contains('date-count')) {
        alert('Date Count mode is enabled!');
    } else {
        alert('Count Down mode is enabled!');
    }
}

export function backToday() {
    const icon = document.querySelector('.today-info i');

    icon.classList.add('active');
    console.log("Đã quay về hôm nay!");
    icon.classList.remove('active');

    const today = new Date();
    const today_month = today.getMonth();
    const today_year = today.getFullYear();

    window.generateCalendar(today_month, today_year); // gọi hàm toàn cục
}
