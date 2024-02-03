const express = require("express");
const router = express.Router();
const SpotifyWebApi = require("spotify-web-api-node");

router.post("/", (req, res) => {
  const { code } = req.body;

  if (!code) return res.status(400).json({ message: "code is required" });

  //create instance
  const spotifyAPI = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyAPI
    .authorizationCodeGrant(code)
    .then((data) => {
      const accessToken = data.body.access_token;
      const refreshToken = data.body.refresh_token;
      const expiresIn = data.body.expires_in;

      res.json({ accessToken, refreshToken, expiresIn });
    })
    .catch((err) => {
      console.log("login failed", err);
      res.status(400).json({ message: err });
    });
});

module.exports = router;
