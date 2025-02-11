import React from 'react';
import backdrop from '../assets/images/city background.png'
import windowClosed from '../assets/images/window closed.png';
import windowOpen from '../assets/images/window open.png';
import plant from '../assets/images/plant.png';
import coffee from '../assets/images/coffee.gif';
import steam from '../assets/images/steam.gif';
import cat from '../assets/images/bagel.gif';
import rain from '../assets/images/rain.gif';

const Window = ({ isWindowOpen, toggleWindow, meowClicked, isPlaying }) => (
    <div className="window-container">
        <div className="backdrop-container">
            <img className="backdrop" src={backdrop} alt="Background" />
        </div>
        <div className="rain-container">
            <img className="rain" src={isPlaying? rain : ""} alt="Rain" />
        </div>
        <img
            className="window"
            src={isWindowOpen ? windowOpen : windowClosed}
            alt="Window"
        />
        <img className="plant" src={plant} alt="Plant" />
        <div className="coffee-container">
            <img className="coffee" src={coffee} alt="Coffee" />
            <img className="steam" src={steam} alt="Steam" />
        </div>
        <img className="cat" src={cat} alt="Cat" />
        <div
            className="cat-head-clickable"
            onClick={meowClicked}
            style={{
                position: 'absolute',
                bottom: '7.5%',
                left: '63.5%',
                width: '5.8%',
                height: '8.5%',
                cursor: 'pointer',
                zIndex: 2,
            }}
        />
        <div
            className="right-half-clickable"
            onClick={toggleWindow}
            style={{
                position: 'absolute',
                top: '9%',
                right: '6.7%',
                height: '79%',
                width: '41%',
                cursor: 'pointer',
                zIndex: 1,
            }}
        />
    </div>
);

export default Window