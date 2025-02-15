import React from 'react';
import playIcon from '../assets/images/play.png';
import pauseIcon from '../assets/images/pause.png';

const PlayPauseButton = ({ isPlaying, togglePlayPause, visibilities }) => (
    <div className="play-pause-button" style={{ top: visibilities.table ? '28px' : '70px' }}>
        <img
            src={isPlaying ? pauseIcon : playIcon}
            alt="Play/Pause"
            onClick={togglePlayPause}
            className="play-pause-button"
            style={{ visibility: visibilities.play_button ? 'visible' : 'hidden', }}
        />
    </div>
);

export default PlayPauseButton