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

window.onload = function() {
  document.getElementById('poke-name').focus(); // Focus on the input field when the page loads
};

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
  return new Promise((resolve, reject) => {
  const input = document.getElementById('poke-name');
  const loadingText = document.getElementById('loading-text');
  const image = document.getElementById('image');


  //const url = `https://api.pokemontcg.io/v2/cards/${cardName}`;
  loadingText.style.display = 'block';
  image.style.display = 'block'; // Show the image element
  input.style.display = 'none'; // Hide the input field
  loadingText.innerHTML = "Loading..."; // Set loading text


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


        resolve(filteredData);
      })
      .catch(error => console.error('Error 1 fetching data:', error));
    })
    .catch(error => {
      document.getElementById("loading-text").innerHTML = "Card not found. Please try again.";
      document.getElementById("loading-text").style.display = "block";
      console.error('Error 2 fetching data:', error);

      reject(error); // Từ chối promise nếu có lỗi
    });
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

function handleSearch(query)
{
  const searchField = document.getElementById('search-field');
  let loadingText = document.getElementById('loading-text');
  const image = document.getElementById('image');
  const input = document.getElementById('poke-name');
  const resultBox = document.getElementById('result-box');


  loadingText.style.display = 'block'; // Show loading text
  loadingText.innerHTML = "Loading..."; // Set loading text
  loadingText.style.color = 'red';
  loadingText.style.cursor = 'default'; // Change cursor to default for loading text
  loadingText.style.fontSize = '20px'; // Set font size for loading text
  loadingText.style.zIndex = '99999'; // Ensure loading text is on top of other elements
  
  
  image.style.display = 'none'; // Hide the image element
  input.style.display = 'none'; // Hide the input field
  searchField.style.display = 'none'; // Hide the search field
  resultBox.style.display = 'none'; // Hide the result box


  pokeName = query; //

  pokeName.toLowerCase(); // Convert to lowercase for consistency
  pokeName.value = ''; // Clear the input field after fetching
  if (pokeName) {
    console.log(`Fetching card - pokemon Name: ${pokeName}`);
    //pokeName = "pikachu"; // For testing purposes, you can set a default Pokémon name
    const url = `https://api.pokemontcg.io/v2/cards?q=name:${pokeName}`; // Use the query parameter for name search
    //const new_url = `https://cors-anywhere.herokuapp.com/https://api.pokemontcg.io/v2/cards?q=name:${pokeName}` // Example URL for testing with CORS proxy
    const getByName = () =>{
      fetch(url)
      //fetch(new_url)
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
          // ids.forEach(id => {
          //   console.log(`Card ID: ${id}`);
          // });


          let randomID = getPokemonRandom(ids); // Get a random ID from the array
          console.log("get random id in ids: ", randomID);

          let isFetching = false; // Flag to prevent duplicate fetches

          function createBlur() {
            let blurDiv = document.createElement('div');
            blurDiv.className = 'blur'; // Add a class for styling
            document.body.appendChild(blurDiv); // Append the blur div to the body
            blurDiv.style.position = 'fixed'; // Make it fixed position
            blurDiv.style.top = '0';
            blurDiv.style.left = '0';
            blurDiv.style.width = '100%';
            blurDiv.style.height = '100%';
            blurDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent background
            blurDiv.style.zIndex = '9999'; // Ensure it is on top of other elements
            // blurDiv.style.display = 'flex'; // Use flexbox for centering
            // blurDiv.style.justifyContent = 'center'; // Center horizontally
            // blurDiv.style.alignItems = 'center'; // Center vertically
            blurDiv.style.transition = 'opacity 0.3s ease'; // Smooth transition for opacity
            blurDiv.style.opacity = '0'; // Start with opacity 0 for fade-in effect
            setTimeout(() => {
              blurDiv.style.opacity = '1'; // Fade in the blur effect
            }, 10); // Small delay to allow the initial styles to apply
          }

          function removeBlur() {
            let blurDiv = document.querySelector('.blur'); // Select the blur div
            if (blurDiv) {
              blurDiv.style.opacity = '0'; // Fade out the blur effect
              setTimeout(() => {
                blurDiv.remove(); // Remove the blur div after fade-out
              }, 300); // Match the transition duration
            }
          }

          function fetchingCard(randomID) {
            document.body.style.backgroundColor = "#393E46"; // Change background color to indicate fetching
            createBlur(); // Create a blur effect while fetching
            console.log(`Fetching card with ID: ${randomID}`);
            fetchCard(randomID).then(() => {
              const card_data = data.data.find(item => item.id === randomID);

              console.log(`Card with ID ${randomID} fetched successfully.`);                

              console.log(`Card ---data:`, card_data); // Log the fetched card data
              
              
              // const details = document.getElementById('details');
              // if (details) {
              //   console.log(`Details element found: ${details.id}`); // Log the details element ID
              // } else {
              //   console.error('Details element not found.'); // Log an error if the details element is not found
              // }
              // details.style.display = 'block'; // Show the details section
              const details = 'details'; // Set the details section ID

              showDetails(card_data, details);

            })
            .catch(error => {
              console.error(`Error fetching card with ID ${randomID}:`, error);
            })
            .finally(() => {
              const details = document.getElementById('details');
              details.style.display = 'block'; // Show the details section

              //showDetails(data, outputElement)
              
              console.log(`Finished fetching card with ID: ${randomID}`);
              isFetching = false; // Reset the flag after fetching

              removeBlur(); // Remove the blur effect after fetching

              //document.body.style.backgroundColor = '#F0C1E1'; // Reset background color
            });
          }
  
          //fetchCard(randomId); // Call the function to fetch the card details
          fetchingCard(randomID); // Call the function to fetch the card details
          //console.log(fetchCard(randomId)); // Log the fetchCard function call

          function clearPokemonDetails() {
            const fields = [
                ['pokemon-name', 'Name: '],
                ['pokemon-id', 'ID: '],
                ['pokemon-envolvesFrom', 'Evolves From: '],
                ['pokemon-types', 'Types: '],
                ['pokemon-subtypes', 'Subtypes: '],
                ['pokemon-hp', 'HP: '],
                ['pokemon-number', 'Number: '],
                ['pokemon-artist', 'Artist: '],
                ['pokemon-rarity', 'Rarity: '],
                ['pokemon-flavorText', 'Flavor Text: '],
                ['pokemon-nationalPokedexNumbers', 'National Pokedex Numbers: ']
            ];

            for (const [id, label] of fields) {
                document.getElementById(id).textContent = label;
            }
          }

            
          document.addEventListener('click', (e) =>{
            document.getElementById('details').textContent = '';
            //clearPokemonDetails(); // Clear previous details

            if (isFetching) {
              console.log("Already fetching a card, please wait.");
              e.preventDefault(); // Prevent default action if needed
              e.stopPropagation(); // Stop the event from propagating further
              return; // Exit the function to prevent duplicate fetches
            }

            isFetching = true; // Set the flag to true to indicate fetching is in progress
            randomID = getPokemonRandom(ids); // Get a new random ID from the array on click
            console.log("get random id in ids: ", randomID);
            

            fetchingCard(randomID);
          });
          // get random card ID from the array of IDs


        } else {
          loadingText.style.display = 'block'; // Show loading text
          loadingText.innerHTML = "No cards found for this Pokémon name. Click here to try again."; // Set loading text
          loadingText.style.cursor = 'pointer'; // Change cursor to pointer for clickable text
          
          
          loadingText.addEventListener('mouseover', e =>{
            loadingText.style.color = 'red'; // Change text color to red for visibility
          });

          loadingText.addEventListener('mouseout', e =>{
            loadingText.style.color = ''; // Reset text color when mouse leaves
          });


          loadingText.addEventListener('click', function() {
            // loadingText.style.display = 'none'; // Hide loading text
            // input.style.display = 'block'; // Show the input field again
            // input.focus(); // Focus on the input field


                      //reload the page to reset the input field and loading text
            //loadingText.remove(); // Remove the loading text element
            //location.reload(); // Reload the page to reset the input field and loading text


                      // not reload the page, just reset the input field and loading text
            input.value = ''; // Clear the input field
            input.style.display = 'block'; // Show the input field again
            loadingText.style.display = 'none'; // Hide loading text
            input.focus(); // Focus on the input field
          });
          
          console.log('No cards found for this Pokémon name...');
        }
      })
      .catch(error => console.error('Error fetching card:', error), isError = true, loadingText.innerHTML = "").finally(() => {
        //console.error('Error fetching card:', error);
        //loadingText.style.display = 'block'; // Hide loading text after fetching
        //loadingText.innerHTML = "Something went wrong. Please try again.";
        //console.error('Error fetching card:', error);
        // image.style.display = 'block'; // Show the image element
        // input.style.display = 'block'; // Show the input field again
      });
    };
    getByName();

    // const loadObserver = () => {
    //   const observe = new IntersectionObserver((entries, observerInstance) => {
    //     entries.forEach(entry =>{
    //       if (entry.isIntersecting){
    //         console.log('Element is in view:');
    //         fetchCard(); // Call the fetchCard function when the element is in view
    //         observerInstance.disconnect(); // Stop observing after the first intersection
    //       }
    //     });
    //   }, {
    //     threshold: 0.1 // Trigger when 10% of the element is visible
    //   });

    //   const targetElement = document.getElementById('.loading-text');
    //   if (targetElement) {
    //     observe.observe(targetElement); // Start observing the target element
    //   } else {
    //     console.error('Target element not found for intersection observer.');
    //   }
    // };

    // loadObserver(); // Call the function to set up the observer
  }
  else {
    console.log('Please enter a valid Pokémon name or ID.');
  }
  
  //console.log(getPokemonRandom(arr)); // This will log a random Pokémon name from the array

}

function hideSearch(){
  const searchField = document.getElementById('search-field');
  let loadingText = document.getElementById('loading-text');
  const image = document.getElementById('image');
  const input = document.getElementById('poke-name');
  const resultBox = document.getElementById('result-box');


  loadingText.style.display = 'block'; // Show loading text
  loadingText.innerHTML = "Loading..."; // Set loading text
  loadingText.style.color = 'red';
  loadingText.style.cursor = 'default'; // Change cursor to default for loading text
  loadingText.style.fontSize = '20px'; // Set font size for loading text
  loadingText.style.zIndex = '99999'; // Ensure loading text is on top of other elements
  
  
  image.style.display = 'none'; // Hide the image element
  input.style.display = 'none'; // Hide the input field
  searchField.style.display = 'none'; // Hide the search field
  resultBox.style.display = 'none'; // Hide the result box

}

document.addEventListener('keyup', (event) => {

  let isError = false; // Flag to track if an error occurs

  if (isError === true){
    event.preventDefault(); // Prevent default action if needed
    //event.stopPropagation(); // Stop the event from propagating further
    return;
  }

  console.log('Key pressed:', event.key);
  console.log('Current key string:', document.getElementById('poke-name').value.trim());

  let pokeName = document.getElementById('poke-name');
  if (event.key === 'Enter' && isError === false) {
    hideSearch();
    handleSearch(pokeName.value.trim());
  }
  //   const searchField = document.getElementById('search-field');
  //   let loadingText = document.getElementById('loading-text');
  //   const image = document.getElementById('image');
  //   const input = document.getElementById('poke-name');

  //   loadingText.style.display = 'block'; // Show loading text
  //   loadingText.innerHTML = "Loading..."; // Set loading text
  //   loadingText.style.color = 'red';
  //   loadingText.style.cursor = 'default'; // Change cursor to default for loading text
  //   loadingText.style.fontSize = '20px'; // Set font size for loading text
  //   loadingText.style.zIndex = '99999'; // Ensure loading text is on top of other elements
    
    
  //   image.style.display = 'none'; // Hide the image element
  //   input.style.display = 'none'; // Hide the input field
  //   searchField.style.display = 'none'; // Hide the search field


  //   pokeName = pokeName.value.trim();
  //   pokeName.toLowerCase(); // Convert to lowercase for consistency
  //   pokeName.value = ''; // Clear the input field after fetching
  //   if (pokeName) {
  //     console.log(`Fetching card - pokemon Name: ${pokeName}`);
  //     //pokeName = "pikachu"; // For testing purposes, you can set a default Pokémon name
  //     const url = `https://api.pokemontcg.io/v2/cards?q=name:${pokeName}`; // Use the query parameter for name search
  //     //const new_url = `https://cors-anywhere.herokuapp.com/https://api.pokemontcg.io/v2/cards?q=name:${pokeName}` // Example URL for testing with CORS proxy
  //     const getByName = () =>{
  //       fetch(url)
  //       //fetch(new_url)
  //       .then(response => response.json())
  //       .then(data => {
  //         if (data.data && data.data.length > 0) {
  //           const card = data.data;

  //           console.log(`Pokemon Name: ${pokeName}`); // Log the Pokémon name

            
  //           const ids = card
  //             .filter(card => card.name.toLowerCase() === pokeName.toLowerCase())
  //             .map(c => c.id);
            
            
  //           console.log(`Card IDs: ${ids}`); // Log the card ID

  //           console.log(`data type: ${typeof ids}`); // Log the type of ids

            
  //           // Check if ids is an array, not just an object
  //           if (Array.isArray(ids)) {
  //             console.log('ids is an array');
  //           } else {
  //             console.error('Error: ids is not an array');
  //           }

  //           // Loop through each id and log it separately
  //           // ids.forEach(id => {
  //           //   console.log(`Card ID: ${id}`);
  //           // });


  //           let randomID = getPokemonRandom(ids); // Get a random ID from the array
  //           console.log("get random id in ids: ", randomID);

  //           let isFetching = false; // Flag to prevent duplicate fetches

  //           function createBlur() {
  //             let blurDiv = document.createElement('div');
  //             blurDiv.className = 'blur'; // Add a class for styling
  //             document.body.appendChild(blurDiv); // Append the blur div to the body
  //             blurDiv.style.position = 'fixed'; // Make it fixed position
  //             blurDiv.style.top = '0';
  //             blurDiv.style.left = '0';
  //             blurDiv.style.width = '100%';
  //             blurDiv.style.height = '100%';
  //             blurDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent background
  //             blurDiv.style.zIndex = '9999'; // Ensure it is on top of other elements
  //             // blurDiv.style.display = 'flex'; // Use flexbox for centering
  //             // blurDiv.style.justifyContent = 'center'; // Center horizontally
  //             // blurDiv.style.alignItems = 'center'; // Center vertically
  //             blurDiv.style.transition = 'opacity 0.3s ease'; // Smooth transition for opacity
  //             blurDiv.style.opacity = '0'; // Start with opacity 0 for fade-in effect
  //             setTimeout(() => {
  //               blurDiv.style.opacity = '1'; // Fade in the blur effect
  //             }, 10); // Small delay to allow the initial styles to apply
  //           }

  //           function removeBlur() {
  //             let blurDiv = document.querySelector('.blur'); // Select the blur div
  //             if (blurDiv) {
  //               blurDiv.style.opacity = '0'; // Fade out the blur effect
  //               setTimeout(() => {
  //                 blurDiv.remove(); // Remove the blur div after fade-out
  //               }, 300); // Match the transition duration
  //             }
  //           }

  //           function fetchingCard(randomID) {
  //             document.body.style.backgroundColor = "#393E46"; // Change background color to indicate fetching
  //             createBlur(); // Create a blur effect while fetching
  //             console.log(`Fetching card with ID: ${randomID}`);
  //             fetchCard(randomID).then(() => {
  //               const card_data = data.data.find(item => item.id === randomID);

  //               console.log(`Card with ID ${randomID} fetched successfully.`);                

  //               console.log(`Card ---data:`, card_data); // Log the fetched card data
                
                
  //               // const details = document.getElementById('details');
  //               // if (details) {
  //               //   console.log(`Details element found: ${details.id}`); // Log the details element ID
  //               // } else {
  //               //   console.error('Details element not found.'); // Log an error if the details element is not found
  //               // }
  //               // details.style.display = 'block'; // Show the details section
  //               const details = 'details'; // Set the details section ID

  //               showDetails(card_data, details);

  //             })
  //             .catch(error => {
  //               console.error(`Error fetching card with ID ${randomID}:`, error);
  //             })
  //             .finally(() => {
  //               const details = document.getElementById('details');
  //               details.style.display = 'block'; // Show the details section

  //               //showDetails(data, outputElement)
                
  //               console.log(`Finished fetching card with ID: ${randomID}`);
  //               isFetching = false; // Reset the flag after fetching

  //               removeBlur(); // Remove the blur effect after fetching

  //               //document.body.style.backgroundColor = '#F0C1E1'; // Reset background color
  //             });
  //           }
    
  //           //fetchCard(randomId); // Call the function to fetch the card details
  //           fetchingCard(randomID); // Call the function to fetch the card details
  //           //console.log(fetchCard(randomId)); // Log the fetchCard function call

  //           function clearPokemonDetails() {
  //             const fields = [
  //                 ['pokemon-name', 'Name: '],
  //                 ['pokemon-id', 'ID: '],
  //                 ['pokemon-envolvesFrom', 'Evolves From: '],
  //                 ['pokemon-types', 'Types: '],
  //                 ['pokemon-subtypes', 'Subtypes: '],
  //                 ['pokemon-hp', 'HP: '],
  //                 ['pokemon-number', 'Number: '],
  //                 ['pokemon-artist', 'Artist: '],
  //                 ['pokemon-rarity', 'Rarity: '],
  //                 ['pokemon-flavorText', 'Flavor Text: '],
  //                 ['pokemon-nationalPokedexNumbers', 'National Pokedex Numbers: ']
  //             ];

  //             for (const [id, label] of fields) {
  //                 document.getElementById(id).textContent = label;
  //             }
  //           }

              
  //           document.addEventListener('click', (e) =>{
  //             document.getElementById('details').textContent = '';
  //             //clearPokemonDetails(); // Clear previous details

  //             if (isFetching) {
  //               console.log("Already fetching a card, please wait.");
  //               e.preventDefault(); // Prevent default action if needed
  //               e.stopPropagation(); // Stop the event from propagating further
  //               return; // Exit the function to prevent duplicate fetches
  //             }

  //             isFetching = true; // Set the flag to true to indicate fetching is in progress
  //             randomID = getPokemonRandom(ids); // Get a new random ID from the array on click
  //             console.log("get random id in ids: ", randomID);
              

  //             fetchingCard(randomID);
  //           });
  //           // get random card ID from the array of IDs


  //         } else {
  //           loadingText.style.display = 'block'; // Show loading text
  //           loadingText.innerHTML = "No cards found for this Pokémon name. Click here to try again."; // Set loading text
  //           loadingText.style.cursor = 'pointer'; // Change cursor to pointer for clickable text
            
            
  //           loadingText.addEventListener('mouseover', e =>{
  //             loadingText.style.color = 'red'; // Change text color to red for visibility
  //           });

  //           loadingText.addEventListener('mouseout', e =>{
  //             loadingText.style.color = ''; // Reset text color when mouse leaves
  //           });


  //           loadingText.addEventListener('click', function() {
  //             // loadingText.style.display = 'none'; // Hide loading text
  //             // input.style.display = 'block'; // Show the input field again
  //             // input.focus(); // Focus on the input field


  //                       //reload the page to reset the input field and loading text
  //             //loadingText.remove(); // Remove the loading text element
  //             //location.reload(); // Reload the page to reset the input field and loading text


  //                       // not reload the page, just reset the input field and loading text
  //             input.value = ''; // Clear the input field
  //             input.style.display = 'block'; // Show the input field again
  //             loadingText.style.display = 'none'; // Hide loading text
  //             input.focus(); // Focus on the input field
  //           });
            
  //           console.log('No cards found for this Pokémon name...');
  //         }
  //       })
  //       .catch(error => console.error('Error fetching card:', error), isError = true, loadingText.innerHTML = "").finally(() => {
  //         //console.error('Error fetching card:', error);
  //         //loadingText.style.display = 'block'; // Hide loading text after fetching
  //         //loadingText.innerHTML = "Something went wrong. Please try again.";
  //         //console.error('Error fetching card:', error);
  //         // image.style.display = 'block'; // Show the image element
  //         // input.style.display = 'block'; // Show the input field again
  //       });
  //     };
  //     getByName();

  //     // const loadObserver = () => {
  //     //   const observe = new IntersectionObserver((entries, observerInstance) => {
  //     //     entries.forEach(entry =>{
  //     //       if (entry.isIntersecting){
  //     //         console.log('Element is in view:');
  //     //         fetchCard(); // Call the fetchCard function when the element is in view
  //     //         observerInstance.disconnect(); // Stop observing after the first intersection
  //     //       }
  //     //     });
  //     //   }, {
  //     //     threshold: 0.1 // Trigger when 10% of the element is visible
  //     //   });

  //     //   const targetElement = document.getElementById('.loading-text');
  //     //   if (targetElement) {
  //     //     observe.observe(targetElement); // Start observing the target element
  //     //   } else {
  //     //     console.error('Target element not found for intersection observer.');
  //     //   }
  //     // };

  //     // loadObserver(); // Call the function to set up the observer
  //   }
  //   else {
  //     console.log('Please enter a valid Pokémon name or ID.');
  //   }
  // }

  //console.log(getPokemonRandom(arr)); // This will log a random Pokémon name from the array
});

document.getElementById('search').addEventListener('click', () =>{

  hideSearch();
  let pokeName = document.getElementById('poke-name').value.trim();

  if (pokeName) {
    handleSearch(pokeName);
  } else {
    console.log('Please enter a valid Pokémon name or ID.');
  }
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
//console.log(getPokemonRandom(arr)); // This will log a random Pokémon name from the array

// Card ID: hgss4-1,xy5-1,pl1-1,dp3-1,det1-1,dv1-1,mcd19-1,pl3-1,ex12-1,ex3-1,ru1-1,ecard2-H1,base4-1,hgss1-1,ex11-1,ex7-1,gym1-1,base3-1,sm9-1,xy2-1,pop6-1,ecard2-H2,hgss4-2,pl1-2,ex3-2,dp3-2,base3-2,pl3-2,ex11-2,pop6-2,xy2-2,base4-2,gym1-2,hgss1-2,det1-2,sm9-2,ex12-2,ex7-2,ru1-2,mcd19-2,xy5-2,xy11-1,ex14-1,sm12-1,bw1-1,sm115-1,si1-1,dp1-1,sm3-1,pop7-1,gym2-1,col1-1,ex9-1,bw10-1,swsh35-1,xy7-1,sm1-1,ex13-1,dv1-2,ecard2-H3,sm12-2,ex9-2,bw1-2,base4-3,ru1-3,xy5-3,pop6-3,si1-2,ex11-3,pl3-3,base3-3,hgss1-3,ex13-2,hgss4-3,xy7-2,bw10-2,ex7-3,ex12-3,swsh35-2,gym2-2,xy2-3,xy11-2,det1-3,ex3-3,dv1-3,sm9-3,pop7-2,sm1-2,mcd19-3,col1-2,pl1-3,sm115-2,gym1-3,dp3-3,sm2-1,base5-1,xy4-1,bw11-1,ex4-1,bw4-1,bw9-1,base1-1,pop3-1,dp4-1,bw7-1,ex8-1,bw5-1,pop5-1,sm5-1,xy10-1,sm8-1,hgss2-1,dpp-DP01,swsh1-1,basep-1,swsh4-1,xy1-1,pop1-1,bw8-1,base6-1,pop9-1,pop4-1,neo4-1,neo3-1,pl4-1,mcd19-4,sm115-3,base3-4,ex9-3,pop7-3,pop6-4,det1-4,ex4-2,hgss1-4,xy1-2,ex8-2,bw5-2,dpp-DP02,sm2-2,pop4-2,bw7-2,xy4-2,col1-3,ex12-4,bw11-2,pl1-4,swsh35-3,base5-2,ecard2-H4,neo4-2,ex3-4,xy2-4,pop5-2,base6-2,dv1-4,ex11-4,dp4-2,dp1-2,gym2-3,pop1-2,si1-3,dp3-4,base4-4,pl4-2,bw8-2,pop3-2,xy11-3,sm3-2,swsh1-2,pop9-2,xy7-3,bw10-3,bw4-2,sm9-4,hgss4-4,ex13-3,sm5-2,sm75-1,ex10-1,bw6-1,si1-4,bw5-3,dp1-3,xy11-4,hgss4-5,sm12-3,ex7-4,sm5-3,swsh1-3,pl3-4,hgss1-5,ex12-5,pl4-3,bw10-4,pop4-3,ex3-5,swsh4-2,xy5-4,ex9-4,ex11-5,ex4-3,base3-5,dv1-5,dp4-3,dp3-5,bw1-3,ecard2-H5,pop1-3,gym2-4,xy4-3,ex10-2,xy7-4,pl1-5,pop3-3,ex8-3,basep-2,base6-3,bw4-3,hgss2-2,bw11-3,pop7-4,ru1-4,neo3-2,mcd19-5,sm8-2,sm75-2,sm9-5,bw6-2,neo4-3,bw7-3,swsh35-4,pop9-3,dpp-DP03,xy10-2,sm115-4,base1-2,sm3-3,xy2-5,xy1-3,ex14-2,det1-5,pl1-6,dpp-DP04,xy5-5,pop6-5,xy2-6,ex14-3,dv1-6,ex8-4,dp4-4


// Card ID: dp3-3,pl4-1,base4-4,base6-3,det1-5,sm75-3,base1-4,sm9-14,ecard1-6,ex16-6,bw11-19,xy12-11,bw7-20,swsh4-25,ecard1-39,ecard1-40,swshp-SWSH066,g1-RC5,ex3-100,dp7-103,bw8-136,smp-SM158,ecard3-146,smp-SM226,cel25c-4_A,pgo-10,swsh11tg-TG03







//////////////////////*css*/`

// function setupConsole() {
//   // Create the Toggle Button
//   const toggleButton = document.createElement('button');
//   toggleButton.id = 'toggle-button';
//   toggleButton.textContent = 'Toggle Console';

//   // Append the toggle button to the body
//   document.body.appendChild(toggleButton);

//   // Create the Console Container
//   const consoleContainer = document.createElement('div');
//   consoleContainer.id = 'console';
//   document.body.appendChild(consoleContainer);

//   // Create the Output Area
//   const outputDiv = document.createElement('div');
//   outputDiv.id = 'output';
//   consoleContainer.appendChild(outputDiv);

//   // Create the Input Area
//   const inputContainer = document.createElement('div');
//   inputContainer.id = 'input-container';
//   consoleContainer.appendChild(inputContainer);

//   const inputSpan = document.createElement('span');
//   inputSpan.textContent = '>';
//   inputContainer.appendChild(inputSpan);

//   const inputField = document.createElement('input');
//   inputField.id = 'input';
//   inputField.type = 'text';
//   inputField.autofocus = true;
//   inputContainer.appendChild(inputField);

//   // Toggle button functionality
//   toggleButton.addEventListener('click', function () {
//     if (consoleContainer.style.display === 'none') {
//       consoleContainer.style.display = 'flex';
//     } else {
//       consoleContainer.style.display = 'none';
//     }
//   });

//   // Handle input
//   inputField.addEventListener('keydown', function (event) {
//     if (event.key === 'Enter') {
//       const inputValue = inputField.value.trim();
      
//       if (inputValue !== "") {
//         const newOutput = document.createElement('div');
//         newOutput.textContent = `> ${inputValue}`;
//         outputDiv.appendChild(newOutput);

//         // You can add any custom command logic here
//         const commandResponse = document.createElement('div');
//         commandResponse.textContent = `Executed: ${inputValue}`;
//         outputDiv.appendChild(commandResponse);

//         // Scroll to the bottom
//         outputDiv.scrollTop = outputDiv.scrollHeight;

//         // Clear the input field for the next command
//         inputField.value = "";
//       }
//     }
//   });
// }



// function setupConsoleNew() {
//   // Create the Toggle Button
//   const toggleButton = document.createElement('button');
//   toggleButton.id = 'toggle-button';
//   toggleButton.textContent = 'Toggle Console';

//   // Append the toggle button to the body (You can place this in any desired position)
//   document.body.appendChild(toggleButton);

//   // Create the Console Container
//   const consoleContainer = document.createElement('div');
//   consoleContainer.id = 'console';
//   document.body.appendChild(consoleContainer);

//   // Create the Output Area
//   const outputDiv = document.createElement('div');
//   outputDiv.id = 'output';
//   consoleContainer.appendChild(outputDiv);

//   // Create the Input Area
//   const inputContainer = document.createElement('div');
//   inputContainer.id = 'input-container';
//   consoleContainer.appendChild(inputContainer);

//   const inputSpan = document.createElement('span');
//   inputSpan.textContent = '>';
//   inputContainer.appendChild(inputSpan);

//   const inputField = document.createElement('input');
//   inputField.id = 'input';
//   inputField.type = 'text';
//   inputField.autofocus = true;
//   inputContainer.appendChild(inputField);

//   // Toggle button functionality
//   toggleButton.addEventListener('click', function () {
//     if (consoleContainer.style.display === 'none') {
//       consoleContainer.style.display = 'flex';
//     } else {
//       consoleContainer.style.display = 'none';
//     }
//   });

//   // Handle input
//   inputField.addEventListener('keydown', function (event) {
//     if (event.key === 'Enter') {
//       const inputValue = inputField.value.trim();
      
//       if (inputValue !== "") {
//         const newOutput = document.createElement('div');
//         newOutput.textContent = `> ${inputValue}`;
//         outputDiv.appendChild(newOutput);

//         // You can add any custom command logic here
//         const commandResponse = document.createElement('div');
//         commandResponse.textContent = `Executed: ${inputValue}`;
//         outputDiv.appendChild(commandResponse);

//         // Scroll to the bottom
//         outputDiv.scrollTop = outputDiv.scrollHeight;

//         // Clear the input field for the next command
//         inputField.value = "";
//       }
//     }
//   });
// };

// document.addEventListener('DOMContentLoaded', () => {
//   setupConsoleNew(); // Initialize the console when the DOM is fully loaded
// });


function showDetails(data, outputElement) {
  let details =  document.getElementById(outputElement)

  function addPokemonDetail(label, id) {
    if (!document.getElementById(id)) {
      console.log(`Element with ID '${id}' not found. Creating it now.`);


    const detailsDiv = document.getElementById('details');
    const p = document.createElement('p');
    p.id = id; // Set the ID for the new element
    p.textContent = label;
    detailsDiv.appendChild(p);
    }
  }



  // function checkPokeDetails() {
  //   if (!document.getElementById('pokemon-id') || !document.getElementById('pokemon-height') || 
  //   !document.getElementById('pokemon-weight') ||
  //   !document.getElementById('pokemon-types') ||
  //   !document.getElementById('types') ||
  //   !document.getElementById('pokemon-hp') ||
  //   !document.getElementById('pokemon-subtypes') ||
  //   !document.getElementById('number') ||
  //   !document.getElementById('pokemon-artist') ||
  //   !document.getElementById('pokemon-rarity') ||
  //   !document.getElementById('pokemon-flavorText') ||
  //   !document.getElementById('pokemon-nationalPokedexNumbers') ||
  //   !document.getElementById('pokemon-name')) {
  //     console.log("Some Poke details elements not found.");
      
  //     // const pokeData = [
  //     //   { label: 'ID', value: data.id, id: 'pokemon-id' },
  //     //   { label: 'Height', value: data.height, id: 'pokemon-height' },
  //     //   { label: 'Weight', value: data.weight, id: 'pokemon-weight' },
  //     //   { label: 'Types', value: data.types.map(type => type.type.name).join(', '), id: 'pokemon-types' },
  //     //   { label: 'HP', value: data.stats.find(stat => stat.stat.name === 'hp').base_stat, id: 'pokemon-hp' },
  //     //   { label: 'Subtypes', value: data.subtypes ? data.subtypes.join(', ') : '', id: 'pokemon-subtypes' },
  //     //   { label: 'Number', value: data.number, id: 'number' },
  //     //   { label: 'Artist', value: data.artist || '', id: 'pokemon-artist' },
  //     //   { label: 'Rarity', value: data.rarity || '', id: 'pokemon-rarity' },
  //     //   { label: 'Flavor Text', value: data.flavorText || '', id: 'pokemon-flavorText' },
  //     //   { label: 'National Pokedex Numbers', value: data.nationalPokedexNumbers ? data.nationalPokedexNumbers.join(', ') : '', id: 'pokemon-nationalPokedexNumbers' },
  //     //   { label: 'Name', value: data.name, id: 'pokemon-name' }
  //     //   ];

  //     const pokeData = [
  //       { label: 'ID', id: 'pokemon-id' },
  //       { label: 'Height', id: 'pokemon-height' },
  //       { label: 'Weight', id: 'pokemon-weight' },
  //       { label: 'Types', id: 'pokemon-types' },
  //       { label: 'HP', id: 'pokemon-hp' },
  //       { label: 'Subtypes', id: 'pokemon-subtypes' },
  //       { label: 'Number', id: 'number' },
  //       { label: 'Artist', id: 'pokemon-artist' },
  //       { label: 'Rarity', id: 'pokemon-rarity' },
  //       { label: 'Flavor Text', id: 'pokemon-flavorText' },
  //       { label: 'National Pokedex Numbers', id: 'pokemon-nationalPokedexNumbers' },
  //       { label: 'Name', id: 'pokemon-name' }
  //       ];

      
  //       pokeData.forEach(({ label, id }) => {
  //       console.log(`Adding detail: ${label} with id: ${id}`);
  //       addPokemonDetail(label, id); // Add Pokémon details dynamically
  //     });
        
  //     console.log("Poke details elements created.");  
  //   }
  //   else{

  //     // Usage
  //     //saddDetail('Ability', 'Levitate', 'pokemon-ability');
  //     //addDetail('Base Experience', 270, 'pokemon-base-exp');
  //     addPokemonDetail('ID', 'pokemon-id'); // Add Pokémon ID
  //     addPokemonDetail('Height', 'pokemon-height'); // Add Pokémon height
  //     addPokemonDetail('Weight', 'pokemon-weight'); // Add Pokémon weight
  //     addPokemonDetail('HP', 'pokemon-hp'); // Add Pokémon HP
  //     addPokemonDetail('Subtypes', 'pokemon-subtypes'); // Add Pokémon subtypes
  //     addPokemonDetail('Types', 'pokemon-types'); // Add Pokémon types
  //     //addPokemonDetail('Types', data.types.map(type => type.type.name).join(', ')); // Add Pokémon types
  //     addPokemonDetail('Name', 'pokemon-name'); // Add Pokémon name
  //     addPokemonDetail('Artist', 'pokemon-artist'); // Add Pokémon artist
  //     addPokemonDetail('Rarity', 'pokemon-rarity'); // Add Pokémon rarity
  //     addPokemonDetail('Flavor Text', 'pokemon-flavorText'); // Add Pokémon flavor text
  //     addPokemonDetail('National Pokedex Numbers', 'pokemon-nationalPokedexNumbers'); // Add Pokémon national Pokedex numbers
  //     addPokemonDetail('Number', 'pokemon-number'); // Add Pokémon number

  //     console.log("Poke details elements found.");
  //   }
  // }
  // checkPokeDetails(); // Check if the Pokémon details elements exist

  function ensuredDetails(details) {
    details.forEach(({ label, id }) => {
      const existingElement = document.getElementById(id);

      if (!existingElement) {
        console.log(`Element with ID '${id}' not found. Creating it now.`);

        const detailsDiv = document.getElementById('details');
        const p = document.createElement('p');
        p.id = id; // Set the ID for the new element
        p.textContent = label;
        p.style.color = 'black'; // Set text color to black for visibility
        detailsDiv.appendChild(p);
      }
    });
    
    console.log("All details elements ensured.");
  }

  const pokeData = [
    { label: 'ID: ', id: 'pokemon-id' },
    // { label: 'Height: ', id: 'pokemon-height' },
    // { label: 'Weight: ', id: 'pokemon-weight' },
    { label: 'Types: ', id: 'pokemon-types' },
    { label: 'Evolves From: ', id: 'pokemon-envolvesFrom' },
    { label: 'HP: ', id: 'pokemon-hp' },
    { label: 'Subtypes: ', id: 'pokemon-subtypes' },
    { label: 'Number: ', id: 'pokemon-number' },
    { label: 'Artist: ', id: 'pokemon-artist' },
    { label: 'Rarity: ', id: 'pokemon-rarity' },
    { label: 'Flavor Text: ', id: 'pokemon-flavorText' },
    { label: 'National Pokedex Numbers: ', id: 'pokemon-nationalPokedexNumbers' },
    { label: 'Name: ', id: 'pokemon-name' }
  ];

  try{
    ensuredDetails(pokeData); // Ensure all details elements exist
  }
  catch (error) {
    console.error('Error ensuring details elements:', error);
    return; // Exit if there is an error
  }
  


  if (!details) {
    console.error(`Element with ID '${outputElement}' not found.`);
    return; // Exit if the details element is not found
  }
  else{
    console.log(`Element with ID '${outputElement}' found.`);
  }

  details.style.display = 'block'; // Ensure the details section is visible

  console.log(`Typing data: ${data}`); // Log the data being typed

  console.log(`Data type: ${typeof data}`); // Log the type of text)

  // console.log(`Data ${data.id}`)
  // console.log(`Data type : ${typeof data.id}`); // Log the type of text )

  console.log(`Data name: ${data.name}`); // Log the name of the Pokémon
  console.log(`Data type: ${typeof data.name}`); // Log the type of name

  const text = typeof data === 'object' ? JSON.stringify(data, null, 2) : data; // Convert object to string if needed


  //console.log(`type of height: ${typeof data.height}`); // Log the type of height

  //old ver
  // try{
  //   typeText(data.id.toString(), 'pokemon-id'); // Type the ID character by character
  //   typeText(data.name.toString(), 'pokemon-name'); // Type the name character by character
  //   //typeText(data.height.toString(), 'pokemon-height'); // Type the height character by character
  //   //typeText(data.weight.toString(), 'pokemon-weight'); // Type the weight character by character
  //   //typeText(data.types ? data.types.map(type => type.type.name).join(', ') : '', 'types', i); // Type the types character by character
  //   typeText(data.types.toString(), 'pokemon-types'); // Type the types character by character
  //   typeText(data.envolvesFrom.toString(), 'pokemon-envolvesFrom'); // Type the evolves from character by character
  //   typeText(data.subtypes.toString(), 'pokemon-subtypes'); // Type the subtypes character by character
  //   typeText(data.hp.toString(), 'pokemon-hp')
  //   typeText(data.artist.toString(), 'pokemon-artist'); // Type the artist character by character
  //   typeText(data.rarity.toString(), 'pokemon-rarity'); // Type the rarity character by character
  //   typeText(data.flavorText.toString(), 'pokemon-flavorText'); // Type the
  //   typeText(data.nationalPokedexNumbers.toString(), 'pokemon-nationalPokedexNumbers'); // Type the national Pokedex numbers character by character
  //   typeText(data.number.toString(), 'pokemon-number'); // Type the number character by character

  //   console.log('Details typing complete.'); // Log when all details have been typed
  // }
  // catch (error) {
  //   console.error('Error typing details:', error.message || error); // Log any errors that occur during typing
  //   console.error('Stack trace:', error.stack); // Log the stack trace for debugging
  //   return; // Exit if there is an error
  // }

  function addDetail(){
    // Create parent card-content if not exists
    let cardContent = document.querySelector('.card-content');
    if (!cardContent) {
        cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        document.body.appendChild(cardContent); // Or append to another container
    }

    // Create card-details if not exists
    let cardDetails = cardContent.querySelector('.card-details');
    if (!cardDetails) {
        cardDetails = document.createElement('div');
        cardDetails.className = 'card-details';
        cardContent.appendChild(cardDetails);
    }

    // Helper to create and append labeled div if not exists
    function createLabeledDivIfNotExist(id, labelText) {
        if (!document.getElementById(id)) {
            const div = document.createElement('div');
            div.id = id;
            div.innerHTML = `<strong>${labelText}: </strong>Text Node`;
            cardDetails.appendChild(div);
        }
    }

    // Basic info
    createLabeledDivIfNotExist('pokemon-types', 'Type');
    createLabeledDivIfNotExist('pokemon-hp', 'HP');
    createLabeledDivIfNotExist('pokemon-number', 'Number');
    createLabeledDivIfNotExist('pokemon-collection', 'Collection');

    // Attack section
    if (!cardDetails.querySelector('.attack')) {
        const attackDiv = document.createElement('div');
        attackDiv.className = 'attack';
        attackDiv.innerHTML = `
            <h4>Attack type</h4>
            <p id="pokemon-attackCost"><strong>Cost: </strong>Text Node</p>
            <p id="pokemon-attackDescription"><strong>Description: </strong>Text Node</p>
        `;
        cardDetails.appendChild(attackDiv);
    }

    // Weakness section
    if (!cardDetails.querySelector('.weakness')) {
        const weaknessDiv = document.createElement('div');
        weaknessDiv.className = 'weakness';
        weaknessDiv.innerHTML = `
            <h4>Weakness</h4>
            <p id="pokemon-weakness"><strong>Type: </strong>Text Node</p>
            <p id="pokemon-weaknessValue"><strong>Value: </strong>Text Node</p>
        `;
        cardDetails.appendChild(weaknessDiv);
    }

    // Market price section
    if (!cardDetails.querySelector('.market-price')) {
        const marketDiv = document.createElement('div');
        marketDiv.className = 'market-price';
        marketDiv.innerHTML = `
            <p id="pokemon-marketPrice"><strong>Market Price (tcgplayer): </strong>Text Node</p>
            <p id="pokemon-trendPrice"><strong>Trend Price (card market)</strong>Text Node</p>
        `;
        cardDetails.appendChild(marketDiv);
    }

    // Rarity section
    if (!document.getElementById('pokemon-rarity')) {
        const rarityDiv = document.createElement('div');
        rarityDiv.className = 'rarity';
        rarityDiv.innerHTML = `<p id="pokemon-rarity"><strong>Rarity: </strong>Text Node</p>`;
        cardDetails.appendChild(rarityDiv);
    }

    // Pokedex section
    if (!document.getElementById('pokemon-pokedex')) {
        const pokedexDiv = document.createElement('div');
        pokedexDiv.className = 'pokedex';
        pokedexDiv.innerHTML = `<p id="pokemon-pokedex"><strong>National Pokedex Numbers: </strong>Text Node</p>`;
        cardDetails.appendChild(pokedexDiv);
    }

    // Flavor text section
    if (!document.getElementById('pokemon-flavorText')) {
        const flavorDiv = document.createElement('div');
        flavorDiv.className = 'flavor-text';
        flavorDiv.innerHTML = `<p id="pokemon-flavorText">Flavor text</p>`;
        cardDetails.appendChild(flavorDiv);
    }

    // Card footer
    if (!cardDetails.querySelector('.card-footer')) {
        const footerDiv = document.createElement('div');
        footerDiv.className = 'card-footer';
      footerDiv.innerHTML = `<p id="">Release date</p><!-- dragon vault (black & white). holo effect -->`;
      cardDetails.appendChild(footerDiv);
    }

  }


const listtypes = {
    "Grass": ["Green", "LightGreen"], // Grass with a gradient from green to light green
    "Poison": ["Purple", "Violet"], // Poison with a gradient from purple to violet
    "Fire": ["Orange", "Red"], // Fire with a gradient from orange to red
    "Water": ["Blue", "LightBlue"], // Water with a gradient from blue to light blue
    "Bug": ["LimeGreen", "YellowGreen"], // Bug with a gradient from lime green to yellow green
    "Normal": ["Beige", "LightGray"], // Normal with a gradient from beige to light gray
    "Flying": ["SkyBlue", "LightSkyBlue"], // Flying with a gradient from sky blue to light sky blue
    "Electric": ["Yellow", "LightYellow"], // Electric with a gradient from yellow to light yellow
    "Lightning": ["Yellow", "LightYellow"], // Electric with a gradient from yellow to light yellow
    "Ground": ["Brown", "Tan"], // Ground with a gradient from brown to tan
    "Fairy": ["#ff00d0", "#ffa8ef"], // Fairy with a gradient from pink to light pink
    "Fighting": ["#ff6200", "DarkRed"], // Fighting with a gradient from crimson to dark red
    "Psychic": ["#4b2d59", "#bc80d9"], // Psychic with a gradient from lavender to mauve
    "Rock": ["SlateGray", "DarkGray"], // Rock with a gradient from slate gray to dark gray
    "Ghost": ["Lavender", "LightPurple"], // Ghost with a gradient from lavender to light purple
    "Steel": ["Silver", "Gray"], // Steel with a gradient from silver to gray
    "Ice": ["LightCyan", "Cyan"], // Ice with a gradient from light cyan to cyan
    "Dragon": ["#B9B679", "#a1a19f"], // Dragon with a gradient from royal blue to deep sky blue
    "Darkness": ["#1d484a", "Black"], // Dark with a gradient from dark gray to black
    "Colorless": ["White", "LightGray"], // Colorless with a gradient from white to light gray
    "Metal": ["Silver", "Gray"] // Steel with a gradient from silver to gray
};


  for (let type of data.types) {  // Dùng 'of' để lấy từng phần tử trong mảng 'data.types'
      if (listtypes[type]) {  // Kiểm tra nếu loại có trong 'listtypes'
          console.log(`Type: ${type}, Color: ${listtypes[type]}`);
          try{
            const gradient = listtypes[type].map(color => color.toLowerCase()).join(' , ');

            //document.body.style.setProperty('background-color', listtypes[type].toLowerCase(), 'important');
            
            // Apply the gradient as the background
            document.body.style.setProperty('background', `linear-gradient(to right, ${gradient})`, 'important');

            // document.body.style.backgroundColor = "";
            // document.body.style.backgroundColor = 'red'; // Reset background color
            console.log(`Gradient background set to: ${listtypes[type].join(' to ')}`);

          }
          catch (error) {
            console.log('cant Change');
          }
          console.log("setted");
      } else {
          console.log(`Type: ${type} not matched`); // Log khi không có sự trùng khớp
      }
  }

  console.log(listtypes);




  addDetail(); // Call the function to add the details

  try{
    typeText(data.id.toString(), 'pokemon-id'); // Type the ID character by character
    typeText(data.name.toString(), 'pokemon-name'); // Type the name character by character

    typeText(data.height ? data.height.toString() : 'N/A', 'pokemon-height'); // Type the height character by character
    typeText(data.weight ? data.weight.toString() : 'N/A', 'pokemon-weight'); // Type the weight character by character
    typeText((data.types || []).join(', '), 'pokemon-types'); // Type the types character by character
    typeText(data.evolvesFrom ? data.evolvesFrom.toString() : 'N/A', 'pokemon-envolvesFrom'); // Type the evolves from character by character
    typeText(data.hp ? data.hp.toString() : 'N/A', 'pokemon-hp'); // Type the HP character by character
    typeText((data.subtypes || []).join(', '), 'pokemon-subtypes'); // Type the subtypes character by character
    typeText(data.number ? data.number.toString() : 'N/A', 'pokemon-number'); // Type the number character by character
    typeText(data.artist ? data.artist.toString() : 'N/A', 'pokemon-artist'); // Type the artist character by character
    typeText(data.rarity ? data.rarity.toString() : 'N/A', 'pokemon-rarity'); // Type the rarity character by character
    typeText(data.flavorText ? data.flavorText.toString() : 'N/A', 'pokemon-flavorText'); // Type the flavor text character by character
    typeText((data.nationalPokedexNumbers || []).join(', '), 'pokemon-nationalPokedexNumbers'); // Type the national Pokedex numbers character by character
  }
  catch (error) {
    console.error('Error typing details:', error.message || error); // Log any errors that occur during typing
    console.error('Stack trace:', error.stack); // Log the stack trace for debugging
    return; // Exit if there is an error
  }

  console.log(data.cardmarket.prices.trendPrice); // Log the market price from tcgplayer

  try {
    typeText((data.types || []).join(', '), 'poke-types'); // Type the types character by character
    typeText(data.hp ? data.hp.toString() : 'N/A', 'poke-hp'); // Type the HP character by character
    typeText(data.number ? data.number.toString() : 'N/A', 'poke-number'); // Type the number character by character
    typeText(data.set.name ? data.set.name.toString() : 'N/A', 'poke-collection'); // Type the collection name character by character
    typeText((data.attacks || []).map(attack => attack.cost ? attack.cost.join(', ') : 'N/A').join(', '), 'poke-attackCost'); // Type the attack cost character by character
    typeText((data.attacks || []).map(attack => attack.text ? attack.text.toString() : 'N/A').join(', '), 'poke-attackDescription'); // Type the attack description character by character
    typeText((data.weaknesses || []).map(weakness => weakness.type ? weakness.type.toString() : 'N/A').join(', '), 'poke-weakness'); // Type the weakness type character by character
    typeText((data.weaknesses || []).map(weakness => weakness.value ? weakness.value.toString() : 'N/A').join(', '), 'poke-weaknessValue'); // Type the weakness value character by character
    //typeText(data.tcgplayer ? data.tcgplayer.marketPrice.toString() : 'N/A', 'poke-marketPrice'); // Type the market price character by character
    typeText(data.cardmarket ? data.cardmarket.prices.trendPrice.toString() : 'N/A', 'poke-trendPrice'); // Type the trend price character by character
    typeText(data.rarity ? data.rarity.toString() : 'N/A', 'poke-rarity'); // Type the rarity character by character
    typeText(data.pokedex ? data.pokedex.toString() : 'N/A', 'poke-pokedex'); // Type the Pokedex character by character
    typeText(data.flavorText ? data.flavorText.toString() : 'N/A', 'poke-flavorText'); // Type the flavor text character by character
    typeText(data.set.releaseDate ? data.set.releaseDate.toString() : 'N/A', 'release-date'); // Type the release date character by character
    console.log('Details typing complete.'); // Log when all details have been typed
  } catch (error) {
    console.error('Error in showDetails:', error.message || error); // Log any errors that occur during showDetails
    console.error('Stack trace:', error.stack); // Log the stack trace for debugging
    return; // Exit if there is an error
  }
}

function typeText(text, elementId, i = 0) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with ID '${elementId}' not found.`);
    return; // Exit if the element is not found
  }

  if (i < text.length) {
    //element.style.color = 'red';
    element.textContent += text.charAt(i); // Type the text character by character
    setTimeout(() => typeText(text, elementId, i + 1), 100); // Adjust the typing speed as needed
  } else {
    console.log(`${elementId} typing complete.`);
  }
}


function clearCardDetails() {
    const fields = [
        'pokemon-types',
        'pokemon-hp',
        'pokemon-number',
        'pokemon-collection',
        'pokemon-attackCost',
        'pokemon-attackDescription',
        'pokemon-weakness',
        'pokemon-weaknessValue',
        'pokemon-marketPrice',
        'pokemon-trendPrice',
        'pokemon-rarity',
        'pokemon-pokedex',
        'pokemon-flavorText'
    ];

    for (const id of fields) {
        const el = document.getElementById(id);
        if (!el) continue;

        const strong = el.querySelector('strong');
        
        if (strong) {
            // Remove all text nodes after <strong>
            // Clear everything and re-append just the <strong>
            el.textContent = '';
            el.appendChild(strong);
        } else {
            // If no <strong>, just clear the element (e.g. for flavor text)
            el.textContent = '';
        }
    }
}



// const div = document.createElement('div'); // Create a div element for the blur effect
// const strong = document.createElement('strong'); // Create a strong element for the loading text
// strong.textContent = 'Loading...'; // Set the loading text

// const textNode = document.createTextNode(''); // Create a text node to hold the loading text

// div.appendChild(strong); // Append the strong element to the div
// div.appendChild(textNode); // Append the text node to the div

// document.body.appendChild(div); // Append the div to the body

////// suggertions for fetching Pokémon cards 
// let isFetching = false; // Cờ để ngăn chặn việc fetch trùng lặp

// // Hàm để thực hiện fetch thẻ
// function fetchCardDetails() {
//   // Lấy một ID ngẫu nhiên mới từ mảng các ID
//   let randomID = getPokemonRandom(ids);
//   console.log("ID ngẫu nhiên trong ids: ", randomID);

//   // Thực hiện fetch dữ liệu cho ID ngẫu nhiên
//   fetchCard(randomID)
//     .then(response => {
//       console.log("Dữ liệu thẻ đã được lấy thành công:", response);
//     })
//     .catch(error => {
//       console.error('Lỗi khi lấy dữ liệu thẻ:', error);
//     })
//     .finally(() => {
//       isFetching = false; // Reset cờ sau khi fetch hoàn tất
//     });
// }

// // Fetch lần đầu tiên khi trang tải
// fetchCardDetails(); // Gọi hàm ngay khi tải trang

// // Lắng nghe sự kiện click để fetch lại dữ liệu khi người dùng click
// document.addEventListener('click', (e) => {
//   // Nếu đang fetch, ngừng xử lý thêm click
//   if (isFetching) {
//     console.log("Đang fetch thẻ, vui lòng đợi.");
//     e.preventDefault(); // Ngừng hành động mặc định nếu cần
//     e.stopPropagation(); // Ngừng sự kiện tiếp tục lây lan
//     return; // Không thực hiện fetch mới
//   }

//   // Đặt cờ là true để báo đang fetch
//   isFetching = true;

//   // Gọi lại hàm fetch khi có click
//   fetchCardDetails();
// });



function Test2() {
  document.getElementById("myButton").innerHTML = "You Clicked Me!";
  
  const currentPath = window.location.pathname;  // e.g., /Pokemon%20API%20Practice/
  const newPath = currentPath + 'example';       // e.g., /Pokemon%20API%20Practice/example

  // Redirect to the new URL
  window.location.href = newPath;
  console.log(`Redirecting to: ${newPath}`); // Log the new path for debugging
}

function clearSearch() {
  document.getElementById('poke-name').value = '';
  document.getElementById('suggestionList').innerHTML = '';
}


document.getElementById('poke-name').addEventListener('keyup', function() {
  suggestSearch();
});

//export 
function suggestSelected(name) {
  console.log(`Selected suggestion: ${name}`);
}

async function fetchWithNestedLoops() {
  const baseURL = 'https://jsonplaceholder.typicode.com/posts';
  const categories = ['category1', 'category2'];  // Loop for categories
  const pageNumbers = [1, 2];  // Loop for pagination

  for (let category of categories) {
    for (let page of pageNumbers) {
      const url = `${baseURL}?category=${category}&_page=${page}&_limit=3`;  // Construct URL dynamically
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(`Data for ${category} page ${page}:`, data);
      } catch (error) {
        console.error(`Error fetching data for ${category} page ${page}:`, error);
      }
    }
  }
}

async function fetchAllCardOfPokemon(pokeName = 'Pikachu') {
  console.log(`Fetching all cards for Pokémon: ${pokeName}`);

  const url = `https://api.pokemontcg.io/v2/cards?q=name:${pokeName}`; // Use the query parameter for name search

  const baseURL = 'https://api.pokemontcg.io/v2/cards';

  try{
    const response = await fetch(url);
    const data = await response.json();
    console.log(`All cards for ${pokeName}:`, data);

    const allIds = data.data.map(item => item.id);
    console.log(allIds); // Output: ['basep-1', 'basep-2', 'basep-3']
    console.log((typeof allIds)); // Output: object

    if (Array.isArray(allIds)) {
      console.log('ids is an array');
    } else {
      console.error('Error: ids is not an array');
    }

    allIds.forEach(id => {
        console.log(`Fetching details for card ID: ${id}`);
      });

    // for (let id of allIds) {
    //   url = `https://api.pokemontcg.io/v2/cards?q=name:${pokeName}`; // Use the query parameter for name search
    //   try {
    //     const response = await fetch(url);

    const img = data.data.map(item => item.images.small);
    console.log(img); // Output: ['basep-1', 'basep-2', 'basep-3']
    console.log((typeof img)); // Output: object
  }
  catch (error) {
    console.error(`Error fetching all cards for ${pokeName}:`, error);
  }

  
}

document.getElementById('listAllButton').addEventListener('click', function(e) {
  console.log('List All button clicked');
  //fetchWithNestedLoops();

  fetchAllCardOfPokemon('Charizard');
});



const galleryImages = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('closeimgBtn');

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = 'none';
  }
});
