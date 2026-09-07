const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "1mb" }));

function generateCode(prompt) {
  const p = String(prompt || "").toLowerCase();

  if (p.includes("hello") || p.includes("bonjour")) {
    return `// Exemple généré par CodeAI
console.log("Bonjour ! Je suis CodeAI 👋");`;
  }

  if (p.includes("bouton")) {
    return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Bouton CodeAI</title>
</head>
<body>
  <button id="btn">Clique-moi</button>
  <script>
    document.querySelector("#btn").addEventListener("click", () => {
      alert("Bonjour depuis CodeAI !");
    });
  </script>
</body>
</html>`;
  }

  return `// CodeAI — prototype
// Demande reçue : ${String(prompt).replace(/[<>]/g, "")}

function main() {
  console.log("Code généré par CodeAI.");
}

main();`;
}

app.post("/api/chat", (req, res) => {
  const { prompt } = req.body || {};
  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: "Écris une demande." });
  }
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "style.css"));
});

app.get("/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "script.js"));
});

  res.json({
    message: "Voici une première proposition de code :",
    code: generateCode(prompt)
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`CodeAI est lancé sur http://localhost:${PORT}`);
});
