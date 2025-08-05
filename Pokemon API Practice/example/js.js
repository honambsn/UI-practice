const data = {
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

// Populate base info
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
  data.tcgplayer.prices.holofoil.market.toFixed(2);
document.getElementById("avgPrice").textContent =
  data.cardmarket.prices.averageSellPrice.toFixed(2);

// Toggle price section
document.getElementById("togglePrices").addEventListener("click", () => {
  const prices = document.getElementById("prices");
  prices.classList.toggle("hidden");
  document.getElementById("togglePrices").textContent = 
    prices.classList.contains("hidden") ? "Show Prices" : "Hide Prices";
});
