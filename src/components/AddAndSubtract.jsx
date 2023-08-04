//@ts-check
import React from "react";
import {
    IconChevronUp,
    IconChevronDown,
    IconChevronLeft,
    IconChevronRight
} from "./icons.jsx";

import Button from "./Button.jsx";

/**
@type {(porps: {
    horizontal?: boolean,
    subtractOnClick?: (v?: any) => void,
    addOnClick?: (v?: any) => void,
    value: any,
}) => JSX.Element} */
function ButtonLeftUp({
    horizontal,
    subtractOnClick,
    addOnClick,
    value
}) {
    return (
        <Button
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

/**
@type {(porps: {
    horizontal?: boolean,
    subtractOnClick?: (v?: any) => void,
    addOnClick?: (v?: any) => void,
    value: any,
}) => JSX.Element} */
function ButtonRightDown({
    horizontal,
    addOnClick,
    subtractOnClick,
    value
}) {
    return (
        <Button
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

/**
@type {(porps: {
    addOnClick?: (v?: any) => void,
    subtractOnClick?: (v?: any) => void,
    viewValue?: string | number,
    horizontal?: boolean,
    value: any,
}) => JSX.Element} */
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
