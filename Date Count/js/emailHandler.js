export function initializeEmailCapture(textareaId, warningId) {
    const textarea = document.getElementById(textareaId);
    const warning = document.getElementById(warningId);
    const popup = document.querySelector('.email-popup');
    const modal = document.querySelector('.email-introduce-popup');
    const closeBtn = document.querySelector('.close-email-popup');
    const emailList = document.getElementById('email-list');
    let capturedEmails = [];

    textarea.addEventListener('keyup', function (e) {
        const input = textarea.value;

        if (!sessionStorage.getItem('popupShown') && input.length > 0) {
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            sessionStorage.setItem('popupShown', 'true');
        }

        if (e.key === 'Enter') {
            const parts = input.split(/\s|,/).filter(Boolean);
            const lastEmail = parts[parts.length - 1];

            if (isValidEmail(lastEmail)) {
                if (!capturedEmails.includes(lastEmail)) {
                    capturedEmails.push(lastEmail);
                    updateEmailList();
                    console.log('Captured Emails:', capturedEmails);
                }
                warning.style.display = 'none';
                textarea.required = false;
            } else if (lastEmail) {
                warning.style.display = 'block';
            }

            textarea.value = '';
        }

        if (capturedEmails.length > 0 && popup) {
            popup.style.display = 'block';
        } else if (popup) {
            popup.style.display = 'none';
        }
    });

    closeBtn.addEventListener('click', function () {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });

    function updateEmailList() {
        emailList.innerHTML = '';
        capturedEmails.forEach(email => {
            const listItem = document.createElement('li');
            listItem.classList.add('email-item');
            listItem.textContent = email;
            emailList.appendChild(listItem);
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    }

    return {
        getEmails: () => capturedEmails,
        clearEmails: () => {
            capturedEmails = [];
            updateEmailList();
        },
    };
}


//
function getSelectedColor() {
    const selectedColorElement = document.querySelector('.color-option.selected');
    return selectedColorElement ? selectedColorElement.getAttribute('date-color') : '#1a73e8';
}

function applyColorToDate(dateString, color) {
    //const calendarDay = document.querySelector(`.calendar-day-date[data-date="${dateString}"]`);
    const calendarDay = document.querySelector(`[data-date="${dateString}"]`);


    if (calendarDay) {
        calendarDay.style.backgroundColor = color;
        calendarDay.style.color = '#fff'; // Đặt màu chữ cho phù hợp với nền
    
        let savedColors = JSON.parse(localStorage.getItem('calendarColors')) || {};
        savedColors[dateString] = color;
        localStorage.setItem('calendarColors', JSON.stringify(savedColors));

        console.log(`Đã áp dụng màu ${color} cho ngày ${dateString}`);
    }
    else{
        console.warn(`Không tìm thấy ngày ${dateString} trong lịch.`);
    }
}

export function loadSavedColors() {
    const savedColors = JSON.parse(localStorage.getItem('calendarColors')) || {};

    Object.keys(savedColors).forEach(dateString => {
        const calendarDay = document.querySelector(`[data-date="${dateString}"]`);
        if (calendarDay) {
            calendarDay.style.backgroundColor = savedColors[dateString];
            calendarDay.style.color = '#fff'; // Đặt màu chữ cho phù hợp với nền
        }
    });
}

///

export function sendEmail(emailHandler) {
    const capturedEmails = emailHandler.getEmails();
    const title = document.getElementById('event-title').value;
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    const description = document.getElementById('event-description').value;

    const selectedColor = getSelectedColor();

    if (!title || !date || !time || !description) {
        console.warn('Vui lòng điền đầy đủ thông tin sự kiện.');
        return;
    }
    
    if (capturedEmails.length === 0) {
        console.warn('Không có email nào được cung cấp.');
        return;
    }

    const eventDate = new Date(date);
    const formattedDate = `${eventDate.getDate()}/${eventDate.getMonth() + 1}/${eventDate.getFullYear()}`;

    applyColorToDate(formattedDate, selectedColor)


    let selectedColorPicker = window.appState?.tempSelectedColor;
    if (!selectedColorPicker) {
        console.log('Color picker not be selected');
        window.appState.tempSelectedColor = "#1a73e8";
        selectedColorPicker = window.appState.tempSelectedColor;
        console.log('Using default color:', selectedColorPicker);
        //return;
    }
    else{
        //window.appState.tempSelectedColor = "#1a73e8";
        selectedColorPicker = window.appState.tempSelectedColor;
        console.log('Selected color from picker:', selectedColorPicker);
        //return;
    }

    const templateParams = {
        title,
        name: 'Date Count App',
        email: 'youremail@example.com',
        date,
        time,
        description,
        to_email: capturedEmails.join(', ')
    };

    emailjs.send('service_mpqab0f', 'template_bddd5w3', templateParams)
        .then(response => {
               if (selectedColorPicker) {
                saveColor(selectedColorPicker);
                alert('Màu đã được lưu: ' + selectedColorPicker);
               }

            console.log('✅ Gửi thành công:', response.status, response.text);
            alert('Đã gửi thành công!');

            //set color picker to actived date
            console.log("Đã gửi thành công! Màu đã được áp dụng cho ngày đã chọn.");
            const activedElement = document.querySelector('.calendar-day-date.actived');
            const dateSelected = activedElement ? activedElement.getAttribute('data-date') : null;

            if (activedElement) {
                  console.log("activeElements:", activedElement.getAttribute('data-date'));
            }
            else{
                console.warn("Không tìm thấy ngày hiện tại để áp dụng màu sắc.");
            }
            if (dateSelected) {
                console.log("Ngày đã chọn:", dateSelected);
            }
            else{
                console.warn("Không tìm thấy ngày đã chọn để áp dụng màu sắc.");
            }

            // save pair of color and date to localStorage

            const newPair = {
                date: dateSelected,
                color: selectedColorPicker
            };
            console.log("Cặp ngày-màu mới:", newPair);

            //// Check if "dateColorPairs" exists in localStorage

            let storedDataPairs = JSON.parse(localStorage.getItem("dateColorPairs"));

            if (!storedDataPairs) {
                console.log("Không tìm thấy 'dateColorPairs' trong localStorage, tạo mới...");
                storedDataPairs = [];
            }

            storedDataPairs.push(newPair);

            localStorage.setItem("dateColorPairs", JSON.stringify(storedDataPairs));
            console.log("Đã lưu cặp ngày-màu vào localStorage:", localStorage.getItem("dateColorPairs"));
            

            if (localStorage.getItem('dataColorPair')) {
                console.log('dataColorPair đã được lưu vào localStorage:', localStorage.getItem('dataColorPair'));
            }
            else{
                console.warn('Không thể lưu dataColorPair vào localStorage.');
            }

                                        // new event as a ribbon
            // if (activedElement) {
            //     activedElement.classList.remove('actived');
            //     console.log('Đã bỏ chọn ngày hiện tại actived after submited.');
            // }
            // else{
            //     console.warn('Không tìm thấy ngày hiện tại để bỏ chọn after submited.');
            // }
            // const calendarDayHeight = document.querySelector('.calendar-day-date').offsetHeight;
            // console.log('Chiều cao của ngày trong lịch:', calendarDayHeight);
            // const square = activedElement || document.querySelector('.calendar-day-date.actived');
            // if (!square) {
            //     console.warn('Không tìm thấy ngày để thêm ribbon.');
            //     return;
            // }
            // const newRibbon = document.createElement('div');
            // console.log('Tạo ribbon mới với màu:', selectedColorPicker);
            // newRibbon.className = 'ribbon';
            
            // newRibbon.style.backgroundColor = selectedColorPicker;
            // newRibbon.style.color = '#fff'; // Đặt màu chữ cho phù hợp với nền
            // newRibbon.textContent = 'Đã chọn';
            // newRibbon.style.top = `${(20  / 100) * calendarDayHeight}px`; // Đặt vị trí của ribbon
            // console.log('Đã tạo ribbon mới:', newRibbon);
            // square.appendChild(newRibbon);


            //return;
            //close modal
            const modal = document.getElementById("modal");
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = "none";
            }, 300);

            ///reset form
            document.getElementById("event-form").reset();
            emailHandler.clearEmails();

            
            

            location.reload(); // Reload the page to reflect changes in the calendar

            // //reset color selection to default
            // document.querySelectorAll('.color-option').forEach(option => {
            //     option.classList.remove('selected');
            // });
            // document.querySelector('.color-option.default').classList.add('selected');
            // //document.querySelector('.color-default').classList.add('selected');
        })
        .catch(error => {
            console.error('❌ Gửi thất bại:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
        });
}

emailjs.init('AeeUF306QbzsJfvWp');



function saveColor(color) {
    localStorage.setItem('savedColor', color);
}