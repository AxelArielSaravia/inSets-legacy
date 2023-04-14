import {panelConfigActions} from "../../slices/panelConfig.js";

import {undefinedFunction} from "../utils.js";

import Button from "../Button.js";

import "./PanelButtonsSection.scss";

const PanelButtons_className = "panel panel-buttons flex-column";

let _dispatch = undefinedFunction;

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

function PanelButton({
    active = false,
    onClickHandler,
    text,
    title
}) {
    return (
        <div className={"panel-button flex-row justify-c"}>
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
            <div className="flex-column p-5">
                <div className="flex-column align-c justify-c">
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
                </div>
                <div className="h-line"/>
                <div className="flex-column align-c justify-c">
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
                </div>
                <div className="h-line"/>
                <div className="flex-column align-c justify-c">
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
                </div>
            </div>
        </div>
    );
}

export default PanelButtonsSection;