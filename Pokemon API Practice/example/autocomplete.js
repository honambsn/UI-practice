// Sample list of Pokémon names for autocomplete suggestions
const pokemonNames = [
  'Pikachu', 'Bulbasaur', 'Charmander', 'Squirtle', 'Eevee', 'Snorlax', 'Jigglypuff',
  'Mew', 'Mewtwo', 'Charizard', 'Squirtle', 'Vaporeon', 'Jolteon', 'Flareon'
];


// Function to suggest Pokémon names based on user input
function suggestSearch(){
    const input = document.getElementById('poke-input').value.toLowerCase();
    const suggestionList = document.getElementById('suggestionList');
    const resultBox = document.querySelector('.result-box');

    // Clear previous suggestions
    suggestionList.innerHTML = '';

    // Show suggestions if input is not empty
    if (input.length > 0){
        // Filter Pokémon names based on user input
        const filteredSuggestions = pokemonNames.filter(pokemon => pokemon.toLowerCase().includes(input));

        // Display suggestions if there are any
        if (filteredSuggestions.length > 0 ){
            resultBox.style.display = 'block'; // Show the result box

            // Create and append list items for each suggestion
            filteredSuggestions.forEach(suggestion => {
                const li = document.createElement('li');
                li.textContent = suggestion;
                li.onclick = function() {
                    // when a suggestion is clicked, fill the input and hide suggestions
                    document.getElementById('poke-input').value = suggestion;
                    resultBox.style.display = 'none';
                };
                suggestionList.appendChild(li);
            });
        }
        else{
            resultBox.style.display = 'none'; // Hide the result box if no suggestions
        }
    }
    else{
        resultBox.style.display = 'none';
    }
}