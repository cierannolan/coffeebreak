import React, { useState, useRef, useEffect } from 'react';
import window_closed from './assets/images/window closed.png';
import window_open from './assets/images/window open.png';
import rain from './assets/images/rain.gif';
import rainClosed from './assets/audio/rain window.wav';
import rainOpen from './assets/audio/rain outdoors.wav';
import carSound from './assets/audio/city.wav';
import backdrop from './assets/images/city background.png';
import playButton from './assets/images/play.png';
import pauseButton from './assets/images/pause.png';
import './App.css';

function App() {
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [carVolume, setCarVolume] = useState(0.5);

    const rainClosedAudioRef = useRef(new Audio(rainClosed));
    const rainOpenAudioRef = useRef(new Audio(rainOpen));
    const carAudioRef = useRef(new Audio(carSound));

    useEffect(() => {
        rainClosedAudioRef.current.loop = true;
        rainOpenAudioRef.current.loop = true;
        carAudioRef.current.loop = true;

        rainClosedAudioRef.current.volume = 1;
        rainOpenAudioRef.current.volume = 0;
        carAudioRef.current.volume = carVolume;

        return () => {
            rainClosedAudioRef.current.pause();
            rainOpenAudioRef.current.pause();
            carAudioRef.current.pause();
        };
    }, [carVolume]);

    const togglePlayPause = () => {
        if (isPlaying) {
            rainOpenAudioRef.current.pause();
            rainClosedAudioRef.current.pause();
            carAudioRef.current.pause();
        } else {
            if (isWindowOpen) {
                rainOpenAudioRef.current.play();
                rainOpenAudioRef.current.volume = 1;
            } else {
                rainClosedAudioRef.current.play();
                rainClosedAudioRef.current.volume = 1;
            }
            carAudioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleWindow = () => {
        setIsWindowOpen((prevState) => {
            if (isPlaying) {
                if (prevState) {
                    rainOpenAudioRef.current.pause();
                    rainClosedAudioRef.current.play();
                } else {
                    rainClosedAudioRef.current.pause();
                    rainOpenAudioRef.current.play();
                }
            }
            return !prevState;
        });
    };

    return (
        <div className="App">
            <div className="container">
                <div className="window-container">
                    <img className="window" src={isWindowOpen ? window_open : window_closed} alt="Window" />
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
                    <div className="rain-container">
                        <img className="rain" src={isPlaying ? rain : " "} alt="Rain" />
                    </div>
                    <div className="backdrop-container">
                        <img className="backdrop" src={backdrop} alt="bg" />
                    </div>
                </div>
            </div>
            <div className="button-container">
                <img
                    src={isPlaying ? pauseButton : playButton}
                    alt="Play/Pause"
                    onClick={togglePlayPause}
                    style={{ cursor: 'pointer', width: '50px', height: '50px' }}
                />
            </div>
            <div className="volume-control-container">
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={carVolume}
                    onChange={(e) => setCarVolume(parseFloat(e.target.value))}
                    className="volume-slider"
                />
                <label>Car Volume</label>
            </div>
        </div>
    );
}

export default App;
