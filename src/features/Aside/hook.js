import { useCallback, useEffect } from "react";

const useOnClickClose = (elementActive, matcher, closeFunction) => {
    const matches = useCallback((e) => { 
      if (!e.target.matches(matcher)) {
        closeFunction();
      }
    }, [matcher, closeFunction]);

    useEffect(() => {
        if (elementActive) {
            document.addEventListener('click', matches);
            return () => {
                document.removeEventListener('click', matches);
            } 
        }
    }, [elementActive, matches]);
}

export {
    useOnClickClose
}