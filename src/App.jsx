import React, { useRef, useState, useEffect, useCallback } from 'react';

import VolumeBar from './components/VolumeBar';
import MeowCounter from './components/MeowCounter';
import Window from './components/Window';
import Table from './components/Table';
import VolumeControls from './components/VolumeControls';
import VisibilityMenu from './components/VisibilityMenu';
import PlayPauseButton from './components/PlayPauseButton';

import useAudio from './hooks/useAudio';
import useCrossfade from './hooks/useCrossfade';
import useFadeVisibility from './hooks/useFadeVisibility';

import rainClosedSrc from './assets/audio/rain window.mp3';
import rainOpenSrc from './assets/audio/rain outdoors.mp3';
import carSrc from './assets/audio/traffic.mp3';
import typingSrc from './assets/audio/typing.mp3';
import catPurringSrc from './assets/audio/cat purring.mp3';
import catMeowSrc from './assets/audio/meow.mp3';

import isIOS from './utils/isIOS.js';

import './App.css';
import './assets/stylesheets/Window.css';
import './assets/stylesheets/PlayPauseButton.css';
import './assets/stylesheets/Table.css';
import './assets/stylesheets/VolumeControl.css';
import './assets/stylesheets/VolumeControls.css';
import './assets/stylesheets/VolumeBar.css';
import './assets/stylesheets/VisibilityMenu.css';
import './assets/stylesheets/MeowCounter.css';
import './assets/stylesheets/LoadingScreen.css';

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
    const [isIOSDevice, setIsIOSDevice] = useState(false);

    const [visibilities, setVisibilities] = useState({
        cat: true,
        table: true,
        coffee: true,
        plant: true,
        master_volume: true,
        volume_controls: true,
        play_button: true,
    });

    const rainClosedAudio = useAudio(rainClosedSrc, { loop: true });
    const rainOpenAudio = useAudio(rainOpenSrc, { loop: true });
    const carAudio = useAudio(carSrc, { loop: true });
    const typingAudio = useAudio(typingSrc, { loop: true });
    const catPurringAudio = useAudio(catPurringSrc, { loop: true });
    const catMeowAudio = useAudio(catMeowSrc, { loop: false });

    const { crossfadeAudio } = useCrossfade();
    const visible = useFadeVisibility(meowCount);

    const audioContextRef = useRef(null);
    const carBuffer = useRef(null);
    const typingBuffer = useRef(null);
    const catBuffer = useRef(null);
    const carSource = useRef(null);
    const typingSource = useRef(null);
    const catSource = useRef(null);
    const carGain = useRef(null);
    const typingGain = useRef(null);
    const catGain = useRef(null);

    const rainClosedVolumeRef = useRef(masterVolume * (isWindowOpen ? 0 : 1));
    const rainOpenVolumeRef = useRef(masterVolume * (isWindowOpen ? 1 : 0));

    useEffect(() => {
        setIsIOSDevice(isIOS());
    }, []);

    useEffect(() => {
        if (isIOSDevice) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            const loadAudio = async (src, bufferRef) => {
                const response = await fetch(src);
                const arrayBuffer = await response.arrayBuffer();
                bufferRef.current = await audioContextRef.current.decodeAudioData(arrayBuffer);
            };
            loadAudio(carSrc, carBuffer);
            loadAudio(typingSrc, typingBuffer);
            loadAudio(catPurringSrc, catBuffer);
        }
    }, [isIOSDevice]);

    const playIOSAudio = (buffer, sourceRef, gainRef, volume) => {
        if (isIOSDevice && audioContextRef.current && buffer.current) {
            sourceRef.current = audioContextRef.current.createBufferSource();
            sourceRef.current.buffer = buffer.current;
            sourceRef.current.loop = true;
            gainRef.current = audioContextRef.current.createGain();
            gainRef.current.gain.value = volume;
            sourceRef.current.connect(gainRef.current).connect(audioContextRef.current.destination);
            sourceRef.current.start();
        }
    };

    const stopIOSAudio = (sourceRef) => {
        if (isIOSDevice && sourceRef.current) {
            sourceRef.current.stop();
            sourceRef.current = null;
        }
    };

    useEffect(() => {
        if (isPlaying) {
            if (isIOSDevice) {
                if (isWindowOpen) {
                    rainOpenAudio.play();
                    setTimeout(() => {
                        rainClosedAudio.pause();
                    }, 0);
                } else {
                    rainClosedAudio.play();
                    setTimeout(() => {
                        rainOpenAudio.pause();
                    }, 0);
                }
            } else {
                if (isWindowOpen) {
                    crossfadeAudio(rainClosedAudio.audio, rainOpenAudio.audio, masterVolume, 1000, setIsCrossfading);
                } else {
                    crossfadeAudio(rainOpenAudio.audio, rainClosedAudio.audio, masterVolume, 1000, setIsCrossfading);
                }
            }
        }
    }, [isWindowOpen, isPlaying, isIOSDevice]);

    useEffect(() => {
        if (!isIOSDevice && !isCrossfading) {
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
        }
    }, [masterVolume, volumes, isWindowOpen, isCrossfading, isIOSDevice]);

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

            if (isIOSDevice) {
                playIOSAudio(carBuffer, carSource, carGain, volumes.car);
                playIOSAudio(typingBuffer, typingSource, typingGain, volumes.typing);
                playIOSAudio(catBuffer, catSource, catGain, volumes.cat);
            } else {
                carAudio.play();
                typingAudio.play();
                catPurringAudio.play();
            }
        } else {
            if (isIOSDevice) {
                rainClosedAudio.pause();
                rainOpenAudio.pause();
                stopIOSAudio(carSource);
                stopIOSAudio(typingSource);
                stopIOSAudio(catSource);
            } else {
                rainClosedAudio.pause();
                rainOpenAudio.pause();
                carAudio.pause();
                typingAudio.pause();
                catPurringAudio.pause();
            }
        }
    }, [isPlaying, isWindowOpen, isIOSDevice, volumes]);

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
                isIOSDevice={isIOSDevice}
            />

            <MeowCounter
                meowCount={meowCount}
                visible={visible}
                visibilities={visibilities}
            />

            <div className="container">
                <VolumeBar
                    volume={masterVolume}
                    setVolume={setMasterVolume}
                    visibilities={visibilities}
                    isIOSDevice={isIOSDevice}
                />

                <Window
                    isWindowOpen={isWindowOpen}
                    toggleWindow={toggleWindow}
                    meowClicked={meowClicked}
                    isPlaying={isPlaying}
                    visibilities={visibilities}
                />

                <Table
                    meowClicked={meowClicked}
                    isPlaying={isPlaying}
                    visibilities={visibilities}
                    typingAudio={volumes.typing}
                />

                <PlayPauseButton
                    isPlaying={isPlaying}
                    togglePlayPause={togglePlayPause}
                    visibilities={visibilities}
                    isIOSDevice={isIOSDevice}
                />

                <VolumeControls
                    isMenuOpen={isMenuOpen}
                    toggleMenu={toggleMenu}
                    volumes={volumes}
                    setVolumes={setVolumes}
                    visibilities={visibilities}
                    isIOSDevice={isIOSDevice}
                />
                <div className="credits">
                    Created by <a href="https://github.com/cierannolan" target="_blank" >Cieran Nolan</a>
                </div>
            </div>
        </div>
    );
}

export default App;