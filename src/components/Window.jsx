import React from 'react';
import backdrop from '../assets/images/city background.png'
import windowClosed from '../assets/images/window closed.png';
import windowOpen from '../assets/images/window open.png';
import plant from '../assets/images/plant.png';
import rain from '../assets/images/rain.gif';

const Window = ({ isWindowOpen, toggleWindow, isPlaying, visibilities }) => (
    <div className="window-container">
        <img className="backdrop" src={backdrop} alt="Background" />
        <img className="rain" src={rain} style={{ visibility: isPlaying ? 'visible' : 'hidden' }} alt={isPlaying ? 'rain' : ''} />
        <img
            className="window"
            src={isWindowOpen ? windowOpen : windowClosed}
            alt="Window"
        />
        <img className="plant" src={plant} style={{ visibility: visibilities.plant ? 'visible' : 'hidden' }} alt="Plant" />
        <div
            className="right-half-clickable"
            onClick={toggleWindow}
        />
    </div>
);

export default Window