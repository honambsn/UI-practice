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
