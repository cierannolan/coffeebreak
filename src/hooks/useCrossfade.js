import { useRef } from 'react';

const useCrossfade = () => {
    const fadeOutIntervalRef = useRef(null);
    const fadeInIntervalRef = useRef(null);

    const crossfadeAudio = (fromAudio, toAudio, masterVolume, duration = 1000) => {
        if (fadeOutIntervalRef.current) clearInterval(fadeOutIntervalRef.current);
        if (fadeInIntervalRef.current) clearInterval(fadeInIntervalRef.current);

        const step = 100;
        const totalSteps = duration / step;

        const fadeOutStep = fromAudio.volume / totalSteps;
        const fadeInStep = masterVolume / totalSteps;

        toAudio.volume = 0;

        toAudio.play().then(() => {

            toAudio.volume = 0;

            fadeOutIntervalRef.current = setInterval(() => {
                if (fromAudio.volume > fadeOutStep) {
                    fromAudio.volume = Math.max(0, fromAudio.volume - fadeOutStep);
                } else {
                    fromAudio.volume = 0;
                    fromAudio.pause();
                    clearInterval(fadeOutIntervalRef.current);
                }
            }, step);

            let currentStep = 0;
            fadeInIntervalRef.current = setInterval(() => {
                currentStep++;
                const targetVolume = Math.min(masterVolume, fadeInStep * currentStep);

                if (currentStep < totalSteps) {
                    toAudio.volume = targetVolume;
                } else {
                    toAudio.volume = masterVolume;
                    clearInterval(fadeInIntervalRef.current);
                }
            }, step);
        });
    };

    return { crossfadeAudio };
};

export default useCrossfade;