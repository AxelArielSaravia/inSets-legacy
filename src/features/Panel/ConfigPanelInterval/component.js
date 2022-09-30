import ConfigPanelChild from "../ConfigPanelChild/component.js";
import ConfigPanelRange from "../ConfigPanelRange/component.js";

import "./style.scss";

function ConfigPanelInterval({
    title,
    valueText,
    rangeMax = 100,
    step = 1,
    valueMin,
    valueMax,
    viewMin,
    viewMax,
    onChangeMin,
    onChangeMax
}) {
    return (
        <ConfigPanelChild title={title}>
            <div className="flex-column ">
                <ConfigPanelRange
                    step={step}
                    max={rangeMax}
                    value={valueMin}
                    onChange={onChangeMin}
                    text="min"
                    valueText={viewMin}
                    valueTextAdd={valueText}
                /> 
                 <ConfigPanelRange
                    step={step}
                    max={rangeMax}
                    value={valueMax}
                    onChange={onChangeMax}
                    text="max"
                    valueText={viewMax}
                    valueTextAdd={valueText}
                    reverse
                /> 
            </div>
        </ConfigPanelChild>
    );
}

export default ConfigPanelInterval;