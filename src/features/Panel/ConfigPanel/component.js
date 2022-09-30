import { memo } from "react";

import { useOnClickClose } from "../hook.js";

import { IconChevronBarLeft } from "../../../components/icons/component.js";
import Delay from "../Delay/component.js";
import Fades from "../Fades/component.js";
import Filter from "../Filter/component.js";
import Panner from "../Panner/component.js";
import PlaybackRate from "../PlaybackRate/component.js";
import RandomEndPoint from "../RandomEndPoint/component.js";
import RandomStartPoint from "../RandomStartPoint/component.js";
import Sets from "../Sets/component.js";
import Time from "../Time/component.js";

import "./style.scss";


function ConfigPanelContent({itemName}) {
    switch (itemName) {
        case "DELAY":   return <Delay/>
        case "FADES":   return <Fades/>
        case "FILTER":  return <Filter/>
        case "PANNER":  return <Panner/>;
        case "RATE":    return <PlaybackRate/>;
        case "REP":     return <RandomEndPoint/>;
        case "RSP":     return <RandomStartPoint/>;
        case "SETS":    return <Sets/>
        case "TIME":    return <Time/>;
        default:        return null;
    }
}

const className = () => "panel config-panel flex-column";

function ConfigPanel({isActive, itemName, closeConfigPanel }) {
    const _className = isActive ? className() : className() + " panel-hidden";

    useOnClickClose(isActive, ".generalPanel *", closeConfigPanel);

    return (
        <div id="configPanel" className={_className}>
            <div className="flex-row justify-end">
                <button
                    title="close"
                    type="button" 
                    className="configPanel-close flex-column align-c"
                    onClick={closeConfigPanel}
                >
                    <IconChevronBarLeft className="icon-text-l"/>
                </button>
            </div>
            <ConfigPanelContent itemName={itemName}/> 
        </div>
    );
}

export default memo(ConfigPanel);


/* 
import { GlobalContext } from "../../../context/Global/index.js";


import SetsButton from "../SetsButton/component.js";
import TimeButton from "../TimeButton/component.js";
import PannerButton from "../PannerButton/component.js";
import FilterButton from "../FilterButton/component.js";
import DelayButton from "../DelayButton/component.js";
import FadeTimeButton from "../FadeTimeButton/component.js";
import PlayBackRateButton from "../PlayBackRateButton/component.js";
import RSPButton from "../RSPButton/component.js";



function ConfigPanelContent({configName}) {
    switch (configName) {
        case "SETS": return (
            <SetsButton
                arrOfProbability={arrOfProbability}
                audioListSize={audioListSize}
                setDispatcher={setDispatcher}
            />
        );
        case "TIME": return (
            <TimeButton
                setDispatcher={setDispatcher}
                timeInterval={timeInterval}
            /> 
        );
        case "FADETIME": return (
            <FadeTimeButton
                fadeIn={fadeIn}
                fadeOut={fadeOut}
                setDispatcher={setDispatcher}
            /> 
        );
        case "PANNER": return (
            <PannerButton 
                panner={panner}
                setDispatcher={setDispatcher}
            /> 
        );
        case "FILTER": return (
            <FilterButton
                filter={filter}
                setDispatcher={setDispatcher}
            />
        );
        case "DELAY": return (
            <DelayButton 
                delay={delay}
                setDispatcher={setDispatcher}
            /> 
        );
        case "RATE": return (
            <PlayBackRateButton
                playBackRate={playBackRate}
                setDispatcher={setDispatcher}
            /> 
        );
        case "RSP": return (
            <RSPButton
                randomStartPoint={randomStartPoint}
                setDispatcher={setDispatcher}
            /> 
        );
        default: return null;
    }
}
 */