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

export default useMatchMedia;