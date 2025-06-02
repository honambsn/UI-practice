export function setupRepeatEventOptions() {
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

        document.addEventListener("click", function (e) {
            if (!e.target.closest('.repeat-options')) {
                hiddenEvent.style.display = "none";
            }
        });
    });
}
