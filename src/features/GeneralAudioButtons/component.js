import { useContext, useCallback } from "react";

import { startApp, deleteAll } from "../../services/Audio/service.js";

import { AudioListContext, AppContext, SumOfAllAudiosEventsContext} from "../../context/index.js"
import { useAddFiles } from "../../hooks/index.js";

import Button from "../../components/Button/component.js";
import { IconTrash, IconMusicFile, IconStop, IconStart } from "../../components/icons/component.js";

import "./style.scss";

function AddFilesButton() {
    const addFiles = useAddFiles();
    const handelClick = (e) => { e.currentTarget.value = "" };
    const handelOnInput = (e) => { addFiles(e.currentTarget.files); };
    
    return (
        <label 
            className="t-button fileInput-contain flex-row align-c justify-c" 
            role="button"
            aria-pressed="false"
            title="add audio files"
        >
            <input className="fileInput" 
                type="file" 
                onInput={handelOnInput}
                onClick={handelClick}
                name="file" 
                accept="audio/*"
                multiple
            />
            <div className="fileInput-view flex-row align-c justify-c">
                <IconMusicFile className="icon-text flex-row align-c justify-c"/>
                <h4 className="fs-text">Add</h4>
            </div>
        </label>
    );
}

function StartButton() {
    const [{_is_started}, appDispatcher] = useContext(AppContext);
    const handlePlayOnClick = useCallback(async () => {
        if (!_is_started) {
            await appDispatcher({type: "start"});
            startApp(appDispatcher)
        } else {
            appDispatcher({type: "stop"});
            //stopApp(generalAudioDispatcher)
        }
    }, [_is_started, appDispatcher]);

    return (
        <Button
            title={_is_started ? "stop runing" : "start runing"}
            className="audioButtonsSection_start flex-row align-c justify-c"
            onClick={handlePlayOnClick}
            >
            { _is_started
            ? <IconStop className="icon-text-l"/>
            : <IconStart className="icon-text-l"/>
            }
            <h4 className="fs-text-l">{_is_started ? "Stop" : "Start"}</h4>
        </Button>
    ); 
}

function ClearButton() {
    const [, audioListDispatcher] = useContext(AudioListContext);
    const [, sumOfAllAudiosEventsDispatcher] = useContext(SumOfAllAudiosEventsContext);

    const handleClearOnClick = useCallback(function () { 
        deleteAll(audioListDispatcher);
        sumOfAllAudiosEventsDispatcher({type: "clear"});
    }, [audioListDispatcher,sumOfAllAudiosEventsDispatcher]);
 
    return (
        <Button 
            className="flex-row align-c justify-c"
            onClick={handleClearOnClick}
            title="clear all completed audios"
        >
            <IconTrash className="icon-text"/>
            <h4 className="fs-text">Clear</h4> 
        </Button>
    );
}

function GeneralAudioButtons() {
    return (
        <div className="audioButtonsSection flex-row align-c justify-c">
            <div className="ABSection_button flex-row align-c justify-end">
                <AddFilesButton/>
            </div>
            <div className="flex-row align-c jutify-c">
                <StartButton/>
            </div>
            <div className="ABSection_button flex-row align-c jutify-start">
               <ClearButton/>
            </div>
        </div>
    );
}

export default GeneralAudioButtons;