import {useEffect} from "react";

function matchesElement(matcher, callback) {
    return function (e) {
        if (!e.target.matches(matcher)) {
            callback();
        }
    };
}

function useOnClickClosePanel(elementActive, matcher, closeFunction) {
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

export default useOnClickClosePanel;