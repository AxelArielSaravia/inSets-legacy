import { memo, useContext, useReducer, useEffect, useCallback, useMemo } from "react";

import { AudioCard, AudioLoadingCard } from "../AudioCard/index.js";
import { deleteAll } from "../../services/Audio/index.js"

import { GlobalContext } from "../../context/Global/index.js";
import audiosViewReducer from "../../reducer/Audio/reducer.js";
import { startApp, stopApp } from "../../services/Audio/index.js";
import useAddFiles from "../../hooks/useAddFiles/index";

import ToolButton from "../../components/ToolButton/index.js";
import { IconTrash, IconMusicFile, IconStop, IconStart } from "../../icons/index.js";

import "./style.scss";


const AddFilesButton = memo(function AddFilesButton() {
    const addFiles = useAddFiles();
    const handelClick = (e) => { e.currentTarget.value = "" };
    const handelOnInput = (e) => { addFiles(e.currentTarget.files); };
    
    return (
        <label className="fileInput-contain">
            <input className="fileInput" 
                type="file" 
                onInput={handelOnInput}
                onClick={handelClick}
                name="file" 
                accept="audio/*"
                multiple
            />
            <div className="tool-button flex-row align-c justify-c">
                <IconMusicFile className="icon-m"/>
                <h4 className="fs-text">Add</h4>
            </div>
        </label>
    );
})


function Main() {
    const [globalState, globalDispatcher] = useContext(GlobalContext);
    const [AUDIO_LIST, audioDispatcher] = useReducer(audiosViewReducer, {});

    const audio_list = globalState.AUDIO_LIST;
    const IS_STARTED = globalState.IS_STARTED;
    const filesLoading = globalState.filesLoading;
    const delayAreAllDisable = globalState.delay.areAllDisable;
    const filterAreAllDisable = globalState.filter.areAllDisable;
    const pannerAreAllDisable = globalState.panner.areAllDisable;
    const playBackRateAreAllDisable = globalState.playBackRate.areAllDisable;
    const randomStartPointAreAllDisable = globalState.randomStartPoint;
    const AUDIO_LIST_Length = useMemo(() => Object.keys(AUDIO_LIST).length, [AUDIO_LIST]);

    const totalAudioProbabilityPoints = Object.keys(AUDIO_LIST).reduce((acc, key) => acc + AUDIO_LIST[key].probability, 0);

    useEffect(() => { audioDispatcher({type: "update"}); }, [audio_list]);

    const handleClearOnClick = useCallback(() => { deleteAll(globalDispatcher); }, [globalDispatcher])

    const handlePlayOnClick = useCallback(() => {
        if (!IS_STARTED) {
            startApp(globalDispatcher, audioDispatcher)
        } else {
            stopApp(globalDispatcher, audioDispatcher)
        }
    }, [globalDispatcher, audioDispatcher, IS_STARTED]);

    const rendredAudioCards = () => Object.keys(AUDIO_LIST).map((key) =>  (
        <AudioCard
            key={key}
            _ID={key}
            audioDispatcher={audioDispatcher}
            audioState={AUDIO_LIST[key]}
            globalDispatcher={globalDispatcher}
            totalAudioProbabilityPoints={totalAudioProbabilityPoints}
            delayAreAllDisable={delayAreAllDisable}
            filterAreAllDisable={filterAreAllDisable}
            pannerAreAllDisable={pannerAreAllDisable}
            playBackRateAreAllDisable={playBackRateAreAllDisable}
            randomStartPointAreAllDisable={randomStartPointAreAllDisable}
            APP_IS_STARTED={IS_STARTED}
        />
    ));

    const renderedAudioLoadings = useCallback(() => (new Array(filesLoading)).fill(0).map((_, i) => (
        <AudioLoadingCard key={"loadingCard" + i}/>
    )), [filesLoading]);

    return (
        <main className="main flex-column">
            <div className="file-buttons flex-row align-c justify-c">
                <AddFilesButton/>
                <ToolButton 
                    className="start-button flex-row align-c justify-c"
                    onClick={handlePlayOnClick}
                >
                    { IS_STARTED
                        ? <IconStop className="icon-l"/>
                        : <IconStart className="icon-l"/>
                    }
                    <h4 className="fs-text-l">{IS_STARTED ? "Stop" : "Start"}</h4>
                </ToolButton>
                <ToolButton 
                    className="flex-row align-c justify-c"
                    onClick={handleClearOnClick}
                >
                    <IconTrash className="icon-m"/>
                    <h4 className="fs-text">Clear</h4> 
                </ToolButton>
            </div>
            <div className="files-container flex-column flex-grow-1">
                {AUDIO_LIST_Length < 1 && filesLoading < 1 && (
                    <div className="flex-column align-c justify-c flex-grow-1" style={{height: "100%"}}>
                        <IconMusicFile className="icon-drop o-5"/>
                        <p className="fs-text p-2">Add Sound Files</p>
                    </div>
                )}
                <div id="files" className="files flex-column flex-grow-1">
                    <div className="flex-row flex-wrap justify-c">
                        { rendredAudioCards() }
                        { renderedAudioLoadings() }
                    </div>
                </div>  
            </div>
        </main>
    );
};

export default memo(Main);