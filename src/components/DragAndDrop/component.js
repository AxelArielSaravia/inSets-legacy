import { memo, useState, useEffect, useCallback } from "react";

import { useAddFiles } from "../../hooks/index.js";

import { IconMusicFile } from "../icons/component.js";

/**
 * @param {Event} e
 */
const preventDefault = (e) => { e.preventDefault(); };


const DropArea = () => {
    return (
        <> 
            <div className="dragfile flex-row align-c justify-c">
               <IconMusicFile className="icon-drop"/>
            </div>
            <div>
                <p className="fs-text p-5">Drop files</p>
            </div>
        </>
    )
};

/**
 * @param {{ children: Function, className?: string, style?: object}} props 
 * @returns 
 */
const DropFiles = memo(function DropFiles({className, style}) {
    const addFiles = useAddFiles();
    
    useEffect(() => {
        window.addEventListener('dragover', preventDefault, false);
        window.addEventListener('drop', preventDefault, false);
        return () => {
            window.removeEventListener('dragover', preventDefault, false);
            window.removeEventListener('drop', preventDefault, false);
        };
    });

    /**
     * @param {DragEvent} e
     */
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }, []);

    /**
     * @param {DragEvent} e
     */
    const handleFileDrop = useCallback((e) => {
        e.preventDefault();
        addFiles(e.dataTransfer.files);
    },[addFiles]);

    return (
        <div
            style={style}
            onDragOver={handleDragOver}
            onDrop={handleFileDrop}
            className={className}
        >
            <DropArea />
        </div>
    );
});


/**
 * @param {{ children: Function, render: Function, className?: string, style?: object}} props 
 * @returns 
 */
const DragFiles = memo(function DragFiles({ className, style, children}) {
    const [isDragActive, setIsDragActive] = useState(false);
    let counter = 1;
    const handleDragEnter = () => {
        counter++;
        setIsDragActive(() => true);
    };

    const handleDragLeave = () => {
        counter--;
        if (counter === 0) 
            setIsDragActive(() => false);
    };

    const handleDrop = () => {
        counter = 0;
        setIsDragActive(() => false);
    };

    return (
        <div
            className={className}
            style={style}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            { children(isDragActive) }
        </div>
    );
});

export {
    DragFiles,
    DropFiles
}