import { toggleDarkMode } from './themeToggle.js';
import { generateCalendar, generateMonthList, PickedDate, setDisplayDateCallback } from './calendar.js';
import { toggleBody, backToday } from './modeToggle.js';
import { resetAll, displaySelectedDate } from './dateRange.js';
import { initializeEmailCapture, loadSavedColors, sendEmail } from './emailHandler.js';
import { setupContextMenu } from './contextMenu.js';
import { initColorPicker } from './colorPicker.js';
import { setupRepeatEventOptions } from './repeatEvent.js';
import { manageEvent } from './modal.js';
import { resetAllSelectedDate } from './calendar.js';

document.getElementById('manageEvent').addEventListener('click', manageEvent);

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i); // Get the key at index i
  const value = localStorage.getItem(key); // Get the value associated with that key
  console.log(`${key}: ${value}`);
}

const storedDataPairs = JSON.parse(localStorage.getItem("dateColorPairs"));

// Check if data exists
if (storedDataPairs) {
  console.log(storedDataPairs);  // This will log the entire array of pairs
} else {
  console.log("No pairs found in localStorage.");
}

// Set callback để calendar.js gọi displaySelectedDate đúng từ dateRange.js
setDisplayDateCallback(displaySelectedDate);

// Khởi tạo lịch
const currDate = new Date();
generateCalendar(currDate.getMonth(), currDate.getFullYear());
generateMonthList();
PickedDate();

setTimeout(() => {
  loadSavedColors();
}, 200);

// Khởi tạo các sự kiện
document.querySelector('.dark-mode-switch').addEventListener('click', toggleDarkMode);
document.querySelector('.header').addEventListener('click', toggleBody);
document.querySelector('.today-info i').addEventListener('click', backToday);
document.querySelector('.resetButton').addEventListener('click', resetAll);
document.querySelector('.resetButton.date').addEventListener('click', resetAllSelectedDate);

// Khởi tạo email
const emailHandler = initializeEmailCapture('email-participants', 'warning-message');
document.getElementById("event-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // //get selected date color
  // const selectedColor = document.querySelector('.color-option.selected')?.getAttribute('date-color');
  // const selectedDate = getSelectedDate();

  // if (selectedColor && selectedDate){
  //   // save to localStorage
  //   let savedColors = JSON.parse(localStorage.getItem('calendarColors')) || {};
  //   savedColors[selectedDate] = selectedColor;
  //   localStorage.setItem('calendarColors', JSON.stringify(savedColors));

  //   const dateElement = document.querySelector(`.calendar-day-date[data-date="${selectedDate}"]`);

  //   if (dateElement) {
  //     dateElement.style.backgroundColor = selectedColor;
  //   }
  // }
  sendEmail(emailHandler);
  emailHandler.clearEmails();

  //document.getElementById("event-form").reset();
  //emailHandler.clearEmails();
  //document.querySelectorAll('.calendar-day-date.curr-date.actived').classList.remove('actived');
});

// Khởi tạo context menu & color picker & repeat
setupContextMenu();
initColorPicker();
setupRepeatEventOptions();

