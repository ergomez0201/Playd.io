const axios = require('axios');

const spotifyController = {};

spotifyController.getSongUri = (req, res, next) => {
  const { title, artist } = req.query;
  axios
    .get(
      `https://api.spotify.com/v1/search?q=track:${title} artist:${artist}&type=track&market=US`,
      {
        headers: {
          Authorization: `Bearer ${res.locals.accessToken}`,
        },
      }
    )
    .then((response) => {
      const trackArray = response.data.tracks.items;
      if (trackArray.length === 0) {
        res.locals.spotifyUri = null;
        return next();
      }
      res.locals.albumImage = trackArray[0].album.images[1].url;
      res.locals.albumImageLarge = trackArray[0].album.images[0].url;
      res.locals.spotifyUri = trackArray[0].uri;
      return next();
    })
    .catch((err) => console.log(err));
};

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

spotifyController.getUserID = (req, res, next) => {
  axios
    .get(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${res.locals.accessToken}`,
      },
    })
    .then((response) => {
      const userID = response.data.id;
      res.locals.userID = userID;
      return next();
    })
    .catch((error) => console.log(error));
};

spotifyController.createUserPlaylist = (req, res, next) => {
  // console.log('this is the body: ', req.body);
  const { songURIArray, showTitle, showDate, userID, accessToken, refreshToken } = req.body;
  const [year, month, day] = showDate;
  const date = new Date(year, month - 1, day);

  axios({
    url: `https://api.spotify.com/v1/users/${userID}/playlists`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      name: `${showTitle} - ${date.toDateString()}`,
      description: 'Songs played on KCRW Radio Shows',
      public: false,
    },
  })
    .then((response) => {
      // console.log(response.data);
      const playlistID = response.data.id;

      axios({
        url: `	https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          uris: songURIArray,
        },
      })
        .then((response) => next())
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

module.exports = spotifyController;
