import { useRef, useEffect } from 'react';

const useAudio = (src, { volume = 1, loop = true } = {}) => {
    const audioRef = useRef(new Audio(src));

    useEffect(() => {
        const audio = audioRef.current;
        audio.volume = volume;
        audio.loop = loop;

        return () => {
            audio.pause();
        };
    }, [src, volume, loop]);

    const play = () => audioRef.current.play();
    const pause = () => audioRef.current.pause();
    const setVolume = (value) => {
        audioRef.current.volume = value;
    };

    return { play, pause, setVolume, audio: audioRef.current };
};

export default useAudio;
