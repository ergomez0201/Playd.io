const axios = require('axios');

const kcrwController = {};

kcrwController.getSongs = (req, res, next) => {
  const { showName, year, month, day } = req.body;
  axios
    .get(`https://tracklist-api.kcrw.com/Simulcast/date/${year}/${month}/${day}?page_size=500`)
    .then((data) => {
      const radioShow = data.data.filter(
        (songs) => songs.program_title === showName && songs.spotify_id
      );
      res.locals.radioShow = radioShow;
      return next();
    })
    .catch((error) => {
      console.error('Error: ', error);
    });
};

module.exports = kcrwController;
