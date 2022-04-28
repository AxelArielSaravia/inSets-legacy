import { useContext, memo } from "react";
import Contexts from "../../Contexts.js";

import AddFilesButton from "./AddFilesButton.js";
import PlayButton from "./PlayButton.js";

import AudioCard from "../audios/AudioCard.js";

import "./main.scss";


export default memo(function Main(props) {
  console.log("Update Main"); //DEBUGGER

  const hasAudioFiles = useContext(Contexts.HasAudioFiles);
  const isPlaying = useContext(Contexts.IsPlaying);

  return (
    <main className="main flex-column align-c">
      <div className="file-button flex-row align-c justify-c">
        <AddFilesButton disable={isPlaying} onClick={props.handleAddOnClick} />
        <PlayButton disable={hasAudioFiles} isPlaying={isPlaying} onClick={props.handlePlayOnClick}/>
        <button 
          className={isPlaying? "tool-button flex-row disable" : "tool-button flex-row" }
          onClick={props.handleClearOnClick}
        >
          <i className="tool-button_icon fs-text bi bi-trash-fill"></i>
          <h4 className="fs-text">Clear</h4> 
        </button>
        </div>
      <div className="file-container flex-column">
        <div className="files flex-row flex-wrap justify-sb" >
          <AudioCard />
          <AudioCard />
          <AudioCard />
          <AudioCard />
          <AudioCard />
          <AudioCard />
          <AudioCard />
          <AudioCard />
          <AudioCard />
          <AudioCard />
          <AudioCard />
          <AudioCard />
          <AudioCard />
          <AudioCard />
          <AudioCard />
          <AudioCard />
        </div>
      </div>
    </main>
  );
})