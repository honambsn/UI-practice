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

// Hiển thị ngày đã chọn và tính khoảng cách
function displaySelectedDate(selectedDate) {
    console.log("Ngày đã chọn:", selectedDate.toLocaleDateString());
    alert(`Ngày đã chọn: ${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`);

    // Tính khoảng cách giữa ngày đã chọn và hôm nay
    const diffInMilliseconds = Math.abs(currDate - selectedDate);
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const remainingSeconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

    console.log(`Khoảng cách: ${diffInDays} ngày, ${remainingHours} giờ, ${remainingMinutes} phút, ${remainingSeconds} giây`);
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







// og
// // toggle 
// function toggleDarkMode() {
//     const body = document.body;
//     const icon = document.querySelector('.toggle i');

//     // Toggle between dark and light mode by switching classes
//     body.classList.toggle('dark');
//     body.classList.toggle('light');

//     // Change the icon based on the mode
//     icon.classList.toggle('fa-solid', body.classList.contains('light'));
//     icon.classList.toggle('fa-moon', body.classList.contains('light'));
//     icon.classList.toggle('fa-regular', body.classList.contains('dark'));
//     icon.classList.toggle('fa-sun', body.classList.contains('dark'));
// }

// // Attach the function to the switch button
// document.querySelector('.dark-mode-switch').onclick = toggleDarkMode;


// // Check leap year
// isLeapYear = (year) => {
//     return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
// }

// getFebDays = (year) => {
//     return (isLeapYear(year) ? 29 : 28);
// }

// // Get the number of days in a month
// let calendar = document.querySelector('.calendar');

// const month_names = [
//     "January", "February", "March", "April",
//     "May", "June", "July", "August",
//     "September", "October", "November", "December"
// ];

// let month_picker = document.querySelector
// ('#month-picker');

// month_picker.onclick = () => {
//     month_list.classList.add('show');

//     const currentMonth = new Date().getMonth();

//     const currentMonthElement = month_list.children[currentMonth];
//     currentMonthElement.classList.add('current-month');

// }


// // Generate calendar
// generateCalendar = (month, year) => {
//     let calendar_days = document.querySelector('.calendar-days');
//     let calendar_header_year = document.querySelector('#year');

//     // Update the month and year in the header
//     month_picker.innerHTML = month_names[month];
//     calendar_header_year.innerHTML = year;

//     let currDate = new Date();

//     // Get the number of days in the current month
//     let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//     // Get the first day of the month
//     let first_day = new Date(year, month, 1);
//     let first_day_weekday = first_day.getDay();  // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

//     // Clear the previous calendar days
//     calendar_days.innerHTML = '';

//     // Add empty divs for days before the first day of the month (leading empty days)
//     for (let i = 0; i < first_day_weekday; i++) {
//         let empty_day = document.createElement('div');
//         empty_day.classList.add('calendar-day');
//         calendar_days.appendChild(empty_day);
//     }

//     // Add the actual days of the month
//     for (let i = 1; i <= days_of_month[month]; i++) {
//         let day = document.createElement('div');
//         day.classList.add('calendar-day-hover');
//         day.innerHTML = i;

//         // Highlight the current day
//         if (i === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
//             day.classList.add('curr-date');
//         }

//         // Add extra span elements if needed (as in the original code)
//         day.innerHTML += ` <span></span>
//                            <span></span>
//                            <span></span>
//                            <span></span>`;


//         // Add click event to show the date in the console
//         day.onclick = () => {
//             // Get the selected date
//             let selectedDate = new Date(year, month, i);
//             //console.log(`selectedDate: ${selectedDate}`);
//             console.log(`Selected date: ${selectedDate.toLocaleDateString()}`);
//             const show_day = selectedDate.getDate();
//             const show_month = selectedDate.getMonth() + 1; // Adding 1 to make it 1-12
//             const show_year = selectedDate.getFullYear();
          
//             console.log(`Day: ${show_day}, Month: ${show_month}, Year: ${show_year}`);
//             // Display the selected date in an alert (or any other way you prefer)
//             alert(`Selected date: ${show_day}/${show_month}/${show_year}`);

//         }

//         day.onclick = () => {
//             const selectedDate = getSelectedDate(); // Lấy ngày đã chọn dưới dạng đối tượng Date
//             console.log("Ngày đã chọn:", selectedDate);
        
//             const today = new Date(); // Lấy ngày hôm nay
        
//             // Kiểm tra nếu ngày đã chọn không hợp lệ (Date trả về NaN)
//             if (isNaN(selectedDate.getTime())) {
//                 console.log("Ngày đã chọn không hợp lệ");
//                 return;
//             }
        
//             // Tính hiệu giữa hai ngày (mili giây)
//             const diffInMilliseconds = Math.abs(today - selectedDate);

//             // Calculate days
//             const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
        
//             // Calculate remaining hours
//             const remainingHours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
//             // Calculate remaining minutes
//             const remainingMinutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
        
//             // Calculate remaining seconds
//             const remainingSeconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);
        
//             console.log(`Khoảng cách đến ngày đã chọn: ${diffInDays} ngày, ${remainingHours} giờ, ${remainingMinutes} phút, ${remainingSeconds} giây`);
//         }
        
//         // Hàm trả về đối tượng Date từ year, month và i
//         function getSelectedDate() {
//             // Kiểm tra xem các giá trị year, month, và i có hợp lệ không
//             if (typeof year !== 'number' || typeof month !== 'number' || typeof i !== 'number') {
//                 console.log("Giá trị year, month, hoặc i không hợp lệ");
//                 return new Date(NaN);  // Trả về đối tượng Date không hợp lệ
//             }
        
//             // Tạo đối tượng Date (tháng bắt đầu từ 0)
//             let selectedDate = new Date(year, month, i);
        
//             return selectedDate; // Trả về đối tượng Date hợp lệ
//         }
        
        

//         calendar_days.appendChild(day);
//     }
// }

// let month_list = calendar.querySelector('.month-list');

// month_names.forEach((e, index) => {
//     let month = document.createElement('div');
//     //month.innerHTML = `<div>${e}</div>`;
//     for (let i = 1; i < 12; i++) {
//         month.innerHTML = `<div class="month-${i}">${e}</div>`;
//     }
//     month.onclick = () => {
//         curr_month.value = index; // Update the current month
//         generateCalendar(curr_month.value, curr_year.value); // Generate the calendar for the selected month
//         month_list.classList.remove('show'); // Hide the month list after selection
//     }
//     month_list.appendChild(month);
// })

// document.querySelector('#prev-year').onclick = () => {
//     --curr_year.value; // Decrease the year by 1
//     generateCalendar(curr_month.value, curr_year.value); // Generate the calendar for the new year
// }

// document.querySelector('#next-year').onclick = () => {
//     ++curr_year.value; // Increase the year by 1
//     generateCalendar(curr_month.value, curr_year.value); // Generate the calendar for the new year
// }

// let currDate = new Date();

// let curr_month = {value: currDate.getMonth()};
// let curr_year = {value: currDate.getFullYear()};

// // Generate the calendar for the current month and year
// generateCalendar(curr_month.value, curr_year.value);