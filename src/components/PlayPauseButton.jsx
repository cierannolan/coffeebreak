import React, { useState, useEffect } from 'react';
import play from '../assets/images/play.png';
import pause from '../assets/images/pause.png';

const PlayPauseButton = ({ isPlaying, togglePlayPause, visibilities, isIOSDevice }) => {
    const [iosDisclaimerVisible, setIosDisclaimerVisible] = useState(!isIOSDevice);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === "Space") {
                togglePlayPause();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [togglePlayPause]);

    const handleDisclaimerClick = () => {
        setIosDisclaimerVisible(false);
    };

    return (
        <>
            <img
                className={`play-pause-button${isIOSDevice ? ' ios' : ''}`}
                style={{
                    bottom: visibilities.table ? '17%' : '32%',
                    visibility: visibilities.play_button ? 'visible' : 'hidden'
                }}
                src={isPlaying ? pause : play}
                alt="Play/Pause"
                onClick={togglePlayPause}
            />

            {isIOSDevice && iosDisclaimerVisible && (
                <div
                    className="ios-disclaimer"
                    style={{ cursor: 'pointer' }}
                    onClick={handleDisclaimerClick}
                >
                    Note: Due to iOS browser audio restrictions, functionality is limited on iOS devices.
                    Click this box to close it and continue.
                </div>
            )}
        </>
    );
}

export default PlayPauseButton;
