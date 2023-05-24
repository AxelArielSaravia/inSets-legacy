//@ts-check
import React from "react";
import "./Range.scss";

/**
@type {(prop: {
    max?: string | number,
    min?: string | number,
    step?: string | number,
    value?: any,
    reverse?: boolean,
    onChange?: (a?: string | number) => void
}) => JSX.Element} */
function Range({
    max = "100",
    min = "0",
    step = "1",
    value,
    reverse,
    onChange
}) {
    /**@type {React.ChangeEventHandler<HTMLInputElement>} */
    function handler (e) {
        if (onChange !== undefined) {
            return onChange(e.target.value);
        }
    }
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

export default Range;