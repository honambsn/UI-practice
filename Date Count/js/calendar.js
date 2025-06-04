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

  return day;
}

function createEmptyDay() {
  const emptyDay = document.createElement('div');
  emptyDay.classList.add('calendar-day');
  return emptyDay;
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
