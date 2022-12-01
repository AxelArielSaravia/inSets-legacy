import {useEffect, useState} from "react";

/*-
useMatchMedia: string -> boolean
*/
function useMatchMedia(media) {
    const _MM = window.matchMedia(media);
    const [value, setValue] = useState(_MM.matches);
    useEffect(function () {
        const MM = window.matchMedia(media);
        MM.onchange = (e) => setValue(() => e.matches);
        return () => MM.onchange = undefined;
    }, [media]);
    return value;
}

function matchesElement(matcher, callback) {
    return function (e) {
        if (!e.target.matches(matcher)) {
            callback();
        }
    };
}

function useOnClickClose(elementActive, matcher, closeFunction) {
    const {matches} = window.matchMedia("(min-width: 768px)");
    useEffect(function () {
        if (matches && elementActive) {
            const _matchesElement = matchesElement(matcher, closeFunction);
            document.addEventListener("click", _matchesElement);
            return function () {
                document.removeEventListener("click", _matchesElement);
            };
        }
    }, [elementActive, matches, matcher, closeFunction]);
}

export {
    useMatchMedia,
    useOnClickClose
};