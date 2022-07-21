import { memo, useState, useEffect } from "react";
import { GSIsStarted } from "../../core/initGlobalState.js";
import { randomTimeExecution, stopAll, changeGSSTARTED_ID } from "../../core/audioEffects.js";

import AddFilesButton from "./AddFilesButton.js";
import AudioCard from "./AudioCard/AudioCard.js";
import AudioLoadingCard from "./AudioCard/AudioLoadingCard.js";
import ToolButton from "./ToolButton.js";

import "./Main.scss";

export default memo(function Main(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audiosStates, setAudiosStates] = useState({});
  const audioList = props.audioList;
  const [AC_MustralTotal, setAC_MustralTotal] = useState([...audioList].reduce((acc, el) => acc + el[1].probability.value, 0));

  useEffect(() => { 
    setAudiosStates((state) => {
      const audiosPlayingObj = {...state};
      audioList.forEach((el, i) => {
        if (!state[i]){
          audiosPlayingObj[i] = {
            isPlaying: el.isPlaying,
            randomCurrentTime: el.randomCurrentTime.value,
            color: ""
          };
        }
      });
      return audiosPlayingObj
    });
    setAC_MustralTotal(() => [...audioList].reduce((acc, el) => acc + el[1].probability.value, 0))
  }, [audioList]);

  const changeAudiosStates = (id, isPlaying, randomCurrentTime, color) => {
    setAudiosStates(state => ({
      ...state, 
      [id]: {
        isPlaying: isPlaying, 
        randomCurrentTime: randomCurrentTime, 
        color: isPlaying && color? color : ""
      }
    }));
  };

  const handlePlayOnClick = () => {
    const startID = changeGSSTARTED_ID();
    GSIsStarted(!isPlaying);
    if (!isPlaying) {
      randomTimeExecution(changeAudiosStates, startID);
    } else {
      stopAll(changeAudiosStates);
    }
    setIsPlaying((state) => !state);
  }

  return (
    <main className="main flex-column align-c">
      <div className="file-buttons flex-row align-c justify-c">
        <AddFilesButton onClick={props.handleAddOnClick} />
        <ToolButton 
          className="start-button flex-row align-c justify-c"
          onClick={handlePlayOnClick}
        >
          {isPlaying 
              ? <i className="tool-button_icon fs-text-l bi bi-stop-circle"></i>
              : <i className="tool-button_icon fs-text-l bi bi-play-circle"></i>
          }
          <h4 className="fs-text-l">{!isPlaying ? "Start" : "Stop"}</h4>
        </ToolButton>
        <ToolButton 
          className="flex-row align-c justify-c"
          onClick={props.handleClearOnClick}
        >
          <i className="tool-button_icon fs-text bi bi-trash-fill"></i>
          <h4 className="fs-text">Clear</h4> 
        </ToolButton>
      </div>
      <div className="files-container flex-column">
        <div id="files" className="files flex-column">
          <div className="flex-row flex-wrap justify-c">
            { [...audioList].map((val) => (
              <AudioCard
                handleSetAudioList={props.handleSetAudioList}
                key={val[0]}
                id={val[0]}
                appIsPlaying={isPlaying}
                states={audiosStates[val[0]]}
                data={val[1]}
                AC_MustralTotal={AC_MustralTotal}
                setAC_MustralTotal={setAC_MustralTotal}
               
              />
            ))}
            {(new Array(props.filesLoading)).fill(0).map((v, i) => (
              <AudioLoadingCard key={"loadingCard"+i}/>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
});