//@ts-check
import React from "react";
/**
@type {(porps: {
    className?: string,
    value?: any,
    title?: string,
    onClick?: (v?: any) => void,
    children?: Array<JSX.Element> | JSX.Element
}) => JSX.Element} */
export default function ToolButton({
    className = "",
    value,
    title,
    onClick,
    children
}) {
    return (
        <button
            title={title}
            className={"t-button " + className}
            type="button"
            onClick={onClick !== undefined ? () => onClick(value) : undefined}
        >
            {children}
        </button>
    );
}