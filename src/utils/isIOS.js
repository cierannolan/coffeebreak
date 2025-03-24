const isIOS = () => {
    if (typeof navigator === "undefined") return false;

    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isIOSDevice = /iPhone|iPad|iPod/i.test(userAgent);
    const isIPadOS = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

    return isIOSDevice || isIPadOS;
};

export default isIOS;