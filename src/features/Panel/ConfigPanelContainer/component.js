import {memo} from "react"; 

import Button from "../../../components/Button/component.js";

import "./style.scss"

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
            {title && (
            <h3 className="fs-text-l text-center" style={{marginBottom: "10px"}}>
                {title}
            </h3>
            )}
            {description !== undefined && (
            <div className="flex-column align-c p-5">
                <div className="config-panel_container--description">
                    <span className="fs-text">{description}</span>
                </div>
            </div>
            )}
            <div className="flex-column align-c">
                {addDisableAllButton && (
                <div className="p-5">
                    <div className="flex-row align-c justify-c p-10">
                        <p className="fs-text p-5">disable all:</p>
                        <Button
                            title={disableValue ? "enable all " + title + "s" : "disable all " + title + "s" }
                            onClick={changeDisable}
                        >
                            <p className="fs-text-s text-bold">
                            { disableValue ? "true" : "false" }
                            </p>
                        </Button>
                    </div>
                </div>
                )}
                {addResetButton && (
                <div className="flex-column align-c justify-c p-5">
                    <Button
                        title={"reset " +title+ " values"}
                        onClick={reset}
                    >
                        <p className="fs-text-s text-bold">reset values</p>
                    </Button>
                </div>
                )}
                <div className="config-panel_container--children flex-column align-c justify-c">
                    {children}  
                </div>
            </div>
        </div>
       
    );
}

export default memo(ConfigPanelContainer);