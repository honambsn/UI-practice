function toggleDarkMode() {
    const body = document.body;
    const icon = document.querySelector('.toggle i');

    // First, add the fade-out effect
    icon.classList.add('fade-out');

    // Wait for the fade-out animation to complete (0.3s as per our CSS transition)
    setTimeout(() => {
        // Toggle between dark and light mode by switching classes
        body.classList.toggle('dark');
        body.classList.toggle('light');

        // Update the icon
        if (body.classList.contains('light')) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }

        // Remove the fade-out class after the icon has been switched, and allow it to fade back in
        icon.classList.remove('fade-out');
    }, 300); // 300ms to match the CSS transition time
}

// Attach the function to the switch button
document.querySelector('.dark-mode-switch').addEventListener('click', toggleDarkMode);


// Check leap year
const isLeapYear = (year) => (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
const getFebDays = (year) => (isLeapYear(year) ? 29 : 28);

// Get the number of days in a month
let calendar = document.querySelector('.calendar');

const month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currDate = new Date();
let curr_month = {value: currDate.getMonth()};
let curr_year = {value: currDate.getFullYear()};

// Month picker
let month_picker = document.querySelector('#month-picker');
let month_list = document.querySelector('.month-list'); 

month_picker.onclick = () => {
    month_list.classList.remove('hide');
    month_list.classList.add('show');
    highlightCurrentMonth();
};

// Handle Escape key press to hide the month list
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        // Ensure only the 'hide' class is added (remove 'show' if present)
        month_list.classList.remove('show'); // Remove 'show' to prepare for closing
        month_list.classList.add('hide'); // Add 'hide' to trigger closing animation
        
        // Listen for the animation to end before resetting the visibility
        month_list.addEventListener('animationend', () => {
            // Remove both classes to reset the state
            month_list.classList.remove('show', 'hide');
            month_list.style.visibility = 'hidden'; // Hide the list completely after animation
        }, { once: true }); // Ensure the listener is triggered only once
    }
});
// Hàm làm nổi bật tháng hiện tại
function highlightCurrentMonth() {
    Array.from(month_list.children).forEach((monthItem, index) => {
        if (index === currDate.getMonth()) {
            monthItem.classList.add('current-month');
        } else {
            monthItem.classList.remove('current-month');
        }
    });
}

// Hàm tạo lịch
function generateCalendar(month, year) {
    const calendar_days = document.querySelector('.calendar-days');
    const calendar_header_year = document.querySelector('#year');
    const days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const first_day = new Date(year, month, 1);
    const first_day_weekday = first_day.getDay();

    // Cập nhật tháng và năm trong header
    month_picker.innerHTML = month_names[month];
    calendar_header_year.innerHTML = year;

    // Xóa các ngày cũ trong lịch
    calendar_days.innerHTML = '';

    // Thêm các ngày trống ở đầu tháng
    for (let i = 0; i < first_day_weekday; i++) {
        calendar_days.appendChild(createEmptyDay());
    }

    // Thêm các ngày thực tế trong tháng
    for (let i = 1; i <= days_of_month[month]; i++) {
        const day = createCalendarDay(i, month, year);
        calendar_days.appendChild(day);
    }
}

// Tạo div cho một ngày trong lịch
function createCalendarDay(dayNumber, month, year) {
    const day = document.createElement('div');
    day.classList.add('calendar-day-hover');
    day.innerHTML = `${dayNumber} <span></span><span></span><span></span><span></span>`;

    // Highlight ngày hiện tại
    if (isCurrentDay(dayNumber, month, year)) {
        day.classList.add('curr-date');
    }

    // Thêm chức năng chọn ngày
    day.onclick = () => {
        const selectedDate = new Date(year, month, dayNumber);
        displaySelectedDate(selectedDate);
    };

    return day;
}

// Kiểm tra xem ngày hiện tại có phải là ngày đã chọn không
function isCurrentDay(day, month, year) {
    return day === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth();
}

// Tạo danh sách các tháng
function generateMonthList() {
    month_names.forEach((monthName, index) => {
        let month = document.createElement('div');
        month.classList.add('month-item');
        month.innerHTML = monthName;
        month.onclick = () => {
            curr_month.value = index;
            generateCalendar(curr_month.value, curr_year.value);
            month_list.classList.remove('show');
        };
        month_list.appendChild(month);
    });
}

// Điều hướng năm
document.querySelector('#prev-year').onclick = () => {
    curr_year.value--;
    generateCalendar(curr_month.value, curr_year.value);
};

document.querySelector('#next-year').onclick = () => {
    curr_year.value++;
    generateCalendar(curr_month.value, curr_year.value);
};

// Khởi tạo lịch cho tháng và năm hiện tại
generateCalendar(curr_month.value, curr_year.value);
generateMonthList();

// Tạo một div trống cho các ngày trống ở đầu tháng
function createEmptyDay() {
    const emptyDay = document.createElement('div');
    emptyDay.classList.add('calendar-day');
    return emptyDay;
}


let firstDate = null;
let secondDate = null;
let intervalId = null;

function displaySelectedDate(selectedDate) {
    console.log("Ngày đã chọn:", selectedDate.toLocaleDateString());

    // Kiểm tra xem đây là lần chọn ngày đầu tiên hay thứ hai
    if (firstDate === null) {
        // Lưu ngày đầu tiên
        firstDate = selectedDate;
        document.querySelector('.date-1').textContent = `Ngày 1: ${selectedDate.toLocaleDateString()}`;
        alert(`Ngày đã chọn (Lần 1): ${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`);
    } else if (secondDate === null) {
        // Lưu ngày thứ hai
        secondDate = selectedDate;
        document.querySelector('.date-2').textContent = `Ngày 2: ${selectedDate.toLocaleDateString()}`;
        alert(`Ngày đã chọn (Lần 2): ${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`);

        // Tính toán khoảng cách giữa hai ngày và hiển thị kết quả
        startDateRangeTimer();
    }
}

function startDateRangeTimer() {
    if (isToday(firstDate) || isToday(secondDate)) {

        // Nếu một trong hai ngày là hôm nay, bắt đầu cập nhật mỗi giây

        if (intervalId) {

            clearInterval(intervalId); // Dừng interval nếu nó đang chạy

        }

        intervalId = setInterval(calculateDateRange, 1000);  // Bắt đầu interval để cập nhật mỗi giây

    } else {

        // Nếu không có ngày nào là hôm nay, tính khoảng cách một lần duy nhất

        calculateDateRange();

    }
}

function calculateDateRange() {
    if (firstDate && secondDate) {

        // Lấy thời gian hiện tại

        const now = new Date();



        // Kiểm tra xem Ngày 1 hoặc Ngày 2 có phải là hôm nay không

        let diffInMilliseconds;



        if (isToday(firstDate) || isToday(secondDate)) {

            // Nếu một trong hai ngày là hôm nay, tính khoảng cách từ hôm nay đến ngày còn lại

            diffInMilliseconds = secondDate - now;  // Tính từ ngày hiện tại đến ngày thứ hai

        } else {

            // Nếu không có ngày nào là hôm nay, tính sự khác biệt giữa hai ngày đã chọn

            diffInMilliseconds = secondDate - firstDate;

        }

        // Tính toán sự khác biệt
        const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
        const remainingHours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

        // Hiển thị khoảng cách trong giao diện
        document.querySelector('.date-range').textContent = `Khoảng cách: ${diffInDays} ngày, ${remainingHours} giờ, ${remainingMinutes} phút, ${remainingSeconds} giây`;

        // Nếu khoảng cách về 0, ngừng interval
        if (diffInMilliseconds <= 0) {
            clearInterval(intervalId);
            console.log("Khoảng cách đã hết!");
            document.querySelector('.date-range').textContent = "Khoảng cách đã hết!";
        }

        console.log(`Khoảng cách: ${diffInDays} ngày, ${remainingHours} giờ, ${remainingMinutes} phút, ${remainingSeconds} giây`);
    }
}

function resetAll() {
    // Reset the selected dates
    firstDate = null;
    secondDate = null;

    // Clear the displayed values
    document.querySelector('.date-1').textContent = 'Ngày 1: ';
    document.querySelector('.date-2').textContent = 'Ngày 2: ';
    document.querySelector('.date-range').textContent = 'Date range: ';
    alert("Đã xóa tất cả các ngày và khoảng cách.");

    console.log("Đã xóa tất cả các ngày và khoảng cách.");
}


function isToday(date) {

    const today = new Date();

    // Kiểm tra ngày, tháng, năm có trùng với ngày hiện tại không

    return date.getDate() === today.getDate() &&

           date.getMonth() === today.getMonth() &&

           date.getFullYear() === today.getFullYear();

}
window.addEventListener('resize', () => {
    if (month_list.classList.contains('show')) {
        month_list.classList.remove('show');
        month_list.classList.add('hide');

        const onTransitionEnd = () => {
            month_list.classList.remove('hide');
            month_list.removeEventListener('transitionend', onTransitionEnd);
        };

        month_list.addEventListener('transitionend', onTransitionEnd);
    }
});

const resetBtn = document.querySelector('.resetButton');

resetBtn.addEventListener('click', resetAll);
