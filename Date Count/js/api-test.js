export function setupApiButton() {
    const apiButton = document.getElementById('apiButton');
    if (apiButton) {
        apiButton.addEventListener('click', () => {
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then(response => response.json())
                .then(data => { 
                    console.log('API Data:', data);
                    alert('API call successful! Check console for data.');
                })
                .catch(error => {
                    console.error('API Error:', error);
                    alert('API call failed. Check console for error.');
                });
        });
    } else {
        console.error('API button not found in the document.');
    }
}

// export async function footballAPI() {
//     // Example API call to a football API by rapid hub
//     const url = 'https://api-football-v1.p.rapidapi.com/v2/odds/league/865927/bookmaker/5?page=2';
//     const options = {
//         method: 'GET',
//         headers: {
//             'x-rapidapi-key': '8698d0e703msh22139ed375fcfb7p1d1fd0jsnb78b77835238',
//             'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
//         }
//     };

//     try {
//         const response = await fetch(url, options);
//         const result = await response.text();
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }
// }