//@ts-check
import React, {useContext} from "react";

import dispatch from "../state/dispatch.js";

import addFiles from "../addFiles.js";

import {appActions} from "../slices/app.js";
import {sumOfAllAudiosEventsActions} from "../slices/sumOfAllAudiosEvents.js";

import {deleteAll, startApp, stopApp} from "../core/app.js";

import {AppContext} from "./contexts/App.js";


import Button from "./Button.js";
import {IconTrash, IconMusicFile, IconStop, IconStart} from "./icons.js";

import "./GlobalButtons.scss";

/**
@type {React.MouseEventHandler<HTMLInputElement>} */
function handelAddFilesClick (e) {
    e.currentTarget.value = "";
}
/**
@type {React.FormEventHandler<HTMLInputElement>} */
function handelAddFilesInput(e) {
    if (e.currentTarget.files !== null) {
        addFiles(e.currentTarget.files);
    }
}

/**
@type {React.MouseEventHandler<HTMLButtonElement>} */
function handelAddFilesButton(e) {
    const input = e.currentTarget.firstElementChild;
    if (input !== null) {
        input.click();
    }
}

/**
@type {React.MouseEventHandler} */
function handleClearOnClick() {
    deleteAll();
    dispatch.sumOfAllAudiosEvents(sumOfAllAudiosEventsActions.clear());
}

function AddFilesButton() {
    return (
        <button
            title="add audio files"
            className="t-button fileInput-contain flex-row align-c justify-c"
            type="button"
            onClick={handelAddFilesButton}
        >
            <input
                className="display-none"
                type="file"
                accept="audio/*"
                onClick={handelAddFilesClick}
                onInput={handelAddFilesInput}
                multiple
            />
            <div className="fileInput-view flex-row align-c justify-c">
                <IconMusicFile className="icon-text flex-row align-c justify-c"/>
                <h4 className="fs-text">Add</h4>
            </div>

        </button>
    );
}

/**
@type {(isStarted: boolean) => void} */
function handlePlayOnClick(isStarted) {
    if (!isStarted) {
        dispatch.app(appActions.start());
        startApp();
    } else {
        dispatch.app(appActions.stop());
    }
}

function StartButton() {
    const {isStarted} = useContext(AppContext);

    return (
        <Button
            title={isStarted ? "stop runing" : "start runing"}
            className="audioButtonsSection_start flex-row align-c justify-c"
            value={isStarted}
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