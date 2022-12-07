const axios = require('axios');

const spotifyController = {};

spotifyController.getSongUri = (req, res, next) => {
  const { title, artist } = req.query;
  const encodedTitle = encodeURIComponent(title);
  const encodedArtist = encodeURIComponent(artist);
  const uri = `https://api.spotify.com/v1/search?q=track:${encodedTitle} artist:${encodedArtist}&type=track&market=US`;
  axios
    .get(uri, {
      headers: {
        Authorization: `Bearer ${res.locals.accessToken}`,
      },
    })
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
  const { songURIArray, showTitle, showDate } = req.body;
  const { userID } = req.cookies;
  const { accessToken } = res.locals;
  // const [year, month, day] = showDate;
  // const date = new Date(year, month - 1, day);

  axios({
    url: `https://api.spotify.com/v1/users/${userID}/playlists`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      name: showTitle,
      description: 'Songs played on KCRW Radio Shows',
      public: false,
    },
  })
    .then((response) => {
      const playlistID = response.data.id;

      axios({
        url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
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
