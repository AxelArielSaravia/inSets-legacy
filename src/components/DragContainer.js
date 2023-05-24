//@ts-check
import React, {useState} from "react";

import DropContainer from "./DropContainer.js";
import Show from "./Show.js";

let counter = 0;

/**
@type {(porp: {className?:string, style?: object, children: Array<JSX.Element>}) => JSX.Element} */
function DragContainer({className, style, children}) {
    const [isDragActive, setIsDragActive] = useState(false);

    function handleDragEnter() {
        counter += 1;
        setIsDragActive(true);
    }

    function handleDragLeave() {
        counter -= 1;
        if (counter === 0) {
            setIsDragActive(false);
        }
    }

    function handleDrop() {
        counter = 0;
        setIsDragActive(false);
    }

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