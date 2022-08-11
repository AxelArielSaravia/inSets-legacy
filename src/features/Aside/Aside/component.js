import { memo, useState, useEffect, useMemo, useCallback } from "react";

import ToolButton from "../../../components/ToolButton/index.js";
import AsideConfig from "../AsideConfig/component.js";

import "./style.scss"

const panelClassName =  "panel flex-column";

export default memo(function Aside() {
    //console.log("Update Aside"); //DEBUGGER
    const [toolsSwitch, setToolsSwitch] = useState(false);
    const [toolConfig, setToolConfig] = useState(false);
    const [configButton, setConfigButton] = useState("");

    const handleToolsSwitchOnClick = () => {
        setToolsSwitch((state) => !state);
    }
    
    const handleButtonsOnClick = useCallback((val) => {
        setToolConfig(state => {
            if (state && val === configButton) {
                return false;
            }
            return true;
        });
        setConfigButton(() => val); 
    }, [configButton])
    
    const setsOnClick = useCallback(() => { handleButtonsOnClick("SETS") }, [handleButtonsOnClick]);
    const timeOnClick = useCallback(() => { handleButtonsOnClick("TIME") }, [handleButtonsOnClick]);
    const fadeTimeOnClick = useCallback(() => { handleButtonsOnClick("FADETIME") }, [handleButtonsOnClick]);
    const pannerOnClick = useCallback(() => { handleButtonsOnClick("PANNER") }, [handleButtonsOnClick]);
    const filterOnClick = useCallback(() => { handleButtonsOnClick("FILTER") }, [handleButtonsOnClick]);
    const delayOnClick = useCallback(() => { handleButtonsOnClick("DELAY") }, [handleButtonsOnClick]);
    const playBackRateOnClick = useCallback(() => { handleButtonsOnClick("RATE") }, [handleButtonsOnClick]);
    const randomStartPointOnClick = useCallback(() => { handleButtonsOnClick("RSP") }, [handleButtonsOnClick]);

    useEffect(() => {
        const el = (e) => { 
            if ( e.target.matches(".tools-switch *")
                || e.target.matches(".panel *")
                || e.target.matches(".configs")
                || e.target.matches(".configs *")
            ) {
                return;
            }
            handleToolsSwitchOnClick();
        }
        if (toolsSwitch) {
            document.addEventListener('click', el);
            return () => {
                document.removeEventListener('click', el);
            } 
        }
    }, [toolsSwitch]);

    const _ClassName = useMemo( () => (
        !toolsSwitch ? panelClassName + " panel-hidden"
        : toolConfig ? panelClassName + " panel-invisible"
        : panelClassName
    ), [toolsSwitch, toolConfig]);

    return (
        <aside className="aside flex-column">
            <div className="tools-switch align-c justify-c"> 
                <ToolButton onClick={handleToolsSwitchOnClick}>
                { toolsSwitch
                    ? <i className="flex-column align-c justify-c bi bi-chevron-compact-up"></i>
                    : <i className="flex-column align-c justify-c bi bi-chevron-compact-down"></i>
                }
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
                active={toolConfig} 
                onClick={() => setToolConfig(() => false)}
                configButton={configButton}
            />
        </aside>
    );
})