require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3500;

//route
app.get("/", (req, res) => {
  res.send("Welcome to my Spotify Clone Backend API");
});

app.listen(port, () => console.log(`Server start at http://localhost:${port}`));
