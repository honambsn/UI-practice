const gameNumberElement = document.querySelector(".game-number");
const gameFeedbackElement = document.querySelector(".game-feedback");
const gameGuessElement = document.querySelector(".game-guess");
const gameHealthNumberElement = document.querySelector(".game-health-number");
const gameHealthElement = document.querySelector(".game-health-bar");
const gamePlayBtn = document.querySelector(".game-button-play");
const gameResetBtn = document.querySelector(".game-button-reset");

let gameHealth;
let gameOver;
let randomGuessNumber;

const updateData = (element, message) => {
    element.textContent = message;
}

const init = () =>{
    gameHealth = 100;
    gameOver = false;
    randomGuessNumber = Math.trunc(Math.random() * 10) + 1;
    updateData(gameHealthNumberElement, "100");
    updateData(gameFeedbackElement, "Start guessing...");
    updateData(gameNumberElement, "?");
    gameGuessElement.value = "";
    gameHealthElement.style.background = "green";
    gameHealthElement.style.width = `${gameHealth}%`;
};

init();

const playGame = () =>{
    const guess = Number(gameGuessElement.value);
    if (!gameOver){
        if (guess <= 0){
            updateData(gameFeedbackElement, "Please enter a number between 1 and 10");
        }
        else if (guess == randomGuessNumber) {
            gameNumberElement.textContent = randomGuessNumber;
            updateData(gameNumberElement, "You win");
        }
        else if(guess !== randomGuessNumber)
        {
            if (gameHealth > 20){
                updateData(gameFeedbackElement, guess > randomGuessNumber ? "Too high" : "Too low");
                gameHealth -= 20;
                gameHealthElement.style.width = `${gameHealth}%`;
                // updateData(gameFeedbackElement, "Try again");
                updateData(gameHealthNumberElement, `${gameHealth}%`);

                if (gameHealth <= 40){
                    gameHealthElement.style.background = "red";
                }
            }
            else{
                updateData(gameFeedbackElement, "You lose");
                gameHealth = 0;
                gameHealthElement.style.width = `${gameHealth}%`;
                updateData(gameHealthNumberElement, `${gameHealth}%`);
                gameOver = true;
            }
        }
    }
    else{
        updateData(gameFeedbackElement, "Reset to play again");
    }
};

gamePlayBtn.addEventListener("click", playGame);
gameResetBtn.addEventListener("click", init);