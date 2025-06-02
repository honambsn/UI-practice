function toggleDarkMode() {
    const body = document.body;
    const icon = document.querySelector('.toggle i');
    const darkModeSpan = document.querySelector('.calendar-footer .toggle span');


    // First, add the fade-out effect
    icon.classList.add('fade-out');
    darkModeSpan.classList.add('fade-in');

    // Wait for the fade-out animation to complete (0.3s as per our CSS transition)
    setTimeout(() => {
        // Toggle between dark and light mode by switching classes
        body.classList.toggle('dark');
        body.classList.toggle('light');

        // Update the icon
        if (body.classList.contains('light')) {
            
            darkModeSpan.textContent = "Dark Mode";
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            darkModeSpan.textContent = "Light Mode";
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }

        // Remove the fade-out class after the icon has been switched, and allow it to fade back in
        icon.classList.remove('fade-out');
        darkModeSpan.classList.remove('fade-in');
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
    day.classList.add('calendar-day-date');
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



function toggleBody() {
    const body = document.body;
    const header = document.querySelector('.header');
    const h1 = document.querySelector('.toggle-todo');

    if (h1.classList.contains('disabled')) {
        h1.classList.add('vibrate');

        setTimeout(() => {
            h1.classList.remove('vibrate');
            h1.textContent = "Đang chuyển đổi...";
        }, 500);
        return; // If already disable, do nothing
        
    }

    // Disable the toggle to prevent multiple clicks
    h1.classList.add('disabled');

    // Fade out the current text
    h1.classList.add('fade');

    
    // Wait for the fade-out animation to complete (0.3s as per our CSS transition)
    setTimeout(() => {
        // Toggle between dark and light mode by switching classes
        body.classList.toggle('date-count');
        body.classList.toggle('count-down');

        // Update the icon
        if (body.classList.contains('date-count')) {
            h1.textContent = "Date Count";
            resetAll(); // Reset all dates when switching to Date Count mode
        } else {
            h1.textContent = "Count Down";
            changeToCountDown();
        }

        
        // Fade in the new text
        h1.classList.remove('fade');
        h1.classList.add('enable');

        setTimeout(function() {
            // Re-enable the toggle after the fade-in
            h1.classList.remove('disabled');
            h1.classList.remove('enable');
        }
        , 1500); // Delay should match the fade-in time (0.3s)
    },300); // 300ms to match the CSS transition time

    if (body.classList.contains('date-count')) {
        alert('Date Count mode is enabled!');
    }
    else {
        alert('Count Down mode is enabled!');
    }
}
document.querySelector('.header').addEventListener('click', toggleBody);


function changeToCountDown() {
    const body = document.body;

    // Get today's date
    const today = new Date();

    // Format the date as "Ngày dd/mm/yyyy" using toLocaleDateString
    const formattedDate = today.toLocaleDateString('vi-VN'); // 'vi-VN' for Vietnamese locale

    // Display it in the span with class "date-1"
    document.querySelector('.date-1').textContent = `Hôm nay: ${formattedDate}`;

}

function backToday(){
    const body = document.body;
    const icon = document.querySelector('.today-info i');

    icon.classList.add('active');
    console.log("Đã quay về hôm nay!");
    icon.classList.remove('active');

    const today = new Date();
    const today_month = today.getMonth();
    const today_year = today.getFullYear();

    generateCalendar(today_month, today_year);
}

document.querySelector('.today-info i').addEventListener('click', backToday);

 
const contextMenu = document.getElementById('context-menu');

// Hàm xử lý hành vi hover với timeout cho từng phần tử
function handleHoverTimeout(element, delay) {
    let hoverTimeout;

    element.addEventListener('mouseenter', (e) => {
        // Bắt đầu đếm thời gian khi chuột di vào
        hoverTimeout = setTimeout(() => {
            element.classList.add('active');  // Thực hiện hành động sau khi hết thời gian
            alert("Bạn đã di chuột trong 1 giây!");
            console.log("Bạn đã di chuột trong 1 giây!");

            // Lấy vị trí chuột
            const mouseX = e.pageX;
            const mouseY = e.pageY;

            // Đặt vị trí cho context menu
            contextMenu.style.left = `${mouseX}px`;
            contextMenu.style.top = `${mouseY}px`;

            // Hiển thị context menu
            contextMenu.style.display = 'block';
        }, delay);
    });

    element.addEventListener('mouseleave', () => {
        // Hủy bỏ bộ đếm thời gian nếu chuột rời đi trước khi hết thời gian
        clearTimeout(hoverTimeout);
    });

    contextMenu.addEventListener('mouseleave', () => {
        // Ẩn context menu khi chuột rời khỏi context menu
        contextMenu.style.display = 'none';
        element.classList.remove('active');
    });

    contextMenu.addEventListener('mouseenter', () => {
        // Nếu chuột vào context menu, không ẩn menu
        clearTimeout(hoverTimeout);
    });
}

// Chọn tất cả các phần tử .calendar-day-date
const hoverBoxes = document.querySelectorAll('.calendar-day-date');

// Lặp qua tất cả các phần tử và gán hành động hover cho từng phần tử
hoverBoxes.forEach(hoverBox => {
    handleHoverTimeout(hoverBox, 1000); // Thời gian delay 1 giây
});

// Đóng context menu nếu nhấp ở nơi khác ngoài menu
document.addEventListener('click', (e) => {
    if (!contextMenu.contains(e.target) && !Array.from(hoverBoxes).includes(e.target)) {
        contextMenu.style.display = 'none';
        hoverBoxes.forEach(hoverBox => hoverBox.classList.remove('active'));
    }
});

// // Get the context menu element
// //const contextMenu = document.getElementById('context-menu');

// // Listen for right-click event on the body
// document.body.addEventListener('contextmenu', function(e) {
//     e.preventDefault();  // Prevent the default right-click menu

//     // Get mouse position
//     const mouseX = e.pageX;
//     const mouseY = e.pageY;

//     // Set the position of the custom context menu
//     contextMenu.style.left = `${mouseX}px`;
//     contextMenu.style.top = `${mouseY}px`;

//     // Show the context menu
//     contextMenu.style.display = 'block';
// });

// // Close the context menu when clicking anywhere else on the page
// document.addEventListener('click', function(e) {
//     if (e.button !== 2) {  // If it's not a right-click
//         contextMenu.style.display = 'none';
//     }
// });


// // Get the context menu element
// const contextMenu = document.getElementById('context-menu');

// // Get the elements to attach the context menu to
// const rightClickText = document.getElementById('right-click-text');
// const rightClickImage = document.getElementById('right-click-image');

// // Function to handle right-click
// function showContextMenu(e) {
//     e.preventDefault();  // Prevent the default right-click menu

//     // Get mouse position
//     const mouseX = e.pageX;
//     const mouseY = e.pageY;

//     // Set the position of the custom context menu
//     contextMenu.style.left = `${mouseX}px`;
//     contextMenu.style.top = `${mouseY}px`;

//     // Show the context menu
//     contextMenu.style.display = 'block';
// }

// // Add event listener for right-click on specific elements
// rightClickText.addEventListener('contextmenu', showContextMenu);
// rightClickImage.addEventListener('contextmenu', showContextMenu);

// // Close the context menu when clicking anywhere else on the page
// document.addEventListener('click', function(e) {
//     if (e.button !== 2) {  // If it's not a right-click
//         contextMenu.style.display = 'none';
//     }
// });

// Hàm để mở và đóng modal
function manageEvent() {
    // Lấy phần tử modal và các phần tử cần thiết

    console.log("Đã mở modal!");

    var modal = document.getElementById("modal");
    var closeBtn = document.getElementById("closeBtn");

    // Mở modal khi nhấn vào phần tử li
    modal.style.display = "flex";

    setTimeout(() => {
        modal.classList.add('show');
    }, 10);

    // Đóng modal khi nhấn vào nút đóng
    closeBtn.onclick = function() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = "none";    
        }, 300);
    }

    // Đóng modal khi nhấn ra ngoài modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = "none";    
            }, 300);
        }
    }
}

// ----------------------------------------

// Get the necessary DOM elements
const colorToggleBtn = document.getElementById("toggle-colors");
const colorOptions = document.querySelector(".hidden-colors");
const defaultColorOption = document.querySelector(".color-default");

// Toggle the visibility of the color options when the button is clicked
colorToggleBtn.addEventListener("click", function() {
    // Toggle visibility of the hidden color options
    if (colorOptions.style.display === "none" || colorOptions.style.display === "") {
        colorOptions.style.display = "block";
    } else {
        colorOptions.style.display = "none";
    }
});

// Change the selected color when a color option is clicked
document.addEventListener('DOMContentLoaded', function() {
    const colorOptions = document.querySelector('.color-options');
    const hiddenColors = document.querySelector('.hidden-colors');
    const colorDefault = document.querySelector('.color-default');  // Default color option

    // Toggle display of hidden color options when clicking on color options or caret icon
    colorOptions.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent event from bubbling up
        hiddenColors.style.display = hiddenColors.style.display === 'none' || hiddenColors.style.display === '' ? 'block' : 'none';
    });

    // Close the hidden color options if clicking outside the color options
    document.addEventListener('click', function(event) {
        if (!colorOptions.contains(event.target)) {
            hiddenColors.style.display = 'none';
        }
    });

    // Hide the hidden colors when the mouse leaves the color options
    colorOptions.addEventListener('mouseleave', function() {
        hiddenColors.style.display = 'none';
    });

    // Handle the color selection event
    const colorChoices = document.querySelectorAll('.hidden-colors .color-option');
    colorChoices.forEach(function(color) {
        color.addEventListener('click', function(event) {
            // Get the color value from the data-color attribute
            const selectedColor = color.getAttribute('data-color');

            // Update the background color of the color options

            colorOptions.style.backgroundColor = selectedColor;


            // Update the background color of the color options
            colorDefault.style.backgroundColor = selectedColor;

            // Highlight the selected color by adding 'selected' class
            document.querySelectorAll('.color-option').forEach(function (item){
                item.classList.remove('selected');
            });
            
            //for paddding color
            colorChoices.forEach(function(item) {

                item.classList.remove('selected');

            });

            // Add 'selected' class to the clicked color option
            color.classList.add('selected');

            if (colorOptions.classList.contains('selected'))
                // Close the hidden color options after a color is selected            
                hiddenColors.style.display = 'none';
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const toggleElements = [
        document.querySelector(".repeat-option.selected"),
        document.getElementById("event-repeat-select")
    ];
    const hiddenEvent = document.querySelector(".hidden-event");

    toggleElements.forEach(el => {
        el.addEventListener("click", function () {
            hiddenEvent.style.display = (hiddenEvent.style.display === "block") ? "none" : "block";
        });
    });

    // Optional: Hide when clicking outside
    document.addEventListener("click", function (e) {
        if (!e.target.closest('.repeat-options')) {
            hiddenEvent.style.display = "none";
        }
    });
});


// --------------------------email capture-------------------------


function initializeEmailCapture(textareaId, warningId) {
    const textarea = document.getElementById(textareaId);
    const warning = document.getElementById(warningId);
    const popup = document.querySelector('.email-popup');
    const modal = document.querySelector('.email-introduce-popup');
    const closeBtn = document.querySelector('.close-email-popup');
    const emailList = document.getElementById('email-list');
    let capturedEmails = [];
    let hasShownPopup = false;


    // Helper to validate email format
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    }

    function updateEmailList() {
        emailList.innerHTML = ''; // Clear the list
        capturedEmails.forEach(email => {
            const listItem = document.createElement('li');
            listItem.classList.add('email-item');
            listItem.textContent = email;
            emailList.appendChild(listItem);
        });
    }

    // Keyup event listener
    textarea.addEventListener('keyup', function (e) {
        const input = textarea.value;

        // When comma, space, or Enter is typed
        // if (e.key === ',' || e.key === ' ' || e.key === 'Enter') {

        // old way to prevent showing popup
        // if (!hasShownPopup && input.length > 0) {
        //     modal.style.display = 'flex';
        //     setTimeout(() => {
        //         modal.classList.add('show');
        //     }, 10);
        //     hasShownPopup = true; // Prevent showing the popup again
        // }

        // new way to show popup by cookie 
        // if (!getCookie('popupShown') && input.length > 0) {
        //     modal.style.display = 'flex';
        //     setTimeout(() => {
        //         modal.classList.add('show');
        //     }, 10);

        //     setCookie('popupShown', 'true', 30)
        // }

        // prevent showing popup by sessionStorage
        if (!sessionStorage.getItem('popupShown') && input.length > 0) {
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            sessionStorage.setItem('popupShown', 'true'); // Prevent showing the popup again
        }

        if (e.key === 'Enter') {
            const parts = input.split(/[\s,]+/).filter(Boolean);
            const lastEmail = parts[parts.length - 1];
            
            if (isValidEmail(lastEmail)) {
                if (!capturedEmails.includes(lastEmail)) {
                    capturedEmails.push(lastEmail);
                    updateEmailList(); // Update the displayed email list
                    console.log('Captured Emails:', capturedEmails);
                }
                warning.style.display = 'none';
                textarea.required = false; // Remove required attribute if valid email is entered
            } else if (lastEmail) {
                warning.style.display = 'block';
            }

            textarea.value = ''; // Clear input after processing
        }

        if (capturedEmails.length > 0 && popup) {
            popup.style.display = 'block'; // Show the popup if there are captured emails
        }   
        else if (popup) {
            popup.style.display = 'none'; // Hide the popup if no emails
        }
    });

    closeBtn.addEventListener('click', function () {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });

    // Return access to capturedEmails if needed
    return {
        getEmails: () => capturedEmails,
        clearEmails: () => { capturedEmails = []; 
            updateEmailList(); // Clear the displayed email list
        },
    };
}

//usage
document.addEventListener('DOMContentLoaded', function () {
    const emailHandler = initializeEmailCapture('email-participants', 'warning-message');
    console.log(emailHandler.getEmails());

    document.getElementById("event-form").addEventListener("submit", function (e) {
        e.preventDefault(); // Ngăn trang reload
        console.log("Đã gửi form!");
        console.log("Captured Emails before sending:", emailHandler.getEmails());
        // Gửi email bằng EmailJS
        sendEmail(emailHandler);

        // // Clear captured emails after sending
        // emailHandler.clearEmails();
        // console.log("Captured Emails after sending:", emailHandler.getEmails());

        // // Reset the textarea
        // document.getElementById('email-participants').value = '';
        
    });
});


// --------------------------email js-----------------------
// Init with your public key
emailjs.init('WOi1QcnE--DgnuoUI');

// function to send email using EmailJS
function sendEmail(emailHandler) {
    console.log("Đã gửi email!");
    
    const capturedEmails = emailHandler.getEmails(); 
    console.log(capturedEmails);

    //const name = document.getElementById('user_name').value;
    //const email = document.getElementById('user_email').value;

    const title = document.getElementById('event-title').value;
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    const description = document.getElementById('event-description').value;

    // Validate inputs
    if (!title || !date || !time || !description) {
        alert('Vui lòng điền đầy đủ thông tin.');
        return;
    }

    const templateParams = {
        title: title,
        name: 'Date Count App',           // From Name
        email: 'youremail@example.com',  // Matches {{email}} in your template  // From Email (bạn có thể để mặc định hoặc email của bạn)
        date: date,
        time: time,
        description: description,
        to_email: capturedEmails.join(', ')  // Email người nhận
    };

    emailjs.send('service_mpqab0f', 'template_n9v5n8l', templateParams)
        .then(function (response) {
            console.log('✅ Gửi thành công:', response.status, response.text);
            alert('Đã gửi thành công!');
        })
        .catch(function (error) {
            console.error('❌ Gửi thất bại:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
        });
}


// document.addEventListener("DOMContentLoaded", function () {
//     const form = document.getElementById("event-form");

//     form.addEventListener("submit", function (e) {
//         e.preventDefault(); // Ngăn trang reload

//         // Gửi email bằng EmailJS
//         sendEmail();

//         // Bạn có thể thêm xử lý form ở đây nếu muốn
//     });
// });


// ------------------------------cookieStore
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
    console.log(`Cookie set: ${name}=${value}, expires in ${days} days`);
    console.log("Current cookies:", document.cookie);
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) {
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        // while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        //better to use trim() for whitespace
        // if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}


// Thêm thư viện CryptoJS (có thể tải qua CDN hoặc npm)
// generateSecretKey(); // Gọi hàm để tạo khóa bí mật
function generateSecretKey(length = 32) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?';
    let secretKey = '';
    
    const cryptoObj = window.crypto || window.msCrypto; // For secure random generation

    if (!cryptoObj) {
        throw new Error("No secure crypto object available");
    }

    const array = new Uint8Array(length);
    cryptoObj.getRandomValues(array);

    for (let i = 0; i < length; i++) {
        secretKey += charset[array[i] % charset.length];
    }

    return secretKey;
}


// Mã hóa cookie với AES
function setEncryptedCookie(name, value, days) {
    const encryptedValue = CryptoJS.AES.encrypt(value, 'your-secret-key').toString();
    setCookie(name, encryptedValue, days);
}

// Giải mã cookie với AES
function getEncryptedCookie(name) {
    const encryptedValue = getCookie(name);
    if (encryptedValue) {
        const bytes = CryptoJS.AES.decrypt(encryptedValue, 'your-secret-key');
        return bytes.toString(CryptoJS.enc.Utf8); // Giải mã trở lại giá trị gốc
    }
    return null;
}
