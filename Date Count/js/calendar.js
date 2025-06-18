import { loadSavedColors } from './emailHandler.js';
import { getFebDays, isLeapYear } from './utils.js';

let displayDateCallback = null;

export function setDisplayDateCallback(fn) {
  displayDateCallback = fn;
}

const month_names = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let currDate = new Date();
let curr_month = { value: currDate.getMonth() };
let curr_year = { value: currDate.getFullYear() };

let month_picker = document.querySelector('#month-picker');
let month_list = document.querySelector('.month-list');

month_picker.onclick = () => {
  month_list.classList.remove('hide');
  month_list.classList.add('show');
  highlightCurrentMonth();
};

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    month_list.classList.remove('show');
    month_list.classList.add('hide');

    month_list.addEventListener('animationend', () => {
      month_list.classList.remove('show', 'hide');
      month_list.style.visibility = 'hidden';
    }, { once: true });
  }
});

function highlightCurrentMonth() {
  Array.from(month_list.children).forEach((monthItem, index) => {
    if (index === currDate.getMonth()) {
      monthItem.classList.add('current-month');
    } else {
      monthItem.classList.remove('current-month');
    }
  });
}

function createCalendarDay(dayNumber, month, year) {
  const day = document.createElement('div');
  day.classList.add('calendar-day-date');
  day.setAttribute('data-date', `${year}-${month + 1}-${dayNumber}`);
  day.innerHTML = `${dayNumber} <span></span><span></span><span></span><span></span>`;

  if (dayNumber === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
    day.classList.add('curr-date');
  }

  day.onclick = () => {
    const selectedDate = new Date(year, month, dayNumber);
    if (displayDateCallback) {
      displayDateCallback(selectedDate);
    }
  };

  // document.querySelectorAll('.calendar-day-date').forEach(day => {
  //   day.classList.remove('active');
  // });
  // day.classList.add('active');

  return day;
}

function createEmptyDay() {
  const emptyDay = document.createElement('div');
  emptyDay.classList.add('calendar-day');
  return emptyDay;
}

function loadedSavedColors(month, year) {
  const savedColors = JSON.parse(localStorage.getItem('calendarColors')) || {};

  Object.keys(savedColors).forEach(dateString => {
    const calendarDay = document.querySelector(`[data-date="${dateString}"]`);
    if (calendarDay) {
      calendarDay.style.backgroundColor = savedColors[dateString];
      calendarDay.style.color = '#fff'; // Set text color for better contrast
    }
  });
}

export function generateCalendar(month, year) {
  const calendar_days = document.querySelector('.calendar-days');
  const calendar_header_year = document.querySelector('#year');
  const days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const first_day = new Date(year, month, 1);
  const first_day_weekday = first_day.getDay();

  month_picker.innerHTML = month_names[month];
  calendar_header_year.innerHTML = year;
  calendar_days.innerHTML = '';

  for (let i = 0; i < first_day_weekday; i++) {
    calendar_days.appendChild(createEmptyDay());
  }

  for (let i = 1; i <= days_of_month[month]; i++) {
    const day = createCalendarDay(i, month, year);
    calendar_days.appendChild(day);
  }

  setTimeout(()=>{
    loadSavedColors();
  }, 100);

  // let savedColors = JSON.parse(localStorage.getItem('calendarColors')) || {};
  // for (let i = 1; i <= days_of_month[month]; i++) {
  //   const dateKey = `${year}-${month + 1}-${i}`;
    
  //   if (savedColors[dateKey]) {
  //     day.style.backgroundColor = savedColors[dateKey];
  //   }
  // }
}

export function generateMonthList() {
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

document.querySelector('#prev-year').onclick = () => {
  curr_year.value--;
  generateCalendar(curr_month.value, curr_year.value);
};

document.querySelector('#next-year').onclick = () => {
  curr_year.value++;
  generateCalendar(curr_month.value, curr_year.value);
};

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


export function PickedDate() {
  // Retrieve the array of date-color pairs from localStorage
  const storedDataPairs = JSON.parse(localStorage.getItem("dateColorPairs"));

  // Check if data exists
  if (storedDataPairs && storedDataPairs.length > 0) {
    // Loop through each pair in the stored data
    storedDataPairs.forEach(pair => {
      // Find the calendar day div that matches the date in the pair
      const calendarDay = document.querySelector(`.calendar-day-date[data-date="${pair.date}"]`);
      
      // If the matching day exists in the calendar
      if (calendarDay) {
        // Set the background color of the calendar day (or any other style you'd like)
        calendarDay.classList.add('picked');
        calendarDay.style.backgroundColor = pair.color;
        
        // Optionally, you can add the color as a class or to the span tags, etc.
        // Example: Add a class to indicate the color has been applied
        calendarDay.classList.add(`color-${pair.color}`);
        calendarDay.style.boxShadow = `0 0 5px ${pair.color}`;
      }
    });
  } else {
    console.log("No data found in localStorage.");
  }
}
