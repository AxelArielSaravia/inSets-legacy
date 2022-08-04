import { memo, useContext, useReducer, useEffect } from "react";

import { 
  GlobalContext, 
  startApp, 
  stopApp,
  audioViewReducer
} from "../app/Globals.js";

import AddFilesButton from "./AddFilesButton.js";
import AudioCard from "./AudioCard/AudioCard.js";
import AudioLoadingCard from "./AudioCard/AudioLoadingCard.js";
import ToolButton from "./ToolButton.js";

import "./Main.scss";


export default memo(function Main() {
  const [globalState, globalDispatcher] = useContext(GlobalContext);
  const [AUDIO_LIST, audioDispatcher] = useReducer(audioViewReducer, {});

  const audio_list = globalState.AUDIO_LIST;
  const IS_STARTED = globalState.IS_STARTED; 
  const totalAudioProbabilityPoints = Object.keys(AUDIO_LIST).reduce((acc, key) => acc + AUDIO_LIST[key].probability, 0);

  useEffect(() => {
    audioDispatcher({type: "update"});
  }, [audio_list]);

  const handleClearOnClick = () => {
    globalDispatcher({type: "CLEAR_Audio"});
  }

  const handlePlayOnClick = () => {
    if (!IS_STARTED) {
      startApp(globalDispatcher, audioDispatcher)
    } else {
      stopApp(globalDispatcher, audioDispatcher)
    }
  }

  const rendredAudioCards = Object.keys(AUDIO_LIST).map((key) =>  (
    <AudioCard
      key={key}
      _ID={key}
      audioDispatcher={audioDispatcher}
      globalDispatcher={globalDispatcher}
      color={AUDIO_LIST[key].color}
      delayIsDisable={AUDIO_LIST[key].delayIsDisable}
      duration={AUDIO_LIST[key].duration}
      endTime= {AUDIO_LIST[key].endTime}
      filterIsDisable={AUDIO_LIST[key].filterIsDisable}
      isPlaying={AUDIO_LIST[key].isPlaying}
      pannerIsDisable={AUDIO_LIST[key].pannerIsDisable}
      playBackRateIsDisable={AUDIO_LIST[key].playBackRateIsDisable}
      probability={AUDIO_LIST[key].probability}
      randomStartPointIsDisable ={AUDIO_LIST[key].randomStartPointIsDisable}
      startPoint={AUDIO_LIST[key].startPoint}
      startTime={AUDIO_LIST[key].startTime}
      title={AUDIO_LIST[key].title}
      volume={AUDIO_LIST[key].volume}
      totalAudioProbabilityPoints={totalAudioProbabilityPoints}
      delayAreAllDisable={globalState.delay.areAllDisable}
      filterAreAllDisable={globalState.filter.areAllDisable}
      pannerAreAllDisable={globalState.panner.areAllDisable}
      playBackRateAreAllDisable={globalState.playBackRate.areAllDisable}
      randomStartPointAreAllDisable={globalState.randomStartPoint}
      APP_IS_STARTED={IS_STARTED}
    />
  ));
  
  const renderedAudioLoadings = (new Array(globalState.filesLoading)).fill(0).map((_, i) => (
    <AudioLoadingCard key={"loadingCard" + i}/>
  ));

  return (
    <main className="main flex-column align-c">
      <div className="file-buttons flex-row align-c justify-c">
        <AddFilesButton/>
        <ToolButton 
          className="start-button flex-row align-c justify-c"
          onClick={handlePlayOnClick}
        >
          {IS_STARTED 
            ? <i className="tool-button_icon fs-text-l bi bi-stop-circle"></i>
            : <i className="tool-button_icon fs-text-l bi bi-play-circle"></i>
          }
          <h4 className="fs-text-l">{IS_STARTED ? "Stop" : "Start"}</h4>
        </ToolButton>
        <ToolButton 
          className="flex-row align-c justify-c"
          onClick={handleClearOnClick}
        >
          <i className="tool-button_icon fs-text bi bi-trash-fill"></i>
          <h4 className="fs-text">Clear</h4> 
        </ToolButton>
      </div>
      <div className="files-container flex-column">
        <div id="files" className="files flex-column">
          <div className="flex-row flex-wrap justify-c">
            { rendredAudioCards }
            { renderedAudioLoadings }
          </div>
        </div>
      </div>
    </main>
  );
});