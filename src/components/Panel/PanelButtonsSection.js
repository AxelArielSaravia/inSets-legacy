import {useContext} from "react";

import globalState from "../../state/globalState.js";
import {globalDefaultKeys, globalDefaultObjectsKeys} from "../../state/globalDefault.js";

import {GeneralDisableContext} from "../contexts/GeneralDisable.js";

import {panelConfigActions} from "../../slices/panelConfig.js";
import {generalDisableAction} from "../../slices/generalDisable.js";
import {undefinedFunction} from "../utils.js";

import Button from "../Button.js";

import "./PanelButtonsSection.scss";



let _dispatch = undefinedFunction;
let _generalDisableDispatch = undefinedFunction;

function setsOnClick() {
    _dispatch(panelConfigActions.changePanelToSets);
}

function timeOnClick() {
    _dispatch(panelConfigActions.changePanelToTime);
}

function fadeTimeOnClick() {
    _dispatch(panelConfigActions.changePanelToFades);
}

function pannerOnClick() {
    _dispatch(panelConfigActions.changePanelToPanner);
}

function filterOnClick() {
    _dispatch(panelConfigActions.changePanelToFilter);
}

function delayOnClick() {
    _dispatch(panelConfigActions.changePanelToDelay);
}

function playBackRateOnClick() {
    _dispatch(panelConfigActions.changePanelToRate);
}

function randomStartPointOnClick() {
    _dispatch(panelConfigActions.changePanelToRSP);
}

function randomEndPointOnClick() {
    _dispatch(panelConfigActions.changePanelToREP);
}

function exportJson(e) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localStorage));
    const downloadAnchorNode = e.currentTarget.firstElementChild;
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "inSets_configs.json");
    downloadAnchorNode.click();
    _dispatch(panelConfigActions.closePanel);
}

function importJsonClick (e) {
    e.currentTarget.value = "";
}

function stateFromImportJSON(text) {
    const importText = JSON.parse(text);
    let n = 0;
    let m = 0;
    let key = "";
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
                    if (innerKey === "areAllDisable") {
                        _generalDisableDispatch(generalDisableAction(
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
    _dispatch(panelConfigActions.closePanel);
}

function importJsonInput(e) {
    if (e.currentTarget.files[0] !== undefined) {
        e.currentTarget.files[0].text().then(stateFromImportJSON);
    }
}

function importJson(e) {
    const input = e.currentTarget.firstElementChild;
    input.click();
}

function ImportButton() {
    _generalDisableDispatch = useContext(GeneralDisableContext)[1];
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

function PanelButtonsSection({
    isPanelButtonsVisible,
    isPanelConfigVisible,
    panelSelected,
    dispatch
}) {
    _dispatch = dispatch;
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