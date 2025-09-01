// server.js
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static("public")); // Carpeta para HTML/CSS/imagenes

// Simulación de base de datos
let users = [];

// Rutas
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.json({ message: "Usuario registrado correctamente" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ message: "Inicio de sesión exitoso" });
  } else {
    res.status(401).json({ error: "Credenciales incorrectas" });
  }
});

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
