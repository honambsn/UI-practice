//https://pokemondb.net/tools/text-list
const pokemonNames = [
  'Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard', 'Squirtle', 'Wartortle', 'Blastoise',
  'Caterpie', 'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill', 'Pidgey', 'Pidgeotto', 'Pidgeot', 'Rattata', 
  'Raticate', 'Spearow', 'Fearow', 'Ekans', 'Arbok', 'Pikachu', 'Raichu', 'Sandshrew', 'Sandslash', 'Nidoran♀', 'Nidorina', 
  'Nidoqueen', 'Nidoran♂', 'Nidorino', 'Nidoking', 'Clefairy', 'Clefable', 'Vulpix', 'Ninetales', 'Jigglypuff', 'Wigglytuff',
  'Zubat', 'Golbat', 'Oddish', 'Gloom', 'Vileplume', 'Paras', 'Parasect', 'Venonat', 'Venomoth', 'Diglett', 'Dugtrio', 
  'Meowth', 'Persian', 'Psyduck', 'Golduck', 'Mankey', 'Primeape', 'Growlithe', 'Arcanine', 'Poliwag', 'Poliwhirl', 'Poliwrath',
  'Abra', 'Kadabra', 'Alakazam', 'Machop', 'Machoke', 'Machamp', 'Bellsprout', 'Weepinbell', 'Victreebel', 'Tentacool', 
  'Tentacruel', 'Geodude', 'Graveler', 'Golem', 'Ponyta', 'Rapidash', 'Slowpoke', 'Slowbro', 'Magnemite', 'Magneton', 'Farfetch\'d',
  'Doduo', 'Dodrio', 'Seel', 'Dewgong', 'Grimer', 'Muk', 'Shellder', 'Cloyster', 'Gastly', 'Haunter', 'Gengar', 'Onix', 'Drowzee',
  'Hypno', 'Krabby', 'Kingler', 'Voltorb', 'Electrode', 'Exeggcute', 'Exeggutor', 'Cubone', 'Marowak', 'Hitmonlee', 'Hitmonchan', 
  'Lickitung', 'Koffing', 'Weezing', 'Rhyhorn', 'Rhydon', 'Chansey', 'Tangela', 'Kangaskhan', 'Horsea', 'Seadra', 'Goldeen', 'Seaking',
  'Staryu', 'Starmie', 'Mr. Mime', 'Scyther', 'Jynx', 'Electabuzz', 'Magmar', 'Pinsir', 'Tauros', 'Magikarp', 'Gyarados', 'Lapras',
  'Ditto', 'Eevee', 'Vaporeon', 'Jolteon', 'Flareon', 'Porygon', 'Omanyte', 'Omastar', 'Kabuto', 'Kabutops', 'Aerodactyl', 'Snorlax',
  'Articuno', 'Zapdos', 'Moltres', 'Dratini', 'Dragonair', 'Dragonite', 'Mewtwo', 'Mew', 'Chikorita', 'Bayleef', 'Meganium', 
  'Cyndaquil', 'Quilava', 'Typhlosion', 'Totodile', 'Croconaw', 'Feraligatr', 'Sentret', 'Furret', 'Hoothoot', 'Noctowl', 'Ledyba', 
  'Ledian', 'Spinarak', 'Ariados', 'Crobat', 'Chinchou', 'Lanturn', 'Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Togetic', 'Natu', 
  'Xatu', 'Mareep', 'Flaaffy', 'Ampharos', 'Bellossom', 'Marill', 'Azumarill', 'Sudowoodo', 'Politoed', 'Hoppip', 'Skiploom', 
  'Jumpluff', 'Aipom', 'Sunkern', 'Sunflora', 'Yanma', 'Wooper', 'Quagsire', 'Espeon', 'Umbreon', 'Murkrow', 'Slowking', 'Misdreavus', 
  'Unown', 'Wobbuffet', 'Girafarig', 'Pineco', 'Forretress', 'Dunsparce', 'Gligar', 'Steelix', 'Snubbull', 'Granbull', 'Qwilfish', 
  'Scizor', 'Shuckle', 'Heracross', 'Sneasel', 'Teddiursa', 'Ursaring', 'Slugma', 'Magcargo', 'Swinub', 'Piloswine', 'Corsola', 
  'Remoraid', 'Octillery', 'Delibird', 'Mantine', 'Skarmory', 'Houndour', 'Houndoom', 'Kingdra', 'Phanpy', 'Donphan', 'Porygon2', 
  'Stantler', 'Smeargle', 'Tyrogue', 'Hitmontop', 'Smoochum', 'Elekid', 'Magby', 'Miltank', 'Blissey', 'Raikou', 'Entei', 'Suicune', 
  'Larvitar', 'Pupitar', 'Tyranitar', 'Lugia', 'Ho-oh', 'Celebi', 'Treecko', 'Grovyle', 'Sceptile', 'Torchic', 'Combusken', 'Blaziken', 
  'Mudkip', 'Marshtomp', 'Swampert', 'Poochyena', 'Mightyena', 'Zigzagoon', 'Linoone', 'Wurmple', 'Silcoon', 'Beautifly', 'Cascoon', 
  'Dustox', 'Lotad', 'Lombre', 'Ludicolo', 'Seedot', 'Nuzleaf', 'Shiftry', 'Taillow', 'Swellow', 'Wingull', 'Pelipper', 'Ralts', 
  'Kirlia', 'Gardevoir', 'Surskit', 'Masquerain', 'Shroomish', 'Breloom', 'Slakoth', 'Vigoroth', 'Slaking', 'Nincada', 'Ninjask', 
  'Shedinja', 'Whismur', 'Loudred', 'Exploud', 'Makuhita', 'Hariyama', 'Azurill', 'Nosepass', 'Skitty', 'Delcatty', 'Sableye', 'Mawile', 
  'Aron', 'Lairon', 'Aggron', 'Meditite', 'Medicham', 'Electrike', 'Manectric', 'Plusle', 'Minun', 'Volbeat', 'Illumise', 'Roselia', 
  'Gulpin', 'Swalot', 'Carvanha', 'Sharpedo', 'Wailmer', 'Wailord', 'Numel', 'Camerupt', 'Torkoal', 'Spoink', 'Grumpig', 'Spinda', 
  'Trapinch', 'Vibrava', 'Flygon', 'Cacnea', 'Cacturne', 'Swablu', 'Altaria', 'Zangoose', 'Seviper', 'Lunatone', 'Solrock', 'Barboach', 
  'Whiscash', 'Corphish', 'Crawdaunt', 'Baltoy', 'Claydol', 'Lileep', 'Cradily', 'Anorith', 'Armaldo', 'Feebas', 'Milotic', 'Castform', 
  'Kecleon', 'Shuppet', 'Banette', 'Duskull', 'Dusclops', 'Tropius', 'Chimecho', 'Absol', 'Wynaut', 'Snorunt', 'Glalie', 'Spheal', 'Sealeo', 
  'Walrein', 'Clamperl', 'Huntail', 'Gorebyss', 'Relicanth', 'Luvdisc', 'Bagon', 'Shelgon', 'Salamence', 'Beldum', 'Metang', 'Metagross',
  'Regirock', 'Regice', 'Registeel', 'Latias', 'Latios', 'Kyogre', 'Groudon', 'Rayquaza', 'Jirachi', 'Deoxys', 'Turtwig', 'Grotle', 
  'Torterra', 'Chimchar', 'Monferno', 'Infernape', 'Piplup', 'Prinplup', 'Empoleon', 'Starly', 'Staravia', 'Staraptor', 'Bidoof', 'Bibarel', 
  'Kricketot', 'Kricketune', 'Shinx', 'Luxio', 'Luxray', 'Budew', 'Roserade', 'Cranidos', 'Rampardos', 'Shieldon', 'Bastiodon', 'Burmy', 
  'Wormadam', 'Mothim', 'Combee', 'Vespiquen', 'Pachirisu', 'Buizel', 'Floatzel', 'Cherubi', 'Cherrim', 'Shellos', 'Gastrodon', 'Ambipom', 
  'Drifloon', 'Drifblim', 'Buneary', 'Lopunny', 'Mismagius', 'Honchkrow', 'Glameow', 'Purugly', 'Chingling', 'Stunky', 'Skuntank', 'Bronzor', 
  'Bronzong', 'Bonsly', 'Mime Jr.', 'Happiny', 'Chatot', 'Spiritomb', 'Gible', 'Gabite', 'Garchomp', 'Munchlax', 'Riolu', 'Lucario', 'Hippopotas',
  'Hippowdon', 'Skorupi', 'Drapion', 'Croagunk', 'Toxicroak', 'Carnivine', 'Finneon', 'Lumineon', 'Mantyke', 'Snover', 'Abomasnow', 'Weavile', 
  'Magnezone', 'Lickilicky', 'Rhyperior', 'Tangrowth', 'Electivire', 'Magmortar', 'Togekiss', 'Yanmega', 'Leafeon', 'Glaceon', 'Gliscor', 
  'Mamoswine', 'Porygon-Z', 'Gallade', 'Probopass', 'Dusknoir', 'Froslass', 'Rotom', 'Uxie', 'Mesprit', 'Azelf', 'Dialga', 'Palkia', 'Heatran', 
  'Regigigas', 'Giratina', 'Cresselia', 'Phione', 'Manaphy', 'Darkrai', 'Shaymin', 'Arceus', 'Victini', 'Snivy', 'Servine', 'Serperior', 
  'Tepig', 'Pignite', 'Emboar', 'Oshawott', 'Dewott', 'Samurott', 'Patrat', 'Watchog', 'Lillipup', 'Herdier', 'Stoutland', 'Purrloin', 'Liepard', 
  'Pansage', 'Simisage', 'Pansear', 'Simisear', 'Panpour', 'Simipour', 'Munna', 'Musharna', 'Pidove', 'Tranquill', 'Unfezant', 'Blitzle', 'Zebstrika', 
  'Roggenrola', 'Boldore', 'Gigalith', 'Woobat', 'Swoobat', 'Drilbur', 'Excadrill', 'Audino', 'Timburr', 'Gurdurr', 'Conkeldurr', 'Tympole', 
  'Palpitoad', 'Seismitoad', 'Throh', 'Sawk', 'Sewaddle', 'Swadloon', 'Leavanny', 'Venipede', 'Whirlipede', 'Scolipede', 'Cottonee', 'Whimsicott', 
  'Petilil', 'Lilligant', 'Basculin', 'Sandile', 'Krokorok', 'Krookodile', 'Darumaka', 'Darmanitan', 'Maractus', 'Dwebble', 'Crustle', 'Scraggy', 
  'Scrafty', 'Sigilyph', 'Yamask', 'Cofagrigus', 'Tirtouga', 'Carracosta', 'Archen', 'Archeops', 'Trubbish', 'Garbodor', 'Zorua', 'Zoroark', 'Minccino', 
  'Cinccino', 'Gothita', 'Gothorita', 'Gothitelle', 'Solosis', 'Duosion', 'Reuniclus', 'Ducklett', 'Swanna', 'Vanillite', 'Vanillish', 'Vanilluxe', 
  'Deerling', 'Sawsbuck', 'Emolga', 'Karrablast', 'Escavalier', 'Foongus', 'Amoonguss', 'Frillish', 'Jellicent', 'Alomomola', 'Joltik', 'Galvantula', 
  'Ferroseed', 'Ferrothorn', 'Klink', 'Klang', 'Klinklang', 'Tynamo', 'Eelektrik', 'Eelektross', 'Elgyem', 'Beheeyem', 'Litwick', 'Lampent', 'Chandelure', 
  'Axew', 'Fraxure', 'Haxorus', 'Cubchoo', 'Beartic', 'Cryogonal', 'Shelmet', 'Accelgor', 'Stunfisk', 'Mienfoo', 'Mienshao', 'Druddigon', 'Golett', 'Golurk', 
  'Pawniard', 'Bisharp', 'Bouffalant', 'Rufflet', 'Braviary', 'Vullaby', 'Mandibuzz', 'Heatmor', 'Durant', 'Deino', 'Zweilous', 'Hydreigon', 'Larvesta', 
  'Volcarona', 'Cobalion', 'Terrakion', 'Virizion', 'Tornadus', 'Thundurus', 'Reshiram', 'Zekrom', 'Landorus', 'Kyurem', 'Keldeo', 'Meloetta', 'Genesect', 
  'Chespin', 'Quilladin', 'Chesnaught', 'Fennekin', 'Braixen', 'Delphox', 'Froakie', 'Frogadier', 'Greninja', 'Bunnelby', 'Diggersby', 'Fletchling', 
  'Fletchinder', 'Talonflame', 'Scatterbug', 'Spewpa', 'Vivillon', 'Litleo', 'Pyroar', 'Flabébé', 'Floette', 'Florges', 'Skiddo', 'Gogoat', 'Pancham', 
  'Pangoro', 'Furfrou', 'Espurr', 'Meowstic', 'Honedge', 'Doublade', 'Aegislash', 'Spritzee', 'Aromatisse', 'Swirlix', 'Slurpuff', 'Inkay', 'Malamar', 
  'Binacle', 'Barbaracle', 'Skrelp', 'Dragalge', 'Clauncher', 'Clawitzer', 'Helioptile', 'Heliolisk', 'Tyrunt', 'Tyrantrum', 'Amaura', 'Aurorus', 
  'Sylveon', 'Hawlucha', 'Dedenne', 'Carbink', 'Goomy', 'Sliggoo', 'Goodra', 'Klefki', 'Phantump', 'Trevenant', 'Pumpkaboo', 'Gourgeist', 'Bergmite', 
  'Avalugg', 'Noibat', 'Noivern', 'Xerneas', 'Yveltal', 'Zygarde', 'Diancie', 'Hoopa', 'Volcanion', 'Rowlet', 'Dartrix', 'Decidueye', 'Litten', 'Torracat',
  'Incineroar', 'Popplio', 'Brionne', 'Primarina', 'Pikipek', 'Trumbeak', 'Toucannon', 'Yungoos', 'Gumshoos', 'Grubbin', 'Charjabug', 'Vikavolt', 
  'Crabrawler', 'Crabominable', 'Oricorio', 'Cutiefly', 'Ribombee', 'Rockruff', 'Lycanroc', 'Wishiwashi', 'Mareanie', 'Toxapex', 'Mudbray', 
  'Mudsdale', 'Dewpider', 'Araquanid', 'Fomantis', 'Lurantis', 'Morelull', 'Shiinotic', 'Salandit', 'Salazzle', 'Stufful', 'Bewear', 'Bounsweet', 
  'Steenee', 'Tsareena', 'Comfey', 'Oranguru', 'Passimian', 'Wimpod', 'Golisopod', 'Sandygast', 'Palossand', 'Pyukumuku', 'Type: Null', 'Silvally', 
  'Minior', 'Komala', 'Turtonator', 'Togedemaru', 'Mimikyu', 'Bruxish', 'Drampa', 'Dhelmise', 'Jangmo-o', 'Hakamo-o', 'Kommo-o', 'Tapu Koko', 'Tapu Lele', 
  'Tapu Bulu', 'Tapu Fini', 'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Nihilego', 'Buzzwole', 'Pheromosa', 'Xurkitree', 'Celesteela', 'Kartana', 
  'Guzzlord', 'Necrozma', 'Magearna', 'Marshadow', 'Poipole', 'Naganadel', 'Stakataka', 'Blacephalon', 'Zeraora', 'Meltan', 'Melmetal', 'Grookey', 
  'Thwackey', 'Rillaboom', 'Scorbunny', 'Raboot', 'Cinderace', 'Sobble', 'Drizzile', 'Inteleon', 'Nickit', 'Thievul', 'Wooloo', 'Dubwool', 'Chewtle', 
  'Drednaw', 'Yamper', 'Boltund', 'Rolycoly', 'Carkol', 'Coalossal', 'Applin', 'Flapple', 'Appletun', 'Silicobra', 'Sandaconda', 'Cufant', 'Copperajah', 
  'Dracozolt', 'Arctozolt', 'Dracovish', 'Arctovish', 'Duraludon', 'Zacian', 'Zamazenta', 'Eternatus', 'Kubfu', 'Urshifu', 'Zarude', 'Regieleki', 
  'Regidrago', 'Glastrier', 'Spectrier', 'Calyrex', 'Wyrdeer', 'Kleavor', 'Basculegion', 'Sneasler', 'Overqwil', 'Enamorus'
];

function getImageFromData(cardID, retries = 3)
{

    return new Promise((resolve, reject) =>{
        const url = `https://api.pokemontcg.io/v2/cards/${cardID}`;

        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const fullUrl = proxyUrl + url;
        
        const timeout = 10000;  //10s

        const timeoutPromise = new Promise((_, rejectTimeout) => {
            setTimeout(() => rejectTimeout('Request timed out'), timeout);
        });

        // fetch(url)
        //     .then(response => response.json())
        //     .then(data => {
        //         if (data && data.data)
        //         {
        //             const card = data.data;
        //             const cardImage = card.images.large;
        //             resolve(cardImage);
        //         }
        //         else{
        //             reject("Card data is missing or incorrect, cant get image");
        //         }
        //     })
        //     .catch(error => {
        //         reject(error);
        //     });

        // const fetchData = () => {
        //     return fetch(fullUrl)
        //         .then(response => response.json())
        //         .then(data => {
        //             if (data && data.data) {
        //                 const card = data.data;
        //                 const cardImage = card.images.large;
        //                 resolve(cardImage);
        //             } else {
        //                 reject("data invalid or missed");
        //             }
        //         })
        //         .catch(error => reject(error));
        // };

        
        const fetchData = () => {
            return fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data && data.data) {
                        const card = data.data;
                        const cardImage = card.images.large;
                        resolve(cardImage);
                    } else {
                        reject("data invalid or missed");
                    }
                })
                .catch(error => reject(error));
        };

        const attemptFetch = () => {
            Promise.race([fetchData(), timeoutPromise])
                .catch(error => {
                    if (retries > 0) {
                        console.log(`Lỗi: ${error}. Thử lại... Số lần thử còn lại: ${retries}`);
                        getImageFromData(cardID, retries - 1) // Gọi lại hàm nếu còn lần thử
                            .then(resolve)
                            .catch(reject);
                    } else {
                        reject('Đã hết số lần thử, không thể lấy dữ liệu.');
                    }
                });
        };
        
        attemptFetch();

    });
}

function getImageFromID(cardID)
{
    const result = cardID.split("-")
    
    console.log(`get image from id: ${cardID} ${result}`);

    const url = `https://images.pokemontcg.io/${result[0]}/${result[1]}_hires.png`;

    return url;
}

function getRandomName(){
    const randomPokemon = pokemonNames[Math.floor(Math.random() * Date.now() % pokemonNames.length)];
    console.log(randomPokemon)
    return randomPokemon;
}

function getRandomSeed(){
  const now = new Date();
  const timeFactor = now.getTime();
  const randomFactor = Math.random();

  const combinedSeed = timeFactor * randomFactor;

  const randomNum = Math.floor(Math.random() * (9999 - 10 + 1)) + 10; // Random number between 10 and 9999

  const result = Math.floor(combinedSeed % randomNum);
  
  return result;
}

function getIDRandom(arr, count = 1) {
if (!arr || arr.length === 0) {
        console.warn('getIDRandom: Empty array provided');
        return [];
    }

    const uniqueIDs = new Set();
    const maxAttempts = Math.min(count * 10, arr.length * 2);
    let attempts = 0;

    while (uniqueIDs.size < count && attempts < maxAttempts) {
        const num = getRandomSeed();
        const index = num % arr.length;
        uniqueIDs.add(arr[index]);
        attempts++;
    }

    return Array.from(uniqueIDs);
}


//function getIDFromName()
function getIDFromName(pokemonName)
{
    //const pokemonName = getRandomName();

    const lowerName = pokemonName.toLowerCase();

    if (pokemonName)
    {
        //const dataUrl = `https://api.pokemontcg.io/v2/cards?q=name:${pokemonName}`; // Use the query parameter for name search
        const dataUrl = `http://localhost:3000/api/cards?name=${pokemonName}`;

        return fetch(dataUrl)
            .then(response => response.json())
            .then(data => {
                if (data.data && data.data.length > 0)
                {
                    const ids = data.data
                        .filter(card => card.name.toLowerCase().includes(lowerName))
                        .map(card => card.id)
                    return ids;
                }
                else {
                    console.warn(`No cards found for ${pokemonName}`);
                    return null;
                }
            })
            .catch(error => {
                console.error(`Error fetching IDs for ${pokemonName}:`, error);
                return [];
            }); 
    }

    return Promise.resolve([]);
}


// sequential version (use "for loop")
async function getRandomCardsVer1(count = 6)
{
    const randomNameList = [];
    const randomCardList = [];

    console.log(`\n========== FETCHING ${count} RANDOM CARDS ==========\n`);


    for (let i = 0; i < count; i++)
    {
        try {    
            const randomName = getRandomName();
            console.log(`\n[${i + 1}/${count}] Selected Pokemon: ${randomName}`);

            const ids = await getIDFromName(randomName);

            if (ids && ids.length > 0){
                try{
                    const randomIDs = getIDRandom(ids, 1);
                    const randomID = randomIDs[0];

                    console.log(`  → Selected ID: ${randomID}`);

                    try{
                        const cardImage = await getImageFromData(randomID);
                        randomCardList.push({
                            name: randomName,
                            id : randomID,
                            image: cardImage,
                        });
                        console.log(`  ✓ Successfully fetched image`);
                    }
                    catch (error)
                    {
                        console.error("Error in getImageFromData:", error.message || error, error.stack);

                    }
                }
                catch (error)
                {
                    console.error("Error in getIDRandom:", error.message || error, error.stack);
                }
            }
            else{
                console.log(`  ✗ No card IDs found for ${randomName}`);
            }
        }
        catch (error)
        {
            console.error(`[${i + 1}/${count}] Error:`, error);
        }
    }

    console.log('\n========== FINAL RESULTS ==========');
    console.log(`Total cards fetched: ${randomCardList.length}/${count}\n`);
    
    randomCardList.forEach((card, index) => {
        console.log(`Card ${index + 1}:`);
        console.log(`  Pokemon: ${card.name}`);
        console.log(`  ID: ${card.id}`);
        console.log(`  Image: ${card.image}\n`);
    });

    return randomCardList;
    // getImageFromData(randomID).then(cardImage => {

    // })
    // .catch(error =>{
    //     console.error('failed to fetch: ', error);
    // });
}

// parallel version (use "promise")
//async function getRandomCardsVer2(count = 6) {
async function getRandomCardsVer2(count = 6, concurrentLimit = 3) {
    console.log(`\n FETCHING ${count} CARDS (Max ${concurrentLimit} concurrent) \n`);
    
    const startTime = performance.now();


    const fetchSingleCard = async (index, maxRetries = 3) =>{
        let attempts = 0;
        let randomName;
        let ids;
        let result;

        while (attempts < maxRetries)
        {
            try{
                attempts++;
                randomName = getRandomName();
                console.log(`[${index + 1}] Selected: ${randomName}`);

                ids = await getIDFromName(randomName);
                console.log("IDs lits: ", ids);

                if (ids && ids.length > 0)
                {
                    const randomIDs = getIDRandom(ids, 1);
                    const randomID = randomIDs[0];
                    
                    console.log("randomIDs: ", randomIDs);

                    console.log(`random id: ${randomID}`);

                    //const result = await getImageFromID(randomID);
                    result = await getImageFromID(randomID);

                    console.log("result: ", result);

                    //return result;

                    if (result)
                    {
                        return {
                            image: result,
                            data: {
                                name: randomName,
                                id: randomID,
                                cardImage: result,
                            }
                        }
                    }

                    //const cardImage = await getImageFromData(randomID);

                    //console.log(`[${index + 1}] ✓ ${randomName} - Done!`);
                    
                    // return {
                    //     name: randomName,
                    //     id: randomID,
                    //     image: cardImage,
                    // };
                }

                return null;
            }
            catch (error)
            {
                console.error(`[${index + 1}] ✗ Failed:`, error.message);
                //return null;
                if (attempts >= maxRetries)
                {
                    console.error(`[${index + 1}] ✗ Max retries reached. Giving up.`);
                    return null;
                }
            }
        }
    };

    //const results = await Promise.all(card)
    const results = [];
    //for (let i = 0; i < count; i += concurrentLimit)
    while (results.length < count)
    {
        const batch = [];
        const batchSize = Math.min(concurrentLimit, count - results.length);

        console.log(`\n Batch ${Math.floor(results.length / concurrentLimit) + 1}: Processing ${batchSize} cards...`);

        for (let j = 0; j < batchSize; j++)
        {
            batch.push(fetchSingleCard(results.length + j));
        }

        const batchResults = await Promise.all(batch);
        results.push(...batchResults.filter(card => card && card.image));


        if (results.length < count)
        {
            console.log('waiting 500ms before next batch');
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
    
    //const randomCardList = results.filter(card => card !== null);
    //const randomCardList = results.filter(card => card && card.image);


    const endTime = performance.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);


    console.log('\n========== FINAL RESULTS ==========');
    console.log(`Total: ${results.length}/${count}`);
    console.log(`Time: ${duration}s \n`);

    results.forEach((card, index) => {
        //console.log(`${index + 1}. ${card.name} (${card.id})`);
        console.log(`${index + 1}. (${card.image})`);
    });

    return results;
}

const getRandomCards = getRandomCardsVer2;

// sai logic
// random name => random id = > images

// 6 lan random name khong phai 6 lan id


