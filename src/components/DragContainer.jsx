//@ts-check
import React, {useState} from "react";

import DropContainer from "./DropContainer.jsx";
import Show from "./Show.jsx";

let counter = 0;
let dispatchIsDragActive;

function handleDragEnter() {
    counter += 1;
    dispatchIsDragActive(true);
}

function handleDragLeave() {
    counter -= 1;
    if (counter === 0) {
        dispatchIsDragActive(false);
    }
}

function handleDrop() {
    counter = 0;
    dispatchIsDragActive(false);
}

/**
@type {(porp: {className?:string, style?: object, children: Array<JSX.Element>}) => JSX.Element} */
function DragContainer({className, style, children}) {
    const [isDragActive, setIsDragActive] = useState(false);
    dispatchIsDragActive = setIsDragActive;
    return (
        <div
            className={className}
            style={style}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {children}
            <Show
                is={isDragActive}
                children={<DropContainer/>}
            />
        </div>
    );
}

export default DragContainer;
