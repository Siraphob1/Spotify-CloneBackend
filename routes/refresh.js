const express = require("express");
const router = express.Router();
const SpotifyWebApi = require("spotify-web-api-node");

router.post("/", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(400).json({ message: "refreshToken is required" });

  //create instance
  const spotifyAPI = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });

  spotifyAPI
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Can not generate new accessToken" });
    });
});

module.exports = router;
