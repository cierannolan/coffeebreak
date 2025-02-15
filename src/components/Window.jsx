import React from 'react';
import backdrop from '../assets/images/city background.png'
import windowClosed from '../assets/images/window closed.png';
import windowOpen from '../assets/images/window open.png';
import plant from '../assets/images/plant.png';
import coffee from '../assets/images/coffee.gif';
import steam from '../assets/images/steam.gif';
import cat from '../assets/images/bagel.gif';
import rain from '../assets/images/rain.gif';

const Window = ({ isWindowOpen, toggleWindow, meowClicked, isPlaying, visibilities }) => (
    <div className="window-container">
        <div className="backdrop">
            <img className="backdrop" src={backdrop} alt="Background" />
        </div>
        <div className="rain">
            <img className="rain" src={isPlaying? rain : ""} alt="Rain" />
        </div>
        <img
            className="window"
            src={isWindowOpen ? windowOpen : windowClosed}
            alt="Window"
        />
        <img className="plant" src={plant} style={{ visibility: visibilities.plant ? 'visible' : 'hidden' }} alt="Plant" />
        <div
            className="right-half-clickable"
            onClick={toggleWindow}
            style={{
                position: 'absolute',
                top: '3vh',
                left: '52%',
                width: '43%',
                height: '33vh',
                cursor: 'pointer',
                zIndex: 9999,
                border: '1px solid yellow'
            }}
        />
    </div>
);

export default Window