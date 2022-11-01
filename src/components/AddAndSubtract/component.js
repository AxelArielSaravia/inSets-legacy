import {
    IconChevronUp,
    IconChevronDown,
    IconChevronLeft,
    IconChevronRight
} from "../icons/component.js";
import Button from "../Button/component.js";


import "./style.scss";


function ButtonLeftUp({
    horizontal,
    subtractOnClick,
    addOnClick,
}) {
    return (
        <Button
            type="button"
            className="addAndSubtract_button flex-column align-c justify-c"
            onClick={horizontal ? subtractOnClick : addOnClick}
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
    subtractOnClick
}) {
    return (
        <Button
            type="button"
            className="addAndSubtract_button flex-column align-c justify-c"
            onClick={horizontal ? addOnClick : subtractOnClick}
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
    horizontal
}) {
    return (
        <div className={horizontal ? "addAndSubtract flex-row align-c" : "addAndSubtract flex-column"}>
            <ButtonLeftUp
                addOnClick={addOnClick}
                horizontal={horizontal}
                subtractOnClick={subtractOnClick}
            />
            <div className={horizontal ? "addAndSubtract_text" : "addAndSubtract_text p-5"}>
                <p className="fs-text-l text-center">{viewValue}</p>
            </div>
            <ButtonRightDown
                addOnClick={addOnClick}
                horizontal={horizontal}
                subtractOnClick={subtractOnClick}
            />
        </div>
    );
}

export default AddAndSubtract;