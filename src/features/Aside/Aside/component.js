import { memo, useReducer, useMemo, useCallback } from "react";

import { useOnClickClose } from "../hook.js";

import { IconChevronDown} from "../../../icons/index.js";

import ToolButton from "../../../components/ToolButton/index.js";
import AsideConfig from "../AsideConfig/component.js";

import "./style.scss"

const panelClassName =  "panel flex-column";

const initReducerstate = { switchActive: false, configActive: false, configName: ""};
const reducer = (state = initReducerstate, action) => {
    switch (action.type) {
        case "configName/change": return {
            switchActive: state.switchActive,
            configActive: !(state.configActive && state.configName === action.payload),
            configName: action.payload
        };
        case "configActive/toFalse": return { ...state, configActive: false };
        case "switchActive/change": return { 
            ...state, 
            switchActive: !state.switchActive, 
            configActive: false 
        };
        default: return state;
    }
} 

export default memo(function Aside() {
    const [{switchActive, configActive, configName}, dispatch] = useReducer(reducer, initReducerstate); 
    const IconClassName = useMemo(() => switchActive ? "icon active" : "icon", [switchActive]);

    const setsOnClick = useCallback(() => { dispatch({type: "configName/change",payload: "SETS"}) }, []);
    const timeOnClick = useCallback(() => { dispatch({type: "configName/change",payload: "TIME"}) }, []);
    const fadeTimeOnClick = useCallback(() => { dispatch({type: "configName/change",payload: "FADETIME"}) }, []);
    const pannerOnClick = useCallback(() => { dispatch({type: "configName/change",payload: "PANNER"}) }, []);
    const filterOnClick = useCallback(() => { dispatch({type: "configName/change",payload: "FILTER"}) }, []);
    const delayOnClick = useCallback(() => { dispatch({type: "configName/change",payload: "DELAY"}) }, []);
    const playBackRateOnClick = useCallback(() => { dispatch({type: "configName/change",payload: "RATE"}) }, []);
    const randomStartPointOnClick = useCallback(() => { dispatch({type: "configName/change",payload: "RSP"}) }, []);
    
    const closeConfig = useCallback(() => { dispatch({type: "configActive/toFalse"}); }, [])
    const switchOnClick = () => { dispatch({type: "switchActive/change"}) }
    
    const _ClassName = useMemo(() => (
        !switchActive ? panelClassName + " panel-hidden"
        : configActive ? panelClassName + " panel-invisible"
        : panelClassName
    ), [switchActive, configActive]);
    
    useOnClickClose(switchActive, ".aside *", switchOnClick);
    return (
        <aside className="aside">
            <div className="tools-switch align-c justify-c"> 
                <ToolButton className="flex-column align-c justify-c" onClick={switchOnClick}>
                    <IconChevronDown className={IconClassName} />
                </ToolButton>
            </div>
            <div className={_ClassName}>
                <div className="flex-column">
                <div className="aside-button flex-row">
                    <ToolButton 
                        className="flex-row" 
                        onClick={setsOnClick}
                    >
                    <h4 className="fs-text">Sets</h4>
                    </ToolButton>
                </div>
                <div className="aside-button flex-row">
                    <ToolButton 
                        className="flex-row" 
                        onClick={timeOnClick}
                    >
                    <h4 className="fs-text">Time</h4>
                    </ToolButton>
                </div>
                <div className="aside-button flex-row">
                    <ToolButton 
                        className="flex-row text-left" 
                        onClick={fadeTimeOnClick}
                    >
                    <h4 className="fs-text">Fade Time</h4>
                    </ToolButton>
                </div>
                <div className="aside-button flex-row">
                    <ToolButton 
                        className="flex-row" 
                        onClick={pannerOnClick}
                    >
                    <h4 className="fs-text">Panner</h4>
                    </ToolButton>
                </div>
                <div className="aside-button flex-row">
                    <ToolButton 
                        className="flex-row" 
                        onClick={filterOnClick}
                    >
                    <h4 className="fs-text">Filter</h4>
                    </ToolButton>
                </div>
                <div className="aside-button flex-row">
                    <ToolButton 
                        className="flex-row" 
                        onClick={delayOnClick}
                    >
                    <h4 className="fs-text">Delay</h4>
                    </ToolButton>
                </div>
                <div className="aside-button flex-row">
                    <ToolButton 
                        className="flex-row" 
                        onClick={playBackRateOnClick}
                    >
                    <h4 className="fs-text">Rate</h4>
                    </ToolButton>
                </div>
                <div className="aside-button flex-row">
                    <ToolButton 
                        className="flex-row" 
                        onClick={randomStartPointOnClick}
                    >
                    <h4 className="fs-text">RSP</h4>
                    </ToolButton>
                </div>
                </div>
            </div>
            <AsideConfig 
                active={configActive} 
                closeConfig={closeConfig}
                configName={configName}
            />
        </aside>
    );
})