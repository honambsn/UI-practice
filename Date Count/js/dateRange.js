let firstDate = null;
let secondDate = null;
let intervalId = null;

export function displaySelectedDate(selectedDate) {
    console.log("Ngày đã chọn:", selectedDate.toLocaleDateString());

    if (firstDate === null) {
        firstDate = selectedDate;
        document.querySelector('.date-1').textContent = `Ngày 1: ${selectedDate.toLocaleDateString()}`;
        alert(`Ngày đã chọn (Lần 1): ${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`);
    } else if (secondDate === null) {
        secondDate = selectedDate;
        document.querySelector('.date-2').textContent = `Ngày 2: ${selectedDate.toLocaleDateString()}`;
        alert(`Ngày đã chọn (Lần 2): ${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`);
        startDateRangeTimer();
    }
}

export function startDateRangeTimer() {
    if (isToday(firstDate) || isToday(secondDate)) {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(calculateDateRange, 1000);
    } else {
        calculateDateRange();
    }
}

function calculateDateRange() {
    if (firstDate && secondDate) {
        const now = new Date();
        let diffInMilliseconds = (isToday(firstDate) || isToday(secondDate)) ? secondDate - now : secondDate - firstDate;

        const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
        const remainingHours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

        document.querySelector('.date-range').textContent = `Khoảng cách: ${diffInDays} ngày, ${remainingHours} giờ, ${remainingMinutes} phút, ${remainingSeconds} giây`;

        if (diffInMilliseconds <= 0) {
            clearInterval(intervalId);
            console.log("Khoảng cách đã hết!");
            document.querySelector('.date-range').textContent = "Khoảng cách đã hết!";
        }

        console.log(`Khoảng cách: ${diffInDays} ngày, ${remainingHours} giờ, ${remainingMinutes} phút, ${remainingSeconds} giây`);
    }
}

export function resetAll() {
    firstDate = null;
    secondDate = null;

    document.querySelector('.date-1').textContent = 'Ngày 1: ';
    document.querySelector('.date-2').textContent = 'Ngày 2: ';
    document.querySelector('.date-range').textContent = 'Date range: ';
    alert("Đã xóa tất cả các ngày và khoảng cách.");
    console.log("Đã xóa tất cả các ngày và khoảng cách.");
    displaySelectedDate(new Date()); // Reset to today's date
}

function isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
}

window.displaySelectedDate = displaySelectedDate;
