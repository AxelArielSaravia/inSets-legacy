import Range from "../../../components/Range/component.js" 

import "./style.scss";

function ConfigPanelRange({
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
        <div className="config-panel_range">
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
                {text && (
                <p className="fs-text p-5">{text}</p>
                )}
                <p className="fs-text">{valueText}</p>
                {valueTextAdd && (
                <p className="fs-text p-5">{" " + valueTextAdd}</p>
                )}
            </div>
        </div>
    );
}

export default ConfigPanelRange;