import Button from "../Button.js";
import Show from "../Show.js";

import "./PanelConfigContainer.scss";

const titleStyle = {
    marginBottom: "10px"
};

function Title({title}) {
    return (
        <Show is={title !== undefined}>
            <h3 className="fs-text-l text-center" style={titleStyle}>
                {title}
            </h3>
        </Show>
    );
}

function Description({description}) {
    return (
        <Show is={description !== undefined}>
            <div className="flex-column align-c p-5">
                <div className="panel-config-container--description">
                    <span className="fs-text">{description}</span>
                </div>
            </div>
        </Show>
    );
}

function ResetButton({
    enabled,
    title,
    reset
}) {
    if (!enabled) {
        return;
    }
    return (
        <div className="flex-column align-c justify-c p-5">
            <Button
                title={`reset ${title} values`}
                onClick={reset}
            >
                <p className="fs-text-s text-bold">reset values</p>
            </Button>
        </div>
    );
}

function DisableAllButton({
    enabled,
    changeDisable,
    disableValue,
    title
}) {
    if (!enabled) {
        return;
    }
    const ButtonTitle = (
        disableValue
        ? `enable all ${title} s`
        : `disable all ${title}s`
    );

    return (
        <div className="p-5">
            <div className="flex-row align-c justify-c p-10">
                <p className="fs-text p-5">disable all:</p>
                <Button
                    title={ButtonTitle}
                    onClick={changeDisable}
                    value={disableValue}
                >
                    <p className="fs-text-s text-bold">
                        {disableValue ? "true" : "false"}
                    </p>
                </Button>
            </div>
        </div>
    );
}

function PanelConfigContainer({
    DisableAllButtonEnabled = false,
    ResetButtonEnabled = false,
    title,
    description,
    changeDisable,
    disableValue,
    reset,
    children
}) {
    return (
        <div className="panel-config-container">
            <Title title={title}/>
            <Description description={description}/>
            <div className="flex-column align-c">
                <DisableAllButton
                    enabled={DisableAllButtonEnabled}
                    changeDisable={changeDisable}
                    disableValue={disableValue}
                    title={title}
                />
                <ResetButton
                    enabled={ResetButtonEnabled}
                    title={title}
                    reset={reset}
                />
                <div className="panel-config-container--children flex-column align-c justify-c">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default PanelConfigContainer;