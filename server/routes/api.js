const express = require('express');

const router = express.Router();
const kcrwController = require('../controllers/kcrwController');
const spotifyController = require('../controllers/spotifyController');

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

module.exports = router;
