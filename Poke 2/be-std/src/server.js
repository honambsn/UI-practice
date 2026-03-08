import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5931",
      "http://127.0.0.1:5930",
      "http://localhost:5931",
      "http://localhost:5930",
    ],
  })
);

app.get("/api/cards", async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: "Missing pokemon name" });
  }

  const url = `https://api.pokemontcg.io/v2/cards?q=name:${encodeURIComponent(
    name
  )}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ BE-STD running at http://localhost:${PORT}`);
});
