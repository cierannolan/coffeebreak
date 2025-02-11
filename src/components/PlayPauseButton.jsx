import React from 'react';
import playIcon from '../assets/images/play.png';
import pauseIcon from '../assets/images/pause.png';

const PlayPauseButton = ({ isPlaying, togglePlayPause }) => (
    <div className="button-container">
        <img
            src={isPlaying ? pauseIcon : playIcon}
            alt="Play/Pause"
            onClick={togglePlayPause}
            className="play-pause-button"
        />
    </div>
);

export default PlayPauseButton