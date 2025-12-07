import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors()); // Cho phép mọi trang web truy cập vào backend của bạn

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
