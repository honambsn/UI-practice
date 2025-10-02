const sampleData = {
  name: "Voltairyx",
  hp: "110",
  types: ["Electric"],
  subtypes: ["Basic"],
  attacks: [
    {
      name: "Static Pulse",
      cost: ["Electric"],
      text: "Flip a coin. If heads, the opponent’s Active Pokémon is now Paralyzed."
    },
    {
      name: "Storm Jolt",
      cost: ["Electric", "Colorless"],
      damage: "50",
      text: "If you have another Electric-type Pokémon on your Bench, this attack does 20 more damage."
    }
  ],
  weaknesses: [{ type: "Ground", value: "×2" }],
  retreatCost: ["Colorless"],
  flavorText: "Voltairyx builds up energy in its wings and releases it in bursts of crackling lightning as it soars through thunderstorms.",
  images: {
    large: "./default.png"
  },
  tcgplayer: {
    prices: {
      holofoil: {
        market: 4.85
      }
    }
  },
  cardmarket: {
    prices: {
      averageSellPrice: 4.10
    }
  }
};



let data = sampleData;
console.log(data.images.large)


function getJSONFromLocalStorage(key) {
  const jsonData = localStorage.getItem(key);

  // Check if the data exists in localStorage
  if (jsonData) {
    try {
      // Parse and return the JSON object
      return JSON.parse(jsonData);
    } catch (e) {
      console.error("Error parsing JSON data:", e);
      return null; // Return null if there's an error
    }
  } else {
    console.warn(`No data found for key: ${key}`);
    return null; // Return null if no data exists for the key
  }
}


data = getJSONFromLocalStorage("cardData");

if (data === null)
  data = sampleData;

if (data) {
  console.log("User data retrieved:", data);
} else {
  console.log("No user data found.");
}

// const 
pdata = {
  name: "Latias",
  hp: "100",
  types: ["Dragon"],
  subtypes: ["Basic"],
  attacks: [
    {
      name: "Energy Assist",
      cost: ["Colorless"],
      text: "Attach a basic Energy card from your discard pile to 1 of your Benched Pokémon."
    },
    {
      name: "Sky Heal",
      cost: ["Fire", "Psychic"],
      damage: "40",
      text: "If Latios is on your Bench, heal 20 damage from this Pokémon."
    }
  ],
  weaknesses: [{ type: "Dragon", value: "×2" }],
  retreatCost: ["Colorless"],
  flavorText: "Its body is covered in a down that can refract light in such a way that it becomes invisible.",
  images: {
    large: "https://images.pokemontcg.io/dv1/9_hires.png"
  },
  tcgplayer: {
    prices: {
      holofoil: {
        market: 6.72
      }
    }
  },
  cardmarket: {
    prices: {
      averageSellPrice: 5.02
    }
  }
};

function cardDetails(){
  document.getElementById("cardImage").src = data.images.large;
  document.getElementById("cardName").textContent = data.name;
  document.getElementById("hp").textContent = data.hp;
  document.getElementById("type").textContent = data.types.join(", ");
  document.getElementById("subtype").textContent = data.subtypes.join(", ");
  document.getElementById("weakness").textContent = `${data.weaknesses[0].type} ${data.weaknesses[0].value}`;
  document.getElementById("retreatCost").textContent = data.retreatCost.join(", ");
  document.getElementById("flavorText").textContent = data.flavorText;

  // Render attacks
  const attacksContainer = document.getElementById("attacks");
  data.attacks.forEach(atk => {
    const div = document.createElement("div");
    div.classList.add("attack-block");
    div.innerHTML = `
      <strong>${atk.name}</strong> (${atk.cost.join(", ")})<br>
      <em>${atk.text}</em>
      ${atk.damage ? `<div><strong>Damage:</strong> ${atk.damage}</div>` : ""}
    `;
    attacksContainer.appendChild(div);
  });

  // Prices
  document.getElementById("marketPrice").textContent = 
    data.tcgplayer.prices.normal && data.tcgplayer.prices.normal.market !== null && data.tcgplayer.prices.normal.market !== undefined 
    ? data.tcgplayer.prices.normal.market.toFixed(2)
    : "N/A";

  document.getElementById("avgPrice").textContent = 
    (data.cardmarket.prices.averageSellPrice !== null && data.cardmarket.prices.averageSellPrice !== undefined) 
    ? data.cardmarket.prices.averageSellPrice.toFixed(2) 
    : "N/A";


  // Toggle price section
  document.getElementById("togglePrices").addEventListener("click", () => {
    const prices = document.getElementById("prices");
    prices.classList.toggle("hidden");
    document.getElementById("togglePrices").textContent = 
      prices.classList.contains("hidden") ? "Show Prices" : "Hide Prices";
  });

}

cardDetails();


// ---
const cardImage = document.querySelector('.card-image');

cardImage.addEventListener('click', () => {
  cardImage.classList.add('active');
});

// cardImage.addEventListener('mouseleave', () => {
//   cardImage.classList.remove('active');
// });

document.addEventListener('click', function (e) {
        if (!cardImage.contains(e.target)) {
            cardImage.classList.remove('active');
        }
    });


function closeSearch() {
  const closeButton = document.getElementById('closeSearch');
  const cardContainer = document.getElementById('card-container');
  const imageContainer = document.getElementById('image-container');

  // Toggle class 'active'
  closeButton.classList.toggle('active');
  
  // Nếu class 'active' có, hiển thị card container và ẩn image container
  if (closeButton.classList.contains('active')) {
    cardContainer.style.display = 'flex';
    imageContainer.style.display = 'none';
  } 
  // Nếu class 'active' không có, ẩn card container và hiển thị image container
  else {
    cardContainer.style.display = 'none';
    imageContainer.style.display = 'flex';
  }
}

function backAnother() {
  const currentPath = window.location.pathname;  // e.g., /test%20API%20Practice/example/

  // Remove the last segment of the path using regex
  const previousPath = currentPath.replace(/\/[^\/]+\/?$/, '/');

  // If the path is empty, we go back to the root ("/")
  const finalPath = previousPath || '/';

  // Redirect to the previous path
  window.location.pathname = finalPath;

  console.log(`Redirecting to: ${finalPath}`);  // Log the new path for debugging
}


document.getElementById('closeSearch').addEventListener('click', backAnother)



// {
//     "id": "ecard1-44",
//     "name": "Dugtrio",
//     "supertype": "Pokémon",
//     "subtypes": [
//         "Stage 1"
//     ],
//     "hp": "70",
//     "types": [
//         "Fighting"
//     ],
//     "evolvesFrom": "Diglett",
//     "attacks": [
//         {
//             "name": "Mud Slap",
//             "cost": [
//                 "Fighting"
//             ],
//             "convertedEnergyCost": 1,
//             "damage": "20",
//             "text": ""
//         },
//         {
//             "name": "Magnitude",
//             "cost": [
//                 "Fighting",
//                 "Colorless",
//                 "Colorless"
//             ],
//             "convertedEnergyCost": 3,
//             "damage": "40",
//             "text": "Does 10 damage to each Benched Pokémon (yours and your opponent's). (Don't apply Weakness and Resistance for Benched Pokémon.)"
//         }
//     ],
//     "weaknesses": [
//         {
//             "type": "Grass",
//             "value": "×2"
//         }
//     ],
//     "resistances": [
//         {
//             "type": "Lightning",
//             "value": "-30"
//         }
//     ],
//     "retreatCost": [
//         "Colorless"
//     ],
//     "convertedRetreatCost": 1,
//     "set": {
//         "id": "ecard1",
//         "name": "Expedition Base Set",
//         "series": "E-Card",
//         "printedTotal": 165,
//         "total": 165,
//         "legalities": {
//             "unlimited": "Legal"
//         },
//         "ptcgoCode": "EX",
//         "releaseDate": "2002/09/15",
//         "updatedAt": "2022/10/10 15:12:00",
//         "images": {
//             "symbol": "https://images.pokemontcg.io/ecard1/symbol.png",
//             "logo": "https://images.pokemontcg.io/ecard1/logo.png"
//         }
//     },
//     "number": "44",
//     "artist": "Masako Yamashita",
//     "rarity": "Rare",
//     "nationalPokedexNumbers": [
//         51
//     ],
//     "legalities": {
//         "unlimited": "Legal"
//     },
//     "images": {
//         "small": "https://images.pokemontcg.io/ecard1/44.png",
//         "large": "https://images.pokemontcg.io/ecard1/44_hires.png"
//     },
//     "tcgplayer": {
//         "url": "https://prices.pokemontcg.io/tcgplayer/ecard1-44",
//         "updatedAt": "2025/10/02",
//         "prices": {
//             "normal": {
//                 "low": 3.99,
//                 "mid": 6.47,
//                 "high": 12.55,
//                 "market": 4.56,
//                 "directLow": null
//             },
//             "reverseHolofoil": {
//                 "low": 19.98,
//                 "mid": 19.98,
//                 "high": 30,
//                 "market": 25,
//                 "directLow": null
//             }
//         }
//     },
//     "cardmarket": {
//         "url": "https://prices.pokemontcg.io/cardmarket/ecard1-44",
//         "updatedAt": "2025/10/02",
//         "prices": {
//             "averageSellPrice": 1.91,
//             "lowPrice": 0.4,
//             "trendPrice": 2.67,
//             "germanProLow": 0,
//             "suggestedPrice": 0,
//             "reverseHoloSell": 3.14,
//             "reverseHoloLow": 0.4,
//             "reverseHoloTrend": 3.19,
//             "lowPriceExPlus": 1.5,
//             "avg1": 2,
//             "avg7": 1.95,
//             "avg30": 2.91,
//             "reverseHoloAvg1": 1,
//             "reverseHoloAvg7": 3.44,
//             "reverseHoloAvg30": 4.83
//         }
//     }
// }