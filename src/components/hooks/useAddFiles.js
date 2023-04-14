import {useContext, useCallback} from "react";

import {AudioListContext} from "../contexts/AudioList.js";
import {SumOfAllAudiosEventsContext} from "../contexts/SumOfAllAudiosEvents.js";

import {audioListActions} from "../../slices/audioList.js"
;
import {isValidAudioType, audioFromFile} from "./useAddFiles.utils.js";
import {createId} from  "../../utils.js";


function useAddFiles() {
    const [, audioListDispatcher] = useContext(AudioListContext);
    const [, sumOfAllEventsDispatcher] = useContext(SumOfAllAudiosEventsContext);

    const addFiles = useCallback(function (files) {
        Object.values(files).forEach(function (file) {
            if (isValidAudioType(file.type)) {
                const id = createId();
                //available to use in view
                audioListDispatcher(audioListActions.addLoading(id));

                new Promise(function (resolve) {
                    audioFromFile(
                        file,
                        id,
                        audioListDispatcher,
                        sumOfAllEventsDispatcher,
                    );
                    resolve();
                });
            }
        });
    }, [audioListDispatcher, sumOfAllEventsDispatcher]);
    return addFiles;
}

export default useAddFiles;