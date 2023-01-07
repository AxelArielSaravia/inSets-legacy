import ItemsPanelElement from "../ItemsPanelElement/component.js";

import "./style.scss";

let _dispatch = () => undefined;
function setsOnClick() {
    _dispatch({type: "panelItem/change",payload: "SETS"});
}
function timeOnClick() {
    _dispatch({type: "panelItem/change",payload: "TIME"});
}
function fadeTimeOnClick() {
    _dispatch({type: "panelItem/change",payload:"FADES"});
}
function pannerOnClick() {
    _dispatch({type: "panelItem/change",payload: "PANNER"});
}
function filterOnClick() {
    _dispatch({type: "panelItem/change",payload: "FILTER"});
}
function delayOnClick() {
    _dispatch({type: "panelItem/change",payload: "DELAY"});
}
function playBackRateOnClick() {
    _dispatch({type: "panelItem/change",payload: "RATE"});
}
function randomStartPointOnClick() {
    _dispatch({type: "panelItem/change",payload: "RSP"});
}
function randomEndPointOnClick() {
    _dispatch({type: "panelItem/change",payload: "REP"});
}

const ItemsPanel_className = "panel items-panel flex-column";

function ItemsPanel({
    isItemsPanelVisible,
    isConfigPanelVisible,
    panelItem,
    dispatch
}) {
    _dispatch = dispatch;
    return (
        <div className={(
            !isItemsPanelVisible
            ? ItemsPanel_className + " panel-hidden"
            : ItemsPanel_className
        )}>
            <div className="flex-column p-5">
                <div className="items-panel_section flex-column align-c justify-c">
                    <ItemsPanelElement
                        active={isConfigPanelVisible && panelItem === "SETS" }
                        onClickHandler={setsOnClick}
                        text="Sets"
                        title="Audio Sets"
                    />
                    <ItemsPanelElement
                        active={isConfigPanelVisible && panelItem === "TIME"}
                        onClickHandler={timeOnClick}
                        text="Time"
                        title="Time to wait"
                    />
                    <ItemsPanelElement
                        active={isConfigPanelVisible && panelItem === "FADES"}
                        onClickHandler={fadeTimeOnClick}
                        text="Fades"
                        title="FadeIn/FadeOut"
                    />
                </div>
                <div className="h-line"/>
                <div className="items-panel_section flex-column align-c justify-c">
                    <ItemsPanelElement
                        active={isConfigPanelVisible && panelItem === "DELAY"}
                        onClickHandler={delayOnClick}
                        text="Delay"
                        title="Delay"
                    />
                    <ItemsPanelElement
                        active={isConfigPanelVisible && panelItem === "FILTER"}
                        onClickHandler={filterOnClick}
                        text="Filter"
                        title="Filter"
                    />
                    <ItemsPanelElement
                        active={isConfigPanelVisible && panelItem === "PANNER"}
                        onClickHandler={pannerOnClick}
                        text="Panner"
                        title="Panner"
                    />
                    <ItemsPanelElement
                        active={isConfigPanelVisible && panelItem === "RATE"}
                        onClickHandler={playBackRateOnClick}
                        text="Pb Rate"
                        title="Playback Rate"
                    />
                </div>
                <div className="h-line"/>
                <div className="items-panel_section flex-column align-c justify-c">
                    <ItemsPanelElement
                        active={isConfigPanelVisible && panelItem === "REP"}
                        onClickHandler={randomEndPointOnClick}
                        text="REP"
                        title="Random End Point"
                    />
                    <ItemsPanelElement
                        active={isConfigPanelVisible && panelItem === "RSP"}
                        onClickHandler={randomStartPointOnClick}
                        text="RSP"
                        title="Random Start Point"
                    />
                </div>
            </div>
        </div>
    );
}


export default ItemsPanel;