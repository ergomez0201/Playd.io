import React from 'react';
import PropTypes from 'prop-types';

function TrackAlbum({ album }) {
	return <p>{album}</p>;
}

TrackAlbum.propTypes = {
	album: PropTypes.string.isRequired,
};

export default TrackAlbum;
