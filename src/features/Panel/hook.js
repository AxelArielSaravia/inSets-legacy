import { useCallback, useEffect, useState } from "react";

/**
 * @param {string} media the string must be a media query css  
 * @returns {boolean}
 */
 export function useMatchMedia(media) {
    const _MM = window.matchMedia(media);
    const [value, setValue] = useState(_MM.matches);
    useEffect(() => {
        const MM = window.matchMedia(media);
        MM.onchange = (e) => setValue(() => e.matches);
        return () => MM.onchange = null;
    }, [media]);
    return value;
}

const matchesElement = (matcher, callback) => (e) => {
    if (!e.target.matches(matcher)) {
        callback();
    }
}
const useOnClickClose = (elementActive, matcher, closeFunction) => {
    const {matches} = window.matchMedia("(min-width: 768px)");    
    useEffect(() => {
        if (matches && elementActive) {
            const _matchesElement = matchesElement(matcher, closeFunction);
            document.addEventListener('click', _matchesElement);
            return () => {
                document.removeEventListener('click', _matchesElement);
            } 
        }
    }, [elementActive, matches, matcher, closeFunction]);
}

export {
    useOnClickClose
}