function toggleDarkMode() {
    const body = document.body;
    const icon = document.querySelector('.toggle i');

    // Toggle between dark and light mode by switching classes
    body.classList.toggle('dark');
    body.classList.toggle('light');

    // Change the icon based on the mode
    icon.classList.toggle('fa-solid', body.classList.contains('light'));
    icon.classList.toggle('fa-moon', body.classList.contains('light'));
    icon.classList.toggle('fa-regular', body.classList.contains('dark'));
    icon.classList.toggle('fa-sun', body.classList.contains('dark'));
}

// Attach the function to the switch button
document.querySelector('.dark-mode-switch').onclick = toggleDarkMode;


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
    month_list.classList.add('show');
    highlightCurrentMonth();  // Thêm hàm này để làm nổi bật tháng hiện tại khi nhấn vào picker
};

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
            calculateDateRange();
        }
    }

    function calculateDateRange() {
        if (firstDate && secondDate) {
            const diffInMilliseconds = Math.abs(secondDate - firstDate);
            const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
            const remainingHours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const remainingMinutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
            const remainingSeconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

            document.querySelector('.date-range').textContent = `Date range: ${diffInDays} ngày, ${remainingHours} giờ, ${remainingMinutes} phút, ${remainingSeconds} giây`;
            console.log(`Khoảng cách: ${diffInDays} ngày, ${remainingHours} giờ, ${remainingMinutes} phút, ${remainingSeconds} giây`);
        }
    }

    function resetAll() {
        // Reset the selected dates
        firstDate = null;
        secondDate = null;

        // Clear the displayed values
        document.querySelector('.date-1').textContent = '';
        document.querySelector('.date-2').textContent = '';
        document.querySelector('.date-range').textContent = '';

        console.log("Đã xóa tất cả các ngày và khoảng cách.");
    }