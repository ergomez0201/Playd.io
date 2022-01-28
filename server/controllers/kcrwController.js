const axios = require('axios');

const kcrwController = {};

kcrwController.getSongs = (req, res, next) => {
  let { showName, year, month, day } = req.body;
  if (month < 10) {
    month = String(month).padStart(2, 0);
    console.log(month);
  }
  if (day < 10) {
    day = String(day).padStart(2, 0);
    console.log(day);
  }
  axios
    .get(`https://tracklist-api.kcrw.com/Simulcast/date/${year}/${month}/${day}?page_size=500`)
    .then((data) => {
      // console.log(data.data);
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
