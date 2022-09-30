import { useContext, useCallback } from "react";

import { AudioListContext, SumOfAllAudiosEventsContext } from "../../context/index.js";

import { isValidAudioType, audioFromFile_AudioNode } from "./utils.js";

function useAddFiles() {
  const [, audioListDispatcher] = useContext(AudioListContext);
  const [, sumOfAllEventsDispatcher] = useContext(SumOfAllAudiosEventsContext);
  /**
   * @param {FileList} files 
   * @param {function} setUIState change the UI states
   */
  const addFiles = useCallback((files) => {
    for (const file of files) {
      if (isValidAudioType(file.type)) {
        audioFromFile_AudioNode(file, audioListDispatcher, sumOfAllEventsDispatcher);
      }
    }
  }, [audioListDispatcher, sumOfAllEventsDispatcher]);
  return addFiles;
}

export { useAddFiles };