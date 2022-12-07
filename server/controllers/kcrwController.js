const axios = require('axios');

const kcrwController = {};

kcrwController.getSongs = (req, res, next) => {
  const { year, month, day } = req.query;
  axios
    .get(`https://tracklist-api.kcrw.com/Simulcast/date/${year}/${month}/${day}?page_size=500`)
    .then((data) => {
      res.locals.kcrwData = data.data;
      return next();
    });
};

module.exports = kcrwController;
