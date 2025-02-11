import React, { useState, useEffect } from 'react';

import VolumeBar from './components/VolumeBar.jsx'
import MeowCounter from './components/MeowCounter';
import Window from './components/Window';
import VolumeControls from './components/VolumeControls';
import PlayPauseButton from './components/PlayPauseButton';

import useAudio from './hooks/useAudio';
import useCrossfade from './hooks/useCrossfade';
import useFadeVisibility from './hooks/useFadeVisibility';

import tableImg from './assets/images/table.png';

import rainClosedSrc from './assets/audio/rain window.wav';
import rainOpenSrc from './assets/audio/rain outdoors.wav';
import carSrc from './assets/audio/city.wav';
import typingSrc from './assets/audio/typing 2.wav';
import catPurringSrc from './assets/audio/cat purring.wav';
import catMeowSrc from './assets/audio/meow.wav';

import './App.css';

function App() {
    const [masterVolume, setMasterVolume] = useState(1);
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [volumes, setVolumes] = useState({
        car: 0.01,
        typing: 0.01,
        cat: 0.01,
    });
    const [meowCount, setMeowCount] = useState(0);

    const visible = useFadeVisibility(meowCount);

    const rainClosedAudio = useAudio(rainClosedSrc, { loop: true });
    const rainOpenAudio = useAudio(rainOpenSrc, { loop: true });
    const carAudio = useAudio(carSrc, { loop: true });
    const typingAudio = useAudio(typingSrc, { loop: true });
    const catPurringAudio = useAudio(catPurringSrc, { loop: true });
    const catMeowAudio = useAudio(catMeowSrc, { loop: false });

    const { crossfadeAudio } = useCrossfade();

    useEffect(() => {
        if (isPlaying) {
            if (isWindowOpen) {
                crossfadeAudio(rainClosedAudio.audio, rainOpenAudio.audio);
            } else {
                crossfadeAudio(rainOpenAudio.audio, rainClosedAudio.audio);
            }
        }
    }, [isWindowOpen]);

    useEffect(() => {
        const adjustVolumes = () => {
            const volumeMultiplier = masterVolume;
            rainClosedAudio.setVolume(volumeMultiplier * (isWindowOpen ? 0 : 1));
            rainOpenAudio.setVolume(volumeMultiplier * (isWindowOpen ? 1 : 0));
            carAudio.setVolume(volumes.car * volumeMultiplier);
            typingAudio.setVolume(volumes.typing * volumeMultiplier);
            catPurringAudio.setVolume(volumes.cat * volumeMultiplier);
        };
        adjustVolumes();
    }, [masterVolume, volumes, isWindowOpen]);

    const togglePlayPause = () => {
        if (isPlaying) {
            rainClosedAudio.pause();
            rainOpenAudio.pause();
            carAudio.pause();
            typingAudio.pause();
            catPurringAudio.pause();
        } else {
            rainClosedAudio.play();
            rainOpenAudio.play();
            carAudio.play();
            typingAudio.play();
            catPurringAudio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const meowClicked = () => {
        catMeowAudio.play();
        setMeowCount(meowCount + 1);
    };

    const toggleWindow = () => {
        setIsWindowOpen(!isWindowOpen);
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="App">
            <MeowCounter meowCount={meowCount} visible={visible} />

            <div className="container">
                <img className="table" src={tableImg} alt="Table" />
                <VolumeBar volume={masterVolume} setVolume={setMasterVolume} />
                <Window isWindowOpen={isWindowOpen} toggleWindow={toggleWindow} meowClicked={meowClicked} isPlaying={isPlaying} />
                <PlayPauseButton isPlaying={isPlaying} togglePlayPause={togglePlayPause} />
                <VolumeControls
                    isMenuOpen={isMenuOpen}
                    toggleMenu={toggleMenu}
                    volumes={volumes}
                    setVolumes={setVolumes}
                />
            </div>

            <div className="credits">
                Created by <a href="https://github.com/cierannolan" target="_blank" >Cieran Nolan</a>
            </div>

        </div>
    );
}

export default App;
