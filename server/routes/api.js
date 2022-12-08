const express = require('express');
const cors = require('cors');
const data = require('../data/production/kcrw/kcrw.dummy.json');

const router = express.Router();
const kcrwController = require('../controllers/kcrwController');
const spotifyController = require('../controllers/spotifyController');
const spotifyAuthController = require('../controllers/spotifyAuthController');

router.use(cors());

router.get('/tracks', kcrwController.getSongs, (req, res) =>
  res.status(200).json(res.locals.kcrwData)
);

// router.get('/tracks', (req, res) => res.status(200).json(data));

router.get('/login', (req, res) => {
  const queryUserID = req.query.userID;
  const cookieUserID = req.cookies.userID;

  if (!queryUserID || !cookieUserID) {
    return res.status(200).json(false);
  }
  if (queryUserID !== cookieUserID) {
    return res.status(200).json(false);
  }
  return res.status(200).json(true);
});

router.get('/logout', (req, res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
  });
  res.clearCookie('refreshToken', {
    httpOnly: true,
  });
  res.clearCookie('userID', {
    httpOnly: true,
  });
  res.status(200).json('all cookies cleared');
});

router.get(
  '/search',
  spotifyAuthController.getClientCredentials,
  spotifyController.getSongUri,
  (req, res) => res.status(200).json(res.locals)
);

// connecting user to spotify
router.get('/spotify', spotifyAuthController.spotifyRedirect, (req, res) => {
  res.status(200).send('You are attempting to connect to spotify');
});

router.get(
  '/callback',
  spotifyAuthController.getUserTokens,
  spotifyController.getUserID,
  (req, res) =>
    res
      .status(200)
      .cookie('accessToken', `${res.locals.accessToken}`, {
        httpOnly: true,
        expires: new Date(Date.now() + res.locals.expires_in),
      })
      .cookie('refreshToken', `${res.locals.refreshToken}`, {
        httpOnly: true,
        expires: new Date(Date.now() + 1 * 7 * 24 * 60 * 60 * 1000),
      })
      .cookie('userID', `${res.locals.userID}`, {
        httpOnly: true,
        expires: new Date(Date.now() + 1 * 365 * 24 * 60 * 60 * 1000),
      }).send(`<script>
      localStorage.setItem('userID', '${res.locals.userID}');
  window.close();
  </script>`)
);

router.post(
  '/playlist',
  spotifyAuthController.getNewTokens,
  spotifyController.createUserPlaylist,
  (req, res) => {
    res.clearCookie('accessToken', {
      httpOnly: true,
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
    });
    res
      .status(200)
      .cookie('accessToken', `${res.locals.accessToken}`, {
        httpOnly: true,
        expires: new Date(Date.now() + res.locals.expires_in),
      })
      .cookie('refreshToken', `${res.locals.refreshToken}`, {
        httpOnly: true,
        expires: new Date(Date.now() + 1 * 7 * 24 * 60 * 60 * 1000),
      })
      .json('Success!');
  }
);

module.exports = router;
