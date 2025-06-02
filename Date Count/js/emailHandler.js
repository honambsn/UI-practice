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

export function sendEmail(emailHandler) {
    const capturedEmails = emailHandler.getEmails();
    const title = document.getElementById('event-title').value;
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    const description = document.getElementById('event-description').value;

    if (!title || !date || !time || !description) {
        alert('Vui lòng điền đầy đủ thông tin.');
        return;
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

    emailjs.send('service_mpqab0f', 'template_n9v5n8l', templateParams)
        .then(response => {
            console.log('✅ Gửi thành công:', response.status, response.text);
            alert('Đã gửi thành công!');
        })
        .catch(error => {
            console.error('❌ Gửi thất bại:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
        });
}

emailjs.init('WOi1QcnE--DgnuoUI');
