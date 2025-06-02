export function manageEvent() {
    console.log("Đã mở modal!");

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
