import React from 'react';
import VolumeControl from './VolumeControl';
import carIcon from '../assets/images/car.png';
import pawIcon from '../assets/images/paw.png';
import computerIcon from '../assets/images/computer.png';
import toggleIcon from '../assets/images/toggle.png';

const VolumeControls = ({
    isMenuOpen,
    toggleMenu,
    volumes,
    setVolumes,
    visibilities,
}) => (

    <div className={`menu ${isMenuOpen ? 'open' : ''}`} style={{ visibility: visibilities.volume_controls ? 'visible' : 'hidden' }} >
        <button className="menu-toggle-button" onClick={toggleMenu}>
            <img src={toggleIcon} className="menu-toggle-image" alt="Menu Toggle" />
        </button>

        <div className="volume-control-container">
            <VolumeControl
                icon={carIcon}
                volume={volumes.car}
                onVolumeChange={(v) => setVolumes({ ...volumes, car: v })}
            />

            <VolumeControl
                icon={pawIcon}
                volume={volumes.cat}
                onVolumeChange={(v) => setVolumes({ ...volumes, cat: v })}
            />

            <VolumeControl
                icon={computerIcon}
                volume={volumes.typing}
                onVolumeChange={(v) => setVolumes({ ...volumes, typing: v })}
            />

        </div>

    </div>
);

export default VolumeControls