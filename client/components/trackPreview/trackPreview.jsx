import React from 'react';
import { MdPlayCircleFilled, MdStopCircle } from 'react-icons/md';

function TrackPreview({ available, activeSong, spotifyPreview }) {
	const playerIcon =
		activeSong[0] === spotifyPreview ? (
			<MdStopCircle fontSize="2rem" color="#005A9C" />
		) : (
			<MdPlayCircleFilled fontSize="2rem" color="#005A9C" />
		);

	return available ? playerIcon : <p>Unavailable</p>;
}

export default TrackPreview;
