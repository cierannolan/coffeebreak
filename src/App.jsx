import { useState, useRef, useEffect } from 'react';
import window_closed from './assets/images/window closed.png';
import window_open from './assets/images/window open.png';
import rain from './assets/images/rain.gif';
import rainClosed from './assets/audio/rain window.wav';
import rainOpen from './assets/audio/rain outdoors.wav';
import carSound from './assets/audio/city.wav';
import catPurring from './assets/audio/cat purring.wav';
import backdrop from './assets/images/city background.png';
import playButton from './assets/images/play.png';
import pauseButton from './assets/images/pause.png';
import CircularSlider from 'react-circular-slider-svg';
import './App.css';

function App() {
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [carVolume, setCarVolume] = useState(0.01);
    const [catVolume, setCatVolume] = useState(0.01);

    const rainClosedAudioRef = useRef(new Audio(rainClosed));
    const rainOpenAudioRef = useRef(new Audio(rainOpen));
    const carAudioRef = useRef(new Audio(carSound));
    const catPurringAudioRef = useRef(new Audio(catPurring));

    const fadeOutIntervalRef = useRef(null);
    const fadeInIntervalRef = useRef(null);

    const clearCrossfadeIntervals = () => {
        if (fadeOutIntervalRef.current) clearInterval(fadeOutIntervalRef.current);
        if (fadeInIntervalRef.current) clearInterval(fadeInIntervalRef.current);
    };

    const crossfadeAudio = (fromAudioRef, toAudioRef) => {
        clearCrossfadeIntervals();

        const fadeOutDuration = 2000;
        const fadeInDuration = 2000;

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
        rainClosedAudioRef.current.loop = true;
        rainOpenAudioRef.current.loop = true;
        carAudioRef.current.loop = true;
        catPurringAudioRef.current.loop = true;

        rainClosedAudioRef.current.volume = 1;
        rainOpenAudioRef.current.volume = 0;
        carAudioRef.current.volume = carVolume;
        catPurringAudioRef.current.volume = catVolume;

        return () => {
            clearCrossfadeIntervals();
            rainClosedAudioRef.current.pause();
            rainOpenAudioRef.current.pause();
            carAudioRef.current.pause();
            catPurringAudioRef.current.pause();
        };
    }, []);

    useEffect(() => {
        carAudioRef.current.volume = carVolume;
    }, [carVolume]);

    useEffect(() => {
        catPurringAudioRef.current.volume = catVolume;
    }, [catVolume]);

    const togglePlayPause = () => {
        if (isPlaying) {
            rainOpenAudioRef.current.pause();
            rainClosedAudioRef.current.pause();
            carAudioRef.current.pause();
            catPurringAudioRef.current.pause();
        } else {
            if (isWindowOpen) {
                rainOpenAudioRef.current.play();
                rainOpenAudioRef.current.volume = 1;
            } else {
                rainClosedAudioRef.current.play();
                rainClosedAudioRef.current.volume = 1;
            }
            carAudioRef.current.play();
            catPurringAudioRef.current.play();
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
                    className="play-pause-button"
                />
            </div>
            <div className="volume-control-container">
                <CircularSlider
                    size={100}
                    trackWidth={8}
                    minValue={0}
                    maxValue={1}
                    startAngle={40}
                    endAngle={320}
                    angleType={{
                        direction: "cw",
                        axis: "-y"
                    }}
                    handle1={{
                        value: 0,
                        onChange: v => v
                    }}
                    handle2={{
                        value: carVolume,
                        onChange: v => setCarVolume(v)
                    }}
                    arcColor="#c9c9c9"
                    handleSize={0}
                    arcBackgroundColor="#fff"
                />
                <CircularSlider
                    size={100}
                    trackWidth={8}
                    minValue={0}
                    maxValue={1}
                    startAngle={40}
                    endAngle={320}
                    angleType={{
                        direction: "cw",
                        axis: "-y"
                    }}
                    handle1={{
                        value: 0,
                        onChange: v => v
                    }}
                    handle2={{
                        value: catVolume,
                        onChange: v => setCatVolume(v)
                    }}
                    arcColor="#c9c9c9"
                    handleSize={0}
                    arcBackgroundColor="#fff"
                />
            </div>


        </div>
    );
}

export default App;
