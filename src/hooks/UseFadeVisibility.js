import { useState, useEffect } from 'react';

const useFadeVisibility = (trigger, duration = 1500) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (trigger) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), duration);
            return () => clearTimeout(timer);
        }
    }, [trigger, duration]);

    return visible;
};

export default useFadeVisibility;