const express = require('express');
const cors = require('cors');
const data = require('../data/production/kcrw/kcrw.dummy.json');

const router = express.Router();
const kcrwController = require('../controllers/kcrwController');
const spotifyController = require('../controllers/spotifyController');
const spotifyAuthController = require('../controllers/spotifyAuthController');

router.use(cors());

// router.get('/tracks', kcrwController.getSongs, (req, res) =>
//   res.status(200).json(res.locals.kcrwData)
// );

router.get('/tracks', (req, res) => res.status(200).json(data));

router.get('/login', (req, res) => {
  if (req.cookies.userID) {
    return res.status(200).json(1);
  }
  return res.status(200).json(0);
});

router.get(
  '/search',
  spotifyAuthController.getClientCredentials,
  spotifyController.getSongUri,
  (req, res) => res.status(200).json(res.locals)
);

router.post(
  '/',
  kcrwController.getSongs,
  spotifyAuthController.getClientCredentials,
  spotifyController.sendSongID,
  (req, res) => {
    console.log('inside last middleware: ');
    const { radioShow, trackData } = res.locals;
    res.status(200).send({ radioShow, trackData });
  }
);

// connecting user to spotify
router.get('/spotify', spotifyAuthController.spotifyRedirect, (req, res) => {
  res.status(200).send('You are attempting to connect to spotify');
});

router.get(
  '/callback',
  spotifyAuthController.getUserTokens,
  spotifyController.getUserID,
  // spotifyController.createUserPlaylist,
  (req, res) => {
    console.log('inside /callback middleware', res.locals);
    // TODO: TEMPORARY SOLUTION: Store tokens in local storage
    // refactor to check access token expiration and tokens using redis
    // localStorage.setItem('accessToken', '${res.locals.accessToken}');
    // localStorage.setItem('refreshToken', '${res.locals.refreshToken}');
    // localStorage.setItem('expire', '${res.locals.expires_in}');
    // localStorage.setItem('userID', '${res.locals.userID}');
    return res
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
    window.close();
    </script>`);
  }
);

router.post('/playlist', spotifyController.createUserPlaylist, (req, res) =>
  res.status(200).send('this is from the playlist middleware')
);

module.exports = router;
