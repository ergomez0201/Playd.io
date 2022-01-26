const axios = require('axios');
require('dotenv').config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

// your application requests authorization
const authOptions = {
  method: 'post',
  url: 'https://accounts.spotify.com/api/token',
  params: {
    grant_type: 'client_credentials',
  },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  auth: {
    username: client_id,
    password: client_secret,
  },
};

const spotifyController = {};

spotifyController.sendSongID = (req, res, next) => {
  trackIDArray = [];
  for (const track of res.locals.radioShow) {
    if (!trackIDArray.includes(track.spotify_id)) trackIDArray.push(track.spotify_id);
  }
  trackIDString = trackIDArray.join(',');
  console.log('new refresh: ', trackIDString);
  axios
    .get(`https://api.spotify.com/v1/tracks?market=US&ids=${trackIDString}`, {
      headers: {
        Authorization: `Bearer ${res.locals.accessToken}`,
      },
    })
    .then((response) => {
      res.locals.trackData = response.data;
      return next();
    })
    .catch((error) => console.log(error));
};

spotifyController.getClientCredentials = (req, res, next) => {
  axios(authOptions)
    .then((response) => {
      res.locals.accessToken = response.data.access_token;
      return next();
    })
    .catch((error) => console.log(error));
};

module.exports = spotifyController;
