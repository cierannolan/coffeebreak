import React, { useRef, useState, useEffect, useCallback } from 'react';

import VolumeBar from './components/VolumeBar.jsx'
import MeowCounter from './components/MeowCounter';
import Window from './components/Window';
import Table from './components/Table';
import VolumeControls from './components/VolumeControls';
import VisibilityMenu from './components/VisibilityMenu';
import PlayPauseButton from './components/PlayPauseButton';

import useAudio from './hooks/useAudio';
import useCrossfade from './hooks/useCrossfade';
import useFadeVisibility from './hooks/useFadeVisibility';

import rainClosedSrc from './assets/audio/rain window.wav';
import rainOpenSrc from './assets/audio/rain outdoors.wav';
import carSrc from './assets/audio/traffic.wav';
import typingSrc from './assets/audio/typing.wav';
import catPurringSrc from './assets/audio/cat purring.wav';
import catMeowSrc from './assets/audio/meow.wav';

import './App.css';
import './assets/stylesheets/Window.css';
import './assets/stylesheets/Table.css';
import './assets/stylesheets/VolumeControl.css';
import './assets/stylesheets/VolumeControls.css';
import './assets/stylesheets/VolumeBar.css';
import './assets/stylesheets/VisibilityMenu.css';
import './assets/stylesheets/MeowCounter.css';

function App() {
    const [masterVolume, setMasterVolume] = useState(1);
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCrossfading, setIsCrossfading] = useState(false);
    const [volumes, setVolumes] = useState({
        car: 0.01,
        typing: 0.01,
        cat: 0.01,
    });
    const [meowCount, setMeowCount] = useState(0);

    const [visibilities, setVisibilities] = useState({
        cat: true,
        table: true,
        coffee: true,
        plant: true,
        master_volume: true,
        volume_controls: true,
        play_button: true,
    });

    const visible = useFadeVisibility(meowCount);

    const rainClosedAudio = useAudio(rainClosedSrc, { loop: true });
    const rainOpenAudio = useAudio(rainOpenSrc, { loop: true });
    const carAudio = useAudio(carSrc, { loop: true });
    const typingAudio = useAudio(typingSrc, { loop: true });
    const catPurringAudio = useAudio(catPurringSrc, { loop: true });
    const catMeowAudio = useAudio(catMeowSrc, { loop: false });

    const rainClosedVolumeRef = useRef(masterVolume * (isWindowOpen ? 0 : 1));
    const rainOpenVolumeRef = useRef(masterVolume * (isWindowOpen ? 1 : 0));

    const { crossfadeAudio } = useCrossfade();

    useEffect(() => {
        if (isPlaying) {
            if (isWindowOpen) {
                crossfadeAudio(rainClosedAudio.audio, rainOpenAudio.audio, masterVolume, 1000, setIsCrossfading);
            } else {
                crossfadeAudio(rainOpenAudio.audio, rainClosedAudio.audio, masterVolume, 1000, setIsCrossfading);
            }
        }
    }, [isWindowOpen]);

    useEffect(() => {
        const adjustVolumes = () => {
            if (isCrossfading) return;

            if (!isWindowOpen) {
                rainClosedVolumeRef.current = masterVolume;
                rainOpenVolumeRef.current = 0;
            } else {
                rainClosedVolumeRef.current = 0;
                rainOpenVolumeRef.current = masterVolume;
            }

            if (!isWindowOpen) {
                rainClosedAudio.setVolume(rainClosedVolumeRef.current);
            }
            if (isWindowOpen) {
                rainOpenAudio.setVolume(rainOpenVolumeRef.current);
            }

            carAudio.setVolume(volumes.car * masterVolume);
            typingAudio.setVolume(volumes.typing * masterVolume);
            catPurringAudio.setVolume(volumes.cat * masterVolume);
        };
        adjustVolumes();
    }, [masterVolume, volumes, isWindowOpen, isCrossfading]);


    const togglePlayPause = useCallback(() => {
        setIsPlaying((prev) => !prev);
        if (!isPlaying) {
            if (isWindowOpen) {
                rainOpenAudio.play();
                rainClosedAudio.pause();
            } else {
                rainClosedAudio.play();
                rainOpenAudio.pause();
            }
            carAudio.play();
            typingAudio.play();
            catPurringAudio.play();
        } else {
            rainClosedAudio.pause();
            rainOpenAudio.pause();
            carAudio.pause();
            typingAudio.pause();
            catPurringAudio.pause();
        }
    }, [isPlaying, isWindowOpen]);


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
            <VisibilityMenu className="visibility-menu"
                visibilities={visibilities}
                setVisibilities={setVisibilities}
            />
            <MeowCounter meowCount={meowCount} visible={visible} visibilities={visibilities} />
            <div className="container">
                <VolumeBar volume={masterVolume} setVolume={setMasterVolume} visibilities={visibilities} />
                <Window isWindowOpen={isWindowOpen} toggleWindow={toggleWindow} meowClicked={meowClicked} isPlaying={isPlaying} visibilities={visibilities} />
                <Table meowClicked={meowClicked} isPlaying={isPlaying} visibilities={visibilities} typingAudio={volumes.typing} />
                <PlayPauseButton isPlaying={isPlaying} togglePlayPause={togglePlayPause} visibilities={visibilities} />
                <VolumeControls
                    isMenuOpen={isMenuOpen}
                    toggleMenu={toggleMenu}
                    volumes={volumes}
                    setVolumes={setVolumes}
                    visibilities={visibilities}
                />
                <div className="credits">
                    Created by <a href="https://github.com/cierannolan" target="_blank" >Cieran Nolan</a>
                </div>
            </div>
        </div>
    );
}

export default App;