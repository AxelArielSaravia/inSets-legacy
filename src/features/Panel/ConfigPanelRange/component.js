import Range from "../../../components/Range/component.js";

import "./style.scss";

function Text({text}) {
    if (text === undefined) {
        return;
    }
    return <p className="fs-text p-5">{text}</p>;
}

function ValueTextAdd({valueTextAdd}) {
    if (valueTextAdd === undefined) {
        return;
    }
    return <p className="fs-text p-5">{" " + valueTextAdd}</p>;
}

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
                <Text text={text}/>
                <p className="fs-text">{valueText}</p>
                <ValueTextAdd valueTextAdd={valueTextAdd}/>
            </div>
        </div>
    );
}

export default ConfigPanelRange;