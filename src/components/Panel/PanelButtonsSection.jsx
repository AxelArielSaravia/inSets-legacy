//@ts-check
import React from "react";

import globalState from "../../state/globalState.js";
import {globalDefaultKeys, globalDefaultObjectsKeys} from "../../state/globalDefault.js";
import dispatch from "../../state/dispatch.js";

import {panelConfigActions} from "../../slices/panelConfig.js";
import {generalDisableAction} from "../../slices/generalDisable.js";

import Button from "../Button.jsx";

function setsOnClick() {
    dispatch.panelConfig(panelConfigActions.changePanelToSets);
}

function timeOnClick() {
    dispatch.panelConfig(panelConfigActions.changePanelToTime);
}

function fadeTimeOnClick() {
    dispatch.panelConfig(panelConfigActions.changePanelToFades);
}

function pannerOnClick() {
    dispatch.panelConfig(panelConfigActions.changePanelToPanner);
}

function filterOnClick() {
    dispatch.panelConfig(panelConfigActions.changePanelToFilter);
}

function delayOnClick() {
    dispatch.panelConfig(panelConfigActions.changePanelToDelay);
}

function playBackRateOnClick() {
    dispatch.panelConfig(panelConfigActions.changePanelToRate);
}

function randomStartPointOnClick() {
    dispatch.panelConfig(panelConfigActions.changePanelToRSP);
}

function randomEndPointOnClick() {
    dispatch.panelConfig(panelConfigActions.changePanelToREP);
}

/**
@type {React.MouseEventHandler<HTMLButtonElement>} */
function exportJson(e) {
    const downloadAnchorNode = e.currentTarget.firstElementChild;
    if (downloadAnchorNode === null) {
        return;
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localStorage));
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "inSets_configs.json");
    downloadAnchorNode.click();
    dispatch.panelConfig(panelConfigActions.closePanel);
}

/**
@type {React.MouseEventHandler<HTMLInputElement>} */
async function importJsonInput(e) {
    if (e.currentTarget.files?.[0] === undefined) {
        return;
    }
    const text = await e.currentTarget.files[0].text();
    const importText = JSON.parse(text);
    let n = 0;
    let m = 0;
    /**@type {GlobalDefaultKeys} */
    let key = "delay";
    let innerKey = "";
    let localStorageKey = "";
    while (n < globalDefaultKeys.length) {
        key = globalDefaultKeys[n];
        localStorageKey = key;

        if (globalDefaultObjectsKeys[key] !== undefined) {
            m = 0;
            while (m < globalDefaultObjectsKeys[key].length) {
                innerKey = globalDefaultObjectsKeys[key][m];
                localStorageKey =  key + "." + innerKey;

                if(importText[localStorageKey] !== undefined) {
                    globalState[key][innerKey] = JSON.parse(importText[localStorageKey]);
                    localStorage[localStorageKey] = importText[localStorageKey];
                    if (key !== "fadeIn" && key !== "fadeOut" && key !== "timeInterval") {
                        dispatch.generalDisable(generalDisableAction(
                            globalState[key][innerKey]? "disable": "enable",
                            key,
                            "global"
                        ));
                    }
                }

                m += 1;
            }
        } else {
            globalState[key] = JSON.parse(importText[key]);
            localStorage[key] = importText[key];
        }
        n += 1;
    }
    dispatch.panelConfig(panelConfigActions.closePanel);
}

/**
@type {React.MouseEventHandler<HTMLInputElement>} */
function importJsonClick (e) {
    e.currentTarget.value = "";
}

/**
@type {React.MouseEventHandler<HTMLButtonElement>} */
function importJson(e) {
    /**@type {(Element & HTMLElement) | null}*/
    const input = e.currentTarget.firstElementChild;
    if (input !== null) {
        input.click();
    }
}

function ImportButton() {
    return (
        <div className="panel-button flex-row justify-c">
            <button
                title="import"
                className="t-button flex-row align-c justify-c"
                type="button"
                onClick={importJson}
            >
                <input
                    className="display-none"
                    type="file"
                    accept="application/json"
                    onClick={importJsonClick}
                    onInput={importJsonInput}
                />
                <h4 className="fs-text">import</h4>
            </button>
        </div>
    );
}

function ExportButton() {
    return (
        <div className="panel-button flex-row justify-c">
            <button
                title="export"
                className="t-button flex-row align-c justify-c"
                type="button"
                onClick={exportJson}
            >
                <a className="display-none" href="./">.</a>
                <h4 className="fs-text">export</h4>
            </button>
        </div>
    );
}

/**
@type {(props: {
    active: boolean,
    onClickHandler: React.MouseEventHandler<HTMLButtonElement>,
    text: string,
    title: string,
}) => JSX.Element} */
function PanelButton({
    active = false,
    onClickHandler,
    text,
    title
}) {
    return (
        <div className="panel-button flex-row justify-c">
            <Button
                title={title}
                className={(
                    active
                    ? "active flex-row align-c justify-c"
                    : "flex-row align-c justify-c"
                )}
                onClick={onClickHandler}
            >
                <h4 className="fs-text">{text}</h4>
            </Button>
        </div>
    );
}


const PanelButtons_className = "panel panel-buttons p-5 flex-column align-c";

/**
@type {(props: {
    isPanelButtonsVisible: boolean,
    isPanelConfigVisible: boolean,
    panelSelected: "" | "DELAY" | "FILTER" | "PANNER" | "RATE" | "REP" | "RSP" | "SETS" | "TIME" | "FADES",
}) => JSX.Element} */
function PanelButtonsSection({
    isPanelButtonsVisible,
    isPanelConfigVisible,
    panelSelected,
}) {
    return (
        <div className={(
            !isPanelButtonsVisible
            ? PanelButtons_className + " panel-hidden"
            : PanelButtons_className
        )}>
            <PanelButton
                active={isPanelConfigVisible && panelSelected === "SETS" }
                onClickHandler={setsOnClick}
                text="Sets"
                title="Audio Sets"
            />
            <PanelButton
                active={isPanelConfigVisible && panelSelected === "TIME"}
                onClickHandler={timeOnClick}
                text="Time"
                title="Time to wait"
            />
            <PanelButton
                active={isPanelConfigVisible && panelSelected === "FADES"}
                onClickHandler={fadeTimeOnClick}
                text="Fades"
                title="FadeIn/FadeOut"
            />
            <PanelButton
                active={isPanelConfigVisible && panelSelected === "DELAY"}
                onClickHandler={delayOnClick}
                text="Delay"
                title="Delay"
            />
            <PanelButton
                active={isPanelConfigVisible && panelSelected === "FILTER"}
                onClickHandler={filterOnClick}
                text="Filter"
                title="Filter"
            />
            <PanelButton
                active={isPanelConfigVisible && panelSelected === "PANNER"}
                onClickHandler={pannerOnClick}
                text="Panner"
                title="Panner"
            />
            <PanelButton
                active={isPanelConfigVisible && panelSelected === "RATE"}
                onClickHandler={playBackRateOnClick}
                text="Pb Rate"
                title="Playback Rate"
            />
            <PanelButton
                active={isPanelConfigVisible && panelSelected === "REP"}
                onClickHandler={randomEndPointOnClick}
                text="REP"
                title="Random End Point"
            />
            <PanelButton
                active={isPanelConfigVisible && panelSelected === "RSP"}
                onClickHandler={randomStartPointOnClick}
                text="RSP"
                title="Random Start Point"
            />
            <div className="h-line"/>
            <ImportButton/>
            <ExportButton/>
        </div>
    );
}

export default PanelButtonsSection;
