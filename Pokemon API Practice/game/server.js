import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors(
    {
        // origin: 'http://127.0.0.1:5931/Pokemon%20API%20Practice/game/'
        origin:
        [
            "http://127.0.0.1:5931",
            "http://127.0.0.1:5930",
            "http://localhost:5931",
            "http://localhost:5930"
        ]
    }
)); // Cho phép mọi trang web truy cập vào backend của bạn

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);

//     if (
//       origin.startsWith("http://localhost:") ||
//       origin.startsWith("http://127.0.0.1:")
//     ) {
//       return callback(null, true);
//     }

//     return callback(new Error("Not allowed by CORS"));
//   }
// }));


// API proxy
app.get("/api/cards", async (req, res) => {
    const name = req.query.name;
    const url = `https://api.pokemontcg.io/v2/cards?q=name:${name}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log("Backend running at http://localhost:3000"));
