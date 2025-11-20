// // Hàm lấy ảnh của thẻ bài từ ID
// function getImageFromData(cardID) {
//     return new Promise((resolve, reject) => {
//         const url = `https://api.pokemontcg.io/v2/cards/${cardID}`;
//         fetch(url)
//             .then(response => response.json())
//             .then(data => {
//                 if (data && data.data) {
//                     const card = data.data;
//                     const cardImage = card.images.large;
//                     resolve(cardImage);
//                 } else {
//                     reject("Card data is missing or incorrect, can't get image");
//                 }
//             })
//             .catch(error => reject(error));
//     });
// }

// // Hàm random một tên Pokémon
// function getRandomName(pokemonNames) {
//     const randomPokemon = pokemonNames[Math.floor(Math.random() * pokemonNames.length)];
//     return randomPokemon;
// }

// // Hàm random ID từ một mảng IDs
// function getRandomIDFromList(ids) {
//     const randomIndex = Math.floor(Math.random() * ids.length);
//     return ids[randomIndex];
// }

// // Hàm lấy danh sách các ID của thẻ bài dựa trên tên Pokémon
// function getIDFromName(pokemonName) {
//     const dataUrl = `https://api.pokemontcg.io/v2/cards?q=name:${pokemonName}`;
//     return fetch(dataUrl)
//         .then(response => response.json())
//         .then(data => {
//             if (data.data && data.data.length > 0) {
//                 // Lấy danh sách các ID của thẻ bài trùng tên Pokémon
//                 const ids = data.data.map(card => card.id);
//                 return ids;
//             } else {
//                 throw new Error(`No cards found for ${pokemonName}`);
//             }
//         })
//         .catch(error => {
//             console.error(`Error fetching IDs for ${pokemonName}:`, error);
//         });
// }

// // Hàm chính để thực hiện random tên, lấy ID ngẫu nhiên và lấy ảnh
// async function getRandomCards(pokemonNames, count = 6) {
//     const randomNames = [];
//     const randomCards = [];

//     // Random 6 tên khác nhau
//     for (let i = 0; i < count; i++) {
//         const randomName = getRandomName(pokemonNames);
//         randomNames.push(randomName);

//         // Lấy danh sách IDs của thẻ bài theo tên Pokémon
//         const ids = await getIDFromName(randomName);
//         if (ids && ids.length > 0) {
//             // Chọn một ID ngẫu nhiên từ danh sách IDs
//             const randomID = getRandomIDFromList(ids);

//             // Lấy ảnh của thẻ bài theo ID
//             try {
//                 const cardImage = await getImageFromData(randomID);
//                 randomCards.push({
//                     name: randomName,
//                     image: cardImage,
//                 });
//             } catch (error) {
//                 console.error(`Error fetching image for ${randomName}:`, error);
//             }
//         }
//     }

//     // Hiển thị thông tin các thẻ bài
//     randomCards.forEach(card => {
//         console.log(`Pokémon: ${card.name}`);
//         console.log(`Image: ${card.image}`);
//         // Bạn có thể hiển thị ảnh lên trang web nếu cần
//         const imgElement = document.createElement('img');
//         imgElement.src = card.image;
//         imgElement.alt = card.name;
//         imgElement.style.width = '300px'; // Điều chỉnh kích thước ảnh nếu cần
//         document.body.appendChild(imgElement);
//     });
// }

// // Danh sách tên Pokémon (mảng này cần được cung cấp hoặc lấy từ đâu đó)
// const pokemonNames = ['pikachu', 'bulbasaur', 'charmander', 'squirtle', 'eevee', 'jigglypuff', 'snorlax', 'mewtwo'];

// // Gọi hàm để lấy 6 thẻ bài ngẫu nhiên và hiển thị ảnh
// getRandomCards(pokemonNames, 6);
