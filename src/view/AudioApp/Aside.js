import { memo, useState, useEffect } from "react";

import ToolButton from "./ToolButton.js";
import AsideButton from "./Aside/AsideButton.js";
import "./Aside.scss"


export default memo(function Aside(props) {
  //console.log("Update Aside"); //DEBUGGER
  const [toolsSwitch, setToolsSwitch] = useState(false);

  const handleToolsSwitchOnClick = () => {
    setToolsSwitch((state) => !state);
  }

  useEffect(() => {
    const el = (e) => { 
      if (e.target.matches(".tools-switch") 
       || e.target.matches(".tools-switch *")
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
          <AsideButton name="Sets" match="sets">
            <div>
              Sets
            </div>
          </AsideButton>
          <AsideButton name="Time" match="time">
            <div>
              Time
            </div>
          </AsideButton>
          <AsideButton name="Panner" match="panner">
            <div>
              Panner
            </div>
          </AsideButton>
          <AsideButton name="Filter" match="filter">
            <div>
              Filter
            </div>
          </AsideButton>
          <AsideButton name="Delay" match="delay">
            <div>
              Delay
            </div>
          </AsideButton>
          <AsideButton name="Rate" match="rate">
            <div>
              Rate
            </div>
          </AsideButton>
          <AsideButton name="RTC" match="rtc">
            <div>
              RTC
            </div>
          </AsideButton>
          <AsideButton name="Fade Time" match="fade-time" className="text-left">
            <div>
              Fade Time
            </div>
          </AsideButton>
        </div>
      </div>
    </aside>
  );
})