const express = require('express');
const cors = require('cors');
const data = require('../data/production/kcrw/kcrw.dummy.json');

const router = express.Router();
const kcrwController = require('../controllers/kcrwController');
const spotifyController = require('../controllers/spotifyController');

router.use(cors());

// router.get('/tracks', kcrwController.getSongs, (req, res) =>
//   res.status(200).json(res.locals.kcrwData)
// );

router.get('/tracks', (req, res) => res.status(200).json(data));

router.post(
  '/',
  kcrwController.getSongs,
  spotifyController.getClientCredentials,
  spotifyController.sendSongID,
  (req, res) => {
    console.log('inside last middleware: ');
    const { radioShow, trackData } = res.locals;
    res.status(200).send({ radioShow, trackData });
  }
);

// connecting user to spotify
router.get('/spotify', spotifyController.spotifyRedirect, (req, res) => {
  res.status(200).send('You are attempting to connect to spotify');
});

router.get(
  '/callback',
  spotifyController.getUserTokens,
  spotifyController.getUserID,
  // spotifyController.createUserPlaylist,
  (req, res) => {
    res.status(200).send('this is the response from the callback route');
  }
);

router.post('/playlist', spotifyController.createUserPlaylist, (req, res) =>
  res.status(200).send('this is from the playlist middleware')
);

module.exports = router;
