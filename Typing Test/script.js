const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";
const quoteSection = document.getElementById('quote');
const userInput = document.getElementById('quote-input');

let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;
let isTestRunning = false; // Prevent multiple test starts

const renderNewQuote = async () => {
    try {
        // Fetch the quote from the API
        const response = await fetch(quoteApiUrl);

        // Log the status code of the response for debugging
        console.log('Response status:', response.status);
        
        // If response is not ok, throw an error
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        // Parse the response as JSON
        let data = await response.json();
        
        // Log the received data for debugging
        console.log('Received quote data:', data);
        
        quote = data.content;

        // Clear the previous quote content
        quoteSection.innerHTML = '';

        // Render the new quote with span elements
        let arr = quote.split('').map((value) => {
            return "<span class='quote-chars'>" + value + "</span>";
        });

        // Join and insert the new quote into the section
        quoteSection.innerHTML = arr.join("");  

    } catch (error) {
        // Log the error to the console and show a user-friendly message
        console.error('Error fetching the quote:', error);
        quoteSection.innerHTML = "Sorry, we couldn't fetch a quote. Please try again.";
    }
};

// Input event listener to check for correct and incorrect characters
userInput.addEventListener("input", () => {
    if (!isTestRunning) return;

    let quoteChars = document.querySelectorAll(".quote-chars");
    quoteChars = Array.from(quoteChars);
    let userInputChars = userInput.value.split('');

    quoteChars.forEach((char, index) => {
        if (char.innerText === userInputChars[index]) {
            char.classList.add('success');
            char.classList.remove('fail');
        } else if (userInputChars[index] === undefined) {
            // Reset class when user deletes a character
            char.classList.remove('success', 'fail');
        } else {
            char.classList.add('fail');
            document.getElementById("mistakes").innerText = ++mistakes;
        }

        // Check if the user has typed the full quote correctly
        let check = quoteChars.every((element) => {
            return element.classList.contains('success');
        });

        if (check) {
            displayResult();
        }
    });
});

function updateTimer() {
    if (time === 0) {
        displayResult();
    } else {
        document.getElementById('timer').innerText = --time + "s";
    }
}

const timeReduce = () => {
    timer = setInterval(updateTimer, 1000);
};

const displayResult = () => {
    clearInterval(timer);
    document.querySelector('.result').style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;

    let timeTaken = (60 - time) / 100;
    if (time === 0) {
        timeTaken = 1; // If the timer reached 0, avoid division by zero.
    }

    const wpm = (userInput.value.length / 5 / timeTaken).toFixed(2);
    const accuracy = Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100);

    document.getElementById("wpm").innerText = `${wpm} wpm`;
    document.getElementById("accuracy").innerText = `${accuracy}%`;
};

// Start the test
const startTest = () => {
    if (isTestRunning) return; // Prevent starting a test if it's already running

    isTestRunning = true;
    mistakes = 0;  // Reset mistakes counter
    time = 60;  // Reset the timer to 60 seconds
    userInput.disabled = false;
    userInput.value = "";  // Clear the input field
    document.getElementById("start-test").style.display = "none";
    document.getElementById("stop-test").style.display = "block";
    document.querySelector('.result').style.display = "none"; // Hide result initially
    timeReduce();  // Start the timer
};

const stopTest = () => {
    clearInterval(timer); // Stop the timer
    displayResult();  // Display the result
};

window.onload = () => {
    userInput.value = "";
    document.getElementById("start-test").style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    renderNewQuote();
};
