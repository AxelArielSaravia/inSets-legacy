import { memo, useState } from "react";

import ToolButton from "./ToolButton.js"
import "./Aside.scss"


export default memo(function Aside() {
  //console.log("Update Aside"); //DEBUGGER
  const [toolsSwitch, setToolsSwitch] = useState(false);

  const handleToolsSwitchOnClick = () => {
    setToolsSwitch((state) => !state);
  }


  return (
    <aside className="aside flex-column">
      <div className="tools-switch hidden align-c justify-c"> 
        <ToolButton onClick={handleToolsSwitchOnClick}>
          { toolsSwitch
            ? <i className="flex-column align-c justify-c bi bi-chevron-compact-up"></i>
            : <i className="flex-column align-c justify-c bi bi-chevron-compact-down"></i>
          }
        </ToolButton>
      </div>
      <div className={!toolsSwitch ? "configs config-hidden flex-column" : "configs flex-column"}>
        <div className="flex-column">
          <ToolButton className="flex-row">
            <h4 className="fs-text">Sets</h4>
          </ToolButton>
          <ToolButton className="flex-row">
            <h4 className="fs-text">Time</h4>
          </ToolButton>
            <ToolButton className="flex-row">
            <h4 className="fs-text">Panner</h4>
          </ToolButton>
          <ToolButton className="flex-row">
            <h4 className="fs-text">Filter</h4>
          </ToolButton>
          <ToolButton className="flex-row">
            <h4 className="fs-text">Delay</h4>
          </ToolButton>
          <ToolButton className="flex-row">
            <h4 className="fs-text">Rate</h4>
          </ToolButton>
          <ToolButton className="flex-row">
            <h4 className="fs-text">RTC</h4>
          </ToolButton>
          <ToolButton className="flex-row">
            <h4 className="fs-text text-left">Fade Time</h4>
          </ToolButton>
        </div>
      </div>
    </aside>
  );
})