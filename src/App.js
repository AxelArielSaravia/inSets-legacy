import { 
  getGSHasAudioFiles, 
  getGSIsLoading, 
  setGSIsLoading, 
  getGSIsPlaying,
  setGSIsPlaying
} from "./core/initGlobalState.js";
import { addFiles, clearFiles } from "./core/handleFiles.js";

import { useState } from "react";
import Contexts from "./Contexts.js";

import Header from "./view/header-section/Header.js";
import Aside from "./view/tools-section/aside.js";
import Main from "./view/main-section/main.js";

import DragFiles from "./view/utils/dragFiles.js";
import DropFiles from "./view/utils/dropFiles.js";
import DropArea from "./view/utils/DropArea.js";

import './App.scss';


//COMPONENTS
//App Component
function App() {
  const [hasAudioFiles, setHasAudioFiles] = useState(getGSHasAudioFiles);
  const [isPlaying, setIsPlaying] = useState(getGSIsPlaying);
  const [isLoading, setIsLoading] = useState(getGSIsLoading);

  const handleFileDrop = (e) => {
    if (!isPlaying) {
      const files = e.dataTransfer.files;
      addFiles(files, setHasAudioFiles);
    }
  };

  const handleAddOnClick = (e) => {
    if (!isPlaying) {
      const files = e.currentTarget.files;
      addFiles(files, setHasAudioFiles);
      /* const bool = setGSIsLoading();
      setIsLoading(() => bool); */
    }

  };

  const handleClearOnClick = () => {
    if (!isPlaying)
      clearFiles(setHasAudioFiles);
  };
  
  const handlePlayOnClick = () => {
    if (hasAudioFiles) {
      const bool  = setGSIsPlaying()
      setIsPlaying(() => bool)
    }
  };

  return (
    <DragFiles
      className="flex-column"
      style={{
        width: '100%',
        height: '100%',
        minWidth: '100vw',
        minHeight: '100vh'
      }}
      >
      {isDragActive => (
        <>
          {window.AudioContext || window.webkitAudioContext ? "" : "DONT EXIST window.AudioContext"}
          <section className="header-section flex-column align-c justify-c">
            <Header />
          </section>
          <section className="creator-section flex-column align-c justify-c">
            <span className="fs-text">create by Axel Ariel Saravia</span>
          </section>
          <Contexts.IsPlaying.Provider value={isPlaying}>
            <Contexts.IsLoading.Provider value={isLoading}>
              <section className="tool-section flex-column align-c justify-c">
                <Aside/>
              </section>
              <section className="main-section flex-column align-c justify-c">
                <Contexts.HasAudioFiles.Provider value={hasAudioFiles}>
                  <Main 
                    handleClearOnClick={handleClearOnClick} 
                    handleAddOnClick={handleAddOnClick}
                    handlePlayOnClick={handlePlayOnClick}
                  />
                </Contexts.HasAudioFiles.Provider>
              </section>
            </Contexts.IsLoading.Provider>
          </Contexts.IsPlaying.Provider>
          {
            isDragActive && (
              <DropFiles
                className="dropFile flex-column align-c justify-c"
                onFileDrop={handleFileDrop}
              >
                <DropArea disable={isPlaying}/>
              </DropFiles>
            )
          }
        </>
      )}
    </DragFiles>
  );
}

export default App;