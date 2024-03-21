let startTime, endTime;
let imageSize = "";
let image  = new Image()
let bitSpeed = document.getElementById('bits'),
    kbSpeed = document.getElementById('kbs'),
    mbSpeed = document.getElementById('mbs'),
    info = document.getElementById('info');

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 1;
let testCompleted = 0;


let imageApi  = "https://source.unsplash.com/random";

image.onload = async function() {
    endTime = new Date().getTime();

    //get img size
    await fetch(imageApi).then((response)=>{
        imageSize = response.headers.get('content-length');
        calculateSpeed();
    });
};

//cal speed

function calculateSpeed() {
    //time taken
    let timeDuration = (endTime-startTime)/1000;
    //total bits
    let loadedBits = imageSize *  8;
    let speedInBts = loadedBits / timeDuration;
    let speedInKbs  = speedInBts / 1024;
    let speedInMbs  = speedInKbs / 1024;

    totalBitSpeed += speedInBts;
    totalKbSpeed += speedInKbs;
    totalMbSpeed += speedInMbs;

    testCompleted++;

    //get 5 packages as 5 tests 
    if (testCompleted === numTests) { 
        let averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
        let averageSpeedInKbs = (totalKbSpeed / numTests).toFixed(2);
        let averageSpeedInMbs = (totalMbSpeed / numTests).toFixed(2);

        bitSpeed.innerHTML += `${averageSpeedInBps}`;
        kbSpeed.innerHTML += `${averageSpeedInKbs}`;
        mbSpeed.innerHTML += `${averageSpeedInMbs}`;
        info.innerHTML = "Test Completed";
    } else {
        startTime = new Date().getTime();
        image.src = imageApi;
    }
}


const init = async() => {
    info.innerHTML =  "Testing...";
    startTime = new Date().getTime();
    image.src = imageApi;
};

window.onload = () => {
    for (let  i = 0; i< numTests; i++) {
        init();
    }
};
