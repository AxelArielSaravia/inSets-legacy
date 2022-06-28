import { memo, useState } from "react";
import { addFiles, clearFiles } from "../../core/handleFiles.js";

import { DisableAllProvider } from "./DisableAllProvider.js"

import DropFiles from "../DropFiles.js";
import Aside from "./Aside.js";
import Main from "./Main.js";
import DropArea from "../DropArea.js";

import './AudioApp.scss';



//COMPONENTS
//App Component
function AudioApp(props) {
  const [hasAudios, setHasAudios] = useState(false);
  const [audioList, setAudioList] = useState(new Map());
  const [filesLoading, setFilesLoading] = useState(0); 



  const handleSetAudioList = (map) => {
    setAudioList(() => new Map([...map]));
  }

  const handleFileDrop = (e) => {
    const files = e.dataTransfer.files;
    setFilesLoading((state) => state + files.length);
    setHasAudios(() => true);
    addFiles(files, (map) => {
      setFilesLoading((state) => {
        if (state > 0) return state - 1;
        return state;
      });
      handleSetAudioList(map);
    });
  };
  
  const handleAddOnClick = (files) => {
    setFilesLoading((state) => state + files.length);
    setHasAudios(() => true);
    addFiles(files, (map) => {
      setFilesLoading((state) => {
        if (state > 0) return state - 1;
        return state;
      });
      handleSetAudioList(map);
    });
  };

  const handleClearOnClick = () => {
    if (hasAudios) {
      if (filesLoading === 0) {
        setHasAudios(() => false);
      }
      clearFiles(() => {
        setAudioList(() => new Map());
      });
    }
  };

  
  return (
    <div className="audio-app flex-row">
      <DisableAllProvider>
        <section className="tool-section">
          <Aside audioList_size={audioList.size}/>
        </section>
        <section className="main-section flex-column align-c justify-c">
          <Main
            audioList={audioList}
            filesLoading={filesLoading}
            hasAudios={hasAudios}
            handleAddOnClick={handleAddOnClick}
            handleClearOnClick={handleClearOnClick}
            handleSetAudioList={handleSetAudioList}
          />
        </section>
      </DisableAllProvider>
      {
        props.isDragActive && (
          <DropFiles
            className="dropFile flex-column align-c justify-c"
            onFileDrop={handleFileDrop}
          >
            <DropArea />
          </DropFiles>
        )
      }
    </div>

  );
}

export default memo(AudioApp);