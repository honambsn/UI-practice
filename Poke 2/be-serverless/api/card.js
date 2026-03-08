import fetch from "node-fetch";

export default async function handler(req, res) {
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

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
