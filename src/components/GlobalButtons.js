import {useContext} from "react";

import {deleteAll, startApp, stopApp} from "../core/app.js";

import {AudioListContext} from "./contexts/AudioList.js";
import {AppContext} from "./contexts/App.js";
import {SumOfAllAudiosEventsContext} from "./contexts/SumOfAllAudiosEvents.js";

import {appActions} from "../slices/app.js";
import {sumOfAllAudiosEventsActions} from "../slices/sumOfAllAudiosEvents.js";

import useAddFiles from "./hooks/useAddFiles.js";

import {undefinedFunction} from "./utils.js";

import Button from "./Button.js";
import {
    IconTrash,
    IconMusicFile,
    IconStop,
    IconStart
} from "./icons.js";

import "./GlobalButtons.scss";

function handelClick (e) {
    e.currentTarget.value = "";
}

let _addFiles = undefinedFunction;
let _audioListDispatcher = undefinedFunction;
let _sumOfAllAudiosEventsDispatcher = undefinedFunction;

function handelOnInput(e) {
    _addFiles(e.currentTarget.files);
}

function handleClearOnClick() {
    deleteAll(_audioListDispatcher);
    _sumOfAllAudiosEventsDispatcher(sumOfAllAudiosEventsActions.clear());
}

function AddFilesButton() {
    _addFiles = useAddFiles();
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
    const [{isStarted}, appDispatcher] = useContext(AppContext);

    function handlePlayOnClick() {

        if (!isStarted) {
            appDispatcher(appActions.start());
            startApp(appDispatcher);
        } else {
            appDispatcher(appActions.stop());
        }
    }

    return (
        <Button
            title={isStarted ? "stop runing" : "start runing"}
            className="audioButtonsSection_start flex-row align-c justify-c"
            onClick={handlePlayOnClick}
        >
            {
                isStarted
                ? <IconStop className="icon-text-l"/>
                : <IconStart className="icon-text-l"/>
            }
            <h4 className="fs-text-l">{isStarted ? "Stop" : "Start"}</h4>
        </Button>
    );
}

function ClearButton() {
    const [, audioListDispatcher] = useContext(AudioListContext);
    const [, sumOfAllAudiosEventsDispatcher] = useContext(SumOfAllAudiosEventsContext);
    _audioListDispatcher = audioListDispatcher;
    _sumOfAllAudiosEventsDispatcher = sumOfAllAudiosEventsDispatcher;

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