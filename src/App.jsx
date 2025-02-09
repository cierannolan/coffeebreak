import { useState, useRef, useEffect } from 'react';
import window_closed from './assets/images/window closed.png';
import window_open from './assets/images/window open.png';
import table from './assets/images/table.png';
import cutout from './assets/images/cutout.png';
import cat from './assets/images/bagel.gif';
import car from './assets/images/car.png';
import computer from './assets/images/computer.png';
import paw from './assets/images/paw.png';
import plant from './assets/images/plant.png';
import rain from './assets/images/rain.gif';
import coffee from './assets/images/coffee.gif';
import steam from './assets/images/steam.gif';
import rainClosed from './assets/audio/rain window.wav';
import rainOpen from './assets/audio/rain outdoors.wav';
import carSound from './assets/audio/city.wav';
import typing from './assets/audio/typing 2.wav';
import catPurring from './assets/audio/cat purring.wav';
import catMeow from './assets/audio/meow.wav';
import backdrop from './assets/images/city background.png';
import playButton from './assets/images/play.png';
import pauseButton from './assets/images/pause.png';
import toggle from './assets/images/toggle.png';
import CircularSlider from 'react-circular-slider-svg';
import './App.css';

function App() {
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [masterVolume, setMasterVolume] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const [carVolume, setCarVolume] = useState(0.01);
    const [typingVolume, setTypingVolume] = useState(0.01);
    const [catVolume, setCatVolume] = useState(0.01);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [meowCount, setMeowCount] = useState(0)
    const [visible, setVisible] = useState(true);

    const rainClosedAudioRef = useRef(new Audio(rainClosed));
    const rainOpenAudioRef = useRef(new Audio(rainOpen));
    const carAudioRef = useRef(new Audio(carSound));
    const catPurringAudioRef = useRef(new Audio(catPurring));
    const catMeowAudioRef = useRef(new Audio(catMeow));
    const typingAudioRef = useRef(new Audio(typing));
    const fadeOutIntervalRef = useRef(null);
    const fadeInIntervalRef = useRef(null);

    const clearCrossfadeIntervals = () => {
        if (fadeOutIntervalRef.current) clearInterval(fadeOutIntervalRef.current);
        if (fadeInIntervalRef.current) clearInterval(fadeInIntervalRef.current);
    };

    const crossfadeAudio = (fromAudioRef, toAudioRef) => {
        clearCrossfadeIntervals();
        const fadeOutDuration = 1000;
        const fadeInDuration = 1000;

        fadeOutIntervalRef.current = setInterval(() => {
            if (fromAudioRef.current.volume > 0.05) {
                fromAudioRef.current.volume -= 0.05;
            } else {
                fromAudioRef.current.volume = 0;
                fromAudioRef.current.pause();
                clearInterval(fadeOutIntervalRef.current);
            }
        }, fadeOutDuration / 20);

        toAudioRef.current.volume = 0;
        toAudioRef.current.play();

        fadeInIntervalRef.current = setInterval(() => {
            if (toAudioRef.current.volume < 0.95) {
                toAudioRef.current.volume += 0.05;
            } else {
                toAudioRef.current.volume = 1;
                clearInterval(fadeInIntervalRef.current);
            }
        }, fadeInDuration / 20);
    };

    useEffect(() => {
        if (isWindowOpen) {
            rainOpenAudioRef.current.volume = 1 * masterVolume;
            rainClosedAudioRef.current.volume = 0
        } else {
            rainOpenAudioRef.current.volume = 0
            rainClosedAudioRef.current.volume = 1 * masterVolume;
        }
        catPurringAudioRef.current.volume = catVolume * masterVolume;
        carAudioRef.current.volume = carVolume * masterVolume;
        typingAudioRef.current.volume = typingVolume * masterVolume;
    }, [masterVolume, carVolume, catVolume, typingVolume]); //master volume

    useEffect(() => {
        rainClosedAudioRef.current.loop = true;
        rainOpenAudioRef.current.loop = true;
        carAudioRef.current.loop = true;
        catPurringAudioRef.current.loop = true;
        typingAudioRef.current.loop = true;
        catMeowAudioRef.current.volume = 0.1;

        return () => {
            clearCrossfadeIntervals();
            rainClosedAudioRef.current.pause();
            rainOpenAudioRef.current.pause();
            carAudioRef.current.pause();
            catPurringAudioRef.current.pause();
            typingAudioRef.current.pause();
        };
    }, []); //loop init + pause

    useEffect(() => {
        if (meowCount > 0) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [meowCount]); //fade-out for bagel counter

    const togglePlayPause = () => {
        if (isPlaying) {
            rainOpenAudioRef.current.pause();
            rainClosedAudioRef.current.pause();
            carAudioRef.current.pause();
            catPurringAudioRef.current.pause();
            typingAudioRef.current.pause();
        } else {
            if (isWindowOpen) {
                rainOpenAudioRef.current.volume = masterVolume;
                rainOpenAudioRef.current.play();
            } else {
                rainClosedAudioRef.current.volume = masterVolume;
                rainClosedAudioRef.current.play();
            }
            carAudioRef.current.play();
            catPurringAudioRef.current.play();
            typingAudioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleWindow = () => {
        setIsWindowOpen((prevState) => {
            if (isPlaying) {
                if (prevState) {
                    crossfadeAudio(rainOpenAudioRef, rainClosedAudioRef);
                } else {
                    crossfadeAudio(rainClosedAudioRef, rainOpenAudioRef);
                }
            }
            return !prevState;
        });
    };

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    const meowClicked = () => {
        catMeowAudioRef.current.play();
        setMeowCount(meowCount+1)
    }

    return (
        <div className="App">
            {meowCount > 0 && (
                <div
                    className="meow-counter"
                    style={{
                        opacity: visible ? 1 : 0,
                        transition: "opacity 1s ease-out",
                    }}
                >
                    Bagel has been harassed&nbsp;<div className="meow-counter-number"> {meowCount} </div>&nbsp;times.
                </div>
            )}
            <div className="container">
                <img className="table" src={table}/>
                <div className="volume-bar"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        opacity: isHovered ? 0.8 : 0.25
                    }}>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={masterVolume}
                        onChange={(e) => setMasterVolume(e.target.value)}
                    />
                </div>

                <div className="window-container">
                    <img className="window" src={isWindowOpen ? window_open : window_closed} alt="Window" />
                    <img className="plant" src={plant} alt="Plant" />
                    <div className="coffee-container">
                        <img className="coffee" src={coffee} alt="Coffee" />
                        <img className="steam" src={steam} alt="Steam" />
                    </div>

                    <img className="cat" src={cat} alt="Cat" />
                    <div
                        className="cat-head-clickable"
                        onClick={() => meowClicked()}
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
                    <div className="rain-container">
                        <img className="rain" src={isPlaying ? rain : " "} alt="Rain" />
                    </div>
                    <div className="backdrop-container">
                        <img className="backdrop" src={backdrop} alt="bg" />
                    </div>
                </div>

                <div className="button-container">
                    <img
                        src={isPlaying ? pauseButton : playButton}
                        alt="Play/Pause"
                        onClick={togglePlayPause}
                        className="play-pause-button"
                    />
                </div>

                <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
                    <button className="menu-toggle-button" onClick={toggleMenu}>
                        <img src={toggle} alt="Menu Toggle" />
                    </button>

                    <div className="volume-control-container">
                        <div className="slider-cutout-container">
                            <img className="car" src={car} alt="Car" />
                            <CircularSlider
                                size={100}
                                trackWidth={8}
                                minValue={0}
                                maxValue={1}
                                startAngle={40}
                                endAngle={320}
                                angleType={{ direction: "cw", axis: "-y" }}
                                handle1={{ value: 0, onChange: v => v }}
                                handle2={{ value: carVolume, onChange: v => setCarVolume(v) }}
                                arcColor="#c9c9c9"
                                handleSize={0}
                                arcBackgroundColor="#fff"
                            />
                        </div>

                        <div className="slider-cutout-container">
                            <img className="paw" src={paw} alt="Paw" />
                            <CircularSlider
                                size={100}
                                trackWidth={8}
                                minValue={0}
                                maxValue={1}
                                startAngle={40}
                                endAngle={320}
                                angleType={{ direction: "cw", axis: "-y" }}
                                handle1={{ value: 0, onChange: v => v }}
                                handle2={{ value: catVolume, onChange: v => setCatVolume(v) }}
                                arcColor="#c9c9c9"
                                handleSize={0}
                                arcBackgroundColor="#fff"
                            />
                        </div>
                    </div>

                    <div className="volume-control-container">
                        <div className="slider-cutout-container">
                            <img className="computer" src={computer} alt="computer" />
                            <CircularSlider
                                size={100}
                                trackWidth={8}
                                minValue={0}
                                maxValue={1}
                                startAngle={40}
                                endAngle={320}
                                angleType={{ direction: "cw", axis: "-y" }}
                                handle1={{ value: 0, onChange: v => v }}
                                handle2={{ value: typingVolume, onChange: v => setTypingVolume(v) }}
                                arcColor="#c9c9c9"
                                handleSize={0}
                                arcBackgroundColor="#fff"
                            />
                        </div>
                    </div>
                </div>
                <div className="credits">
                    Created by <a href="">Cieran Nolan</a>
                </div>
            </div>
        </div>
    );
}

export default App;