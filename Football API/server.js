// Import các module cần thiết
const express = require('express');
const axios = require('axios');

const app = express();

app.get('/get-data', async (req, res) => {
    var config = {
        method: 'get',
        url: 'https://v3.football.api-sports.io/leagues',
        headers: {
            // 'x-apisports-key': '1b734f054666ae31d11c817e79fc00e6',
        }
    };

    try {
        const response = await axios(config);

        res.json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error occurred while calling the API' });
    }
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
})

// // Tạo một route API trong Express
// app.get('/get-data', async (req, res) => {
//   try {
//     // Sử dụng Axios để gọi API bên ngoài
//     const response = await axios.get('https://api.example.com/users');
    
//     // Trả dữ liệu từ API bên ngoài về cho client
//     res.json(response.data);  // Bạn có thể tùy chỉnh dữ liệu tại đây nếu cần.
//   } catch (error) {
//     console.error(error);
//     // Nếu có lỗi, trả lỗi cho client
//     res.status(500).json({ message: 'Có lỗi xảy ra khi gọi API bên ngoài.' });
//   }
// });

// // Khởi động server Express
// app.listen(3000, () => {
//   console.log('Server đang chạy tại http://localhost:3000');
// });

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });


// var config = {
//   method: 'get',
//   url: 'https://exmaple',
//   headers: {
//     'x-apisports-key': 'x',
//   }
// };

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });