import React, { useState } from 'react';

const VolumeBar = ({ volume, setVolume, visibilities }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="volume-bar"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                opacity: isHovered ? 0.8 : 0.25,
                visibility: visibilities.master_volume ? 'visible' : 'hidden'
            }}
        >
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
            />
        </div>
    );
};

export default VolumeBar;
