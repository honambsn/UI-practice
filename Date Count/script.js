function toggleDarkMode() {
    const body = document.body;
    const icon = document.querySelector('.toggle i');

    // Toggle between dark and light mode by switching classes
    body.classList.toggle('dark');
    body.classList.toggle('light');

    // Change the icon based on the mode
    if (body.classList.contains('dark')) {
        icon.classList.remove('fa-solid', 'fa-moon');
        icon.classList.add('fa-regular', 'fa-sun');
    } else {
        icon.classList.remove('fa-regular', 'fa-sun');
        icon.classList.add('fa-solid', 'fa-moon');
    }
}

// Attach the function to the switch button
document.querySelector('.dark-mode-switch').onclick = toggleDarkMode;


// Check leap year
isLeapYear = (year) => {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
}

getFebDays = (year) => {
    return (isLeapYear(year) ? 29 : 28);
}

// Get the number of days in a month
let calendar = document.querySelector('.calendar');

const month_names = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

let month_picker = document.querySelector
('#month-picker');

month_picker.onclick = () => {
    month_list.classList.add('show');

    const currentMonth = new Date().getMonth();

    const currentMonthElement = month_list.children[currentMonth];
    currentMonthElement.classList.add('current-month');

}


let temp1 = 0;
let temp2 = 0;

// Generate calendar
generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.calendar-days');
    let calendar_header_year = document.querySelector('#year');

    // Update the month and year in the header
    month_picker.innerHTML = month_names[month];
    calendar_header_year.innerHTML = year;

    let currDate = new Date();

    // Get the number of days in the current month
    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Get the first day of the month
    let first_day = new Date(year, month, 1);
    let first_day_weekday = first_day.getDay();  // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // Clear the previous calendar days
    calendar_days.innerHTML = '';

    // Add empty divs for days before the first day of the month (leading empty days)
    for (let i = 0; i < first_day_weekday; i++) {
        let empty_day = document.createElement('div');
        empty_day.classList.add('calendar-day');
        calendar_days.appendChild(empty_day);
    }

    // Add the actual days of the month
    for (let i = 1; i <= days_of_month[month]; i++) {
        let day = document.createElement('div');
        day.classList.add('calendar-day-hover');
        day.innerHTML = i;

        // Highlight the current day
        if (i === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
            day.classList.add('curr-date');
        }

        // Add extra span elements if needed (as in the original code)
        day.innerHTML += ` <span></span>
                           <span></span>
                           <span></span>
                           <span></span>`;


        // Add click event to show the date in the console
        day.onclick = () => {
            // Get the selected date
            let selectedDate = new Date(year, month, i);
            //console.log(`selectedDate: ${selectedDate}`);
            console.log(`Selected date: ${selectedDate.toLocaleDateString()}`);
            const show_day = selectedDate.getDate();
            const show_month = selectedDate.getMonth() + 1; // Adding 1 to make it 1-12
            const show_year = selectedDate.getFullYear();
          
            console.log(`Day: ${show_day}, Month: ${show_month}, Year: ${show_year}`);
            // Display the selected date in an alert (or any other way you prefer)
            alert(`Selected date: ${show_day}/${show_month}/${show_year}`);

        }

        calendar_days.appendChild(day);
    }
}

let month_list = calendar.querySelector('.month-list');

month_names.forEach((e, index) => {
    let month = document.createElement('div');
    //month.innerHTML = `<div>${e}</div>`;
    for (let i = 1; i < 12; i++) {
        month.innerHTML = `<div class="month-${i}">${e}</div>`;
    }
    month.onclick = () => {
        curr_month.value = index; // Update the current month
        generateCalendar(curr_month.value, curr_year.value); // Generate the calendar for the selected month
        month_list.classList.remove('show'); // Hide the month list after selection
    }
    month_list.appendChild(month);
})

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value; // Decrease the year by 1
    generateCalendar(curr_month.value, curr_year.value); // Generate the calendar for the new year
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value; // Increase the year by 1
    generateCalendar(curr_month.value, curr_year.value); // Generate the calendar for the new year
}

let currDate = new Date();

let curr_month = {value: currDate.getMonth()};
let curr_year = {value: currDate.getFullYear()};

// Generate the calendar for the current month and year
generateCalendar(curr_month.value, curr_year.value);


// // Hàm callback định nghĩa ở ngoài
// function handleSelectedDate(selectedDate) {
//     console.log("Ngày đã chọn:", selectedDate);
//     // Bạn có thể làm gì đó với ngày đã chọn ở đây, ví dụ lưu trữ hoặc xử lý
//     alert(`Ngày bạn đã chọn là: ${selectedDate.day}/${selectedDate.month}/${selectedDate.year}`);
// }

// // Hàm để xử lý sự kiện onclick và gọi callback
// function handleDateSelection(callback) {
//     day.onclick = () => {
//         // Lấy ngày đã chọn
//         let selectedDate = new Date(year, month, i);
//         console.log(`Ngày đã chọn: ${selectedDate.toLocaleDateString()}`);

//         const show_day = selectedDate.getDate();
//         const show_month = selectedDate.getMonth() + 1; // Thêm 1 để tháng từ 1-12
//         const show_year = selectedDate.getFullYear();

//         console.log(`Ngày: ${show_day}, Tháng: ${show_month}, Năm: ${show_year}`);
        
//         // Gọi callback với giá trị ngày đã chọn
//         callback({ day: show_day, month: show_month, year: show_year });
//     };
// }

// // Ví dụ sử dụng: gọi hàm handleDateSelection và truyền hàm handleSelectedDate làm callback
// handleDateSelection(handleSelectedDate);
