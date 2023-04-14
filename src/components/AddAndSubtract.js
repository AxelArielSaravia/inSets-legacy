import {
    IconChevronUp,
    IconChevronDown,
    IconChevronLeft,
    IconChevronRight
} from "./icons.js";

import Button from "./Button.js";

import "./AddAndSubtract.scss";

function ButtonLeftUp({
    horizontal,
    subtractOnClick,
    addOnClick,
    value
}) {
    return (
        <Button
            type="button"
            className="addAndSubtract_button flex-column align-c justify-c"
            onClick={horizontal ? subtractOnClick : addOnClick}
            value={value}
        >
            {horizontal
                ? <IconChevronLeft className="icon-text-s"/>
                : <IconChevronUp className="icon-text-s"/>
            }
        </Button>
    );
}

function ButtonRightDown({
    horizontal,
    addOnClick,
    subtractOnClick,
    value
}) {
    return (
        <Button
            type="button"
            className="addAndSubtract_button flex-column align-c justify-c"
            onClick={horizontal ? addOnClick : subtractOnClick}
            value={value}
        >
            {horizontal
                ? <IconChevronRight className="icon-text-s"/>
                : <IconChevronDown className="icon-text-s"/>
            }
        </Button>
    );
}

function AddAndSubtract({
    addOnClick,
    subtractOnClick,
    viewValue,
    value,
    horizontal
}) {
    return (
        <div className={horizontal ? "addAndSubtract flex-row align-c" : "addAndSubtract flex-column"}>
            <ButtonLeftUp
                addOnClick={addOnClick}
                horizontal={horizontal}
                subtractOnClick={subtractOnClick}
                value={value}
            />
            <div className={horizontal ? "addAndSubtract_text" : "addAndSubtract_text p-5"}>
                <p className="fs-text-l text-center">{viewValue}</p>
            </div>
            <ButtonRightDown
                addOnClick={addOnClick}
                horizontal={horizontal}
                subtractOnClick={subtractOnClick}
                value={value}
            />
        </div>
    );
}

export default AddAndSubtract;