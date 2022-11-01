import Button from "../../../components/Button/component.js";

import "./style.scss";

const titleStyle = {marginBottom: "10px"};
function Title({title}) {
    if (title === undefined) {
        return;
    }
    return (
        <h3 className="fs-text-l text-center" style={titleStyle}>
            {title}
        </h3>
    );
}

function Description({description}) {
    if (description === undefined) {
        return;
    }
    return (
        <div className="flex-column align-c p-5">
            <div className="config-panel_container--description">
                <span className="fs-text">{description}</span>
            </div>
        </div>
    );
}

function AddResetButton({
    addResetButton,
    title,
    reset
}) {
    if (!addResetButton) {
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

function AddDisableAllButton({
    addDisableAllButton,
    changeDisable,
    disableValue,
    title
}) {
    if (!addDisableAllButton) {
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
                >
                    <p className="fs-text-s text-bold">
                        {disableValue ? "true" : "false"}
                    </p>
                </Button>
            </div>
        </div>
    );
}

function ConfigPanelContainer({
    addDisableAllButton = false,
    addResetButton = false,
    title,
    description,
    changeDisable,
    disableValue,
    reset,
    children
}) {
    return (
        <div className="config-panel_container">
            <Title title={title}/>
            <Description description={description}/>
            <div className="flex-column align-c">
                <AddDisableAllButton
                    addDisableAllButton={addDisableAllButton}
                    changeDisable={changeDisable}
                    disableValue={disableValue}
                    title={title}
                />
                <AddResetButton
                    addResetButton={addResetButton}
                    title={title}
                    reset={reset}
                />
                <div className="config-panel_container--children flex-column align-c justify-c">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ConfigPanelContainer;