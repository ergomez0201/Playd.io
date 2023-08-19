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
			// TODO: Error check for too many requests status code
			res.locals.tracks = response.data.tracks.items;
			// if (trackArray.length === 0) {
			//   res.locals.spotifyUri = null;
			//   return next();
			// }
			// res.locals.albumImage = trackArray[0].album.images[1].url;
			// res.locals.albumImageLarge = trackArray[0].album.images[0].url;
			// res.locals.spotifyUri = trackArray[0].uri;
			// res.locals.tracks = trackArray;
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
		.catch((error) => {
			console.log('here is where the error occurs: ', error.response.status);
			// TODO: Handle 403 Access Denied Error
			return res.status(201).send(`<script>
        window.close()
        </script>`);
		});
};

spotifyController.createUserPlaylist = (req, res, next) => {
	const { songURIArray, showTitle } = req.body;
	const { userID } = req.cookies;
	const { accessToken } = res.locals;

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
				.then(() => next())
				.catch((error) => console.log(error));
		})
		.catch((error) => console.log(error));
};

module.exports = spotifyController;
