const express = require('express');

const router = express.Router();
const kcrwController = require('../controllers/kcrwController');

router.post('/', kcrwController.getSongs, (req, res) => {
  console.log('inside last middleware: ', res.locals.radioShow[0]);
  res.status(200).send('This is from inside the api router');
});

module.exports = router;
