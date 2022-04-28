import { useContext, memo } from "react";
import Contexts from "../../Contexts.js";

import "./aside.scss"

const buttonClass = "tool-button flex-row";

export default memo(function Aside() {
  console.log("Update Aside"); //DEBUGGER

  const isPlaying = useContext(Contexts.IsPlaying);
  const isLoading = useContext(Contexts.IsLoading);
  
  return (
    <aside className="aside flex-column align-c justify-c">
      <div className="configs flex-row flex-wrap align-c justify-c">
        <button className={(isPlaying || isLoading)? buttonClass + " disable" : buttonClass}>
          <h4 className="fs-text">Sets</h4>
        </button>
        <button className={(isPlaying || isLoading)? buttonClass + " disable" : buttonClass}>
          <h4 className="fs-text">Time</h4>
        </button>
        <button className={(isPlaying || isLoading)? buttonClass + " disable" : buttonClass}>
          <h4 className="fs-text">Panner</h4>
        </button>
        <button className={(isPlaying || isLoading)? buttonClass + " disable" : buttonClass}>
          <h4 className="fs-text">Filter</h4>
        </button>
        <button className={(isPlaying || isLoading)? buttonClass + " disable" : buttonClass}>
          <h4 className="fs-text">Delay</h4>
        </button>
        <button className={(isPlaying || isLoading)? buttonClass + " disable" : buttonClass}>
          <h4 className="fs-text">Rate</h4>
        </button>
        <button className={(isPlaying || isLoading)? buttonClass + " disable" : buttonClass}>
          <h4 className="fs-text">Others</h4>
        </button>
      </div>
    </aside>
  );
})