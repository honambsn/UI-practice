window.onload = function() {
    var counter = 0;
    setInterval(function() {
        counter++;
        var hours = Math.floor(counter / 3600);
        var minutes = Math.floor((counter % 3600) / 60);
        var seconds = counter % 60;
        document.getElementById("time-counter").innerText = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
    }, 1000);

    var viewCount = localStorage.getItem('view-counter');
    if (!viewCount) {
        viewCount = 0;
    }
    document.getElementById('view-counter').innerText = viewCount;

};

function formatTime(time) {
    return time < 10 ? "0" + time : time;
}


window.onbeforeunload = function() {
    var viewCount = parseInt(localStorage.getItem('view-counter') || 0);
    localStorage.setItem('view-counter', viewCount + 1);
};
