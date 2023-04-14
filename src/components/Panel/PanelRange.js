import Range from "../Range.js";
import Show from "../Show.js";

import "./PanelRange.scss";

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
                <Show is={typeof text === "string"}>
                    <p className="fs-text p-5">{text}</p>
                </Show>
                <p className="fs-text">{valueText}</p>
                <Show is={typeof valueTextAdd === "string"}>
                    <p className="fs-text p-5">{" " + valueTextAdd}</p>
                </Show>
            </div>
        </div>
    );
}

export default PanelRange;