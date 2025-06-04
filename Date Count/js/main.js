import { toggleDarkMode } from './themeToggle.js';
import { generateCalendar, generateMonthList, setDisplayDateCallback } from './calendar.js';
import { toggleBody, backToday } from './modeToggle.js';
import { resetAll, displaySelectedDate } from './dateRange.js';
import { initializeEmailCapture, sendEmail } from './emailHandler.js';
import { setupContextMenu } from './contextMenu.js';
import { initColorPicker } from './colorPicker.js';
import { setupRepeatEventOptions } from './repeatEvent.js';
import { manageEvent } from './modal.js';

document.getElementById('manageEvent').addEventListener('click', manageEvent);


// Set callback để calendar.js gọi displaySelectedDate đúng từ dateRange.js
setDisplayDateCallback(displaySelectedDate);

// Khởi tạo lịch
const currDate = new Date();
generateCalendar(currDate.getMonth(), currDate.getFullYear());
generateMonthList();

// Khởi tạo các sự kiện
document.querySelector('.dark-mode-switch').addEventListener('click', toggleDarkMode);
document.querySelector('.header').addEventListener('click', toggleBody);
document.querySelector('.today-info i').addEventListener('click', backToday);
document.querySelector('.resetButton').addEventListener('click', resetAll);

// Khởi tạo email
const emailHandler = initializeEmailCapture('email-participants', 'warning-message');
document.getElementById("event-form").addEventListener("submit", function (e) {
  e.preventDefault();
  sendEmail(emailHandler);
});

// Khởi tạo context menu & color picker & repeat
setupContextMenu();
initColorPicker();
setupRepeatEventOptions();
