const axios = require('axios');
require('dotenv').config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = 'http://localhost:8080/api/callback';

// random string generator
const generateRandomString = function (length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// your application requests authorization
const stateKey = 'spotify_auth_state';

const appAuthOptions = {
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
  axios(appAuthOptions)
    .then((response) => {
      res.locals.accessToken = response.data.access_token;
      return next();
    })
    .catch((error) => console.log(error));
};

spotifyController.spotifyRedirect = (req, res, next) => {
  // use session object to persist req body during redirect
  // res.session.playlistData = req.body;

  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // define spotify scope
  const scope =
    'playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public';
  res.redirect(
    `https://accounts.spotify.com/authorize?${new URLSearchParams({
      response_type: 'code',
      client_id,
      scope,
      redirect_uri,
      state,
    }).toString()}`
  );
};

spotifyController.getUserTokens = (req, res, next) => {
  // request refresh and access tokens after checking state params

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(`/#${new URLSearchParams({ error: 'state_mismatch' }).toString()}`);
  } else {
    res.clearCookie(stateKey);

    const userAuthOptions = {
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      params: {
        code,
        redirect_uri,
        grant_type: 'authorization_code',
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
    axios(userAuthOptions)
      .then((response) => {
        res.locals.accessToken = response.data.access_token;
        res.locals.refreshToken = response.data.refresh_token;
        console.log(res.locals);
        return next();
      })
      .catch((error) => console.log(error));
  }
};

spotifyController.getUserID = (req, res, next) => {
  axios
    .get(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${res.locals.accessToken}`,
      },
    })
    .then((response) => {
      res.locals.id = response.data.id;
      console.log('this is the user id: ', res.locals.id);
      // console.log('this is in the session(should be empty): ', req.session.playlistData);
      return next();
    })
    .catch((error) => console.log(error));
};

module.exports = spotifyController;
