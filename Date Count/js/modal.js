// let selectedDate = null;

// export function setSelectedDate(date) {
//     selectedDate = date;
//     console.log("Selected date set to:", selectedDate);
// }

export function manageEvent() {
    console.log("Đã mở modal!");

    window.appState.tempSelectedColor = null;
    localStorage.removeItem('savedColor');
    // //get currently active date
    // const activeDateElement = document.querySelector('.calendar-day-date.active');
    // if(activeDateElement) {
    //     selectedDate = activeDateElement.getAttribute('data-date');
    // }
    const activeElements = document.querySelectorAll('.calendar-day-date.active');
    if (activeElements.length === 0) {
        console.warn("Không có ngày nào được chọn.");
        return;
    } else {
        activeElements.forEach(element => {
            element.classList.add('actived');
        });
    }

    console.log(activeElements);

    const modal = document.getElementById("modal");
    const closeBtn = document.getElementById("closeBtn");

    modal.style.display = "flex";
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);

    closeBtn.onclick = function () {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = "none";
            }, 300);
        }
    };
}

// export function getSelectedDate() {
//     return selectedDate;
// }
