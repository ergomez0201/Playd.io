const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI_PROD;

let challenge;

const generateRandomString = function (length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

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

function base64URLEncode(str) {
  return str.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest();
}

const verifier = base64URLEncode(crypto.randomBytes(32));

if (verifier) {
  challenge = base64URLEncode(sha256(verifier));
}

const spotifyAuthController = {};

spotifyAuthController.getClientCredentials = (req, res, next) => {
  axios(appAuthOptions)
    .then((response) => {
      res.locals.accessToken = response.data.access_token;
      return next();
    })
    .catch((error) => console.log(error));
};

spotifyAuthController.spotifyRedirect = (req, res, next) => {
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
      code_challenge_method: 'S256',
      code_challenge: challenge,
    }).toString()}`
  );
};

spotifyAuthController.getUserTokens = (req, res, next) => {
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
        client_id,
        code_verifier: verifier,
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
        res.locals.expires_in = response.data.expires_in;

        return next();
      })
      .catch((error) => {
        console.log('Request failed: User canceled Spotify Auth');
        return res.status(201).send(`<script>
        window.close()
        </script>`);
      });
  }
};

spotifyAuthController.getNewTokens = (req, res, next) => {
  const { refreshToken } = req.cookies;
  const userAuthOptions = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    params: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id,
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
      res.locals.expires_in = response.data.expires_in;
      res.locals.refreshToken = response.data.refresh_token;

      return next();
    })
    .catch((error) => console.log(error));
};

module.exports = spotifyAuthController;
