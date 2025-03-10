import React, { useState, useEffect } from 'react';
import CircularSlider from 'react-circular-slider-svg';

const VolumeControl = ({ icon, volume, onVolumeChange }) => {
    const [size, setSize] = useState(0);
    const [trackWidth, setTrackWidth] = useState(8);

    useEffect(() => {
        const calculateSize = () => {
            //the component only supports px values, so we calculate the width here for responsive layouts
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const isPortrait = windowHeight > windowWidth;

            if (isPortrait) {
                if (windowWidth < 1025 && windowWidth > 480) {
                    setSize(windowWidth * 0.20);
                    setTrackWidth(12)
                } else {
                    setSize(windowWidth * 0.25);
                }
                
            } else {
                setSize(110);
                setTrackWidth(8)
            }
        };

        calculateSize();
        window.addEventListener('resize', calculateSize);

    }, []);

    return (
        <div className="slider-container">
            <img className="icon" src={icon} alt="Icon" />
            <CircularSlider
                className="volume-wheel"
                size={size}
                trackWidth={trackWidth}
                minValue={0}
                maxValue={1}
                startAngle={40}
                endAngle={320}
                angleType={{ direction: 'cw', axis: '-y' }}
                handle1={{ value: 0, onChange: () => { } }}
                handle2={{ value: volume, onChange: onVolumeChange }}
                arcColor="#c9c9c9"
                handleSize={0}
                arcBackgroundColor="#fff"
            />
        </div>
    );
};

export default VolumeControl;