import { useContext, useMemo } from "react";
import { useOnClickClose } from "../hook.js";

import { GlobalContext } from "../../../context/Global/index.js";

import { IconX } from "../../../icons/index.js";

import SetsButton from "../SetsButton/component.js";
import TimeButton from "../TimeButton/component.js";
import PannerButton from "../PannerButton/component.js";
import FilterButton from "../FilterButton/component.js";
import DelayButton from "../DelayButton/component.js";
import FadeTimeButton from "../FadeTimeButton/component.js";
import PlayBackRateButton from "../PlayBackRateButton/component.js";
import RSPButton from "../RSPButton/component.js";

import "./style.scss";

const classText = "configs flex-column align-c";

function AsideConfigContent({configName}) {
    const [{
        panner, 
        delay,
        filter,
        playBackRate,
        randomStartPoint,
        timeInterval,
        audioListSize,
        probabilityOfSetSize,
        fadeIn,
        fadeOut
    }, globalDispatcher] = useContext(GlobalContext);
    const arrOfProbability = probabilityOfSetSize.arrOfValues;

    const setDispatcher = useMemo(() => (variable, type, value , i = null) => {
        globalDispatcher({variable: variable, type: type, value: value, i: i});
    }, [globalDispatcher]);

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

export default function AsideConfig({active, configName, closeConfig }) {
    const _className = active ? classText : classText + " inactive";

    useOnClickClose(active, ".aside *", closeConfig);

    return (
        <div id="configs" className={_className}>
            <button 
                type="button" 
                className="delete-button flex-column align-c"
                onClick={closeConfig}
            >
                <IconX className="icon-l"/>
            </button>
            <AsideConfigContent configName={configName}/>
        </div>
    );
}