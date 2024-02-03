require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3500;

//third-party middlewares --------------------------------------------------------
app.use(cors());

//built-in middlewares --------------------------------------------------------
//for handle urlencoded form data
app.use(express.urlencoded({ extended: true }));
//convert to json
app.use(express.json());

//route
app.get("/", (req, res) => {
  // res.send("Welcome to my Spotify Clone Backend API ").json({ route: "s" });
  res.json({
    Hi: "Welcome to my Spotify Clone Backend API",
    route1: "/login method:POST",
    route2: "/refresh method:POST",
  });
});

app.use("/login", require("./routes/login.js"));
app.use("/refresh", require("./routes/refresh.js"));

//route not use
app.all("*", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => console.log(`Server start at http://localhost:${port}`));
