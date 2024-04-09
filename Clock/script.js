function clockRunner(){
    const clockDisplay = document.getElementById('clock-display');
    const deg = 6;
    const hour = document.querySelector('.hour');
    const min = document.querySelector('.min');
    const sec = document.querySelector('.sec');
    const updateTime = () => {
        const day = new Date();
        const hourValue = day.getHours();
        const minuteValue = day.getMinutes();
        const secondValue = day.getSeconds();
        const p = (hourValue >= 12 ) ? "PM" : "AM";
        
        const displayHour = (hourValue > 12) ? hourValue - 12 : hourValue;
        
        const formattedHour = displayHour.toString().padStart(2,"0");
        const formattedMinute = minuteValue.toString().padStart(2,"0");
        const formattedSecond = secondValue.toString().padStart(2,"0");

        clockDisplay.textContent =`${formattedHour}:${formattedMinute}:${formattedSecond} ${p}`;

        const hh = hourValue * 30 + minuteValue / 2;
        const mm = minuteValue * deg;
        const ss = secondValue * deg;
        
        hour.style.transform = `rotateZ(${hh}deg)`;
        min.style.transform = `rotateZ(${mm}deg)`
        sec.style.transform = `rotateZ(${ss}deg)`
    };
    updateTime();
    setInterval(updateTime, 1000);
}

clockRunner();