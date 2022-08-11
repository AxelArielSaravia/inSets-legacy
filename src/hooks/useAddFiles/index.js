import { useContext } from "react";

import { GlobalContext } from "../../context/Global/index.js";

import {    
    isValidAudioType,
    audioStateFromFile_AudioNode,
    audioStateFromFile_AudioBuffer
} from "./utils.js";

function useAddFiles() {
  const [globalView, globalViewDispatcher] = useContext(GlobalContext);
  
  /**
   * @param {FileList} files 
   * @param {function} setUIState change the UI states
   */
  const addFiles = (files)  => {
    for (const file of files) {
      if (isValidAudioType(file.type)) {
        globalViewDispatcher({variable: "filesLoading", type:"add"});
        if (globalView.ENGINE_TYPE === "audioNode") {
          audioStateFromFile_AudioNode(file, globalViewDispatcher)
        } else if (globalView.ENGINE_TYPE === "audioBuffer") {
          audioStateFromFile_AudioBuffer(file, globalViewDispatcher);
        }
      }
    }
  }

  return addFiles;
}

export default useAddFiles;