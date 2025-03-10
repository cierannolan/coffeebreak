import React, { useEffect } from 'react';
import play from '../assets/images/play.png';
import pause from '../assets/images/pause.png';

const PlayPauseButton = ({ isPlaying, togglePlayPause, visibilities }) => {

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === "Space") {
                togglePlayPause();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [togglePlayPause]);

    return (
        <img className="play-pause-button"
            style={{
                bottom: visibilities.table ? '17%' : '32%',
                visibility: visibilities.play_button ? 'visible' : 'hidden'
            }}
            src={isPlaying ? pause : play}
            alt="Play/Pause"
            onClick={togglePlayPause}
        />
    );
};

export default PlayPauseButton;
