// // Pokéapi API Example
// const response = await fetch('https://pokeapi.co', {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

// const data = await response.json();
// console.log(data);


// const pokemonName = "pikachu";
// fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
//   .then(response => response.json())
//   .then(data => console.log(data));


async function getAllPokemon() {
  let url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0'; // 100 Pokémon per page
  let allPokemon = [];

  // Loop through the pagination until there are no more pages
  while (url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      allPokemon = [...allPokemon, ...data.results];

      // If there is a next page, update the URL
      url = data.next; 
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      break;
    }
  }

  console.log(`Total Pokémon fetched: ${allPokemon.length}`);
  return allPokemon; // You can process the data further here
}

getAllPokemon();



let offset = 0; // Theo dõi vị trí hiện tại trong danh sách
const limit = 100; // Mỗi lần lấy 100 Pokémon

async function loadPokemon() {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Hiển thị Pokémon (bạn có thể xử lý và hiển thị trên giao diện)
    console.log(data.results);

    // Cập nhật offset để tải dữ liệu tiếp theo
    offset += limit;

    // Kiểm tra nếu cần tải thêm dữ liệu
    if (data.next) {
      // Nếu còn trang tiếp theo, lắng nghe sự kiện cuộn
      window.addEventListener('scroll', handleScroll);
    }
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu Pokémon:', error);
  }
}

function handleScroll() {
  const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
  
  if (nearBottom) {
    loadPokemon();
  }
}

loadPokemon(); // Tải dữ liệu ban đầu



async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); // Chuyển dữ liệu từ JSON thành Object
    console.log(data); // Hiển thị kết quả
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

fetchData();


fetch('https://pokeapi.co/api/v2/pokemon/charizard')
  .then(response => response.json())
  .then(data => {
    // Remove the 'moves' attribute from the data
    const { moves, ...filteredData } = data;
    
    // Now 'filteredData' has all attributes except 'moves'
    console.log(filteredData);
  })
  .catch(error => console.error('Error fetching data:', error));

//////////////////////////////////////////////////////////////////////////////////////////////////*css*/`
// Fetching a specific Pokémon card from the Pokémon TCG API
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Fetching a specific Pokémon card from the Pokémon TCG API
function setupCardFetcher() {
  const input = document.getElementById('poke-name');
  const loadingText = document.getElementById('loading-text');
  const image = document.getElementById('image');

  loadingText.style.display = 'none';
  image.style.display = 'none';

  let observer;

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const cardID = input.value.trim().toLowerCase(); // Ensure lowercase and trim
      input.value = ''; // Clear input field

      if (cardID) {
        console.log(`Fetching card: ${cardID}`);
        input.style.display = 'none'; // Hide input
        fetchCard(cardID); // Assumes fetchCard is defined elsewhere
      }
    }
  });
}

function fetchCard(cardId) {
  const input = document.getElementById('poke-name');
  const loadingText = document.getElementById('loading-text');
  const image = document.getElementById('image');


  //const url = `https://api.pokemontcg.io/v2/cards/${cardName}`;
  loadingText.style.display = 'block';
  image.style.display = 'block'; // Show the image element
  input.style.display = 'none'; // Hide the input field
  loadingText.innerHTML = "Loading..."; // Set loading text

  var loading = document.getElementById('loading-text');
  var img = document.createElement('img'); // Use document.createElement, not loading.createElement
  img.src = "pokemon_backside.jpeg"; // Set the image source
  img.style.width = '600px'; // Set the width of the image
  img.style.height = '825px'; // Set the height of the image
  loading.appendChild(img); // Append the image to the loading element

  // Fetch the card data from the Pokémon TCG API
  const url = `https://api.pokemontcg.io/v2/cards/${cardId}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data); // Do something with the returned data


      const cardImage = data.data.images.large; // Access the card image URL
      console.log(`Card Image URL: ${cardImage}`); // Log the card image URL

      const imgElement = document.getElementById('image');
      imgElement.src = cardImage; // Set the image source to the card image URL
      imgElement.setAttribute('data-src', cardImage); // Set the data-src attribute for lazy loading

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            imgElement.src = imgElement.getAttribute('data-src'); // Set the src attribute to the data-src value

            imgElement.onload = () => {
              imgElement.classList.add('loaded'); // Add a class to indicate
              document.getElementById('loading-text').style.display = 'none'; // Hide loading text
            };
            observer.disconnect(); // Stop observing once the image is loaded
          }
        });
      }, {
        //root: null, // Use the viewport as the root
        threshold: 0.1 // Trigger when 10% of the image is visible
      });

      observer.observe(imgElement); // Start observing the image element
      
      
      const card = data.data; // Access the card data
      const cardName = card.name; // Get the card name
      console.log(`Card Name: ${cardName}`); // Log the card name

      fetch(`https://pokeapi.co/api/v2/pokemon/${cardName.toLowerCase()}`)
      .then(response => response.json())
      .then(data => {
        // Remove the 'moves' attribute from the data
        const { moves, ...filteredData } = data;
        
        // Now 'filteredData' has all attributes except 'moves'
        console.log(filteredData);
      })
      .catch(error => console.error('Error 1 fetching data:', error));
    })
    .catch(error => {
      document.getElementById("loading-text").innerHTML = "Card not found. Please try again.";
      document.getElementById("loading-text").style.display = "block";
      console.error('Error 2 fetching data:', error);
    });

}

//document.addEventListener('DOMContentLoaded', setupCardFetcher);




// const cardId = 'base1-4';  // Replace with the actual card ID
// const url = `https://api.pokemontcg.io/v2/cards/${cardId}`;

// fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data); // Do something with the returned data

//     const cardImage = data.data.images.large; // Access the card image URL
//     console.log(`Card Image URL: ${cardImage}`); // Log the card image URL

//     const imgElement = document.getElementById('image');
//     imgElement.src = cardImage; // Set the image source to the card image URL
//     imgElement.setAttribute('data-src', cardImage); // Set the data-src attribute for lazy loading

//     const observer = new IntersectionObserver((entries, observer) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           imgElement.src = imgElement.getAttribute('data-src'); // Set the src attribute to the data-src value

//           imgElement.onload = () => {
//             imgElement.classList.add('loaded'); // Add a class to indicate
//             document.getElementById('loading-text').style.display = 'none'; // Hide loading text
//           };
//           observer.disconnect(); // Stop observing once the image is loaded
//         }
//       });
//     }, {
//       //root: null, // Use the viewport as the root
//       threshold: 0.1 // Trigger when 10% of the image is visible
//     });

//     observer.observe(imgElement); // Start observing the image element
    
    
//     const card = data.data; // Access the card data
//     const cardName = card.name; // Get the card name
//     console.log(`Card Name: ${cardName}`); // Log the card name

//     fetch(`https://pokeapi.co/api/v2/pokemon/${cardName.toLowerCase()}`)
//     .then(response => response.json())
//     .then(data => {
//       // Remove the 'moves' attribute from the data
//       const { moves, ...filteredData } = data;
      
//       // Now 'filteredData' has all attributes except 'moves'
//       console.log(filteredData);
//     })
//     .catch(error => console.error('Error fetching data:', error));
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });




document.addEventListener('keydown', (event) => {
  let pokeName = document.getElementById('poke-name');

  if (event.key === 'Enter') {
    pokeName = pokeName.value.trim();
    pokeName.toLowerCase(); // Convert to lowercase for consistency
    pokeName.value = ''; // Clear the input field after fetching
    if (pokeName) {
      console.log(`Fetching card - pokemon Name: ${pokeName}`);
      //pokeName = "pikachu"; // For testing purposes, you can set a default Pokémon name
      const url = `https://api.pokemontcg.io/v2/cards?q=name:${pokeName}`; // Use the query parameter for name search
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.data && data.data.length > 0) {
          const card = data.data;

          console.log(`Pokemon Name: ${pokeName}`); // Log the Pokémon name

          
          const ids = card
            .filter(card => card.name.toLowerCase() === pokeName.toLowerCase())
            .map(c => c.id);
          
          
          console.log(`Card IDs: ${ids}`); // Log the card ID

          console.log(`data type: ${typeof ids}`); // Log the type of ids

          
          // Check if ids is an array, not just an object
          if (Array.isArray(ids)) {
            console.log('ids is an array');
          } else {
            console.error('Error: ids is not an array');
          }

          // Loop through each id and log it separately
          ids.forEach(id => {
            console.log(`Card ID: ${id}`);
          });


          console.log("get random id in ids: ", getPokemonRandom(ids));
  
          fetchCard(getPokemonRandom(ids)); // Call the function to fetch the card details
            
          document.addEventListener('click', (e) =>{
            console.log("get random id in ids: ", getPokemonRandom(ids));
    
            fetchCard(getPokemonRandom(ids)); // Call the function to fetch the card details
          });
          // get random card ID from the array of IDs
          


        } else {
          console.log('No cards found for this Pokémon name.');
        }
      })
      .catch(error => console.error('Error fetching card:', error));
    }
    else {
      console.log('Please enter a valid Pokémon name or ID.');
    }
  }

  //console.log(getPokemonRandom(arr)); // This will log a random Pokémon name from the array
});


function getRandomSeed(){
  const now = new Date();
  const timeFactor = now.getTime();
  const randomFactor = Math.random();

  const combinedSeed = timeFactor * randomFactor;

  const randomNum = Math.floor(Math.random() * (9999 - 10 + 1)) + 10; // Random number between 10 and 9999

  const result = Math.floor(combinedSeed % randomNum);
  
  return result;
}

const arr = [
  "Bulbasaur",
  "Ivysaur",
  "Venusaur",
  "Charmander",
  "Charmeleon",
  "Charizard",
  "Squirtle",
  "Wartortle",
  "Blastoise",
  "Caterpie",
  "Metapod",
  "Butterfree",
  "Weedle",
  "Kakuna",
  "Beedrill",
  "Pidgey",
  "Pidgeotto",
  "Pidgeot",
  // Add more Pokémon names as needed
];
function getPokemonRandom(arr){
  const num = getRandomSeed();
  const index = num % arr.length; // Ensure the index is within the bounds of the array

  console.log(index);
  return arr[index]; // Return the Pokémon at the random index
}

// Example usage
console.log(getPokemonRandom(arr)); // This will log a random Pokémon name from the array

// Card ID: hgss4-1,xy5-1,pl1-1,dp3-1,det1-1,dv1-1,mcd19-1,pl3-1,ex12-1,ex3-1,ru1-1,ecard2-H1,base4-1,hgss1-1,ex11-1,ex7-1,gym1-1,base3-1,sm9-1,xy2-1,pop6-1,ecard2-H2,hgss4-2,pl1-2,ex3-2,dp3-2,base3-2,pl3-2,ex11-2,pop6-2,xy2-2,base4-2,gym1-2,hgss1-2,det1-2,sm9-2,ex12-2,ex7-2,ru1-2,mcd19-2,xy5-2,xy11-1,ex14-1,sm12-1,bw1-1,sm115-1,si1-1,dp1-1,sm3-1,pop7-1,gym2-1,col1-1,ex9-1,bw10-1,swsh35-1,xy7-1,sm1-1,ex13-1,dv1-2,ecard2-H3,sm12-2,ex9-2,bw1-2,base4-3,ru1-3,xy5-3,pop6-3,si1-2,ex11-3,pl3-3,base3-3,hgss1-3,ex13-2,hgss4-3,xy7-2,bw10-2,ex7-3,ex12-3,swsh35-2,gym2-2,xy2-3,xy11-2,det1-3,ex3-3,dv1-3,sm9-3,pop7-2,sm1-2,mcd19-3,col1-2,pl1-3,sm115-2,gym1-3,dp3-3,sm2-1,base5-1,xy4-1,bw11-1,ex4-1,bw4-1,bw9-1,base1-1,pop3-1,dp4-1,bw7-1,ex8-1,bw5-1,pop5-1,sm5-1,xy10-1,sm8-1,hgss2-1,dpp-DP01,swsh1-1,basep-1,swsh4-1,xy1-1,pop1-1,bw8-1,base6-1,pop9-1,pop4-1,neo4-1,neo3-1,pl4-1,mcd19-4,sm115-3,base3-4,ex9-3,pop7-3,pop6-4,det1-4,ex4-2,hgss1-4,xy1-2,ex8-2,bw5-2,dpp-DP02,sm2-2,pop4-2,bw7-2,xy4-2,col1-3,ex12-4,bw11-2,pl1-4,swsh35-3,base5-2,ecard2-H4,neo4-2,ex3-4,xy2-4,pop5-2,base6-2,dv1-4,ex11-4,dp4-2,dp1-2,gym2-3,pop1-2,si1-3,dp3-4,base4-4,pl4-2,bw8-2,pop3-2,xy11-3,sm3-2,swsh1-2,pop9-2,xy7-3,bw10-3,bw4-2,sm9-4,hgss4-4,ex13-3,sm5-2,sm75-1,ex10-1,bw6-1,si1-4,bw5-3,dp1-3,xy11-4,hgss4-5,sm12-3,ex7-4,sm5-3,swsh1-3,pl3-4,hgss1-5,ex12-5,pl4-3,bw10-4,pop4-3,ex3-5,swsh4-2,xy5-4,ex9-4,ex11-5,ex4-3,base3-5,dv1-5,dp4-3,dp3-5,bw1-3,ecard2-H5,pop1-3,gym2-4,xy4-3,ex10-2,xy7-4,pl1-5,pop3-3,ex8-3,basep-2,base6-3,bw4-3,hgss2-2,bw11-3,pop7-4,ru1-4,neo3-2,mcd19-5,sm8-2,sm75-2,sm9-5,bw6-2,neo4-3,bw7-3,swsh35-4,pop9-3,dpp-DP03,xy10-2,sm115-4,base1-2,sm3-3,xy2-5,xy1-3,ex14-2,det1-5,pl1-6,dpp-DP04,xy5-5,pop6-5,xy2-6,ex14-3,dv1-6,ex8-4,dp4-4


// Card ID: dp3-3,pl4-1,base4-4,base6-3,det1-5,sm75-3,base1-4,sm9-14,ecard1-6,ex16-6,bw11-19,xy12-11,bw7-20,swsh4-25,ecard1-39,ecard1-40,swshp-SWSH066,g1-RC5,ex3-100,dp7-103,bw8-136,smp-SM158,ecard3-146,smp-SM226,cel25c-4_A,pgo-10,swsh11tg-TG03







//////////////////////*css*/`

function setupConsole() {
  // Create the Toggle Button
  const toggleButton = document.createElement('button');
  toggleButton.id = 'toggle-button';
  toggleButton.textContent = 'Toggle Console';

  // Append the toggle button to the body
  document.body.appendChild(toggleButton);

  // Create the Console Container
  const consoleContainer = document.createElement('div');
  consoleContainer.id = 'console';
  document.body.appendChild(consoleContainer);

  // Create the Output Area
  const outputDiv = document.createElement('div');
  outputDiv.id = 'output';
  consoleContainer.appendChild(outputDiv);

  // Create the Input Area
  const inputContainer = document.createElement('div');
  inputContainer.id = 'input-container';
  consoleContainer.appendChild(inputContainer);

  const inputSpan = document.createElement('span');
  inputSpan.textContent = '>';
  inputContainer.appendChild(inputSpan);

  const inputField = document.createElement('input');
  inputField.id = 'input';
  inputField.type = 'text';
  inputField.autofocus = true;
  inputContainer.appendChild(inputField);

  // Toggle button functionality
  toggleButton.addEventListener('click', function () {
    if (consoleContainer.style.display === 'none') {
      consoleContainer.style.display = 'flex';
    } else {
      consoleContainer.style.display = 'none';
    }
  });

  // Handle input
  inputField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      const inputValue = inputField.value.trim();
      
      if (inputValue !== "") {
        const newOutput = document.createElement('div');
        newOutput.textContent = `> ${inputValue}`;
        outputDiv.appendChild(newOutput);

        // You can add any custom command logic here
        const commandResponse = document.createElement('div');
        commandResponse.textContent = `Executed: ${inputValue}`;
        outputDiv.appendChild(commandResponse);

        // Scroll to the bottom
        outputDiv.scrollTop = outputDiv.scrollHeight;

        // Clear the input field for the next command
        inputField.value = "";
      }
    }
  });
}



function setupConsoleNew() {
  // Create the Toggle Button
  const toggleButton = document.createElement('button');
  toggleButton.id = 'toggle-button';
  toggleButton.textContent = 'Toggle Console';

  // Append the toggle button to the body (You can place this in any desired position)
  document.body.appendChild(toggleButton);

  // Create the Console Container
  const consoleContainer = document.createElement('div');
  consoleContainer.id = 'console';
  document.body.appendChild(consoleContainer);

  // Create the Output Area
  const outputDiv = document.createElement('div');
  outputDiv.id = 'output';
  consoleContainer.appendChild(outputDiv);

  // Create the Input Area
  const inputContainer = document.createElement('div');
  inputContainer.id = 'input-container';
  consoleContainer.appendChild(inputContainer);

  const inputSpan = document.createElement('span');
  inputSpan.textContent = '>';
  inputContainer.appendChild(inputSpan);

  const inputField = document.createElement('input');
  inputField.id = 'input';
  inputField.type = 'text';
  inputField.autofocus = true;
  inputContainer.appendChild(inputField);

  // Toggle button functionality
  toggleButton.addEventListener('click', function () {
    if (consoleContainer.style.display === 'none') {
      consoleContainer.style.display = 'flex';
    } else {
      consoleContainer.style.display = 'none';
    }
  });

  // Handle input
  inputField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      const inputValue = inputField.value.trim();
      
      if (inputValue !== "") {
        const newOutput = document.createElement('div');
        newOutput.textContent = `> ${inputValue}`;
        outputDiv.appendChild(newOutput);

        // You can add any custom command logic here
        const commandResponse = document.createElement('div');
        commandResponse.textContent = `Executed: ${inputValue}`;
        outputDiv.appendChild(commandResponse);

        // Scroll to the bottom
        outputDiv.scrollTop = outputDiv.scrollHeight;

        // Clear the input field for the next command
        inputField.value = "";
      }
    }
  });
};

// document.addEventListener('DOMContentLoaded', () => {
//   setupConsoleNew(); // Initialize the console when the DOM is fully loaded
// });