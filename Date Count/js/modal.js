// let selectedDate = null;

// export function setSelectedDate(date) {
//     selectedDate = date;
//     console.log("Selected date set to:", selectedDate);
// }

export function manageEvent() {
    console.log("Đã mở modal!");

    // //get currently active date
    // const activeDateElement = document.querySelector('.calendar-day-date.active');
    // if(activeDateElement) {
    //     selectedDate = activeDateElement.getAttribute('data-date');
    // }

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
