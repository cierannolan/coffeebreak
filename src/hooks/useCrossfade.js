import { useRef } from 'react';

const useCrossfade = () => {
    const fadeOutIntervalRef = useRef(null);
    const fadeInIntervalRef = useRef(null);

    const crossfadeAudio = (fromAudio, toAudio, duration = 1000) => {
        if (fadeOutIntervalRef.current) clearInterval(fadeOutIntervalRef.current);
        if (fadeInIntervalRef.current) clearInterval(fadeInIntervalRef.current);

        const step = 50;
        const fadeOutStep = fromAudio.volume / (duration / step);
        const fadeInStep = 1 / (duration / step);

        toAudio.volume = 0;
        toAudio.play();

        fadeOutIntervalRef.current = setInterval(() => {
            if (fromAudio.volume > fadeOutStep) {
                fromAudio.volume -= fadeOutStep;
            } else {
                fromAudio.volume = 0;
                fromAudio.pause();
                clearInterval(fadeOutIntervalRef.current);
            }
        }, step);

        fadeInIntervalRef.current = setInterval(() => {
            if (toAudio.volume < 1 - fadeInStep) {
                toAudio.volume += fadeInStep;
            } else {
                toAudio.volume = 1;
                clearInterval(fadeInIntervalRef.current);
            }
        }, step);
    };

    return { crossfadeAudio };
};

export default useCrossfade;