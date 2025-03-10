import React from 'react';
import VolumeControl from './VolumeControl';
import car from '../assets/images/car.png';
import paw from '../assets/images/paw.png';
import computer from '../assets/images/computer.png';
import toggle from '../assets/images/toggle.png';

const VolumeControls = ({
    isMenuOpen,
    toggleMenu,
    volumes,
    setVolumes,
    visibilities,
}) => (

    <div className={`menu ${isMenuOpen ? 'open' : ''}`} style={{ visibility: visibilities.volume_controls ? 'visible' : 'hidden' }} >
        <button className="menu-toggle-button" onClick={toggleMenu}>
            <img src={toggle} className="menu-toggle-image" alt="Menu Toggle" />
        </button>

        <div className="volume-control-container">
            <VolumeControl
                icon={car}
                volume={volumes.car}
                onVolumeChange={(v) => setVolumes({ ...volumes, car: v })}
            />

            <VolumeControl
                icon={paw}
                volume={volumes.cat}
                onVolumeChange={(v) => setVolumes({ ...volumes, cat: v })}
            />

            <VolumeControl
                icon={computer}
                volume={volumes.typing}
                onVolumeChange={(v) => setVolumes({ ...volumes, typing: v })}
            />

        </div>

    </div>
);

export default VolumeControls