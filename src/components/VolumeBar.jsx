import React, { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

const VolumeBar = ({ volume, setVolume, visibilities, isIOSDevice }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="volume-bar"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                opacity: isHovered ? 0.8 : 0.25,
                visibility: (visibilities.master_volume && !isIOSDevice) ? 'visible' : 'hidden'
            }}
        >
            <Range
                step={0.01}
                min={0}
                max={1}
                values={[volume]}
                onChange={(values) => setVolume(values[0])}
                renderTrack={({ props, children }) => {
                    const { key, ...restProps } = props;

                    return (
                        <div
                            key={key}
                            {...restProps}
                            style={{
                                ...restProps.style,
                                height: '1vh',
                                margin: 'auto',
                                width: '40%',
                                borderRadius: '0.5vh',
                                background: getTrackBackground({
                                    min: 0,
                                    max: 1,
                                    values: [volume],
                                    colors: ['#FFF', '#AAA'],
                                }),
                            }}
                        >
                            {children}
                        </div>
                    );
                }}
                renderThumb={({ props }) => {
                    const { key, ...restProps } = props;

                    return (
                        <div
                            key={key}
                            {...restProps}
                            style={{
                                ...restProps.style,
                                height: '50px',
                                width: '24px',
                                opacity: '0',
                            }}
                        />
                    );
                }}
            />
        </div>
    );
};

export default VolumeBar;