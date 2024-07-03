document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const swapButton = document.getElementById('swapButton');

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    swapButton.addEventListener('click', () => {
        for (let i = 0; i < cards.length; i++) {
            const randomIndex = getRandomInt(0, cards.length - 1);
            const currentCard = cards[i];
            const randomCard = cards[randomIndex];

            // Swap the values
            const temp = currentCard.textContent;
            currentCard.textContent = randomCard.textContent;
            randomCard.textContent = temp;
        }
    });
});
