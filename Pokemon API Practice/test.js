// // Pokéapi API Example
// const response = await fetch('https://pokeapi.co', {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

// const data = await response.json();
// console.log(data);


const pokemonName = "pikachu";
fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
  .then(response => response.json())
  .then(data => console.log(data));