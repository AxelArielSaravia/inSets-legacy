import { useCallback, memo } from "react";

import ItemsPanelElement from "../ItemsPanelElement/component.js";

import "./style.scss";

const className = "panel items-panel flex-column";

function ItemsPanel({isItemsPanelVisible, isConfigPanelVisible, panelItem, dispatch}) {
    const setsOnClick = useCallback(() => { dispatch({type: "panelItem/change",payload: "SETS"}); }, [dispatch]);
    const timeOnClick = useCallback(() => { dispatch({type: "panelItem/change",payload: "TIME"}); }, [dispatch]);
    const fadeTimeOnClick = useCallback(() => { dispatch({type: "panelItem/change",payload:"FADES"}); }, [dispatch]);
    const pannerOnClick = useCallback(() => { dispatch({type: "panelItem/change",payload: "PANNER"}); }, [dispatch]);
    const filterOnClick = useCallback(() => { dispatch({type: "panelItem/change",payload: "FILTER"}); }, [dispatch]);
    const delayOnClick = useCallback(() => { dispatch({type: "panelItem/change",payload: "DELAY"}); }, [dispatch]);
    const playBackRateOnClick = useCallback(() => { dispatch({type: "panelItem/change",payload: "RATE"}); }, [dispatch]);
    const randomStartPointOnClick = useCallback(() => { dispatch({type: "panelItem/change",payload: "RSP"}); }, [dispatch]);
    const randomEndPointOnClick = useCallback(() => { dispatch({type: "panelItem/change",payload: "REP"}); }, [dispatch]);
    
    return (
        <div className={!isItemsPanelVisible ? className + " panel-hidden" : className}>
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


export default memo(ItemsPanel);