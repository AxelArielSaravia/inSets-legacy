import { IconChevronUp, IconChevronDown, IconChevronLeft, IconChevronRight } from "../icons/component.js";
import Button from "../Button/component.js";


import "./style.scss";

function AddAndSubtract({
    addOnClick,
    subtractOnClick,
    viewValue,
    horizontal
}) {
    return (
        <div className={horizontal ? "addAndSubtract flex-row align-c" : "addAndSubtract flex-column"}>
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
            <div className={horizontal ? "addAndSubtract_text" : "addAndSubtract_text p-5"}>
                <p className="fs-text-l text-center">{viewValue}</p>
            </div>
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
        </div>
    );
}

export default AddAndSubtract;