import {useState, useEffect, useCallback} from "react";

import {useAddFiles} from "../../hooks/index.js";

import {IconMusicFile} from "../icons/component.js";

function preventDefault(e) {
    e.preventDefault();
}

function DropArea() {
    return (
        <>
            <div className="dragfile flex-row align-c justify-c">
                <IconMusicFile className="icon-drop o-5"/>
            </div>
            <div>
                <p className="fs-text p-5">Drop files</p>
            </div>
        </>
    );
}

function DropFiles({className}) {
    const addFiles = useAddFiles();

    const handleFileDrop = useCallback(function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
        addFiles(e.dataTransfer.files);
    },[addFiles]);

    return (
        <div
            onDragOver={preventDefault}
            onDrop={handleFileDrop}
            className={className}
        >
            <DropArea />
        </div>
    );
}

function DropComponent({isDragActive}) {
    if (isDragActive) {
        return (
            <DropFiles className="dropFile flex-column align-c justify-c"/>
        );
    }
}

let counter = 0;

function DragFiles({className, style, children}) {
    const [isDragActive, setIsDragActive] = useState(false);
    function handleDragEnter () {
        counter += 1;
        setIsDragActive(() => true);
    }

    function handleDragLeave () {
        counter -= 1;
        if (counter === 0) {
            setIsDragActive(() => false);
        }
    }

    function handleDrop () {
        counter = 0;
        setIsDragActive(() => false);
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
            <DropComponent isDragActive={isDragActive}/>
        </div>
    );
}

export {
    DragFiles,
    DropFiles
};