// // // Hàm lấy ảnh của thẻ bài từ ID
// // function getImageFromData(cardID) {
// //     return new Promise((resolve, reject) => {
// //         const url = `https://api.pokemontcg.io/v2/cards/${cardID}`;
// //         fetch(url)
// //             .then(response => response.json())
// //             .then(data => {
// //                 if (data && data.data) {
// //                     const card = data.data;
// //                     const cardImage = card.images.large;
// //                     resolve(cardImage);
// //                 } else {
// //                     reject("Card data is missing or incorrect, can't get image");
// //                 }
// //             })
// //             .catch(error => reject(error));
// //     });
// // }

// // // Hàm random một tên Pokémon
// // function getRandomName(pokemonNames) {
// //     const randomPokemon = pokemonNames[Math.floor(Math.random() * pokemonNames.length)];
// //     return randomPokemon;
// // }

// // // Hàm random ID từ một mảng IDs
// // function getRandomIDFromList(ids) {
// //     const randomIndex = Math.floor(Math.random() * ids.length);
// //     return ids[randomIndex];
// // }

// // // Hàm lấy danh sách các ID của thẻ bài dựa trên tên Pokémon
// // function getIDFromName(pokemonName) {
// //     const dataUrl = `https://api.pokemontcg.io/v2/cards?q=name:${pokemonName}`;
// //     return fetch(dataUrl)
// //         .then(response => response.json())
// //         .then(data => {
// //             if (data.data && data.data.length > 0) {
// //                 // Lấy danh sách các ID của thẻ bài trùng tên Pokémon
// //                 const ids = data.data.map(card => card.id);
// //                 return ids;
// //             } else {
// //                 throw new Error(`No cards found for ${pokemonName}`);
// //             }
// //         })
// //         .catch(error => {
// //             console.error(`Error fetching IDs for ${pokemonName}:`, error);
// //         });
// // }

// // // Hàm chính để thực hiện random tên, lấy ID ngẫu nhiên và lấy ảnh
// // async function getRandomCards(pokemonNames, count = 6) {
// //     const randomNames = [];
// //     const randomCards = [];

// //     // Random 6 tên khác nhau
// //     for (let i = 0; i < count; i++) {
// //         const randomName = getRandomName(pokemonNames);
// //         randomNames.push(randomName);

// //         // Lấy danh sách IDs của thẻ bài theo tên Pokémon
// //         const ids = await getIDFromName(randomName);
// //         if (ids && ids.length > 0) {
// //             // Chọn một ID ngẫu nhiên từ danh sách IDs
// //             const randomID = getRandomIDFromList(ids);

// //             // Lấy ảnh của thẻ bài theo ID
// //             try {
// //                 const cardImage = await getImageFromData(randomID);
// //                 randomCards.push({
// //                     name: randomName,
// //                     image: cardImage,
// //                 });
// //             } catch (error) {
// //                 console.error(`Error fetching image for ${randomName}:`, error);
// //             }
// //         }
// //     }

// //     // Hiển thị thông tin các thẻ bài
// //     randomCards.forEach(card => {
// //         console.log(`Pokémon: ${card.name}`);
// //         console.log(`Image: ${card.image}`);
// //         // Bạn có thể hiển thị ảnh lên trang web nếu cần
// //         const imgElement = document.createElement('img');
// //         imgElement.src = card.image;
// //         imgElement.alt = card.name;
// //         imgElement.style.width = '300px'; // Điều chỉnh kích thước ảnh nếu cần
// //         document.body.appendChild(imgElement);
// //     });
// // }

// // // Danh sách tên Pokémon (mảng này cần được cung cấp hoặc lấy từ đâu đó)
// // const pokemonNames = ['pikachu', 'bulbasaur', 'charmander', 'squirtle', 'eevee', 'jigglypuff', 'snorlax', 'mewtwo'];

// // // Gọi hàm để lấy 6 thẻ bài ngẫu nhiên và hiển thị ảnh
// // getRandomCards(pokemonNames, 6);


// // ========================================
// // ✅ OPTIMIZED VERSION - TẠO URL TRỰC TIẾP TỪ ID
// // ========================================

// /**
//  * Tạo URL ảnh trực tiếp từ card ID (KHÔNG cần gọi API)
//  * Format: https://images.pokemontcg.io/{set}/{number}_hires.png
//  * Example: base1-4 → https://images.pokemontcg.io/base1/4_hires.png
//  */
// function getImageFromID(cardID) {
//     try {
//         const parts = cardID.split("-");
        
//         if (parts.length !== 2) {
//             throw new Error(`Invalid card ID format: ${cardID}`);
//         }
        
//         const setId = parts[0];    // e.g., "base1"
//         const cardNum = parts[1];  // e.g., "4"
        
//         // Tạo URL ảnh trực tiếp
//         const imageUrl = `https://images.pokemontcg.io/${setId}/${cardNum}_hires.png`;
        
//         console.log(`📸 Image URL: ${imageUrl}`);
        
//         return imageUrl;
//     } catch (error) {
//         console.error(`❌ Error creating image URL for ${cardID}:`, error.message);
//         return null;
//     }
// }

// /**
//  * Validate image URL (kiểm tra ảnh có tồn tại không)
//  * Trả về Promise với URL nếu OK, null nếu fail
//  */
// async function validateImageURL(imageUrl, cardID) {
//     try {
//         const response = await fetch(imageUrl, { method: 'HEAD' });
        
//         if (response.ok) {
//             console.log(`✓ Image valid: ${cardID}`);
//             return imageUrl;
//         } else {
//             console.log(`⚠️  Image not found (${response.status}): ${cardID}`);
//             return null;
//         }
//     } catch (error) {
//         console.error(`❌ Failed to validate ${cardID}:`, error.message);
//         return null;
//     }
// }

// /**
//  * OPTION 1: Lấy ảnh NHANH - Không validate (recommend)
//  * Giả định rằng URL luôn đúng
//  */
// function getImageFromIDFast(cardID) {
//     const parts = cardID.split("-");
//     if (parts.length !== 2) return null;
//     return `https://images.pokemontcg.io/${parts[0]}/${parts[1]}_hires.png`;
// }

// /**
//  * OPTION 2: Lấy ảnh AN TOÀN - Có validate
//  * Chậm hơn nhưng chắc chắn ảnh tồn tại
//  */
// async function getImageFromIDSafe(cardID) {
//     const imageUrl = getImageFromIDFast(cardID);
//     if (!imageUrl) return null;
//     return await validateImageURL(imageUrl, cardID);
// }

// // ========================================
// // ✅ CẢI THIỆN HÀM CHÍNH
// // ========================================

// async function getRandomCardsOptimized(count = 6, concurrentLimit = 3, validateImages = false) {
//     console.log(`\n⚡ FETCHING ${count} CARDS (Fast Mode: ${!validateImages}) ⚡\n`);
    
//     const startTime = performance.now();

    
//     const fetchSingleCard = async (index, maxRetry = 5) => {
//         let attemptFetch = 0;
//         while (attemptFetch < maxRetry)
//         {
//             console.log("Retry: ", attemptFetch);
//             try {
//                 const randomName = getRandomName();
//                 console.log(`[${index + 1}] Selected: ${randomName}`);

//                 const ids = await getIDFromName(randomName);

//                 if (ids && ids.length > 0) {
//                     const randomIDs = getIDRandom(ids, 1);
//                     const randomID = randomIDs[0];
                    
//                     console.log(`  → ID: ${randomID}`);

//                     // CHỌN 1 TRONG 2 OPTIONS:
//                     let cardImage;
//                     if (validateImages) {
//                         // Option 2: An toàn (chậm hơn)
//                         cardImage = await getImageFromIDSafe(randomID);
//                     } else {
//                         // Option 1: Nhanh (khuyến nghị)
//                         cardImage = getImageFromIDFast(randomID);
//                     }

//                     if (cardImage) {
//                         console.log(`  ✓ ${randomName} - Done!`);
//                         return {
//                             name: randomName,
//                             id: randomID,
//                             image: cardImage,
//                         };
//                     } else {
//                         console.log(`  ✗ Invalid image URL`);
//                         return null;
//                     }
//                 } else {
//                     console.log(`  ✗ No cards found`);
//                     return null;
//                 }
//             } catch (error) {
//                 console.error(`[${index + 1}] ✗ Error:`, error.message);
//                 //return null;
//             }
//             attemptFetch++;
//             console.log(`  → Retry ${attempt}/${maxRetry}...`);
//         }

//         // max retry still fail 
//         console.log(`[${index + 1}] ✗ Failed after ${maxRetry} attempts.`);
//         //return null;
//     };

//     // Xử lý theo batch
//     const results = [];
//     for (let i = 0; i < count; i += concurrentLimit) {
//         const batch = [];
//         const batchSize = Math.min(concurrentLimit, count - i);

//         console.log(`\n📦 Batch ${Math.floor(i / concurrentLimit) + 1}: ${batchSize} cards`);

//         for (let j = 0; j < batchSize; j++) {
//             batch.push(fetchSingleCard(i + j));
//         }

//         const batchResults = await Promise.all(batch);
//         results.push(...batchResults);

//         if (i + concurrentLimit < count) {
//             await new Promise(resolve => setTimeout(resolve, 500));
//         }
//     }
    
//     const randomCardList = results.filter(card => card !== null);

//     const endTime = performance.now();
//     const duration = ((endTime - startTime) / 1000).toFixed(2);

//     console.log('\n========== RESULTS ==========');
//     console.log(`✓ Success: ${randomCardList.length}/${count}`);
//     console.log(`⏱️  Time: ${duration}s\n`);

//     randomCardList.forEach((card, index) => {
//         console.log(`${index + 1}. ${card.name}`);
//         console.log(`   ID: ${card.id}`);
//         console.log(`   Image: ${card.image}\n`);
//     });

//     return randomCardList;
// }

// // ========================================
// // HELPER FUNCTIONS (GIỮ NGUYÊN)
// // ========================================

// function getRandomName() {
//     //const pokemonNames = ['Pikachu', 'Charizard', 'Mewtwo', 'Eevee']; // Shortened for example
//     const randomIndex = Math.floor(Math.random() * pokemonNames.length);
//     return pokemonNames[randomIndex];
// }

// function getRandomSeed() {
//     return Math.floor(Math.random() * 10000);
// }

// function getIDRandom(arr, count = 1) {
//     if (!arr || arr.length === 0) return [];
//     const uniqueIDs = new Set();
//     const maxAttempts = Math.min(count * 10, arr.length * 2);
//     let attempts = 0;
//     while (uniqueIDs.size < count && attempts < maxAttempts) {
//         const index = getRandomSeed() % arr.length;
//         uniqueIDs.add(arr[index]);
//         attempts++;
//     }
//     return Array.from(uniqueIDs);
// }

// async function getIDFromName(pokemonName) {
//     const lowerName = pokemonName.toLowerCase();
//     //const dataUrl = `https://api.pokemontcg.io/v2/cards?q=name:${pokemonName}`;
//     const dataUrl = `http://localhost:3000/api/cards?name=${pokemonName}`;

//     try {
//         const response = await fetch(dataUrl);
//         const data = await response.json();
//         if (data.data && data.data.length > 0) {
//             return data.data
//                 .filter(card => card.name.toLowerCase().includes(lowerName))
//                 .map(card => card.id);
//         }
//         return [];
//     } catch (error) {
//         console.error(`Error: ${pokemonName}`, error);
//         return [];
//     }
// }

// // ========================================
// // CÁCH SỬ DỤNG
// // ========================================

// // OPTION 1: NHANH NHẤT (không validate) ⭐ KHUYẾN NGHỊ
// // getRandomCardsOptimized(6, 3, false).then(cards => console.log(cards));

// // OPTION 2: AN TOÀN (có validate - chậm hơn)
// // getRandomCardsOptimized(6, 3, true).then(cards => console.log(cards));

// // Test riêng lẻ:
// // console.log(getImageFromIDFast('base1-4'));
// // console.log(getImageFromIDFast('xy1-42'));

// // Export
// if (typeof module !== 'undefined' && module.exports) {
//     module.exports = {
//         getImageFromID,
//         getImageFromIDFast,
//         getImageFromIDSafe,
//         getRandomCardsOptimized,
//         validateImageURL
//     };
// }