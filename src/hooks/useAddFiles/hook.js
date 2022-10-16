import { useContext, useCallback } from "react";

import {
    AudioListContext,
    SumOfAllAudiosEventsContext
} from "../../context/index.js";

import { isValidAudioType, audioFromFile_AudioNode } from "./utils.js";


function useAddFiles() {
  const [, audioListDispatcher] = useContext(AudioListContext);
  const [, sumOfAllEventsDispatcher] = useContext(SumOfAllAudiosEventsContext);

  const addFiles = useCallback(function(files) {
    Object.values(files).forEach(function(file) {
        if (isValidAudioType(file.type)) {
          audioFromFile_AudioNode(file, audioListDispatcher, sumOfAllEventsDispatcher);
        }
    });
  }, [audioListDispatcher, sumOfAllEventsDispatcher]);
  return addFiles;
}

export { useAddFiles };