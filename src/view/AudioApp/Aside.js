import { memo, useState, useEffect } from "react";

import ToolButton from "./ToolButton.js";
import AsideConfig from "./Aside/AsideConfig.js";
import "./Aside.scss"


export default memo(function Aside(props) {
  //console.log("Update Aside"); //DEBUGGER
  const [toolsSwitch, setToolsSwitch] = useState(false);
  const [toolConfig, setToolConfig] = useState(false);
  const [configButton, setConfigButton] = useState("");

  const handleToolsSwitchOnClick = () => {
    setToolsSwitch((state) => !state);
  }
  const handleButtonsOnClick = (val) => {
    setToolConfig(state => {
      if (state && val === configButton) {
        return false;
      }
      return true;
    });
    setConfigButton(() => val); 
  }

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

  const panelClassName =  "panel flex-column";

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
      <div className={
          !toolsSwitch ? panelClassName + " panel-hidden"
          : toolConfig ? panelClassName + " panel-invisible"
          : panelClassName}>
        <div className="flex-column">
          <div className="aside-button flex-row">
            <ToolButton 
              className="flex-row" 
              onClick={() => { handleButtonsOnClick("SETS") }}
            >
              <h4 className="fs-text">Sets</h4>
            </ToolButton>
          </div>
          <div className="aside-button flex-row">
            <ToolButton 
              className="flex-row" 
              onClick={() => { handleButtonsOnClick("TIME") }}
            >
              <h4 className="fs-text">Time</h4>
            </ToolButton>
          </div>
          <div className="aside-button flex-row">
            <ToolButton 
              className="flex-row text-left" 
              onClick={() => { handleButtonsOnClick("FADETIME") }}
            >
              <h4 className="fs-text">Fade Time</h4>
            </ToolButton>
          </div>
          <div className="aside-button flex-row">
            <ToolButton 
              className="flex-row" 
              onClick={() => { handleButtonsOnClick("PANNER") }}
            >
              <h4 className="fs-text">Panner</h4>
            </ToolButton>
          </div>
          <div className="aside-button flex-row">
            <ToolButton 
              className="flex-row" 
              onClick={() => { handleButtonsOnClick("FILTER") }}
            >
              <h4 className="fs-text">Filter</h4>
            </ToolButton>
          </div>
          <div className="aside-button flex-row">
            <ToolButton 
              className="flex-row" 
              onClick={() => { handleButtonsOnClick("DELAY") }}
            >
              <h4 className="fs-text">Delay</h4>
            </ToolButton>
          </div>
          <div className="aside-button flex-row">
            <ToolButton 
              className="flex-row" 
              onClick={() => { handleButtonsOnClick("RATE") }}
            >
              <h4 className="fs-text">Rate</h4>
            </ToolButton>
          </div>
          <div className="aside-button flex-row">
            <ToolButton 
              className="flex-row" 
              onClick={() => { handleButtonsOnClick("RCT") }}
            >
              <h4 className="fs-text">RCT</h4>
            </ToolButton>
          </div>
        </div>
      </div>
      <AsideConfig 
        active={toolConfig} 
        onClick={() => setToolConfig(() => false)}
        configButton={configButton}
        audioList_size={props.audioList_size}
      />
    </aside>
  );
})