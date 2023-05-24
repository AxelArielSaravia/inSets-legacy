//@ts-check
import React from "react";
import Range from "../Range.js";
import Show from "../Show.js";

import "./PanelRange.scss";

/**
@type {(props: {
    step?: string | number,
    max?: string | number,
    value?: any,
    text?: string,
    valueText?: string | number,
    valueTextAdd?: string | number,
    onChange?: (a?: any) => void,
    reverse?: boolean
}) => JSX.Element} */
function PanelRange({
    step,
    max,
    value,
    text,
    valueText,
    valueTextAdd,
    onChange,
    reverse = false
}) {
    return (
        <div className="panel-config-range">
            <div className="flex-row align-c p-5">
                <Range
                    step={step}
                    max={max}
                    value={value}
                    onChange={onChange}
                    reverse={reverse}
                />
            </div>
            <div className="flex-row align-c">
                <Show is={text !== undefined}>
                    <p className="fs-text p-5">{text}</p>
                </Show>
                <p className="fs-text">{valueText}</p>
                <Show is={valueTextAdd !== undefined}>
                    <p className="fs-text p-5">{" " + valueTextAdd}</p>
                </Show>
            </div>
        </div>
    );
}

export default PanelRange;