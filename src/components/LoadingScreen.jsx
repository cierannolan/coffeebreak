import React, { useState, useEffect } from 'react';
import rainClosedSrc from '../assets/audio/rain window.wav';
import rainOpenSrc from '../assets/audio/rain outdoors.wav';
import carSrc from '../assets/audio/traffic.wav';
import typingSrc from '../assets/audio/typing.wav';
import catPurringSrc from '../assets/audio/cat purring.wav';
import catMeowSrc from '../assets/audio/meow.wav';
import catImg from '../assets/images/bagel.gif';
import coffeeImg from '../assets/images/coffee.gif';
import steamImg from '../assets/images/steam.gif';
import laptopImg from '../assets/images/laptop.png';
import tableImg from '../assets/images/table.png';
import typingImg from '../assets/images/typing.gif';
import backdropImg from '../assets/images/city background.png';
import windowClosedImg from '../assets/images/window closed.png';
import windowOpenImg from '../assets/images/window open.png';
import plantImg from '../assets/images/plant.png';
import rainImg from '../assets/images/rain.gif';
import playImg from '../assets/images/play.png';
import pauseImg from '../assets/images/pause.png';
import carIcon from '../assets/images/car.png';
import pawIcon from '../assets/images/paw.png';
import computerIcon from '../assets/images/computer.png';
import toggleIcon from '../assets/images/toggle.png';
import eyeIcon from '../assets/images/eye.png';
import eyeClosedIcon from '../assets/images/eye_closed.png';

const LoadingScreen = ({ onLoaded }) => {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const imagesToLoad = [
            catImg, coffeeImg, steamImg, laptopImg, tableImg, typingImg,
            backdropImg, windowClosedImg, windowOpenImg, plantImg, rainImg,
            playImg, pauseImg, carIcon, pawIcon, computerIcon, toggleIcon,
            eyeIcon, eyeClosedIcon
        ];
        const audioToLoad = [
            rainClosedSrc, rainOpenSrc, carSrc, typingSrc, catPurringSrc, catMeowSrc
        ];
        let loadedCount = 0;
        const totalItems = imagesToLoad.length + audioToLoad.length;

        const updateProgress = () => {
            loadedCount++;
            const newProgress = Math.floor((loadedCount / totalItems) * 100);
            setProgress(newProgress);
            if (loadedCount === totalItems) {
                setTimeout(() => {
                    setIsLoaded(true);
                    onLoaded();
                }, 500);
            }
        };

        imagesToLoad.forEach(imageSrc => {
            const img = new Image();
            img.onload = updateProgress;
            img.onerror = updateProgress;
            img.src = imageSrc;
        });

        audioToLoad.forEach(audioSrc => {
            const audio = new Audio();
            audio.oncanplaythrough = updateProgress;
            audio.onerror = updateProgress;
            audio.src = audioSrc;
            audio.preload = 'auto';
            audio.load();
        });

        const fallbackTimeout = setTimeout(() => {
            if (!isLoaded) {
                setIsLoaded(true);
                onLoaded();
            }
        }, 15000);

        return () => clearTimeout(fallbackTimeout);
    }, [onLoaded]);

    return (
        <div className={`loading-screen ${isLoaded ? 'fade-out' : ''}`}>
            <div className="loading-content">
                <h1>Coffee Break</h1>
                <div className="loading-bar-container">
                    <div className="loading-bar" style={{ width: `${progress}%` }}></div>
                </div>
                <p>{progress}% loaded</p>
            </div>
        </div>
    );
};

export default LoadingScreen;