import { toggleDarkMode } from './themeToggle.js';
import { generateCalendar, generateMonthList } from './calendar.js';
import { toggleBody, backToday } from './modeToggle.js';
import { resetAll } from './dateRange.js';
import { initializeEmailCapture, sendEmail } from './emailHandler.js';

const currDate = new Date();
generateCalendar(currDate.getMonth(), currDate.getFullYear());
generateMonthList();

document.querySelector('.dark-mode-switch').addEventListener('click', toggleDarkMode);
document.querySelector('.header').addEventListener('click', toggleBody);
document.querySelector('.today-info i').addEventListener('click', backToday);
document.querySelector('.resetButton').addEventListener('click', resetAll);

const emailHandler = initializeEmailCapture('email-participants', 'warning-message');
document.getElementById("event-form").addEventListener("submit", function (e) {
  e.preventDefault();
  sendEmail(emailHandler);
});
