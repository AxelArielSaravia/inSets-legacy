import { memo } from "react";
import "./style.scss";

function Range({
  max = "100", 
  min = "0",
  step = "1",
  value,
  reverse,
  onChange
}) {
    const handler = (e) => onChange(e.target.value);
    return (
      <div className={reverse ? "range reverse" : "range"} role="slider" aria-valuenow={value}>
        <input 
          className="range_seak" 
          type="range" 
          min={min} max={max} step={step} 
          value={value}
          onChange={handler}
        />
        <progress 
          className="range_value" 
          max={max}
          value={value} 
          role="presentation"
        />
      </div>
    );
}

export default memo(Range);