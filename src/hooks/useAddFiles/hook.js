import {useContext, useCallback} from "react";

import {
    AudioListContext,
    SumOfAllAudiosEventsContext
} from "../../context/index.js";

import {isValidAudioType, audioFromFile} from "./utils.js";



function useAddFiles() {
    const [, audioListDispatcher] = useContext(AudioListContext);
    const [, sumOfAllEventsDispatcher] = useContext(SumOfAllAudiosEventsContext);

    const addFiles = useCallback(function (files) {
        Object.values(files).forEach(function (file) {
            if (isValidAudioType(file.type)) {
                new Promise(function (resolve) {
                    audioFromFile(
                        file,
                        audioListDispatcher,
                        sumOfAllEventsDispatcher
                    );
                    resolve();
                });
            }
        });
    }, [audioListDispatcher, sumOfAllEventsDispatcher]);
    return addFiles;
}

export {
    useAddFiles
};