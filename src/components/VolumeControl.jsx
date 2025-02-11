import React from 'react';
import CircularSlider from 'react-circular-slider-svg';

const VolumeControl = ({ icon, volume, onVolumeChange }) => (
  <div className="slider-cutout-container">
    <img className="icon" src={icon} alt="Icon" />
    <CircularSlider
      size={100}
      trackWidth={8}
      minValue={0}
      maxValue={1}
      startAngle={40}
      endAngle={320}
      angleType={{ direction: 'cw', axis: '-y' }}
      handle1={{ value: 0, onChange: () => {} }}
      handle2={{ value: volume, onChange: onVolumeChange }}
      arcColor="#c9c9c9"
      handleSize={0}
      arcBackgroundColor="#fff"
    />
  </div>
);

export default VolumeControl