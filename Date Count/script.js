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

const month_days = [
    31, 28, 31, 30,
    31, 30, 31, 31,
    30, 31, 30, 31
];

let month_picker = document.querySelector
('#month-picker');

month_picker.onclick = () => {
    month_list.classList.add('show');
}

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

        calendar_days.appendChild(day);
    }
}

let month_list = calendar.querySelector('.month-list');

month_names.forEach((e, index) => {
    let month = document.createElement('div');
    month.innerHTML = `<div>${e}</div>`;
    month_list.appendChild(month);
})

let currDate = new Date();

let curr_month = {value: currDate.getMonth()};
let curr_year = {value: currDate.getFullYear()};

// Generate the calendar for the current month and year
generateCalendar(curr_month.value, curr_year.value);
